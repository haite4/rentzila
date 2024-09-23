import {fakerEN_US ,Faker, uk } from "@faker-js/faker";

export class RandomValue {
  public faker: Faker;
  constructor() {
    this.faker = new Faker({
      locale: uk,
    });
  }

  generatePhoneNumber(): string {
    return this.faker.phone.number({ style: "international" });
  }

  generateIncorrectPhoneNumber(): string {
    const phoneNumber = this.generatePhoneNumber();
    const randomChoice = Math.random() < 0.5;

    if (randomChoice) {
      return phoneNumber.slice(0, -2);
    } else {
      const randomDigits = Array.from({ length: 3 }, () =>
        Math.floor(Math.random() * 11)
      ).join("");
      return phoneNumber + randomDigits;
    }
  }

  randomName(){
    return this.faker.person.firstName()
  }

  randomWord(){
    return fakerEN_US.lorem.word({length: {min: 5, max: 9}})
  }

  generateStringWithLength(length: number){
    return fakerEN_US.string.alphanumeric(length)
  }
}
