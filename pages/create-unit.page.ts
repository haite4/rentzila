import Page from "./page";

const categorySelectTitle = ".CategorySelect_title__W8Hgo"
const categorySelectContent = `[data-testid="categoryName"]`
const categorySelectBtn = ".CategorySelect_button__UbbJB"
const nextBtn = `[data-testid="nextButton"]`
const categorySelectError = ".CategorySelect_error__oGAYs"
const categorySelectErrorText = ".CategorySelect_errorTextVisible__1Oyzh"
const categoryPopUp = `[data-testid="categoryPopup"]`
const categoryPopUpTitle = ".CategoryPopup_title__19YOz"
const categoryPopUpCloseBtn = `[data-testid="closeIcon"]`
const firstCategoryLocator = ".FirstCategoryList_content__sQClK"
const secondCategoryLocator = ".SecondCategory_radio_flex__3DZ9R"
const thirdCategoryLocator = ".ThirdCategory_wrapper__gQ5DT"
const categoryBodyTitle = ".CreateEditFlowLayout_title__0A3ik"
const categoryTabTitle = ".CustomLabel_labelTitle__O2bFl"
const categoryTabLabelNumber = `[data-testid="labelNumber"]`
const categoryTabBtn = ".MuiButtonBase-root"


export class CreateUnitPage extends Page {
    constructor(page: Page["page"]){
        super(page)
    }

    getCategorySelectTitle(){
        return this.page.locator(categorySelectTitle)
    }

    getCategorySelectContent(){
        return this.page.locator(categorySelectContent)
    }

    getArrowDown(){
        return this.page.getByRole('img', { name: 'Arrow-down' })
    }

    getCategorySelectBtn(){
        return this.page.locator(categorySelectBtn)
    }

    getCategorySelectError(){
        return this.page.locator(categorySelectError)
    }

    getCategorySelectErrorText(){
        return this.page.locator(categorySelectErrorText)
    }

    getCategoryPopUp(){
        return  this.page.locator(categoryPopUp)
    }

    getCategoryPopUpTitle(){
        return this.page.locator(categoryPopUpTitle)
    }

    getCategoryBodyTitle(){
        return this.page.locator(categoryBodyTitle)
    }

    getListOfCategorysTabTitle(){
        return [
            "Основна інформація",
            "Фотографії",
            "Послуги",
            "Вартість",
            "Контакти"
        ]
    }

    getListOfCategoryTabNumber(){
        return [
            "1",
            "2",
            "3",
            "4",
            "5"
        ]
    }

    async clickNextBtn(){
        await this.page.locator(nextBtn).click()
    }

    async clickCategorySelectBtn(){
        await this.page.locator(categorySelectBtn).click()
    }

    async clickCategoryPopUpCloseBtn(){
        await this.page.locator(categoryPopUpCloseBtn).click()
    }

    async clickOutsidePopUp(){
       await this.getCategoryPopUp().click({ position: { x: 0, y: 0 }})
    }

    async firstCategoryLocatorCount(){
       return await this.page.locator(firstCategoryLocator).count()
    }

    async secondCategoryLocatorCount(){
        return await this.page.locator(secondCategoryLocator).count()
    }

    async thirdCategoryLocatorCount(){
        return await this.page.locator(thirdCategoryLocator).count()
    }

    async categoryTabTitlesCount(){
        return await this.page.locator(categoryTabTitle).count()
    }

    async getCategorysTabTitlesLocatorText(index){
        return this.page.locator(categoryTabTitle).nth(index).textContent()
    }

    async getCategoryTabNumberText(index){
        return this.page.locator(categoryTabLabelNumber).nth(index).textContent()
    }

    async getCategoryTabBtn(index){
        return this.page.locator(categoryTabBtn).nth(index)
    }

    async clickFirstCategoryLocator(index){
        await this.page.locator(firstCategoryLocator).nth(index).click()
    }

    async clickSecondCategoryLocator(index){
        await this.page.locator(secondCategoryLocator).nth(index).click()
    }

    async clickThirdCategoryLocator(index){
        await this.page.locator(thirdCategoryLocator).nth(index).click()
    }

    async thirdCategoryLocatorText(index){
        return await this.page.locator(thirdCategoryLocator).nth(index).textContent()
    }


}