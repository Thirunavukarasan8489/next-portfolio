import { decrypt } from "@/lib/server-encryptdecrypt";

export function encryptedText(data, status = 200) {
  return new Response(data, {
    status,
    headers: { "Content-Type": "text/plain" },
  });
}

export function textResponse(message, status = 200) {
  return new Response(message, {
    status,
    headers: { "Content-Type": "text/plain" },
  });
}

export async function readEncryptedJson(request, key = "data") {
  const body = await request.json();
  const encrypted = body?.[key];
  const decrypted = decrypt(encrypted);
  return JSON.parse(decrypted);
}

export function getIpAddress(request) {
  return (
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    ""
  );
}
