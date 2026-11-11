export type FormFieldType =
  | "text"
  | "email"
  | "tel"
  | "date"
  | "textarea"
  | "file";

export type FormField = {
  name: string;
  label: string;
  type: FormFieldType;
  required?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
  accept?: string;
  rows?: number;
  hint?: string;
};

export type FormDefinition = {
  slug: "adhesion" | "demenagement" | "readmission";
  title: string;
  shortTitle: string;
  description: string;
  intro: string;
  notice?: string;
  submitLabel: string;
  fields: FormField[];
};

export const FORM_DEFINITIONS: FormDefinition[] = [
  {
    slug: "adhesion",
    title: "Demande d’admission au SPMG/FSFP",
    shortTitle: "Adhésion au SPMG",
    description:
      "Remplissez le formulaire en ligne. Joignez une photo passeport si possible ; une confirmation vous sera envoyée par courriel.",
    intro:
      "Le soussigné demande son adhésion au SPMG, ce qui entraîne automatiquement l’admission à la Fédération suisse des fonctionnaires de police (FSFP).",
    notice:
      "Si l’entrée au SPMG/FSFP intervient après l’âge de 30 ans révolus, une somme de rachat d’années peut être due à la caisse au décès et de secours de la FSFP.",
    submitLabel: "Envoyer la demande d’admission",
    fields: [
      { name: "nomPrenom", label: "Nom et prénom", type: "text", required: true },
      { name: "dateNaissance", label: "Né(e) le", type: "date", required: true },
      { name: "lieuNaissance", label: "Né(e) à", type: "text", required: true },
      {
        name: "lieuOrigine",
        label: "Lieu d’origine (pour les Suisses et Suissesses)",
        type: "text",
      },
      {
        name: "adresse",
        label: "Adresse (rue et numéro)",
        type: "text",
        required: true,
        fullWidth: true,
      },
      {
        name: "npaLocalite",
        label: "N° postal et localité",
        type: "text",
        required: true,
      },
      { name: "pays", label: "Pays", type: "text", required: true, placeholder: "Suisse" },
      { name: "telFixe", label: "Tél. privé (fixe)", type: "tel" },
      {
        name: "telPortablePrive",
        label: "Tél. portable privé",
        type: "tel",
        required: true,
      },
      {
        name: "telPortablePro",
        label: "Téléphone portable professionnel",
        type: "tel",
      },
      {
        name: "emailPrive",
        label: "Adresse courriel privée",
        type: "email",
        required: true,
      },
      {
        name: "emailPro",
        label: "Adresse courriel professionnelle",
        type: "email",
      },
      {
        name: "dateEntreeFonction",
        label: "Date d’entrée en fonction dans la profession",
        type: "date",
        required: true,
      },
      {
        name: "communeEmployeur",
        label: "Commune (employeur) actuelle",
        type: "text",
        required: true,
      },
      { name: "fonction", label: "Fonction", type: "text", required: true },
      { name: "grade", label: "Grade", type: "text" },
      { name: "professionPrecedente", label: "Profession précédente", type: "text" },
      { name: "etatCivil", label: "État civil", type: "text" },
      {
        name: "autresInfos",
        label: "Autre(s) information(s) que vous jugez nécessaire de donner",
        type: "textarea",
        fullWidth: true,
        rows: 4,
      },
      {
        name: "photo",
        label: "Photographie format passeport",
        type: "file",
        fullWidth: true,
        accept: "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp",
        hint: "Facultatif mais recommandé (JPEG ou PNG, max. 2 Mo).",
      },
      {
        name: "lieuDate",
        label: "Lieu et date",
        type: "text",
        required: true,
        fullWidth: true,
        placeholder: "Genève, 11.11.2026",
      },
    ],
  },
  {
    slug: "demenagement",
    title: "Changement d’adresse SPMG/FSFP",
    shortTitle: "Déménagement",
    description:
      "Communiquez votre nouvelle adresse au syndicat. Une confirmation vous sera envoyée par courriel.",
    intro: "Formulaire réservé aux membres SPMG-FSFP.",
    submitLabel: "Envoyer le changement d’adresse",
    fields: [
      { name: "nom", label: "Nom", type: "text", required: true },
      { name: "prenom", label: "Prénom", type: "text", required: true },
      {
        name: "telPortablePrive",
        label: "Téléphone portable privé",
        type: "tel",
        required: true,
      },
      {
        name: "emailPrive",
        label: "Adresse courriel privée",
        type: "email",
        required: true,
      },
      {
        name: "communeTravail",
        label: "Commune de travail",
        type: "text",
        required: true,
      },
      {
        name: "ancienneRue",
        label: "Ancienne adresse — rue et numéro",
        type: "text",
        required: true,
        fullWidth: true,
      },
      {
        name: "ancienneNpa",
        label: "Ancienne adresse — code postal et localité",
        type: "text",
        required: true,
      },
      { name: "ancienPays", label: "Ancienne adresse — pays", type: "text" },
      { name: "ancienCo", label: "Ancienne adresse — C/O", type: "text" },
      {
        name: "depuisLe",
        label: "Nouvelle adresse — depuis le",
        type: "date",
        required: true,
      },
      {
        name: "nouvelleRue",
        label: "Nouvelle adresse — rue et numéro",
        type: "text",
        required: true,
        fullWidth: true,
      },
      {
        name: "nouvelleNpa",
        label: "Nouvelle adresse — code postal et localité",
        type: "text",
        required: true,
      },
      {
        name: "nouveauPays",
        label: "Nouvelle adresse — pays",
        type: "text",
        required: true,
        placeholder: "Suisse",
      },
      { name: "nouveauCo", label: "Nouvelle adresse — C/O", type: "text" },
      {
        name: "lieuDate",
        label: "Lieu et date",
        type: "text",
        required: true,
        fullWidth: true,
        placeholder: "Genève, 11.11.2026",
      },
    ],
  },
  {
    slug: "readmission",
    title: "Demande de réadmission au SPMG/FSFP",
    shortTitle: "Réadmission",
    description:
      "Demandez votre réadmission en ligne. Joignez une photo passeport si possible ; une confirmation vous sera envoyée par courriel.",
    intro:
      "Le soussigné demande sa réadmission au SPMG, ce qui entraîne automatiquement sa réadmission à la Fédération suisse des fonctionnaires de police (FSFP).",
    notice:
      "Si l’entrée au SPMG/FSFP intervient après l’âge de 30 ans révolus, une somme de rachat d’années peut être due à la caisse au décès et de secours de la FSFP.",
    submitLabel: "Envoyer la demande de réadmission",
    fields: [
      { name: "nomPrenom", label: "Nom et prénom", type: "text", required: true },
      { name: "dateNaissance", label: "Né(e) le", type: "date", required: true },
      { name: "lieuNaissance", label: "Né(e) à", type: "text", required: true },
      {
        name: "lieuOrigine",
        label: "Lieu d’origine (pour les Suisses et Suissesses)",
        type: "text",
      },
      {
        name: "adresse",
        label: "Adresse (rue et numéro)",
        type: "text",
        required: true,
        fullWidth: true,
      },
      {
        name: "npaLocalite",
        label: "N° postal et localité",
        type: "text",
        required: true,
      },
      { name: "pays", label: "Pays", type: "text", required: true, placeholder: "Suisse" },
      { name: "telFixe", label: "Tél. privé (fixe)", type: "tel" },
      {
        name: "telPortablePrive",
        label: "Tél. portable privé",
        type: "tel",
        required: true,
      },
      {
        name: "telPortablePro",
        label: "Téléphone portable professionnel",
        type: "tel",
      },
      {
        name: "emailPrive",
        label: "Adresse courriel privée",
        type: "email",
        required: true,
      },
      {
        name: "emailPro",
        label: "Adresse courriel professionnelle",
        type: "email",
      },
      {
        name: "dateEntreeFonction",
        label: "Date d’entrée en fonction dans la profession",
        type: "date",
        required: true,
      },
      {
        name: "communeEmployeur",
        label: "Commune (employeur) actuelle",
        type: "text",
        required: true,
      },
      { name: "fonction", label: "Fonction", type: "text", required: true },
      { name: "grade", label: "Grade", type: "text" },
      { name: "professionPrecedente", label: "Profession précédente", type: "text" },
      { name: "etatCivil", label: "État civil", type: "text" },
      {
        name: "photo",
        label: "Photographie format passeport",
        type: "file",
        fullWidth: true,
        accept: "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp",
        hint: "Facultatif mais recommandé (JPEG ou PNG, max. 2 Mo).",
      },
      {
        name: "lieuDate",
        label: "Lieu et date",
        type: "text",
        required: true,
        fullWidth: true,
        placeholder: "Genève, 11.11.2026",
      },
    ],
  },
];

export function getFormDefinition(slug: string): FormDefinition | undefined {
  return FORM_DEFINITIONS.find((form) => form.slug === slug);
}
