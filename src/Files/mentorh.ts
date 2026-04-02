import * as XLSX from 'xlsx';
import { parseMatricula, parseMoneyMentor } from '../utils/parseMoney';

//CAMINHO DO ARQUIVO
const workFileMentorh = XLSX.readFile("/home/gguife/Downloads/mentorh.csv");

//SELECIONANDO NOME DA ABA DO MENTOR
const sheetNameMentorh = workFileMentorh.SheetNames[0];
if(!sheetNameMentorh) {
  throw new Error("Nenhuma aba encontrada na planilha mentorh!");
}

//GET ABA UNICA
const sheetMentorh = workFileMentorh.Sheets[sheetNameMentorh];
if(!sheetMentorh) {
  throw new Error("Nenhuma aba encontrada na planilha mentorh!");
}

//CONVERTENDO PARA JSON
const mentorh = XLSX.utils.sheet_to_json(sheetMentorh);


//NORMALIZANDO DADOS
const normalizedDataMentorh = mentorh.map((item: any) => ({
  fator: Number(item["Fator"]),
  matricula: String(item["Matricula"]).trim(),
  nome: String(item["Nome"]).trim(),
  valor: parseMoneyMentor(item["Valor"])
}));


//FILTRANDO PELO FATOR
const mentorFatorFilter = normalizedDataMentorh.filter( item => item.fator >=0 && item.fator <= 9);

// console.log("Tamanho dados planilha mentor: " + mentorh.length);
// console.log("Tamanho dados planilha mentor filtrada:" + mentorFatorFilter.length)


// Logica do power query
export const mentor = Object.values(
  mentorFatorFilter.reduce((acc: any, item: any) => {
    const key = item.matricula;

    if(!acc[key]) {
      acc[key] = {
        matricula: item.matricula,
        nome: item.nome,
        valor: 0
      }
    }

    acc[key].valor += item.valor; 

    return acc;
  }, {})
);