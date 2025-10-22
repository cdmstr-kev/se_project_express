# WTWR Express API

## Project Description

WTWR (What to Wear) Express API is a RESTful backend service that powers a weather-based clothing recommendation 
application. The API manages user profiles and clothing items with secure authentication, allowing users to 
create accounts, log in, and manage their personal wardrobe collections based on weather conditions. 
Users can add clothing items categorized by weather types (hot, warm, cold), like/unlike items, 
and maintain personalized profiles.

### Key Functionality:

- User authentication with JWT (JSON Web Tokens)
- Secure user registration and login
- Password hashing with bcrypt
- User profile management with avatar support
- Clothing item CRUD operations
- Weather-based clothing categorization
- Like/unlike system for clothing items
- Persistent data storage with MongoDB
- Input validation and error handling
- Authorization middleware for protected routes

## Technologies and Techniques Used

### Backend Technologies:

- **Node.js** - JavaScript runtime environment
- **Express.js—** Web application framework for building RESTful APIs
- **MongoDB** - NoSQL database for data persistence
- **Mongoose—** Object Data Modeling (ODM) library for MongoDB

### Development Tools:

- **ES6+ JavaScript** - Modern JavaScript features including arrow functions, destructuring, and async/await
- **Prettier** - Code formatting for a consistent style
- **ESLint—** Code linting with Airbnb configuration for code quality
- **Nodemon—** Development tool for automatic server restart

### Authentication and Security:

- **JWT (jsonwebtoken)** - Token-based authentication for secure API access
- **bcryptjs—** Password hashing for secure credential storage
- **Validator.js** - URL and email validation
- **Mongoose Schema Validation** - Data validation at the database level
- **Authorization Middleware—** Route protection for authenticated users

### Code Quality Techniques:

- RESTful API design principles
- Modular architecture with separate controllers, models, routes, and middlewares
- Consistent error handling with appropriate HTTP status codes
- ES6 features: const/let declarations, arrow functions, template literals
- Secure authentication flow with JWT tokens

## Project Features

### API Endpoints Overview:

**Authentication:**

- POST `/signup` - Register a new user account (returns JWT token)
- POST `/signin` - Login existing user (returns JWT token)

**User Management:**

- GET `/users/me` - Get current user profile (protected)
- PATCH `/users/me` - Update current user profile (protected)

**Clothing Items:**

- GET `/items` - Get all clothing items
- GET `/items/:clothingItemID` - Get specific item
- POST `/items` - Create new clothing item (protected)
- PUT `/items/:clothingItemID/likes` - Like an item (protected)
- DELETE `/items/:clothingItemID/likes` - Unlike an item (protected)
- DELETE `/items/:clothingItemID` - Delete an item (protected)

### Authentication Flow:

1. User registers via `/signup` endpoint with email, password, name, and avatar
2. Password is hashed using bcrypt before storage
3. JWT token is issued upon successful registration or login
4. Client includes token in `Authorization: Bearer <token>` header for protected routes
5. Authorization middleware verifies token and attaches user info to requests


## Code Formatting

The project maintains a consistent code style using:

- **Prettier** configuration for automatic formatting
- **ESLint** with an Airbnb style guide
- Consistent indentation and spacing
- Proper semicolon usage
- Organized imports and exports
