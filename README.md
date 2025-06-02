# Samantha

## How to use the project

1. Create an `.env` file using the keys and values from the `.env.test` file. Make sure to provide values for any keys that are empty.

## First time setup

Run the following commands in order:

```bash
# Install dependencies
npm i

# Generate Prisma client
npm run prisma:generate

# Create and start the database
docker-compose up -d

# Run database migrations
npm run migrate-up

# Start the development server
npm run dev
```

## Useful commands

```bash
# Start the development server
npm run dev

# Start database and server
npm run setup

# Install a new dependency
npm install ...

# Generate Prisma client (use only when needed)
npm run prisma:generate

# Open Prisma Studio to view/edit data
npm run prisma:studio
```

## Database

```bash
# Create and start database container
docker-compose up -d

# Run migrations
npm run migrate-up
```
