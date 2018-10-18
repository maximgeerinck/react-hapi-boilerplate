import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const encrypt = (
    algorithm: string,
    password: string,
    text: string
): string => {
    var cipher = crypto.createCipher(algorithm, password);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
};

export const decrypt = (
    algorithm: string,
    password: string,
    text: string
): string => {
    var decipher = crypto.createDecipher(algorithm, password);
    var dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};

export const genSalt = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
            if (err) return reject(err);
            return resolve(salt);
        });
    });
};

export const hashPassword = (
    password: string,
    salt: string
): Promise<string> => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) return reject(err);
            return resolve(hash);
        });
    });
};
export const comparePassword = (
    password: string,
    toCompareWith: string
): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, toCompareWith, (err, res) => {
            if (err) return reject(err);
            return resolve(res);
        });
    });
};

export const genToken = (): Promise<string> => {
    return genSalt();
};
