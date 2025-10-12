import { FastifyRequest, FastifyReply } from "fastify";
import { env } from "../../config/env";
import jwt from "jsonwebtoken";

export default async function AuthenticationMiddleware(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return reply.status(401).send({ error: "Token is required" });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    jwt.verify(token, env.JWT_SECRET);
  } catch (error) {
    return reply.status(401).send({ error: "Invalid token" });
  }
}