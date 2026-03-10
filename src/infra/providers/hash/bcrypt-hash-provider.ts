import bcrypt from "bcrypt";
import { env } from "../../../infra/config/env";
import { IHashProvider } from "../../../application/providers/i-hash-provider";

export default class BcryptHashProvider implements IHashProvider {
    public async hash(value: string): Promise<string>{
    const hashedPassword = await bcrypt.hash(value, env.BCRYPT_SALT_ROUNDS);

    return hashedPassword;
}

    public async compare(value: string, hashedValue: string): Promise<boolean>{
    const isPasswordValid = await bcrypt.compare(value, hashedValue);

    return isPasswordValid;
}
}