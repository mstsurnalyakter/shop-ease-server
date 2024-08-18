# ShopEase Backend

- **Live Site URL:** [ShopeEase](https://shop-ease-4a820.web.app)

- **Server Site Repository:** [Client](https://github.com/mstsurnalyakter/shop-ease-client)

## Description
ShopEase Backend is a Node.js application that provides API endpoints for a shopping platform. It connects to a MongoDB database and supports functionalities such as fetching products, filtering by brand and category, sorting by price or date, and pagination.

## Getting Started


### Prerequisites

Make sure you have the following installed:

- Node.js
- MongoDB
- npm or yarn

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/mstsurnalyakter/shop-ease-server
    ```

2. **Navigate to the project directory:**
    ```bash
    cd shop-ease-server
    ```

3. **Install dependencies:**
    ```bash
    npm install
    ```

4. **Set up environment variables:**
    Create a `.env` file in the root directory and add the following:
    ```env
    MONGODB_URI=<your-mongodb-connection-string>
    PORT=5000
    ```

5. **Start the server:**
    ```bash
    npm start
    ```

## API Endpoints

### `GET /products`
Fetches a list of products with support for pagination, search, filtering, and sorting.

**Query Parameters:**
- `page` (number): The page number for pagination.
- `size` (number): Number of products per page.
- `search` (string): Search term for product names.
- `brand` (string): Filter by brand name.
- `category` (string): Filter by category name.
- `priceMin` (number): Minimum price filter.
- `priceMax` (number): Maximum price filter.
- `sortBy` (string): Sorting option (`price-asc`, `price-desc`, `date-desc`).

### `GET /products-count`
Fetches the total count of products based on filters.

**Query Parameters:**
- `search` (string): Search term for product names.
- `brand` (string): Filter by brand name.
- `category` (string): Filter by category name.
- `priceMin` (number): Minimum price filter.
- `priceMax` (number): Maximum price filter.
