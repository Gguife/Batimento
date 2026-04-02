import { batimento } from "./Files/batimento";
import { diras } from "./Files/diras";
import { mentor } from "./Files/mentorh";
import * as XLXS from "xlsx";


//EXPORT CSV
const worksheet = XLXS.utils.json_to_sheet(batimento);
const workbook = XLXS.utils.book_new();
XLXS.utils.book_append_sheet(workbook, worksheet, 'Batimento');

XLXS.writeFile(workbook, "/home/gguife/Downloads/batimento.csv", {bookType: 'csv'});  

console.log(`✅ Arquivo exportado! Total de registros: ${batimento.length}`);


// console.log(batimento);
// console.log(diras);
// console.log(mentor)