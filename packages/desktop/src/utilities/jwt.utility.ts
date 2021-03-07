import jwt from "jsonwebtoken";
import {nanoid} from "nanoid";
import { serverConfig } from "./configuration.utility";

class JwtUtility {
    async createClientToken(clientUuid: string): Promise<string>
    {
        const secret = await serverConfig.get(`jwt.${clientUuid}`, nanoid());
        return jwt.sign({clientUuid}, secret);
    }

    async vanidateToken(jwtToken: string): Promise<void>
    {
        const payload: any = jwt.decode(jwtToken);
        const secret = await serverConfig.get(`jwt.${payload.clientUuid}`);
        if (secret === null) {
            throw new Error(`Unknown client uuid in JWT payload ${payload.clientUuid}`);
        }

        jwt.verify(jwtToken, secret);
    }
}

const jwtUtility = new JwtUtility();
export default jwtUtility;