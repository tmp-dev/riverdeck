import { DEFAULT_CONNECTION_STRING } from "@riverdeck/common/src";
import { deviceConfig, serverConfig } from "./configuration.utility";
import { hostname } from 'os';
import { FastifyReply, FastifyRequest } from "fastify";
import jwtUtility from "./jwt.utility";

export const pingFn = async () => ({
    'connection-string': await serverConfig.get('connection-string', DEFAULT_CONNECTION_STRING),
    'device-name': await deviceConfig.get('name', hostname())
});

export const authenticateFn = async (request: FastifyRequest, response: FastifyReply) => {
    const { body } = request;
    const data: any = body;
    const { clientSecret, clientUuid } = data;
    const serverSecret = await serverConfig.get(`secrets.${clientUuid}`);
    if (clientSecret !== serverSecret) {
        return response.code(401);
    }

    return {
        token: await jwtUtility.createClientToken(clientUuid)
    }
}

export const validateJwt = async (request: FastifyRequest, response: FastifyReply) => {
    const {authorization} = request.headers;
    if (authorization) {
        await jwtUtility.vanidateToken(authorization);
    } else {
        response.code(401);
        throw new Error('Missing \'authorization\' header');
    }
}