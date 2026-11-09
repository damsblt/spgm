"use server";

import { redirect } from "next/navigation";
import {
  clearMembersSession,
  getMembersPassword,
  setMembersSession,
  verifyMembersPassword,
} from "@/lib/members-auth";

export type LoginState = {
  error?: string;
};

export async function loginMembers(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  if (!getMembersPassword()) {
    return {
      error:
        "Accès non configuré : définissez MEMBERS_PASSWORD (ou l’alias ESPACE_MEMBRES_PASSWORD).",
    };
  }

  const password = String(formData.get("password") ?? "");
  if (!verifyMembersPassword(password)) {
    return { error: "Mot de passe incorrect." };
  }

  await setMembersSession();
  redirect("/espace-membres");
}

export async function logoutMembers(): Promise<void> {
  await clearMembersSession();
  redirect("/espace-membres");
}
