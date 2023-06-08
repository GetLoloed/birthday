![GitHub package.json version](https://img.shields.io/github/package-json/v/GetLoloed/birthday)
![GitHub repo size](https://img.shields.io/github/repo-size/GetLoloed/birthday)
![GitHub last commit](https://img.shields.io/github/last-commit/GetLoloed/birthday)
![GitHub top language](https://img.shields.io/github/languages/top/GetLoloed/birthday)
![GitHub language count](https://img.shields.io/github/languages/count/GetLoloed/birthday)
![GitHub](https://img.shields.io/github/license/GetLoloed/birthday)

# ✨ Happy Birthday ✨

![Happy Birthday](/images/capy-bday.png)

## Table of Contents

- [Description](#Description)
- [Installation](#Installation)
- [Usage](#Usage)
- [Technologies used](#Technologies)
- [How to use](#How-to-use)

## Description

This is a simple project designed to wish a happy birthday to students from My Digital School.
Here is this [link](https://birthday-javxv8fyc-getloloed.vercel.app/) to see the project online.

## Installation

To install this project, you can clone it using the following command line :

```bash
git clone https://github.com/GetLoloed/birthday.git
cd birthday
npm install 
or
yarn install
or
pnpm install
```

## Usage

To run the project in development mode:

```bash
npm run dev 
```

To run the project in production mode:

```bash
npm run build
npm run start
```

## Technologies

This project use Next.js, React.js, TypeScript, Sass, Verce and Supabase.

- [Next.js](https://nextjs.org/)
- [React.js](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Sass](https://sass-lang.com/)
- [Vercel](https://vercel.com/)
- [Supabase](https://supabase.io/)

## How to use

1. Open the terminal and navigate to the project folder
2. Rune the following command to install the dependencies:

```bash
npm install
```

3. Once the installation is complete, launch the application in development mode with this command:

```bash
npm run dev
```

4. Open your browser and go to http://localhost:3000/

5. On the home page, you will see a list of students from My Digital School who are celebrating their birthday. You can
   click on the "Wish a Happy Birthday" button to send them a personalized message.
6. At 8 AM, an automatic email will be sent to each student who has a birthday.
7. To add students to the database, you need to upload a CSV file to the **/api/csv** route. The CSV file should have
   the
   **following columns**: **firstname**, **lastname**, **birthday (date)**, **and email**.

Note: Make sure the CSV file follows the specified format for successful data import.

Enjoy using the application to wish a happy birthday to your fellow students from My Digital School!


