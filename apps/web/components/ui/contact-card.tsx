"use client";

import { useState, type FormEvent } from "react";

type ContactCardProps = {
  heading: string;
  bodyHtml?: string;
  submitLabel?: string;
  formId?: string;
  locale?: "pt-BR" | "en" | "es";
};

type SubmissionStatus = "idle" | "sending" | "ok" | "error";

const fieldLabels: Record<"pt-BR" | "en" | "es", { name: string; email: string; company: string; role: string; message: string; sending: string; error: string }> = {
  "pt-BR": {
    name: "Nome",
    email: "E-mail",
    company: "Empresa",
    role: "Cargo",
    message: "Mensagem (opcional)",
    sending: "Enviando...",
    error: "Nao foi possivel enviar agora.",
  },
  en: {
    name: "Name",
    email: "Email",
    company: "Company",
    role: "Role",
    message: "Message (optional)",
    sending: "Sending...",
    error: "We could not send your message.",
  },
  es: {
    name: "Nombre",
    email: "Correo",
    company: "Empresa",
    role: "Cargo",
    message: "Mensaje (opcional)",
    sending: "Enviando...",
    error: "No fue posible enviar ahora.",
  },
};

export function ContactCard({
  heading,
  bodyHtml,
  submitLabel = "enviar",
  formId = "contact-title",
  locale = "pt-BR",
}: ContactCardProps) {
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [message, setMessage] = useState<string>("");
  const labels = fieldLabels[locale];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      company: String(formData.get("company") ?? "").trim() || undefined,
      role: String(formData.get("role") ?? "").trim() || undefined,
      message: String(formData.get("message") ?? "").trim() || undefined,
      locale,
      _hp: String(formData.get("_hp") ?? ""),
    };

    setStatus("sending");
    setMessage(labels.sending);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json().catch(() => ({}))) as { message?: string };

      if (!response.ok) {
        setStatus("error");
        setMessage(data.message ?? labels.error);
        return;
      }

      setStatus("ok");
      setMessage(data.message ?? "");
      form.reset();
    } catch {
      setStatus("error");
      setMessage(labels.error);
    }
  }

  return (
    <section aria-labelledby={formId} className="contact-card-wrap" id="contato">
      <div className="contact-card">
        <div className="contact-card__grid">
          <div>
            <h2 id={formId}>{heading}</h2>
            {bodyHtml ? <div dangerouslySetInnerHTML={{ __html: bodyHtml }} /> : null}
          </div>
          <form className="contact-form" data-form noValidate onSubmit={handleSubmit}>
            <div className="contact-form__field">
              <label htmlFor={`${formId}-name`}>{labels.name}</label>
              <input id={`${formId}-name`} name="name" required type="text" />
            </div>
            <div className="contact-form__field">
              <label htmlFor={`${formId}-email`}>{labels.email}</label>
              <input id={`${formId}-email`} name="email" required type="email" />
            </div>
            <div className="contact-form__field">
              <label htmlFor={`${formId}-company`}>{labels.company}</label>
              <input id={`${formId}-company`} name="company" type="text" />
            </div>
            <div className="contact-form__field">
              <label htmlFor={`${formId}-role`}>{labels.role}</label>
              <input id={`${formId}-role`} name="role" type="text" />
            </div>
            <label aria-hidden="true" className="contact-form__honeypot">
              <input autoComplete="off" name="_hp" tabIndex={-1} type="text" />
            </label>
            <div
              aria-live="polite"
              className={`form-msg form-msg--${status}`}
              role={status === "error" ? "alert" : undefined}
            >
              {message}
            </div>
            <div className="contact-form__submit">
              <button disabled={status === "sending"} type="submit">
                <span>{submitLabel}</span> ›
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
