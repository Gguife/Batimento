import * as XLSX from 'xlsx';
import { parseMoney } from '../utils/parseMoney';


//CONDICAO PARA CADA PLANILHA
const planilhas = [
  {name: "Diras A-E", path: "/home/gguife/Downloads/dirasAE.csv"},
  {name: "Diras F-L", path: "/home/gguife/Downloads/dirasFL.csv"},
  {name: "Diras M-Q", path: "/home/gguife/Downloads/dirasMQ.csv"},
  {name: "Diras R-Z", path: "/home/gguife/Downloads/dirasRZ.csv"}
];


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


  const data = XLSX.utils.sheet_to_json(sheet, {defval: ""});

  return data
    .map((item: any) => ({
      nome: String(item["SERVIDOR / DEPENDENTE"]).trim(),
      matricula: String(item["MATRÍCULA"]),
      valor: parseMoney(item["somatório do grupo familiar"]),
      situacao: String(item["SITUAÇÃO FUNCIONAL"]).toLocaleLowerCase()     
    }))
    .filter(item => !item.situacao.includes("dependente")); //remove dependentes 
}


export const diras = planilhas.flatMap(item => dirasGrouped(item.path, item.name));