import { faker } from "@faker-js/faker";

export class RandomValue {
  generateIncorrectPhoneNumber() {
    return faker.phone.number({ style: "international" });
  }
  randomName() {
    return faker.person.firstName();
  }

  validPhoneNumberOptions() {
    const validOptionsList: string[] = [];
    const phoneNumber = process.env.ADMIN_PHONE_NUMBER ?? "";
    const phoneNumberWithoutPlus = phoneNumber.replace(/^\+/, "");
    const cleanedPhoneNumber = phoneNumberWithoutPlus.replace(/^38/, "");
    validOptionsList.push(phoneNumber);
    validOptionsList.push(phoneNumberWithoutPlus);
    validOptionsList.push(cleanedPhoneNumber);
    return validOptionsList;
  }

  invalidPhoneNumberOptions() {
    const invalidOptionsList: string[] = [];
    const countryCodes = ["+1", "+44", "+33", "+49", "+61", "+105"];
    const phoneNumber = process.env.ADMIN_PHONE_NUMBER ?? "";
    const phoneNumberWithoutFirstDigits = phoneNumber.replace(/^\+38/, "");
    const phoneNumberWithoutPrefix = phoneNumber.replace(/^\+380/, "");
    const phoneNumberWithoutLastNumber = phoneNumberWithoutPrefix.slice(0, -1);
    const randomNumber = Math.floor(Math.random() * 10);
    const areaCode = phoneNumberWithoutPrefix.slice(0, 2);
    const firstPart = phoneNumberWithoutPrefix.slice(2, 5);
    const secondPart = phoneNumberWithoutPrefix.slice(5, 9);
    const numberWithDash = `+380-${areaCode}-${firstPart}-${secondPart}`;
    const numberWithSpace = `+380 ${areaCode} ${firstPart} ${secondPart}`;
    const numberWithBraces = `+380(${areaCode})${firstPart}${secondPart}`;
    const numberWithouPrefixWithBraces = ` (${areaCode})${firstPart}${secondPart}`;
    const phoneNumberWithRedundantDigit = `${phoneNumberWithoutFirstDigits}${randomNumber}`;
    const randomCountryCode =
      countryCodes[Math.floor(Math.random() * countryCodes.length)];
    const phoneNumberWithDifferentCountryCode = `${randomCountryCode}${areaCode}${firstPart}${secondPart}`;
    const phoneNumberWithoutFirstDigit = `+${phoneNumberWithoutFirstDigits}`;

    invalidOptionsList.push(
      numberWithDash,
      phoneNumberWithoutLastNumber,
      numberWithSpace,
      numberWithBraces,
      numberWithouPrefixWithBraces,
      phoneNumberWithRedundantDigit,
      phoneNumberWithDifferentCountryCode,
      phoneNumberWithoutFirstDigit
    );
    return invalidOptionsList;
  }

  invalidEmailOptions() {
    const invalidEmailOptionsList: string[] = [];
    const validEmail = process.env.ADMIN_EMAIL ?? "";
    const firstThreeChars = validEmail.slice(0, 3);
    const remainingPart = validEmail.slice(3);
    const emailWithSpace = `${firstThreeChars} ${remainingPart}`;
    const cyrilicText = "еуіегіуккутеяшдф";
    const emailWithoutAt = validEmail.replace("@", "");
    const emailWithoutDot = validEmail.replace(".", "");
    const emailWithoutCom = validEmail.replace(/\.net$/, "");
    const emailWithoutGmail = validEmail.replace(/ukr/, "");
    const emailWithoutDomain = validEmail.replace(/@ukr\.net$/, "");
    const emailWithExtraAt = validEmail.replace(/@/, "@@");
    invalidEmailOptionsList.push(
      emailWithSpace,
      cyrilicText,
      emailWithoutAt,
      emailWithoutDot,
      emailWithoutCom,
      emailWithoutGmail,
      emailWithoutDomain,
      emailWithExtraAt
    );
    return invalidEmailOptionsList;
  }

  invalidPasswordOptions() {
    const invalidPasswordList: string[] = [];
    const validPassword = process.env.ADMIN_PASSWORD ?? "";
    const passwordWithSpaceAtTheEnd = `${validPassword} `;
    const passwordWithSpaceAtTheStart = ` ${validPassword}`;
    const passwordInLowerCase = validPassword.toLowerCase();
    const passwordInUpperCase = validPassword.toUpperCase();
    const passwordInCyrylic = "Йцукен123+";

    invalidPasswordList.push(
      passwordWithSpaceAtTheEnd,
      passwordWithSpaceAtTheStart,
      passwordInLowerCase,
      passwordInUpperCase,
      passwordInCyrylic
    );
    return invalidPasswordList;
  }

  generateRandomPassword(length: number) {
    const lowercaseCharset = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const digits = "0123456789";
    let password =
      uppercaseCharset[Math.floor(Math.random() * uppercaseCharset.length)] +
      digits[Math.floor(Math.random() * digits.length)];

    while (password.length < length) {
      password +=
        lowercaseCharset[Math.floor(Math.random() * lowercaseCharset.length)];
    }

    password = password
      .split("")
      .sort(() => 0.5 - Math.random())
      .join("");

    return password;
  }
}
