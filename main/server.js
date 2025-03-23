// import { createServer } from 'node:http'

// const server = createServer((request, response) => {
//     console.log('Server is running')
//     response.write('Server is up')
//     return response.end()
// })

// server.listen(3333)

import fastify from "fastify";

export const server = fastify();

server.get("/", (_request, response) => {
  return response.status(200).send("Server is ok!");
});

server.get("/users/:id", () => {
  return "Server is up";
});

server.post("/users", (request, response) => {
  const user = request.body;
  console.log(user);
  return response.status(201).send();
});

server.put("/users/:id", () => {
  return "Server is up";
});

server.delete("/users/:id", () => {
  return "Server is up";
});

server.listen({
  port: 3333,
});
