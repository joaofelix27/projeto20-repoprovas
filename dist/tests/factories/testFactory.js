"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testFactory = void 0;
const faker_1 = require("@faker-js/faker");
function testFactory() {
    const test = {
        name: faker_1.faker.lorem.word(5),
        pdfUrl: faker_1.faker.internet.url(),
        categoryId: Number(faker_1.faker.finance.amount(1000000, 20000000, 0)),
        teacherDisciplineId: Number(faker_1.faker.finance.amount(1000000, 20000000, 0)),
    };
    return test;
}
exports.testFactory = testFactory;
