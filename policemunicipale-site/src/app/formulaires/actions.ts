"use server";

import {
  getFormDefinition,
  type FormDefinition,
  type FormField,
} from "@/lib/formulaires";
import {
  getSmtpStatus,
  MAIL_TO_SYNDICATE,
  sendMail,
  type MailAttachment,
} from "@/lib/mail";

export type FormSubmitState = {
  ok?: boolean;
  error?: string;
  message?: string;
};

const MAX_PHOTO_BYTES = 2 * 1024 * 1024;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function fieldValue(formData: FormData, field: FormField): string {
  if (field.type === "file") return "";
  return String(formData.get(field.name) ?? "").trim();
}

function findSubmitterEmail(values: Record<string, string>) {
  return (
    values.emailPrive ||
    values.emailPro ||
    Object.entries(values).find(([key, value]) => key.startsWith("email") && value)?.[1] ||
    ""
  );
}

function findSubmitterName(values: Record<string, string>) {
  if (values.nomPrenom) return values.nomPrenom;
  const parts = [values.prenom, values.nom].filter(Boolean);
  if (parts.length) return parts.join(" ");
  return "Membre SPMG";
}

function buildBody(
  definition: FormDefinition,
  values: Record<string, string>,
  hasPhoto: boolean,
): string {
  const lines = [
    definition.title,
    "",
    ...definition.fields
      .filter((field) => field.type !== "file")
      .map((field) => `${field.label} : ${values[field.name] || "—"}`),
  ];

  if (definition.fields.some((field) => field.type === "file")) {
    lines.push(`Photographie jointe : ${hasPhoto ? "oui" : "non"}`);
  }

  lines.push(
    "",
    "Signature électronique : confirmée via le formulaire en ligne.",
    "",
    "—",
    "Formulaire envoyé depuis policemunicipale.vercel.app",
  );

  return lines.join("\n");
}

async function readPhoto(formData: FormData): Promise<
  | { ok: true; attachment?: MailAttachment }
  | { ok: false; error: string }
> {
  const photo = formData.get("photo");
  if (!photo || typeof photo === "string") {
    return { ok: true };
  }

  if (!(photo instanceof File) || photo.size === 0) {
    return { ok: true };
  }

  if (photo.size > MAX_PHOTO_BYTES) {
    return {
      ok: false,
      error: "La photographie dépasse 2 Mo. Merci de compresser l’image.",
    };
  }

  const allowed = ["image/jpeg", "image/png", "image/webp"];
  if (photo.type && !allowed.includes(photo.type)) {
    return {
      ok: false,
      error: "Format de photo non accepté (JPEG, PNG ou WebP uniquement).",
    };
  }

  const buffer = Buffer.from(await photo.arrayBuffer());
  const filename = photo.name?.trim() || "photo-passeport.jpg";

  return {
    ok: true,
    attachment: {
      filename,
      content: buffer,
      contentType: photo.type || "application/octet-stream",
    },
  };
}

export async function submitFormulaire(
  slug: string,
  _prev: FormSubmitState,
  formData: FormData,
): Promise<FormSubmitState> {
  const definition = getFormDefinition(slug);
  if (!definition) {
    return { error: "Formulaire inconnu." };
  }

  const smtp = getSmtpStatus();
  if (!smtp.configured) {
    console.warn(`[formulaires] ${smtp.reason}`);
    return { error: smtp.reason };
  }

  const values: Record<string, string> = {};
  for (const field of definition.fields) {
    if (field.type === "file") continue;
    const value = fieldValue(formData, field);
    if (field.required && !value) {
      return { error: `Le champ « ${field.label} » est obligatoire.` };
    }
    if (field.type === "email" && value && !EMAIL_RE.test(value)) {
      return { error: `Adresse courriel invalide : ${field.label}.` };
    }
    values[field.name] = value;
  }

  const signature = String(formData.get("signature") ?? "");
  if (signature !== "oui") {
    return {
      error: "Veuillez confirmer votre signature électronique avant l’envoi.",
    };
  }

  const submitterEmail = findSubmitterEmail(values);
  if (!submitterEmail || !EMAIL_RE.test(submitterEmail)) {
    return { error: "Une adresse courriel valide est requise." };
  }

  const photoResult = await readPhoto(formData);
  if (!photoResult.ok) {
    return { error: photoResult.error };
  }

  const submitterName = findSubmitterName(values);
  const body = buildBody(definition, values, Boolean(photoResult.attachment));
  const attachments = photoResult.attachment ? [photoResult.attachment] : undefined;

  try {
    await sendMail({
      to: MAIL_TO_SYNDICATE,
      subject: `[SPMG] ${definition.shortTitle} — ${submitterName}`,
      text: body,
      replyTo: submitterEmail,
      attachments,
    });

    await sendMail({
      to: submitterEmail,
      subject: `Confirmation — ${definition.shortTitle}`,
      text: [
        `Bonjour ${submitterName},`,
        "",
        `Nous avons bien reçu votre formulaire « ${definition.title} ».`,
        "Le Syndicat des Polices Municipales Genevoises vous contactera si nécessaire.",
        "",
        "Récapitulatif :",
        "",
        body,
        "",
        "Cordialement,",
        "SPMG — Syndicat des Polices Municipales Genevoises",
        "info@policemunicipale.ch",
      ].join("\n"),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Échec de l’envoi du courriel.";
    console.error("[formulaires] mail error:", message);
    return {
      error:
        "L’envoi du formulaire a échoué. Réessayez plus tard ou écrivez à info@policemunicipale.ch.",
    };
  }

  return {
    ok: true,
    message:
      "Votre demande a été envoyée. Un courriel de confirmation vous a été adressé.",
  };
}
