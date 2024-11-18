# 💰 Expense Tracker API

A robust and scalable REST API for tracking personal expenses, built with Express.js, TypeScript, and MongoDB.

## 🚀 Features

- 🔐 JWT Authentication
- 💳 Expense Management
- 📊 Expense Statistics
- ⚙️ User Settings
- 🎨 Theme Preferences
- 💱 Currency Settings

## 🛠 Tech Stack

- TypeScript
- Express.js
- MongoDB with Mongoose
- JWT for Authentication
- Zod for Validation
- Docker Support

## 🔑 Authentication Endpoints

### Sign Up

POST /auth/signup

**Request:**
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}

**Response:**
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  }
}

### Sign In

POST /auth/signin

**Request:**
{
  "email": "john@example.com",
  "password": "securepassword123"
}

**Response:**
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  }
}

### Sign Out

POST /auth/signout

**Response:**
{
  "message": "Signout successful",
  "tokenExpiry": "2024-03-21T12:00:00.000Z"
}

## 💰 Expense Endpoints

### Create Expense

POST /expenses

**Request:**
{
  "amount": 49.99,
  "category": "food",
  "description": "Lunch at Restaurant",
  "date": "2024-03-21T12:30:00Z"
}

### Bulk Create Expenses

POST /expenses/bulk

**Request:**
[
  {
    "amount": 49.99,
    "category": "food",
    "description": "Lunch",
    "date": "2024-03-21T12:30:00Z"
  },
  {
    "amount": 25.00,
    "category": "transport",
    "description": "Taxi",
    "date": "2024-03-21T13:00:00Z"
  }
]

### Get All Expenses

GET /expenses/all

### Get Expenses by Date

GET /expenses/date/2024-03-21

### Get Expense Statistics

GET /expenses/stats

**Optional Query Parameters:**
- startDate: Filter by start date
- endDate: Filter by end date
- category: Filter by category

**Response:**
{
  "total": 1250.75,
  "average": 78.17,
  "highest": {
    "category": "Shopping",
    "amount": 299.99
  },
  "topCategory": {
    "category": "Food",
    "count": 8
  }
}

### Get Daily Statistics

GET /expenses/stats/date/2024-03-21

## ⚙️ Settings Endpoints

### Get All Settings

GET /settings

### Update Currency Settings

PUT /settings/currency

**Request:**
{
  "currencySymbol": "€",
  "currencyCode": "EUR",
  "symbolPosition": "before"
}

### Update Quick Amounts

PUT /settings/quick-amounts

**Request:**
{
  "quickAmounts": [
    {
      "id": "1",
      "amount": 10,
      "enabled": true
    },
    {
      "id": "2",
      "amount": 20,
      "enabled": true
    }
  ]
}

### Update Categories

PUT /settings/categories

**Request:**
{
  "categories": [
    {
      "id": "1",
      "value": "food",
      "label": "Food & Dining",
      "emoji": "🍽️",
      "enabled": true
    },
    {
      "id": "2",
      "value": "transport",
      "label": "Transportation",
      "emoji": "🚗",
      "enabled": true
    }
  ]
}

### Update Theme

PUT /settings/theme

**Request:**
{
  "theme": "dark"
}

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB
- Docker (optional)

### Environment Variables
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000

### Installation

1. Clone the repository
git clone https://github.com/yourusername/expense-tracker-api.git

2. Install dependencies
npm install

3. Start the server
npm run dev

### Docker Deployment

1. Build the image
./build.sh

2. Run with docker-compose
docker-compose up -d

## 🔒 Authentication

All endpoints except /auth/signup and /auth/signin require authentication.

Add the JWT token to the Authorization header:
Authorization: Bearer your_jwt_token

## 📝 Error Handling

The API returns consistent error responses:

{
  "message": "Error message here",
  "status": 400
}

Common status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.