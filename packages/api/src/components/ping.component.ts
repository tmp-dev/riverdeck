import { FastifyReply, FastifyRequest } from 'fastify';
import { serverConfig, deviceConfig, DEFAULT_CONNECTION_STRING } from '@riverdeck/common';
import { hostname } from 'os';

export default async function (request: FastifyRequest, reply: FastifyReply) {
  return {
    'connection-string': await serverConfig.ensure('connection-string', DEFAULT_CONNECTION_STRING),
    'device-name': await deviceConfig.ensure('name', hostname())
  };
}
