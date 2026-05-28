import { z } from "zod";

const noAngleBrackets = (val: string) => !/[<>]/.test(val);

export const contactSubmissionSchema = z.object({
  name: z.string().trim().min(1).max(120).refine(noAngleBrackets, "invalid characters"),
  email: z.email().max(200),
  company: z.string().trim().max(160).refine(noAngleBrackets, "invalid characters").optional().or(z.literal("")),
  role: z.string().trim().max(120).refine(noAngleBrackets, "invalid characters").optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
  locale: z.enum(["pt-BR", "en", "es"]).default("pt-BR"),
  _hp: z.string().max(0).optional().or(z.literal("")),
});

export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;

export const localizedContactMessages = {
  "pt-BR": {
    ok: "Recebemos sua mensagem - obrigado!",
    error: "Nao foi possivel enviar agora. Tente novamente em alguns instantes.",
    invalid: "Verifique os campos do formulario.",
    rateLimit: "Muitas tentativas. Aguarde um minuto e tente novamente.",
  },
  en: {
    ok: "Message received - thank you!",
    error: "We could not send your message. Please try again shortly.",
    invalid: "Please check the form fields.",
    rateLimit: "Too many attempts. Please wait a minute and try again.",
  },
  es: {
    ok: "Mensaje recibido - gracias!",
    error: "No fue posible enviar ahora. Intente nuevamente en unos instantes.",
    invalid: "Revise los campos del formulario.",
    rateLimit: "Demasiados intentos. Espere un minuto y vuelva a intentar.",
  },
} as const;

export type LocalizedContactMessage = keyof (typeof localizedContactMessages)["pt-BR"];
