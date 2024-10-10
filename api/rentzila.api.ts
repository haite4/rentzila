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

  private async getJwtToken(credentials: {
    email?: string;
    password?: string;
    tokenCache?: string;
  }): Promise<string | null> {
    if (credentials.tokenCache) {
      return credentials.tokenCache;
    }

    const response = await this.request.post(
      `${process.env.BASE_URL}${Endpoints.API_AUTH_CREATE}`,
      {
        data: {
          email: credentials.email,
          password: credentials.password,
        },
      }
    );

    return (await response.json()).access;
  }

  private async createAdminJwtToken() {
    this.adminAccessToken = await this.getJwtToken({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      tokenCache: this.adminAccessToken ?? undefined,
    });
    return this.adminAccessToken;
  }

  private async createUserJwtToken() {
    this.userAccessToken = await this.getJwtToken({
      email: process.env.USER_EMAIL,
      password: process.env.USER_PASSWORD,
      tokenCache: this.userAccessToken ?? undefined,
    });
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
