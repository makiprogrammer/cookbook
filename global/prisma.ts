import { PrismaClient } from "@prisma/client";

// Implemented according to the Prisma NextJS best practices:
// https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices

const createClient = () => new PrismaClient();

type PrismaClientSingleton = ReturnType<typeof createClient>;

const globalForPrisma = globalThis as {
  prisma?: PrismaClientSingleton;
};

globalForPrisma.prisma = globalForPrisma.prisma ?? createClient();

export const prisma = globalForPrisma.prisma;
