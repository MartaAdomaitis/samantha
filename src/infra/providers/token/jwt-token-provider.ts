import jwt from "jsonwebtoken";
import { env } from "../../config/env";
import { IJwtProvider } from "../../../application/providers/i-jwt-provider";

export default class JwtProvider implements IJwtProvider{
    public async create(value: string): Promise<string>{
    const token = jwt.sign({ userId: value }, env.JWT_SECRET, { expiresIn: "1h" });
    return token
    }
    public async verify(value: string): Promise<any>{
        try {
        const tokenVerified = jwt.verify(value, env.JWT_SECRET);
        return tokenVerified
    } catch(error)
        {
            return(`Invalid token. Error message: ${error}`)
        }

    }
}
