/** Converts a FormData object into a regular JS object while keeping
 * the integrity of specified arrays. FormData contains key-value pairs,
 * but the keys can repeat. So we explicitly specify which fields should
 * be interpreted as arrays. */
export function formDataToObject(data: FormData, arrayFields?: string[]) {
  const obj: Record<string, unknown> = Object.fromEntries(data.entries());
  if (!arrayFields?.length) return obj;

  arrayFields.forEach((key) => {
    if (data.has(key)) obj[key] = data.getAll(key);
  });
  return obj;
}
