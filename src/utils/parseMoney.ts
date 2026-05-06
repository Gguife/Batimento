// Função para converter valores monetários em número
export function parseMoneyMentor(value: any): number {
  if (!value) return 0;

  return Number(String(value).replace(/\D/g, ""));
}


export function parseMoneyDiras(valor: string): number {
  return Number(
    valor
      .replace("R$", "")     // remove símbolo
      .replace(/\D/g, "")    // remove separador de milhar
  );
}

export function moneyFormat(valor: number): string {
  return (valor / 100).toFixed(2);
}

export function parseMatricula(value: string): number | null {
  if(value === null || value === undefined) return null;  

  const cleaned = String(value).replace(/\D/g, ""); // remove tudo que não é número

  if (!cleaned) return null;

  const num = Number(cleaned);

  return isNaN(num) ? null : num;

}