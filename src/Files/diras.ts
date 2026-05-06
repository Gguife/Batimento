import * as XLSX from 'xlsx';
import { parseMatricula, parseMoneyDiras } from '../utils/parseMoney';


//CONDICAO PARA CADA PLANILHA
const planilhas = [
  {name: "Diras A-E", path: "/home/gguife/Downloads/dirasAE.csv"},
  {name: "Diras F-L", path: "/home/gguife/Downloads/dirasFL.csv"},
  {name: "Diras M-Q", path: "/home/gguife/Downloads/dirasMQ.csv"},
  {name: "Diras R-Z", path: "/home/gguife/Downloads/dirasRZ.csv"}
];



//TRATANDO MATRICULA COMO STRING, JA QUE RECEBEMOS NUMBER
const getMatricula = (item: any) => {
  if (item["MATRÍCULA"]) return item["MATRÍCULA"];

  // fallback: procura em colunas quebradas
  const possible = Object.values(item).find(val =>
    typeof val === "number" && val.toString().length >= 6
  );

  return possible ?? null;
};


//PROCESSAR CADA ARQUIVO E RETORNAR DADOS FILTRADOS
const dirasGrouped = (filePath: string, fileName: string) => {
  const workfile = XLSX.readFile(filePath);
  const sheetName = workfile.SheetNames[0];
  
  if(!sheetName || workfile.SheetNames.length === 0) {
    throw new Error(`Nenhuma aba encontrada na planilha: ${fileName}`);
  }
  
  const sheet = workfile.Sheets[sheetName];

  if(!sheet) {
    throw new Error(`aba "${sheetName}" nao encontrada na planilha: ${fileName}`);    
  }


  const data = XLSX.utils.sheet_to_json(sheet, { defval: "" });


  return data
    .map((item: any) => {
      const matriculaRaw = getMatricula(item);

      return {
        nome: String(item["SERVIDOR / DEPENDENTE"]).trim(),
        matricula: matriculaRaw?.toString().trim() ?? null,
        valor: parseMoneyDiras(item["somatório do grupo familiar"]),
        situacao: String(item["SITUAÇÃO FUNCIONAL"]).toLowerCase()
      };
    })
    .filter(item => !item.situacao.includes("dependente")); //remove dependentes 
}


export const diras = planilhas.flatMap(item => dirasGrouped(item.path, item.name));