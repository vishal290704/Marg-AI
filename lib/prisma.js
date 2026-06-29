import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

export const db =
  globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

// Development ke time Next.js mein Hot Reload hota hai, jisse har baar file save karne par code 
// dubara execute hota hai. Agar har baar new PrismaClient() create hoga, to multiple database 
// connections ban jayenge aur Prisma warnings dene lagega. Isliye hum globalThis.prisma use karte 
// hain, jo pehli baar ek hi PrismaClient banata hai aur baad mein usi instance ko reuse karta hai. 
// Isse development mein sirf ek hi database connection maintain rehta hai aur unnecessary connections
//  se bachav hota hai.