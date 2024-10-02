import { APIRequestContext } from "@playwright/test";
import { Endpoints } from "../constants/enums_endpoints.constant";

interface Feedback {
  id: number;
  name: string;
  phone: string;
  created_date: string;
  closed_date: string | null;
  is_closed: boolean;
}

export class ApiHelper {
  private adminAccessToken: string | null = null;
  private userAccessToken: string | null = null;

  constructor(private request: APIRequestContext) {
    this.request = request;
  }

  private async getJwtToken(
    email: string | undefined,
    password: string | undefined,
    tokenCache: string | null
  ): Promise<string | null> {
    if (tokenCache) {
      return tokenCache;
    }

    const response = await this.request.post(
      `${process.env.BASE_URL}${Endpoints.API_AUTH_CREATE}`,
      {
        data: {
          email,
          password,
        },
      }
    );

    return (await response.json()).access;
  }

  private async createAdminJwtToken() {
    this.adminAccessToken = await this.getJwtToken(
      process.env.ADMIN_EMAIL,
      process.env.ADMIN_PASSWORD,
      this.adminAccessToken
    );
    return this.adminAccessToken;
  }

  private async createUserJwtToken() {
    this.userAccessToken = await this.getJwtToken(
      process.env.USER_EMAIL,
      process.env.USER_PASSWORD,
      this.userAccessToken
    );
    return this.userAccessToken;
  }

  async getListOfFeedback(phoneNumber: string) {
    if (!this.adminAccessToken) {
      await this.createAdminJwtToken();
    }

    const response = await this.request.get(
      `${process.env.BASE_URL}${Endpoints.API_FEEDBACK}`,
      {
        headers: {
          Authorization: `Bearer ${this.adminAccessToken}`,
        },
      }
    );

    return this.isPhoneNumbePresent(await response.json(), phoneNumber);
  }

  isPhoneNumbePresent(feedbackList: Feedback[], phoneNumber: string): boolean {
    return feedbackList.some((feedback) => feedback.phone === phoneNumber);
  }
}
