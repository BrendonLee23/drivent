import { PrismaClient } from '@prisma/client';

export let prisma: PrismaClient;
export function connectDb(): void {
<<<<<<< HEAD
  if (prisma) {
    return;
  }

=======
>>>>>>> ccb830af41f1e46b91cbca8bba2655415a1ac3b1
  prisma = new PrismaClient();
}

export async function disconnectDB(): Promise<void> {
  await prisma?.$disconnect();
}
