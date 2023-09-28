export function postJson(url: string | URL, body: unknown) {
  return fetch(url, {
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });
}
