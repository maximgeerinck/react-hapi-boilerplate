import * as fs from "fs";
import * as path from "path";

export const getFileContent = (filePath: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
};
