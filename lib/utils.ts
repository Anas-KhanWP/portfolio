export function renderHTML(text: string | null, fallback: string) {
  return { __html: text || fallback };
}
