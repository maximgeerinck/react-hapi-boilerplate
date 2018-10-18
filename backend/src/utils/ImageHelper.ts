import * as fs from "fs";
import * as path from "path";
import * as request from "request";
import * as url from "url";
const gm = require("gm").subClass({ imageMagick: true });

const DEFAULT_EXTENSION = "jpg";

export const getExt = (image: string): string => {
    if (!image) {
        return DEFAULT_EXTENSION;
    }

    const parts = image.split(".");
    if (parts.length <= 1) {
        return DEFAULT_EXTENSION;
    }

    const ext = parts.slice(-1).join(".");

    return ext.length < 5 ? ext : DEFAULT_EXTENSION;
};

export const downloadImages = (images: any): void => {
    if (images.length === 0 || !images.path.startsWith("http") || !url.parse(images.path)) {
        return;
    }

    const image = images.pop();
    if (!image.path || image.path === undefined) {
        return downloadImages(images);
    }

    const ext = getExt(image.path);

    gm(request(image.path))
        .resize("50")
        .quality(80)
        .write(path.join(__dirname + "/../../public", `${image.name}.${ext}`), (err: any) => {
            downloadImages(images);
        });
};

export const resizeImage = (imageStream: any, imageSize: number = 50, quality: number = 80): any => {
    return gm(imageStream).resize(imageSize).quality(quality).stream();
};

export const isValidImage = async (imageStream: any): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        gm(imageStream).identify((err: any, data: any) => {
            return resolve(!err);
        });
    });
};

export const downloadImage = async (imagePath: string, imageName: string): Promise<any> => {
    if (!imagePath.startsWith("http") || !url.parse(imagePath)) {
        return;
    }

    try {
        const ext = getExt(imagePath);
        const writeStream = fs.createWriteStream(path.join(__dirname + "/../../public", `${imageName}.${ext}`));
        const writeStreamSmall = fs.createWriteStream(path.join(__dirname + "/../../public", `${imageName}_50.${ext}`));
        const req = request(imagePath).on("error", (err) => console.log(err));

        req.pipe(writeStream).on("error", (err) => console.log(err));

        return resizeImage(req).pipe(writeStreamSmall);

    } catch (ex) {
        console.log(ex);
        return;
    }

};
