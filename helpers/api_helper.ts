import { APIRequestContext } from "@playwright/test";
import valid_creds from "../data/valid_creds.json"

require('dotenv').config()

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
  private userAccessToken: string | null  = null;
  private feedback: Feedback[] = [];

  constructor(private request: APIRequestContext) {
    this.request = request;
  }

  private async createAdminJwtToken() {
    if (this.adminAccessToken) {
      return this.adminAccessToken;
    }

    const response = await this.request.post(`${process.env.BASE_URL}/api/auth/jwt/create/`, {
      data: {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      },
    });
  
    this.adminAccessToken = (await response.json()).access;
  
    return this.adminAccessToken;
  }

 private async createUserJwtToken() {
    if (this.userAccessToken) {
      return this.userAccessToken;
    }
  
    const response = await this.request.post(`${process.env.BASE_URL}/api/auth/jwt/create/`, {
      data: {
        email: valid_creds.email,
        password: valid_creds.password,
      },
    });
  
    this.userAccessToken = (await response.json()).access;
  
    return this.userAccessToken;
  }

  async createUserJwtToken() {
    if (userAccessToken === null) {
      await this.request
        .post("https://dev.rentzila.com.ua/api/auth/jwt/create/", {
          data: {
            email: user_creds.email,
            password: user_creds.password,
          },
        })
        .then(async (response) => {
          userAccessToken = (await response.json()).access;
        });
    }
    return userAccessToken;
  }

  async getListOfFeedback(phoneNumber: string) {
    if(!this.adminAccessToken){
      await this.createAdminJwtToken();
    }
    
    const response = await this.request.get(`${process.env.BASE_URL}/api/backcall/`, {
      headers: {
        Authorization: `Bearer ${this.adminAccessToken}`,
      },
    });
  
    this.feedback = await response.json();
  
    return this.isPhoneNumbePresent(this.feedback, phoneNumber);
  }

  isPhoneNumbePresent(feedbackList: Feedback[], phoneNumber: string): boolean {
    return feedbackList.some((feedback) => feedback.phone === phoneNumber);
  }
}
