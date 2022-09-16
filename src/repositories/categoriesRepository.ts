import prisma from "../db/prisma ";

export async function getCategoryById(id: number) {
  return await prisma.categories.findUnique({
    where: {
      id,
    },
  });
}
