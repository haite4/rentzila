import { Page } from "@playwright/test";
import { SigninPage } from "../pages/signIn.page"

export class SignInHelper {
    readonly page: Page
    readonly signInPage: SigninPage

    constructor(page: Page, signInPage: SigninPage){
        this.page = page
        this.signInPage = signInPage
    }

    async login(email: string, password: string){
        await this.signInPage.fillLoginEmailInput(email)
        await this.signInPage.fillLoginPasswordInput(password)
        await this.signInPage.clickLoginSubmitBtn()
    }
}