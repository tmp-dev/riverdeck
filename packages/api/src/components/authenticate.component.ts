import { FastifyReply, FastifyRequest } from 'fastify';
import { serverConfig } from '@riverdeck/common';
import jwtToken from '../jwt.token';

export default async function (request: FastifyRequest, reply: FastifyReply) {
  const { body } = request;
  const data: any = body;
  const { clientSecret, clientUuid } = data;
  const serverSecret = await serverConfig.get(`secrets.${clientUuid}`);
  if (clientSecret !== serverSecret) {
    return reply.code(401);
  }

  return {
    token: await jwtToken.createToken(clientUuid)
  };
}
