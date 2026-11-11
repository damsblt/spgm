"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  submitFormulaire,
  type FormSubmitState,
} from "@/app/formulaires/actions";
import type { FormDefinition } from "@/lib/formulaires";

const initial: FormSubmitState = {};

type Props = {
  definition: FormDefinition;
};

export function OnlineForm({ definition }: Props) {
  const action = submitFormulaire.bind(null, definition.slug);
  const [state, formAction, pending] = useActionState(action, initial);

  if (state.ok) {
    return (
      <div className="form-success" role="status">
        <h2>Demande envoyée</h2>
        <p>{state.message}</p>
        <p>
          <Link className="btn btn--solid" href="/formulaires">
            Retour aux formulaires
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form className="online-form" action={formAction} encType="multipart/form-data">
      <p className="online-form__intro">{definition.intro}</p>
      {definition.notice ? <p className="online-form__notice">{definition.notice}</p> : null}

      <div className="online-form__grid">
        {definition.fields.map((field) => {
          const id = `${definition.slug}-${field.name}`;
          const className = field.fullWidth
            ? "online-form__field online-form__field--full"
            : "online-form__field";

          return (
            <div key={field.name} className={className}>
              <label className="online-form__label" htmlFor={id}>
                {field.label}
                {field.required ? <span aria-hidden="true"> *</span> : null}
              </label>

              {field.type === "textarea" ? (
                <textarea
                  id={id}
                  name={field.name}
                  rows={field.rows ?? 4}
                  required={field.required}
                  className="online-form__input"
                  disabled={pending}
                  placeholder={field.placeholder}
                />
              ) : field.type === "file" ? (
                <>
                  <input
                    id={id}
                    name={field.name}
                    type="file"
                    accept={field.accept}
                    className="online-form__input online-form__input--file"
                    disabled={pending}
                  />
                  {field.hint ? <p className="online-form__hint">{field.hint}</p> : null}
                </>
              ) : (
                <input
                  id={id}
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  className="online-form__input"
                  disabled={pending}
                  placeholder={field.placeholder}
                  autoComplete={
                    field.type === "email"
                      ? "email"
                      : field.type === "tel"
                        ? "tel"
                        : undefined
                  }
                />
              )}
            </div>
          );
        })}
      </div>

      <label className="online-form__checkbox">
        <input
          type="checkbox"
          name="signature"
          value="oui"
          required
          disabled={pending}
        />
        <span>
          Je confirme l’exactitude des informations et appose ma signature
          électronique à cette demande. *
        </span>
      </label>

      {state.error ? (
        <p className="online-form__error" role="alert">
          {state.error}
        </p>
      ) : null}

      <div className="online-form__actions">
        <button type="submit" className="btn btn--solid" disabled={pending}>
          {pending ? "Envoi en cours…" : definition.submitLabel}
        </button>
        <Link className="btn btn--ghost-ink" href="/formulaires">
          Annuler
        </Link>
      </div>
    </form>
  );
}
