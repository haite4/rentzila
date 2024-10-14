import { faker } from "@faker-js/faker";

export class RandomValue {
  generateIncorrectPhoneNumber() {
    return faker.phone.number({ style: "international" });
  }
  randomName() {
    return faker.person.firstName();
  }
}
