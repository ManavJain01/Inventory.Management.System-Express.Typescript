# Inventory Management System

## Overview

The Inventory Management System is a full-stack application designed to streamline the management of warehouses, products, and inventory. The application supports multiple user roles: **USER**, **ADMIN**, and **MANAGER**, each with specific permissions and capabilities.

---

## Features

### Authentication

- **Login/Signup** for all roles (USER, ADMIN, MANAGER) using:
  - Name
  - Email
  - Password
  - Role

### Role-Based Functionalities

#### ADMIN

- Create and manage **warehouses**.
  - Attributes: `name`, `location`, `managerID`

#### MANAGER

- Create and manage **products**.
  - Attributes: `name`, `price`
- Manage inventory using the **stack schema**.
  - Attributes: `warehouseId`, `productId`, `quantity`, `lowStackThreshold`

#### USER

- Access and view relevant information as per assigned role permissions.

---

## Data Models

### User Schema

```javascript
{
  name: String,
  email: String,
  password: String,
  role: String // Possible values: "USER", "ADMIN", "MANAGER"
}
```

### Warehouse Schema

```javascript
{
  name: String,
  location: String,
  managerID: String // ID of the assigned manager
}
```

### Inventory Schema

```javascript
{
  name: String,
  price: Number
}
```

### Stock Schema

```javascript
{
  warehouseId: String, // ID of the warehouse
  productId: String, // ID of the product
  quantity: Number, // Available quantity in stock
  lowStackThreshold: Number // Threshold for low stock alerts
}
```

---

## Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js**
- **MongoDB** (or your preferred database)

### Steps

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd inventory-management-system
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables in a `.env` file:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   MAIL_USER = "johndoe@example.com"
   MAIL_PASS = "password123"
   FE_BASE_URL = "http://localhost:3000"
   REFRESH_TOKEN = "refreshtoken";
   ACCESS_TOKEN = "accesstoken"
   ```

5. Start the server:
   ```bash
   npm run local
   npm run dev
   npm run prod
   ```

---

## API Endpoints

### Authentication

- **POST** `/users/` - Register a new user.
- **POST** `/auth/login` - Login to the system.
- **POST** `/auth/logout` - Logout from the system.
- **POST** `/auth/forgot-password` - Email the User to reset password.
- **POST** `/auth/reset-password` - Reset the Password.
- **POST** `/auth/refresh-token` - regenerate access token

### Admin

- **POST** `/warehouse` - Create a new warehouse.
- **GET** `/warehouse` - List all warehouses.
- **GET** `/warehouse/:id` - View a specific warehouse.

### Manager

- **POST** `/inventory` - Create a new product.
- **GET** `/inventory` - List all products.

---

## Technologies Used

- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT), Nodemailer

---

## License

This project is licensed under the MIT License.

---

## Contribution

Contributions are welcome! Feel free to fork the repository and submit a pull request.

---

## Contact

For any queries or issues, please contact:

- **Manav Jain**
- Email: [manavjain@example.com](mailto:nit474011gwl@example.com)
