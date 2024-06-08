<div align="center">
<img src="./public/images/pixelvaultwhitebg.png" height="150">
<p style="color:gold; margin-top:-15px;">PIXELVAULT - A NFT MARKETPLACE</p>
</div>
<hr></hr>

## Table of Contents
- [Table of Contents](#table-of-contents) 
- [About PIXELVAULT](#about-pixelvault) 
    - [Built With](#built-with) 
- [How to Run](#how-to-run) 
    - [Prerequisites](#prerequisites) 
    - [Important Settings](#important-settings) 
    - [Running PIXELVAULT on localhost](#running-pixelvault-on-localhost) 

## About PIXELVAULT
PIXELVAULT - A digital platform that revolutionizes the way we perceive, trade, and value digital assets. NFTs, being unique tokens secured by blockchain, grant us the ability to own and trade distinct digital items, from artwork and music to virtual real estate, backed by an immutable ledger of ownership.

### Built With

This project was built with the following technologies:

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [NextUI](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Thirdweb](https://thirdweb.com/)
- [React Tostify](https://www.npmjs.com/package/react-toastify)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Validator](https://www.npmjs.com/package/validator)

## How to Run

### Prerequisites

This project requires Node and Yarn to be installed in your system. If you don&#39;t have it installed, you can follow these steps:

- Install Node from its official website https://nodejs.org/en

- Install Yarn globally using npm (Node Package Manager). Open your terminal and run:

  ```sh
  npm install -g yarn
  ```

  Please ensure that you have Node.js and npm installed before running Yarn.

- Verify that Yarn has been installed on your machine by running the following command in your terminal:

  ```sh
  yarn --version
  ```

  If Yarn has been installed correctly, your terminal should display the version of Yarn installed on your machine.

Now you are ready to use Yarn for managing and versioning your project dependencies!

### Important Settings

- Go to [Thirdweb](https://thirdweb.com/) and create one Marketplace Contract and one NFT Collection Contract. You have to paste both contract addresses in `addresses.js` file in `const` folder
```
export const NFT_CONTRACT_ADDRESS = "Paste here"
export const MARKETPLACE_CONTRACT_ADDRESS = "Paste here"
```

- You have to create a `.env` file and paste your mongodb connection string in `.env` file and also create api key from thirdweb and paste here
```
# Get a clientId for your app on https://thirdweb.com/create-api-key
# make sure to add localhost:3000 to the list of allowed origins to use it locally
NEXT_PUBLIC_TEMPLATE_CLIENT_ID="paste here"
# mongodb connection string
connectionString = "paste here"

```

- Paste your Ethereum network chain ID (like Sepolia ETH chain ID is 11155111) in _app.js file 

### Running PIXELVAULT on localhost

You can run this project on your localhost using following steps:

- Open root folder of PIXELVAULT and following command
```
yarn dev
```