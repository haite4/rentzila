import { APIRequestContext } from "@playwright/test";
import admin_creds from "../data/admin_creds.json"

let adminAccessToken: any = null;
let feedback: any;

export class Helper {
  constructor(private request: APIRequestContext) {
    this.request = request;
  }

  async createJwtToken() {
    if (adminAccessToken === null) {
      await this.request
        .post("https://dev.rentzila.com.ua/api/auth/jwt/create/", {
          data: {
            email: admin_creds.email,
            password: admin_creds.password,
          },
        })
        .then(async (response) => {
          adminAccessToken = (await response.json()).access;
        });
    }
    return adminAccessToken;
  }

  async getListOfFeedback() {
    const accessToken = await this.createJwtToken();
    await this.request
      .get("https://dev.rentzila.com.ua/api/backcall/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(async (response) => {
        feedback = await response.json();
      });

    return feedback;
  }

  isPhoneNumbePresent(feedbackList: any[], phoneNumber: string): boolean {
    return feedbackList.some((feedback) => feedback.phone === phoneNumber);
  }
}
