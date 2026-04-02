import { mentor } from "./mentorh";
import { diras } from "./diras";
import { moneyFormat } from "../utils/parseMoney";


type MentorData = {
  matricula: string,
  nome: string,
  valor: number
}

type DirasData = {
  matricula: string, 
  nome: string,
  valor: number,
  situacao: string
}



//MENTOR LOOKUP POR MATRICULA 
const mentorMap = new Map<string, MentorData>(
  (mentor as MentorData[]).map(item => [item.matricula, item]) 
);

//REALIZANDO BATIMENTO DIRAS COM MENTOR PARA SOMAR DIFERENCA
const batimentoRaw = (diras as DirasData[]).map(itemDiras => {
  const itemMentor = mentorMap.get(itemDiras.matricula);

  return {
    "Matricula": itemDiras.matricula,
    "Nome": itemDiras.nome,
    "Valor diras": itemDiras.valor,
    "Valor mentor": itemMentor?.valor,
    "Diferenca": itemDiras.valor - (itemMentor?.valor ?? 0),
    "Status": itemMentor ? "Encontrado" : "Nao encontrado no mentor"
  }
}) 


//FILTRANDO !0
export const batimento = batimentoRaw
  .filter(item => item.Diferenca !== 0) // filtra corretamente
  .map(item => ({
    Matricula: String(item.Matricula),
    Nome: String(item.Nome).trim(),
    valor: moneyFormat(item.Diferenca), // só formata aqui
    Status: String(item.Status)
}));