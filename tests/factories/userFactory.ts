import { faker } from '@faker-js/faker';


export function userFactory(){
    const password = faker.internet.password();
    const user ={
        email: faker.internet.email(),
        password,
        confirmedPassword: password
    }
    
    return  user
};