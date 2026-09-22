import { NextResponse } from "next/server";

const WEBMAIL_URL = "https://mail.immermessen.com:2096";

/**
 * Keeps the pre-migration webmail bookmark working without proxying mail
 * traffic through the AWS application server.
 */
export function GET() {
  return NextResponse.redirect(WEBMAIL_URL, 308);
}
