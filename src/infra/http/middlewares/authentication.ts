import { FastifyRequest, FastifyReply } from "fastify";
import JwtProvider from "../../providers/token/jwt-token-provider";

export default async function AuthenticationMiddleware(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return reply.status(401).send({ error: "Token is required" });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    await new JwtProvider().verify(token);
  } catch (error) {
    return reply.status(401).send({ error: "Invalid token" });
  }
}