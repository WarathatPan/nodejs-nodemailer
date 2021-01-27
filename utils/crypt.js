const crypto = require('crypto');

require('dotenv').config();

const algorithm = 'aes-256-ctr';
const password = process.env.CRYPTOKEY || 'secretPassword';

/**
 * 
 * @param text text
 * @return crypted { crypted: String } 
 * @usage encrypt(text)
 */
function encrypt(text) {
    if (!text) {
        throw new Error(`text must be provided`)
    }

    const cipher = crypto.createCipher(algorithm, password);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');

    return crypted;
}

/**
 * 
 * @param text text
 * @return dec { dec: String } 
 * @usage decrypt(text)
 */
function decrypt(text) {
    if (!text) {
        throw new Error(`text must be provided`)
    }

    const decipher = crypto.createDecipher(algorithm, password);
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    
    return dec;
}

exports.encrypt = encrypt;
exports.decrypt = decrypt;
