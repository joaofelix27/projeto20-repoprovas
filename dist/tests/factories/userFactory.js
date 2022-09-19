"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userFactory = void 0;
const faker_1 = require("@faker-js/faker");
function userFactory() {
    const password = faker_1.faker.internet.password();
    const user = {
        email: faker_1.faker.internet.email(),
        password,
        confirmedPassword: password
    };
    return user;
}
exports.userFactory = userFactory;
;
