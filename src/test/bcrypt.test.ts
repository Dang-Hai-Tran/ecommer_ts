import Bcrytp from "../utils/bcrypt";

describe("Bcrytp", () => {
    describe("hash", () => {
        it("should hash a password", async () => {
            const password = "mypassword";
            const hashedPassword = await Bcrytp.hash(password);
            expect(hashedPassword).not.toEqual(password);
        });

        it("should generate a unique salt for each password", async () => {
            const password1 = "password1";
            const password2 = "password2";
            const hash1 = await Bcrytp.hash(password1);
            const hash2 = await Bcrytp.hash(password2);
            expect(hash1).not.toEqual(hash2);
        });
    });

    describe("compare", () => {
        it("should compare a password to a hashed password", async () => {
            const password = "mypassword";
            const hashedPassword = await Bcrytp.hash(password);
            const isMatch = await Bcrytp.compare(password, hashedPassword);
            expect(isMatch).toBe(true);
        });

        it("should return false for an incorrect password", async () => {
            const password = "mypassword";
            const hashedPassword = await Bcrytp.hash(password);
            const isMatch = await Bcrytp.compare("wrongpassword", hashedPassword);
            expect(isMatch).toBe(false);
        });
    });
});
