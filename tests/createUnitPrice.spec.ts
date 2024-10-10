import { expect } from "@playwright/test";
import { Endpoints } from "../constants/enums_endpoints.constant";
import { AlertMsgColors } from "../constants/enums_colors.constant";
import path from "path";
import { test } from "../fixtures/fixtures";

test.describe("test create unit price section", () => {
    test.beforeEach(
        async ({ signInHelper, signinPage, createUnitPage, randomValueHelper }) => {
          await signinPage.open(Endpoints.CREATEUNIT);
          await signInHelper.login(
            process.env.USER_EMAIL ?? "",
            process.env.USER_PASSWORD ?? ""
          );
          await createUnitPage.clickCategorySelectBtn();
          await createUnitPage.clickFirstCategoryLocator(0);
          await createUnitPage.clickSecondCategoryLocator(0);
          await createUnitPage.clickThirdCategoryLocator(0);
          await createUnitPage.typeAdvertisementNameInput(
            randomValueHelper.generateStringWithLength(10)
          );
          await createUnitPage.typeSelectedManufacturerInput("Abc");
          await createUnitPage.clickSelectedManufacturerOptions();
          await createUnitPage.clickAddressSelectionBtn();
          await createUnitPage.getMapPopUp().waitFor({ state: "visible" });
          await createUnitPage.clickMapPopUpSubmitChoice();
          await createUnitPage.getNextBtn().waitFor({ state: "visible" });
          await createUnitPage.clickNextBtn();
          const fileChooserPromise =
            createUnitPage.page.waitForEvent("filechooser");
          await createUnitPage.clickImageBlock();
          const fileChooser = await fileChooserPromise;
          await createUnitPage.setElementFilesinPhotoSection(
            fileChooser,
            path.join(__dirname, "..", "data", "images", "jpgimage.jpg")
          );
          await createUnitPage.clickNextBtn();
          await createUnitPage.fillServiceUnitInput("Рихлення")
          await createUnitPage.clickOnFirstServiceSearchResults()
          await createUnitPage.clickNextBtn();

        }
      );
    test("TC-417 Verify 'Спосіб оплати' section", async({createUnitPage}) => {
        await expect(createUnitPage.getPricePayementMethodUnitTitle()).toHaveText(/^Спосіб оплати.*\*$/)
        await expect(createUnitPage.getPaymentMethodCustomSelectValue()).toHaveText("Готівкою / на картку")
        const optionsText = ["Готівкою / на картку", "Безготівковий розрахунок (без ПДВ)", "Безготівковий розрахунок (з ПДВ)"]
        await createUnitPage.clickPriceCustomSelect()
        for(const [index, option] of (await createUnitPage.getAllPaymentMethodOptions()).entries()){
            await expect(option).toHaveText(optionsText[index])
            await createUnitPage.clickPaymentMethodOptionBlockByIndex(index)
            await expect(createUnitPage.getPaymentMethodCustomSelectValue()).toHaveText(optionsText[index])
            await createUnitPage.clickPriceCustomSelect()
        }
        
    })

    test("TC-418 Verify 'Вартість мінімального замовлення' section", async({createUnitPage}) => {
        await expect(createUnitPage.getPriceCostMinimumOrderTitle()).toHaveText(/^Вартість мінімального замовлення.*\*$/)
        await expect(createUnitPage.getPriceInput()).toHaveAttribute("placeholder", "Наприклад, 1000")
        await createUnitPage.typePriceInput("1234567890")
        await expect(createUnitPage.getPriceInput()).toHaveValue("123456789")
        await createUnitPage.clearPriceInput()
        await createUnitPage.fillPriceInput("1234567890")
        await expect(createUnitPage.getPriceInput()).toHaveValue("123456789")
        const invalidSymbols = ["123 456", "123456 ", " ", "abc", "!@#$%.,"]
        
        for(const [index, option] of invalidSymbols.entries()){
            await createUnitPage.fillPriceInput(option)
            if(index < 2){
                await expect(createUnitPage.getPriceInput()).toHaveValue("123456")
            }else{
                await expect(createUnitPage.getPriceInput()).toHaveValue("")
            }
        }
    await createUnitPage.typePriceInput("123456789")
    await expect(createUnitPage.getPriceInput()).toHaveValue("123456789")
    await expect(createUnitPage.getPriceCurrencyInput()).toHaveAttribute("value", "UAH")
    })

  test("TC-482 Verify adding price for service", async({createUnitPage}) => {
    await expect(createUnitPage.getCostOfServicesTitle()).toHaveText(/^Вартість Ваших послуг.*\*$/)
    await expect(createUnitPage.getPriceSectionClue()).toHaveText("За бажанням Ви можете додати вартість конкретних послуг, які надає технічний засіб")
    await expect(createUnitPage.getAddPriceBtn()).toHaveText("Додати вартість")
    await createUnitPage.clickAddPriceBtn()
    await expect(createUnitPage.getAddPriceBtn()).not.toBeVisible()
    await expect(createUnitPage.getPriceInput(1)).toBeVisible()
    await expect(createUnitPage.getSelectServicePrice()).toBeVisible()
    await createUnitPage.typePriceInput("1234567890", 1)
    await expect(createUnitPage.getPriceInput(1)).toHaveValue("123456789")
    const invalidSymbols = ["123 456", "123456 ", " ", "abc", "!@#$%.,"]
        
    for(const [index, option] of invalidSymbols.entries()){
        await createUnitPage.fillPriceInput(option, 1)
        if(index < 2){
            await expect(createUnitPage.getPriceInput(1)).toHaveValue("123456")
        }else{
            await expect(createUnitPage.getPriceInput(1)).toHaveValue("")
        }
    }

    await createUnitPage.typePriceInput("12345678", 1)
    await expect(createUnitPage.getPriceInput(1)).toHaveValue("12345678")
    await expect(createUnitPage.getPriceCurrencyInput(1)).toHaveAttribute("value", "UAH")
    await expect(createUnitPage.getPaymentMethodCustomSelectValue(1)).toHaveText("година")
    await expect(createUnitPage.getArrowImage(1)).toBeVisible()
    await createUnitPage.clickPaymentMethodCustomSelectValue(1)
    const variants = ["година", "зміна", "тонна", "гектар", "метр кв.", "метр куб.", "Кілометр"]

    for(const [index, variant] of (await createUnitPage.getAllPriceTimeSelectOption()).entries()){
        await expect(variant).toHaveText(variants[index])
        await createUnitPage.clickOnPriceCustomSelectOption(variant)
        await expect(createUnitPage.getPaymentMethodCustomSelectValue(1)).toHaveText(variants[index])
        await createUnitPage.clickPaymentMethodCustomSelectValue(1)
    }

    await createUnitPage.clickPriceWorkingShift()
    await expect(createUnitPage.getPaymentMethodCustomSelectValue(2)).toHaveText("8 год")
    await expect(createUnitPage.getArrowImage(2)).toBeVisible()

    await createUnitPage.clickPaymentMethodCustomSelectValue(2)

    const priceTimeVariant = ["8 год", "4 год"]
    for(const [index, variant] of (await createUnitPage.getAllPriceTimeSelectOption()).entries()){
      await expect(variant).toHaveText(priceTimeVariant[index])
      await createUnitPage.clickOnPriceCustomSelectOption(variant)
      await expect(createUnitPage.getPaymentMethodCustomSelectValue(2)).toHaveText(priceTimeVariant[index])
      await createUnitPage.clickPaymentMethodCustomSelectValue(2)
    }

    await createUnitPage.clickRemovePriceBtn()
    await expect(createUnitPage.getPriceInput(1)).not.toBeVisible()
    await expect(createUnitPage.getPriceCurrencyInput(1)).not.toBeVisible()
    await expect(createUnitPage.getAddPriceBtn()).toBeVisible()
  })


  test("TC-488 Verify 'Назад' button", async({createUnitPage}) => {
    await expect(createUnitPage.getPrevioudBtn()).toHaveText("Назад");
    await createUnitPage.clickPreviousBtn();

    for (let i = 0; i < (await createUnitPage.categoryTabTitlesCount()); i++) {
      expect(await createUnitPage.getCategorysTabTitlesLocatorText(i)).toBe(
        createUnitPage.getListOfCategorysTabTitle()[i]
      );
    
      if (i === 2) {
        await expect(createUnitPage.getCategoryTabBtn(2)).toHaveAttribute(
          "aria-selected",
          "true"
        );
      } else {
        await expect(createUnitPage.getCategoryTabBtn(i)).toHaveAttribute(
          "aria-selected",
          "false"
        );
      }
    }
    await expect(createUnitPage.getServiceUnitFlowTitle()).toHaveText("Послуги")
  })

  test("TC-489 Verify 'Далі' button", async({createUnitPage}) => {
    await expect(createUnitPage.getNextBtn()).toHaveText("Далі");
    await createUnitPage.clickNextBtn();
    await expect(createUnitPage.getPriceUnitInputWrapper()).toHaveCSS("border", AlertMsgColors.BORDERRED)
    await expect(createUnitPage.getPriceRequiredFieldClue()).toHaveText("Це поле обов’язкове")
    await expect(createUnitPage.getPriceRequiredFieldClue()).toHaveCSS("color", AlertMsgColors.RED)
    await createUnitPage.typePriceInput("1000")
    await createUnitPage.clickNextBtn();
    await expect(createUnitPage.getCategoryBodyTitle()).toHaveText(
      "Створити оголошення"
    );
    for (let i = 0; i < (await createUnitPage.categoryTabTitlesCount()); i++) {
      expect(await createUnitPage.getCategorysTabTitlesLocatorText(i)).toBe(
        createUnitPage.getListOfCategorysTabTitle()[i]
      );
      expect(await createUnitPage.getCategoryTabNumberText(i)).toBe(
        createUnitPage.getListOfCategoryTabNumber()[i]
      );

      if (i === 4) {
        await expect(createUnitPage.getCategoryTabBtn(4)).toHaveAttribute(
          "aria-selected",
          "true"
        );
      } else {
        await expect(createUnitPage.getCategoryTabBtn(i)).toHaveAttribute(
          "aria-selected",
          "false"
        );
      }
    }
  })

  test("TC-596 Verify adding an invalid price in the 'Вартість мінімального замовлення *' input", async({createUnitPage}) => {
    await createUnitPage.typePriceInput("0")
    await expect(createUnitPage.getPriceInput()).toHaveValue("")
    await createUnitPage.typePriceInput("1")
    await expect(createUnitPage.getPriceInput()).toHaveValue("1")
    await createUnitPage.clickNextBtn()
    await expect(createUnitPage.getPriceUnitInputWrapper()).toHaveCSS("border", AlertMsgColors.BORDERRED)
    await expect(createUnitPage.getPriceMinimumAmountClue()).toHaveText("Мінімальна вартiсть має бути не менше 1000 грн")
    await expect(createUnitPage.getPriceMinimumAmountClue()).toHaveCSS("color", AlertMsgColors.RED)
    await createUnitPage.clearPriceInput()
    await expect(createUnitPage.getPriceUnitInputWrapper()).toHaveCSS("border", AlertMsgColors.BORDERRED)
    await expect(createUnitPage.getPriceRequiredFieldClue()).toHaveText("Це поле обов’язкове")
    await createUnitPage.typePriceInput("1000")
    await expect(createUnitPage.getPriceRequiredFieldClue()).not.toBeVisible()
    await expect(createUnitPage.getPriceMinimumAmountClue()).not.toBeVisible()
    await expect(createUnitPage.getPriceUnitInputWrapper()).toHaveCSS("border", AlertMsgColors.BORDERGRAY)
  })

  test("TC-636 Verify the data entry in the 'Вартість мінімального замовлення *' input", async({createUnitPage}) => {
    const invalidOptions = ["123 456", "123456 ","1234567890" , " ", "abc", "!@#$%.,"]
    const actions = ["type", "copy-paste"]
    for(const [index, option] of invalidOptions.entries()){
      for(const action of actions){
        switch(action){
          case "type":
            await createUnitPage.fillPriceInput(option)
            break;
          case "copy-paste":
            await createUnitPage.clearPriceInput();
            await createUnitPage.writeToClipboardSymbols(option)
            await createUnitPage.clickPriceInput()
            await createUnitPage.pressCommand("Control+V")
            break;   
      }
    
        if(index < 2){
          await expect(createUnitPage.getPriceInput()).toHaveValue("123456")
        }else if (index == 2){
          await expect(createUnitPage.getPriceInput()).toHaveValue("123456789")
        }
        else{
          await expect(createUnitPage.getPriceInput()).toHaveValue("")
        }
    }
    }
  })

  test("TC-637 Verify UI of the 'Вартість Ваших послуг *' section", async({createUnitPage}) => {
    await expect(createUnitPage.getCostOfServicesTitle()).toHaveText(/^Вартість Ваших послуг.*\*$/)
    await expect(createUnitPage.getPriceSectionClue()).toHaveText("За бажанням Ви можете додати вартість конкретних послуг, які надає технічний засіб")
    await expect(createUnitPage.getAddPriceBtn()).toBeVisible()
    await expect(createUnitPage.getAddPriceBtn()).toHaveText("Додати вартість")
    await expect(createUnitPage.getSelectServicePrice()).toBeVisible()
    await createUnitPage.clickAddPriceBtn()
    await expect(createUnitPage.getAddPriceBtn()).not.toBeVisible()
    await expect(createUnitPage.getPriceInput(1)).toBeVisible()
    await expect(createUnitPage.getSelectServicePrice()).toBeVisible()
    await expect(createUnitPage.getPaymentMethodCustomSelectValue(1)).toBeVisible()
    await expect(createUnitPage.getPriceCurrencyInput(1)).toBeVisible()
    await expect(createUnitPage.getPriceInput(1)).toHaveAttribute("placeholder", "Наприклад, 1000")
    await expect(createUnitPage.getPriceCurrencyInput(1)).toHaveAttribute("value", "UAH")
    await expect(createUnitPage.getPaymentMethodCustomSelectValue(1)).toHaveText("година")
  })

  test("TC-638 Verify the data entry in the 'Вартість Ваших послуг *' price input", async({createUnitPage}) => {
    await createUnitPage.clickAddPriceBtn()
    await expect(createUnitPage.getPriceInput(1)).toBeVisible()
    const invalidOptions = ["123 456", "123456 ","1234567890" , " ", "abc", "!@#$%.,"]
    const actions = ["type", "copy-paste"]
    for(const [index, option] of invalidOptions.entries()){
      for(const action of actions){
        switch(action){
          case "type":
            await createUnitPage.fillPriceInput(option, 1)
            break;
          case "copy-paste":
            await createUnitPage.clearPriceInput(1);
            await createUnitPage.writeToClipboardSymbols(option)
            await createUnitPage.clickPriceInput(1)
            await createUnitPage.pressCommand("Control+V")
            break;   
      }
    
        if(index < 2){
          await expect(createUnitPage.getPriceInput(1)).toHaveValue("123456")
        }else if (index == 2){
          await expect(createUnitPage.getPriceInput(1)).toHaveValue("123456789")
        }
        else{
          await expect(createUnitPage.getPriceInput(1)).toHaveValue("")
        }
    }
    }
  })
})