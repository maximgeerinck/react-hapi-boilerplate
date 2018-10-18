import * as nodemailer from "nodemailer";
import { SendMailOptions, SentMessageInfo, Transporter } from "nodemailer";
import * as path from "path";
import config from "../config";
import * as FileHelper from "./FileHelper";

const transporter: Transporter = nodemailer.createTransport({
    host: "in-v3.mailjet.com",
    port: config.mail.port,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: config.mail.username,
        pass: config.mail.password
    }
});

export const sendMail = (
    toEmails: string[],
    subject: string,
    html: string,
    fromEmail: string = config.mail.username,
    from: string = "IcoTracker"
): Promise<SentMessageInfo> => {
    const mailOptions: SendMailOptions = {
        from: `"${from}" <${fromEmail}>`,
        to: toEmails.join(","),
        subject: "🎨 " + subject,
        html
    };

    return new Promise((resolve, reject) => {
        transporter
            .sendMail(mailOptions)
            .then((info: any) => resolve(info))
            .catch((error: any) => reject(error));
    });
};

export const getEmailTemplate = async (templateName: string): Promise<any> => {
    const p = path.join(__dirname, "../..", "mails", `${templateName}.html`);
    return FileHelper.getFileContent(p);
};
