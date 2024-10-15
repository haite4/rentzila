import Page from "./page";

const categorySelectTitle = '[class*="CategorySelect_title"]'
const categorySelectContent = `[data-testid="categoryName"]`
const categorySelectBtn = '[class*="CategorySelect_button"]'
const nextBtn = `[data-testid="nextButton"]`
const categorySelectError = '[class*="CategorySelect_error"]'
const categorySelectErrorText = '[class*="CategorySelect_errorTextVisible"]'
const categoryPopUp = `[data-testid="categoryPopup"]`
const categoryPopUpTitle = '[class*="CategoryPopup_title"]'
const categoryPopUpCloseBtn = `[data-testid="closeIcon"]`
const firstCategoryLocator = '[class*="FirstCategoryList_content"]'
const secondCategoryLocator = '[class*="SecondCategory_radio_flex"]'
const thirdCategoryLocator = '[class*="ThirdCategory_wrapper"]'
const categoryBodyTitle = '[class*="CreateEditFlowLayout_title"]'
const categoryTabTitle = '[class*="CustomLabel_labelTitle"]'
const categoryTabLabelNumber = `[data-testid="labelNumber"]`
const categoryTabBtn = ".MuiButtonBase-root"
const customInputTitle = '[class*="CustomInput_title"]'
const customInput = `[data-testid="custom-input"]`
const errorMessage = '[class*="CustomInput_errorDescr"]'
const selectManufacturerTitle = '[class*="SelectManufacturer_title"]'
const selectedManufacturerInput = `[data-testid="input-customSelectWithSearch"]`
const selectedManufacturerError = '[class*="CustomSelectWithSearch_errorTextVisible"]'
const seletedManufacturerBorder = '[class*="CustomSelectWithSearch_searchResult"]'
const selectedManufacturerDropdownWrapper = '[class*="CustomSelectWithSearch_searchedServicesCat_wrapper"]'
const selectedManufacturerOptions = `[data-testid="item-customSelectWithSearch"]`
const selectedManufacuredNotFoundResult = '[class*="CustomSelectWithSearch_searchedServicesCat_wrapper"]'
const selectedOptions = `[data-testid="div-service-customSelectWithSearch"]`
const closeOptionsBtn = `[data-testid="closeButton"]`
const customTextAreaTitle = '[class*="CustomTextAriaDescription_title"]'
const customTextArea = `[data-testid="textarea-customTextAriaDescription"]`
const addressSelectionTitle = '[class*="AddressSelectionBlock_title"]'
const mapLabel = `[data-testid="mapLabel"]`
const addressSelectionError = '[class*="AddressSelectionBlock_errorTextVisible"]'
const addressSelectionBtn = '[class*="AddressSelectionBlock_locationBtn"]'
const mapPopUpWrapper = `[data-testid="mapPopup"]`
const mapPopUpTitle = '[class*="MapPopup_title"]'
const mapPopUpClostBtn = '[class*="MapPopup_icon"]'
const mapPopUpAddress = `[data-testid="address"]`
const mapPopUp =  "#map"
const preventBtn = `[data-testid="prevButton"]`

export class CreateUnitPage extends Page {
    constructor(page: Page["page"]){
        super(page)
    }

    getCategorySelectTitle(){
        return super.getElement(categorySelectTitle)
    }

    getCategorySelectContent(){
        return super.getElement(categorySelectContent)
    }

    getArrowDown(){
        return super.getElementByImg('Arrow-down')
    }

    getCategorySelectBtn(){
        return super.getElement(categorySelectBtn)
    }

    getCategorySelectError(){
        return super.getElement(categorySelectError).first()
    }

    getCategorySelectErrorText(){
        return super.getElement(categorySelectErrorText)
    }

    getCategoryPopUp(){
        return  super.getElement(categoryPopUp)
    }

    getCategoryPopUpTitle(){
        return super.getElement(categoryPopUpTitle)
    }

    getCategoryBodyTitle(){
        return super.getElement(categoryBodyTitle)
    }

    getAdvertisementTitle(){
        return super.getElement(customInputTitle).first()
    }

    getAdvertisementInput(){
        return super.getElement(customInput).first()
    }

    getNameModelTitle(){
        return super.getElement(customInputTitle).nth(1)
    }

    getNameModelInput(){
        return super.getElement(customInput).nth(1)
    }

    getErrorMessage(){
        return super.getElement(errorMessage)
    }

    getSelectManufacturerTitle(){
        return super.getElement(selectManufacturerTitle)
    }

    getSelectedManufacturerInput(){
        return super.getElement(selectedManufacturerInput)
    }

    getSelectedManufacturerError(){
        return super.getElement(selectedManufacturerError)
    }

    getSeletedManufacturerBorder(){
        return super.getElement(seletedManufacturerBorder)
    }

    getSelectedManufacturerDropdownWrapper(){
        return super.getElement(selectedManufacturerDropdownWrapper)
    }

    getSelectedManufacturerOptions(){
        return super.getElement(selectedManufacturerOptions)
    }

    getSelectedOptionsInput(){
        return super.getElement(selectedOptions)
    }

    getTechnicalCharacteristicTitle(){
        return super.getElement(customTextAreaTitle).first()
    }

    getDetailedDescriptionTitle(){
        return super.getElement(customTextAreaTitle).nth(1)
    }

    getSelectedManufacuredNotFoundResult(){
        return super.getElement(selectedManufacuredNotFoundResult)
    }

    getTechnicalCharacteristicTextArea(){
        return super.getElement(customTextArea).first()
    }

    getDetailedDescriptionTextArea(){
        return super.getElement(customTextArea).nth(1)
    }

    getCloseOptionsBtn(){
        return super.getElement(closeOptionsBtn)
    }
    
