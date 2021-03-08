import { FastifyReply, FastifyRequest } from 'fastify';
import jwtToken from '../jwt.token';

export default async function (request: FastifyRequest, reply: FastifyReply) {
  const { authorization } = request.headers;
  if (authorization) {
    await jwtToken.validateToken(authorization);
  } else {
    reply.code(401);
    throw new Error("Missing 'authorization' header");
  }
}
