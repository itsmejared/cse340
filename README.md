# CSE340 Service Network

Web application developed for the CSE340 course using Node.js, Express, and EJS.

## Features

- Dynamic server-side rendering with EJS
- Organization and project listings
- Responsive navigation
- Environment-based configuration
- MVC project structure

## Technologies Used

- Node.js
- Express.js
- EJS
- CSS
- JavaScript

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root and configure the required variables:

```env
NODE_ENV=development
PORT=3000
```

## Running the Project

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

## Project Structure

```text
src/
├── controllers/
├── models/
├── routes/
├── views/
│   ├── partials/
│   └── layouts/
├── public/
└── utilities/
```

## Live Demo

Deployed on Render: https://cse340-hlax.onrender.com