    getAddressSelectionTitle(){
        return super.getElement(addressSelectionTitle)
    }

    getMapLabel(){
        return super.getElement(mapLabel)
    }

    getMapPopUp(){
        return super.getElement(mapPopUp)
    }

    getMapPopUpWrapper(){
        return super.getElement(mapPopUpWrapper)
    }

    getMapPopUpTitle(){
        return super.getElement(mapPopUpTitle)
    }

    getMapPopUpCloseBtn(){
        return super.getElement(mapPopUpClostBtn)
    }

    getMapPopUpAddress(){
        return super.getElement(mapPopUpAddress)
    }

    getPreventBtn(){
        return super.getElement(preventBtn)
    }

    getAddressSelectionError(){
        return super.getElement(addressSelectionError)
    }

    getNextBtn(){
        return super.getElement(nextBtn)
    }

    getListOfLocatorRequiredFieldsError(){
        return [
            this.getCategorySelectErrorText(),
            this.getErrorMessage(),
            this.getSelectedManufacturerError(),
            this.getAddressSelectionError()
        ]
    }

    getCategoryTabBtn(index: number){
        return  super.getElement(categoryTabBtn).nth(index)
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

    async typeAdvertisementNameInput(randomValue: string){
        await super.typeText(this.getAdvertisementInput(), randomValue)
    }

    async fillAdvertisementNameInput(randomValue: string){
        await super.fillText(this.getAdvertisementInput(), randomValue)
    }

    async getAdvertisementInputValue(){
        return  super.getElementInputValue(this.getAdvertisementInput())
    }

    async clearAdvertisementInput(){
        await super.clearInputField(this.getAdvertisementInput())
    }

    async clickNextBtn(){
        await super.clickLocator(this.getNextBtn())
    }

    async clickCategorySelectBtn(){
        await super.clickLocator(super.getElement(categorySelectBtn))
    }

    async clickCategoryPopUpCloseBtn(){
        await super.clickLocator(super.getElement(categoryPopUpCloseBtn))
    }

    async clickOutsidePopUp(){
       await super.clickLocator(this.getCategoryPopUp(), {x: 0, y: 0})
    }

    async firstCategoryLocatorCount(){
       return super.getElementCount(super.getElement(firstCategoryLocator))
    }

    async secondCategoryLocatorCount(){
        return super.getElementCount(super.getElement(secondCategoryLocator))
    }

    async thirdCategoryLocatorCount(){
        return super.getElementCount(super.getElement(thirdCategoryLocator))
    }

    async categoryTabTitlesCount(){
        return super.getElementCount(super.getElement(categoryTabTitle))
    }

    async getCategorysTabTitlesLocatorText(index: number){
        return super.getElementTextContent(super.getElement(categoryTabTitle).nth(index))
    }

    async getCategoryTabNumberText(index: number){
        return super.getElementTextContent(super.getElement(categoryTabLabelNumber).nth(index))
    }

    async clickFirstCategoryLocator(index: number){
        await super.clickLocator(super.getElement(firstCategoryLocator).nth(index))
    }

    async clickSecondCategoryLocator(index: number){
        await super.clickLocator(super.getElement(secondCategoryLocator).nth(index))
    }

    async clickThirdCategoryLocator(index: number){
        await super.clickLocator(super.getElement(thirdCategoryLocator).nth(index))
    }

    async thirdCategoryLocatorText(index: number){
        return  super.getElementTextContent(super.getElement(thirdCategoryLocator).nth(index))
    }

    async typeSelectedManufacturerInput(value: string){
        await super.typeText(this.getSelectedManufacturerInput(), value)
    }

    async clearSelectedManufacturerInput(){
        await super.clearInputField(super.getElement(selectedManufacturerInput))
    }

    async getSelectedManufacturerInputValue(){
       return super.getElementInputValue(super.getElement(selectedManufacturerInput))
    }

    async clickSelectedManufacturerOptions(){
        await super.clickLocator(this.getSelectedManufacturerOptions())
    }

    async clickCloseOptionsBtn(){
        await super.clickLocator(super.getElement(closeOptionsBtn))
    }

    async typeModelNameInput(value: string){
        await super.typeText(this.getNameModelInput(), value)
    }

    async clearModelNameInput(){
        await super.clearInputField(this.getNameModelInput())
    }

    async getModelNameInputValue(){
        return super.getElementInputValue(this.getNameModelInput())
    }

    async clickTechnicalCharacteristicTextArea(){
        await super.clickLocator(this.getTechnicalCharacteristicTextArea())
    }

    async getTechnicalCharacteristicTextAreaValue(){
        return super.getElementInputValue(this.getTechnicalCharacteristicTextArea())
    }

    async typeTechnicalCharacteristicTextArea(value: string){
        await super.typeText(this.getTechnicalCharacteristicTextArea(), value)
    }

    async clickDetailedDescriptionTextArea(){
        await super.clickLocator(this.getDetailedDescriptionTextArea())
    }

    async getDetailedDescriptionTextAreaValue(){
        return super.getElementInputValue(this.getDetailedDescriptionTextArea())
    }

    async typeDetailedDescriptionTextArea(value: string){
        await super.typeText(this.getDetailedDescriptionTextArea(), value)
    }

    async clickAddressSelectionBtn(){
        return super.clickLocator(super.getElement(addressSelectionBtn))
    }

    async clickMapPopUpSubmitChoice(){
        await super.clickLocator(super.getButtonByText('Підтвердити вибір'))
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
        return super.getElementTextContent(this.getMapPopUpAddress())
    }

    async clickOnThePopUpMap(coordinateX: number, coordinateY: number){
        await super.clickMouseAtPosition(coordinateX, coordinateY)
    }

    async clickPreventBtn(){
        await super.clickLocator(super.getElement(preventBtn))
    }
}