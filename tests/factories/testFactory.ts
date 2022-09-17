import { faker } from "@faker-js/faker";

export function testFactory() {
  const test = {
    name:faker.lorem.word(5),
    pdfUrl: faker.internet.url(),
    categoryId: Number(faker.finance.amount(1000000,20000000,0)),
    teacherDisciplineId: Number(faker.finance.amount(1000000,20000000,0)),
  };

  return test;
}
