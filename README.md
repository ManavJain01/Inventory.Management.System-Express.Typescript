# Inventory Management Backend

## Description

This project is a backend solution designed to help small businesses efficiently manage their inventory, track stock levels, and generate detailed reports. It caters to various industries such as retail, e-commerce, and warehouse management systems.

## Use Cases

- **Retail and E-commerce Businesses**: Keep track of product stock levels and generate insights for reordering.
- **Warehouse Management Systems**: Monitor inventory across multiple warehouses in real-time.

## Features

1. **Real-time Stock Level Tracking**:

   - Instantly update and view current stock levels.
   - Ensure accurate inventory data at all times.

2. **Multi-Warehouse Support**:

   - Manage inventory across multiple warehouse locations.
   - View stock levels per warehouse or aggregate data.

3. **Low-Stock Alerts with Reorder Suggestions**:

   - Get notified when stock levels drop below a predefined threshold.
   - Receive automated reorder quantity suggestions based on sales trends.

4. **Reporting Tools with Data Export Functionality**:
   - Generate detailed reports on stock levels, movements, and warehouse performance.
   - Export reports in formats such as CSV or PDF.

## Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)

### Steps

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd inventory-management-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     PORT=5000
     DATABASE_URL=<your-mongodb-connection-string>
     JWT_SECRET=<your-jwt-secret>
     ```

4. Start the server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000`.

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Log in and receive a token.

### Inventory Management

- `GET /api/inventory` - Fetch all inventory items.
- `POST /api/inventory` - Add a new inventory item.
- `PUT /api/inventory/:id` - Update an inventory item.
- `DELETE /api/inventory/:id` - Delete an inventory item.

### Warehouses

- `GET /api/warehouses` - Fetch all warehouses.
- `POST /api/warehouses` - Add a new warehouse.

### Reports

- `GET /api/reports` - Generate inventory reports.
- `GET /api/reports/export` - Export reports as CSV or PDF.

## Technologies Used

- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT for secure authentication
- **Environment Management**: dotenv

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`feature/your-feature-name`).
3. Commit your changes.
4. Push to the branch and submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact

For any inquiries or support, please reach out to the project maintainer:

- **Name**: Manav Jain
- **Email**: nit474011gwl@example.com
