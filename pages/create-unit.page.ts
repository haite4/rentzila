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
const customInputTitle = ".CustomInput_title__fdY4X"
const customInput = `[data-testid="custom-input"]`
const errorMessage = ".CustomInput_errorDescr__yM7eC"
const selectManufacturerTitle = ".SelectManufacturer_title__X9AEw"
const selectedManufacturerInput = `[data-testid="input-customSelectWithSearch"]`
const selectedManufacturerError = ".CustomSelectWithSearch_errorTextVisible__B5lZH"
const seletedManufacturerBorder = ".CustomSelectWithSearch_searchResult__qY1GJ"
const selectedManufacturerDropdownWrapper = ".CustomSelectWithSearch_searchedServicesCat_wrapper__aOGc3"
const selectedManufacturerOptions = `[data-testid="item-customSelectWithSearch"]`
const selectedManufacuredNotFoundResult = ".CustomSelectWithSearch_searchedServicesCat_wrapper__aOGc3"
const selectedOptions = `[data-testid="div-service-customSelectWithSearch"]`
const closeOptionsBtn = `[data-testid="closeButton"]`
const customTextAreaTitle = ".CustomTextAriaDescription_title__eB7WB"
const customTextArea = `[data-testid="textarea-customTextAriaDescription"]`
const addressSelectionTitle = ".AddressSelectionBlock_title__pTi78"
const mapLabel = `[data-testid="mapLabel"]`
const addressSelectionError = ".AddressSelectionBlock_errorTextVisible__IAGKS"
const addressSelectionBtn = ".AddressSelectionBlock_locationBtn__IvqEL"
const mapPopUpWrapper = `[data-testid="mapPopup"]`
const mapPopUpTitle = ".MapPopup_title__ykbd3"
const mapPopUpClostBtn = ".MapPopup_icon__aJopq"
const mapPopUpAddress = `[data-testid="address"]`
const mapPopUp =  "#map"
const preventBtn = `[data-testid="prevButton"]`

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

    getNazvaOgolochenyaTitie(){
        return this.page.locator(customInputTitle).first()
    }

    getNazvaOgolochenyaInput(){
        return this.page.locator(customInput).first()
    }

    getNazvaModeliTitle(){
        return this.page.locator(customInputTitle).nth(1)
    }

    getNazvaModeliInput(){
        return this.page.locator(customInput).nth(1)
    }

    getErrorMessage(){
        return this.page.locator(errorMessage)
    }

    getSelectManufacturerTitle(){
        return this.page.locator(selectManufacturerTitle)
    }

    getSelectedManufacturerInput(){
        return this.page.locator(selectedManufacturerInput)
    }

    getSelectedManufacturerError(){
        return this.page.locator(selectedManufacturerError)
    }

    getSeletedManufacturerBorder(){
        return this.page.locator(seletedManufacturerBorder)
    }

    getSelectedManufacturerDropdownWrapper(){
        return this.page.locator(selectedManufacturerDropdownWrapper)
    }

    getSelectedManufacturerOptions(){
        return this.page.locator(selectedManufacturerOptions)
    }

    getSelectedOptionsInput(){
        return this.page.locator(selectedOptions)
    }

    getTechnicalCharacteristicTitle(){
        return this.page.locator(customTextAreaTitle).first()
    }

    getDetailedDescriptionTitle(){
        return this.page.locator(customTextAreaTitle).nth(1)
    }

    getSelectedManufacuredNotFoundResult(){
        return this.page.locator(selectedManufacuredNotFoundResult)
    }

    getTechnicalCharacteristicTextArea(){
        return this.page.locator(customTextArea).first()
    }

    getDetailedDescriptionTextArea(){
        return this.page.locator(customTextArea).nth(1)
    }

    getCloseOptionsBtn(){
        return this.page.locator(closeOptionsBtn)
    }
    
    getAddressSelectionTitle(){
        return this.page.locator(addressSelectionTitle)
    }

    getMapLabel(){
        return this.page.locator(mapLabel)
    }

    getMapPopUp(){
        return this.page.locator(mapPopUp)
    }

    getMapPopUpWrapper(){
        return this.page.locator(mapPopUpWrapper)
    }

    getMapPopUpTitle(){
        return this.page.locator(mapPopUpTitle)
    }

    getMapPopUpCloseBtn(){
        return this.page.locator(mapPopUpClostBtn)
    }

    getMapPopUpAddress(){
        return this.page.locator(mapPopUpAddress)
    }

    getPreventBtn(){
        return this.page.locator(preventBtn)
    }

    getAddressSelectionError(){
        return this.page.locator(addressSelectionError)
    }

    getNextBtn(){
        return this.page.locator(nextBtn)
    }

    getListOfLocatorRequiredFieldsError(){
        return [
            this.getCategorySelectErrorText(),
            this.getErrorMessage(),
            this.getSelectedManufacturerError(),
            this.getAddressSelectionError()
        ]
    }

    getCategoryTabBtn(index){
        return  this.page.locator(categoryTabBtn).nth(index)
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


    getListOfInvalidVariant(){
        return [
            "1234567890123456",
            "1234567890 12345",
            "123456789012345 "
        ]
    }

    getListOfInvalidSymbols(includeSpaces: boolean = true): string[]{
        let invalidSymbols = [" ", "<>", "{}", ";", "^"];
        if(!includeSpaces){
            return invalidSymbols.filter(symbol => symbol !== " ")
        }
        return invalidSymbols
    }

    async typeNazvaOgolochenyaInput(randomValue){
        await this.getNazvaOgolochenyaInput().pressSequentially(randomValue)
    }

    async fillNazvaOgolochenyaInput(randomValue){
        await this.getNazvaOgolochenyaInput().fill(randomValue)
    }

    async getOgolochenyaInputValue(){
        return await this.getNazvaOgolochenyaInput().inputValue()
    }

    async clearNazvaOgolochenyaInput(){
        await this.getNazvaOgolochenyaInput().clear()
    }

    async clickNextBtn(){
        await this.getNextBtn().click()
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

    async typeSelectedManufacturerInput(value){
        await this.getSelectedManufacturerInput().pressSequentially(value)
    }

    async clearSelectedManufacturerInput(){
        this.page.locator(selectedManufacturerInput).clear()
    }

    async getSelectedManufacturerInputValue(){
       return await this.page.locator(selectedManufacturerInput).inputValue()
    }

    async clickSelectedManufacturerOptions(){
        await this.getSelectedManufacturerOptions().click()
    }

    async clickCloseOptionsBtn(){
        await this.page.locator(closeOptionsBtn).click()
    }

    async typeNazvaModeliInput(value){
        await this.getNazvaModeliInput().pressSequentially(value)
    }

    async clearNazvaModeliInput(){
        await this.getNazvaModeliInput().clear()
    }

    async getNazvaModeliInputValue(){
        return await this.getNazvaModeliInput().inputValue()
    }

    async clickTechnicalCharacteristicTextArea(){
        await this.getTechnicalCharacteristicTextArea().click()
    }

    async getTechnicalCharacteristicTextAreaValue(){
        return await this.getTechnicalCharacteristicTextArea().inputValue()
    }

    async typeTechnicalCharacteristicTextArea(value){
        await this.getTechnicalCharacteristicTextArea().pressSequentially(value)
    }

    async clickDetailedDescriptionTextArea(){
        await this.getDetailedDescriptionTextArea().click()
    }

    async getDetailedDescriptionTextAreaValue(){
        return this.getDetailedDescriptionTextArea().inputValue()
    }

    async typeDetailedDescriptionTextArea(value){
        await this.getDetailedDescriptionTextArea().pressSequentially(value)
    }

    async clickAddressSelectionBtn(){
        return this.page.locator(addressSelectionBtn).click()
    }

    async clickMapPopUpSubmitChoice(){
        await this.page.getByRole('button', { name: 'Підтвердити вибір' }).click()
    }

    async getMapPopupBoundingBox(){
        const mapBox = await this.getMapPopUp().boundingBox()

        if (mapBox) {
            const { x, y, width, height } = mapBox;
            const randomX = x + Math.random() * width;
            const randomY = y + Math.random() * height;
            return {x: randomX, y: randomY}
     }
    throw new Error('Bounding box not found');
}

    async getMapPopUpAddressText(){
        return await this.getMapPopUpAddress().textContent()
    }

    async clickOnThePopUpMap(coordinateX, coordinateY){
        await this.page.mouse.click(coordinateX, coordinateY)
    }

    async clickPreventBtn(){
        await this.page.locator(preventBtn).click()
    }
}