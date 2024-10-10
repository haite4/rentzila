# Rentzila

## Introduction
This repository contains automated tests using Playwright, written specifically for the website Rentzila

## Requirements
- **Node.js**: v20.15.1
- **Dependencies**:
    - `@faker-js/faker`: ^9.0.1
    - `dotenv`: ^16.4.5
    - `tsx`: ^4.19.1
    - `typescript`: ^5.6.2
    - `@playwright/test`: ^1.47.0

## Steps to Install
1. Install Node.js:

    [Node.js](https://nodejs.org/en/download/package-manager)

2. Clone the repository:
    ```sh
    https://github.com/haite4/rentzila
    ```
3. Navigate to the project directory:
    ```sh 
    cd rentzila
    ```

4. Install dependencies:
    ```sh
    npm install
    ``` 

## Steps to Launch

1. **Run all tests on Chrome:**:
    ```sh
    npm run test
    ```
2. **Run all tests with trace on:**
    ```sh
    npm run test:trace
    ```
3. **Run tests consultation:**
    ```sh
    npm run test:consultation
    ```
4. **Run tests footer:**
    ```sh
    npm run test:footer
    ```
5. **Run tests main:**
    ```sh
    npm run test:main
    ```
8. **Run tests signin:**
    ```sh
    npm run test:signin
    ```
9. **Run tests createUnit**
    ```sh 
    npm run test:createUnit
    ```
10. **Run tests createUnitPhoto**
    ```sh 
    npm run test:createUnitPhoto
    ```

## ENV
- **ADMIN_EMAIL**: you can get from the project owner
- **ADMIN_PASSWORD**: you can get from the project owner
- **ADMIN_PHONE_NUMBER**: you can get from the project owner
- **VALID_PHONE_NUMBER**: you can take any correct Ukrainian number
- **BASE_URL**: you can get from the project owner
- **USER_EMAIL**: You can get after creating an account on rentzila
- **USER_PASSWORD**: You can get after creating an account on rentzila
- **USER_PHONE_NUMBER**: You can get after creating an account on rentzila