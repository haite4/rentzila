import { faker as faker_uk } from "@faker-js/faker/locale/uk"
import { faker } from "@faker-js/faker"

export class RandomValue { 

  generatePhoneNumber(): string {
    return faker_uk.phone.number({ style: "international"});
  }

  generateIncorrectPhoneNumber(): string {
    const phoneNumber = this.generatePhoneNumber();

    if (faker.datatype.boolean()) {
      return phoneNumber.slice(0, -2);
    } else {
      const randomDigits = Array.from({ length: 3 }, () =>
        Math.floor(Math.random() * 11)
      ).join("");
      return phoneNumber + randomDigits;
    }
  }

  randomName(){
    return faker.person.firstName()
  }
}
