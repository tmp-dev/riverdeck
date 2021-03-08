import { serverConfig } from '@riverdeck/common';
import { nanoid } from 'nanoid';
import jwt from 'jsonwebtoken';

class JwtToken {
  async createToken(clientUuid: string): Promise<string> {
    const secret = await serverConfig.ensure(`jwt.${clientUuid}`, nanoid());
    return jwt.sign({ clientUuid }, secret);
  }
  async validateToken(jwtToken: string): Promise<void> {
    const payload: any = jwt.decode(jwtToken);
    const { clientUuid } = payload;
    const secret = await serverConfig.get(`jwt.${clientUuid}`);
    if (!secret) {
      throw new Error(`Unknown client uuid in JWT payload: ${clientUuid}`);
    }

    jwt.verify(jwtToken, secret);
  }
}

export default new JwtToken();
