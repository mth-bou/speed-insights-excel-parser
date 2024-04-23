import {Generator} from "../interfaces/Generator";
import {stringify} from "csv-stringify";
import {transform, Handler} from "stream-transform";
import {parse} from "csv-parse";
import fs from "fs";


export class Csv {

    generateCsv(data: object[], headers: string[] = [], options: {}): Promise<string> {
        return new Promise((resolve, reject) => {
            stringify(data, {header: true, columns: headers, ...options}, (err, output) => {
                if (err) reject(err);
                else resolve(output);
            });
        });
    }

    transformData(data: object[], transformFunction: Handler<object, object>): object[] {
        let results: any[] = [];
        const transformer = transform(transformFunction);

        transformer.on("readable", () => {
            let row;
            while (row = transformer.read()) {
                results.push(row);
            }
        });

        data.forEach(d => transformer.write(d));
        transformer.end();
        return results;
    }

    parseFromCsv(csvData: string, options: {}): Promise<object[]> {
        return new Promise((resolve, reject) => {
            parse(csvData, options, (err, records) => {
                if (err) reject(err);
                else resolve(records);
            });
        });
    }

}
