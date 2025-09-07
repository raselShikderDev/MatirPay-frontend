# MatirPay

MatirPay is a **digital payment system** designed to simplify transactions for users, agents, and admins. It provides a seamless interface for managing payments, wallets, and transaction histories with a secure and modern architecture, and best practices for scalability and maintainability.

MatirPay allows different roles to:

- **Authentication** using JWT and session cookies
- **Send and receive and withdraw money** between users and agents
- **Transaction history** with advanced filters
- **High performance** with TypeScript + Bun
- **Input validation** using Zod for robust API requests
- **Security-focused design** with authorization, and data validation
<br>
---

## Project Overview

user can:
- Create and manage digital wallets
- Send and receive payments
- Track transaction history
- Manage profiles and security settings

Agents can:

- Perfom actions after approval
- Manage customer accounts
- Assist users with transactions
- Monitor payments and wallet balances

Admins can:

- Monitor the platform
- Manage users, agents, and wallets
- View and export transaction reports
- Handle system-wide configurations

---

## Technology Stack

**Frontend**

- React 19, React Router 7
- Redux Toolkit
- Tailwind CSS + Tailwind Merge
- React Hook Form + Zod for form validation
- Shadcn for readymade UI components
- Origin UI (for using custom shadcn blocks)
- Vite (build tool)
- React Joyride for guided tours

**Backend**

- Node.js + Express (TypeScript-ready)
- MongoDB (Mongoose ORM)
- Redis for caching
- JWT authentication and secure cookies
- Zod for request validation

**Dev Tools**

- Bun or npm package manager
- ESLint + Prettier
- TypeScript
- Vercel deployment

---

## In-Depth Folder Structure

```postgre
MatirPay-frontend/
├── public/                         # Static assets and root HTML & Main HTML file loaded by Vite
├── src/                            # Application source code
│   ├── assets/                     # Static resources like images, icons, fonts
│   │   ├── images/                 # All images used in the app
│   │   ├── icons/                  # SVG or icon files
│   │   └── fonts/                  # Custom fonts
│   ├── components/                 # Reusable UI components
│   │   ├── layout/                 # Layout components
│   │   ├── module/                 # Feature-specific modules/components 
│   │       ├── admin/              # Admin-related components
│   │       ├── authentications/    # Auth-related components
│   │       ├── homePage/           # Home page components
│   │       └── universal/          # Components used across multiple page
│   ├── hooks/                      # Custom React hooks
│   ├── pages/                      # Page-level components
│   │   ├── admin/                  # Admin-specific pages
│   │   │   ├── agentApprovePage.tsx     # Page to approve agent accounts
│   │   │   ├── allUsers.tsx             # View all users
│   │   │   ├── dashboardAdmin.tsx       # Admin dashboard overview
│   │   │   └── suspendAgentPage.tsx     # Suspend/manage agents
│   │   ├── agent/                  # Agent-specific pages
│   │   ├── authentications/        # Authentication pages
│   │   ├── universalPages/         # Universal pages for all users
│   │   ├── user/                   # User-specific pages
│   │   ├── aboutPage.tsx           # About page
│   │   ├── contactPage.tsx         # Contact page
│   │   ├── faqPage.tsx             # FAQ page
│   │   ├── featurePage.tsx         # Features page
│   │   ├── homePage.tsx            # Homepage
│   │   ├── pricingPage.tsx         # Pricing page
│   │   └── unauthorizedPage.tsx    # Unauthorized access page
│   ├── redux/                      # Redux setup
│   |   ├── axiosBaseQuery.ts           # Axios base Query
│   |   ├── baseApi.ts                  # Base query
│   |   ├── hooks.ts                    # all hooks
│   |   ├── store.ts                    # redu store
│   |   └── features/                   # Feature slices
│   |   ├── auth                        # Auth api
│   |   ├── transactions                # transactions api
│   |   ├── users                       # User Api
│   |   └── wallet                      # Wallet Api
│   ├── utils/                      # Utility functions
│   └── App.tsx                     # Main React component and router setup
│   └── App.css                     # Custom CSS file for app
│   └── index.css                   # Main CSS file
│   └── main.tsx                    # Main React component
├── .env                            # Environment variables
├── .env.example                    # Example environment variables
├── .gitignore                      # Git ignore rules
├── .prettierrc                     # Prettier configuration
├── bun.lock                        # Bun package manager lock file
├── components.json                 # Component library configuration
├── eslint.config.js                # ESLint configuration
├── index.html                      # Entry HTML file (also in public)
├── package.json                    # Project metadata, scripts, dependencies
├── tsconfig.app.json               # TypeScript config for the app
├── tsconfig.json                   # Base TypeScript configuration
├── tsconfig.node.json              # TypeScript config for Node (if needed)
└── vite.config.ts                  # Vite configuration file


```

<br>

## Live URL

Check out the live deployed app on Vercel: [MatirPay Demo](https://matir-pay-wallet.vercel.app)<br>
<br>

## 🧪 Testing

Currently no unit tests are implemented. You can add Jest / Supertest to test API endpoints in the future.<br>
<br>

## ⚙️ Setup Instructions

1.  **Clone the repository**

    ```bash
    git clone [https://github.com/raselShikderDev/MatirPay-frontend](https://github.com/raselShikderDev/MatirPay-frontend)
    cd matirPay
    ```

2.  **Install dependencies**

    - Using Bun (recommended):

    ```bash
    bun install
    ```

    - Or using npm:

    ```bash
    npm install
    ```

3.  **Configure environment variables**
    MatirPay uses a `.env` file for storing sensitive configurations like database credentials, JWT secret, and email settings.

4.  **Run the project**
    - Development mode (with hot reload):
    ```bash
    bun run dev
    ```
    - Build and run production:
    ```bash
    bun run build
    bun run start
    ```

---

<br>

## Test Credentials

### Admin

- **Email:** admin@matirpay.com
- **Password:** Admin@123

### Agent

- **Email:** agent@matirpay.com
- **Password:** Agent@123

### User

- **Email:** user@matirpay.com
- **Password:** User@123

---

<br>

## Notes

- Full TypeScript support
- Zod used for frontend & backend validation
- Tailwind CSS + Radix UI for modern responsive UI
- Environment variables stored in `.env` and `.env.example`  
  <br>

## 📜 License

This project is licensed under the **MIT License**. You are free to use, modify, and distribute with attribution.
