// Função para converter valores monetários em número
export function parseMoney(value: any): number {
  if (!value) return 0;
  return Number(String(value).replace(/\./g, "").replace(",", "."));
}