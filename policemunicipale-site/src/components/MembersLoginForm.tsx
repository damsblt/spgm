"use client";

import { useActionState } from "react";
import {
  loginMembers,
  type LoginState,
} from "@/app/espace-membres/actions";

const initial: LoginState = {};

export function MembersLoginForm() {
  const [state, action, pending] = useActionState(loginMembers, initial);

  return (
    <form className="members-form" action={action}>
      <label className="members-form__label" htmlFor="members-password">
        Mot de passe
      </label>
      <input
        id="members-password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        className="members-form__input"
        disabled={pending}
      />
      {state.error ? (
        <p className="members-form__error" role="alert">
          {state.error}
        </p>
      ) : null}
      <button type="submit" className="btn btn--solid" disabled={pending}>
        {pending ? "Vérification…" : "Accéder"}
      </button>
    </form>
  );
}
