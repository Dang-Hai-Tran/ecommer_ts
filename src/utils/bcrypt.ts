import crypto from "crypto";

class Bcrytp {
    private static SALT_ROUNDS = 10;

    public static async hash(password: string): Promise<string> {
        const salt = await Bcrytp.generateSalt();
        const hash = await Bcrytp.hashWithSalt(password, salt);
        return `${salt}$${hash}`;
    }

    public static async compare(password: string, hashedPassword: string): Promise<boolean> {
        const [salt, hash] = hashedPassword.split("$");
        const computedHash = await Bcrytp.hashWithSalt(password, salt);
        return hash === computedHash;
    }

    private static async generateSalt(): Promise<string> {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, salt) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(salt.toString("base64"));
                }
            });
        });
    }

    private static async hashWithSalt(password: string, salt: string): Promise<string> {
        return new Promise((resolve, reject) => {
            crypto.pbkdf2(password, salt, Bcrytp.SALT_ROUNDS, 64, "sha512", (err, key) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(key.toString("base64"));
                }
            });
        });
    }
}

export default Bcrytp;
