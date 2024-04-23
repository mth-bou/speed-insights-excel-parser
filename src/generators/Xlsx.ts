import * as xlsx from 'xlsx';
import {Generator} from "../interfaces/Generator";

export class Xlsx implements Generator {

    generate(data: any, filePath: string) {
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Results");
        xlsx.writeFile(wb, filePath);
    }

}
