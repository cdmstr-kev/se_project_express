# WTWR Express API

## Project Description

WTWR (What to Wear) Express API is a RESTful backend service that powers a weather-based clothing recommendation application. The API manages user profiles and clothing items, allowing users to create, organize, and interact with clothing recommendations based on weather conditions. Users can add clothing items categorized by weather types (hot, warm, cold), like/unlike items, and manage their personal wardrobe collections.

### Key Functionality:

- User profile management with avatar support
- Clothing item CRUD operations
- Weather-based clothing categorization
- Like/unlike system for clothing items
- Persistent data storage with MongoDB
- Input validation and error handling

## Technologies and Techniques Used

### Backend Technologies:

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework for building RESTful APIs
- **MongoDB** - NoSQL database for data persistence
- **Mongoose** - Object Data Modeling (ODM) library for MongoDB

### Development Tools:

- **ES6+ JavaScript** - Modern JavaScript features including arrow functions, destructuring, and async/await
- **Prettier** - Code formatting for consistent style
- **ESLint** - Code linting with Airbnb configuration for code quality
- **Nodemon** - Development tool for automatic server restart

### Validation and Security:

- **Validator.js** - URL validation for user avatars and clothing item images
- **Mongoose Schema Validation** - Data validation at the database level

### Code Quality Techniques:

- RESTful API design principles
- Modular architecture with separate controllers, models, and routes
- Consistent error handling with appropriate HTTP status codes
- ES6 features: const/let declarations, arrow functions, template literals

## Project Features

### API Endpoints Overview:

**User Management:**

- GET `/users` - Retrieve all users
- GET `/users/:userID` - Get specific user by ID
- POST `/users` - Create new user profile

**Clothing Items:**

- GET `/items` - Get all clothing items
- GET `/items/:clothingItemID` - Get specific item
- POST `/items` - Create new clothing item
- PUT `/items/:clothingItemID/likes` - Like an item
- DELETE `/items/:clothingItemID/likes` - Unlike an item
- DELETE `/items/:clothingItemID` - Delete an item

## Installation and Setup

### Prerequisites:

- Node.js (v14 or higher)
- MongoDB (running locally)
- npm package manager

## Code Formatting

The project maintains consistent code style using:

- **Prettier** configuration for automatic formatting
- **ESLint** with Airbnb style guide
- Consistent indentation and spacing
- Proper semicolon usage
- Organized imports and exports
