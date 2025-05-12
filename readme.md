# 🚲 Bike Servicing Management API

A backend API built for managing bike servicing operations at a bike servicing center. This system allows the center to manage customers, bikes, and service records efficiently with support for assignment, completion tracking, and overdue service identification.

---

## 🔗 Live Backend

[https://bike-servicing-management-ivory.vercel.app](https://bike-servicing-management-ivory.vercel.app)

---

## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **Zod (for validation)**

---

## 📦 Key Features

- Customers API

    - Create, Read, Update, Delete customer data

- Bikes API

    - Register bikes and link them to customers

    - Fetch and manage bikes by customer

- Service Records API

    - Create service jobs for bikes

    - Mark services as complete with optional completionDate

    - Retrieve pending/in-progress or overdue services (older than 7 days)

- Error Handling

    - Structured error responses (Zod, Prisma, and custom logic)

- Type Safety

    - Strong typings using TypeScript and Zod

---

## 🚀 Setup Guide

1. **Clone the repository**

    ```bash
    git clone https://github.com/Shakiqurrahman/Bike-servicing-management.git
    cd Bike-servicing-management

    ```

2. Install dependencies:

    ```js
    npm install
    ```

3. Set up environment variables:

    ```js
    PORT = 4000;
    DATABASE_URL = your_database_url;
    ```

#### Usage

- Run the development server:

    ```js
    npm run dev
    ```

- build for production:

    ```js
    npm run build
    ```

- check the EsLint error:

    ```js
    npm run lint
    ```

- fix the EsLint error:

    ```js
    npm run lint:fix
    ```

### Thank You
