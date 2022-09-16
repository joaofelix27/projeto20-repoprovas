import prisma from "../db/prisma ";

export async function getDisciplineById(id: number) {
  return await prisma.disciplines.findUnique({
    where: {
      id,
    },
  });
}
