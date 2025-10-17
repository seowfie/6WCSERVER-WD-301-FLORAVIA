# 6WCSERVER-WD-301-FLORAVIA
🌸 Floravia – Flower Shop E-Commerce Web Application
A MEVN Stack Web Application

(MongoDB | Express.js | Vue.js | Node.js)
Final Project for WEBCSERVER and ADDBASE
AY 2025–2026, 1st Semester

📖 Overview

Floravia is a full-stack flower shop web application that enables customers to browse, order, and pay for floral products online.
It was developed using the MEVN stack, combining the flexibility of Vue.js for the frontend and the power of Node.js, Express.js, and MongoDB for backend and database management.

The system provides two sides:

Customer Side: For browsing flowers, adding to cart, and placing orders.
Admin Side: For managing products, inventory, and customer orders.

🧩 Features
🌼 Customer Side
- Browse floral products by category (Romance, Birthday, Congratulatory, Sympathy)
- Add items to cart and proceed to checkout
- Delete items in cart
- Choose mode of payment (Cash on Delivery / GCash)
- Track order status in the profile page
- Create and manage personal accounts (Sign Up / Login)

🌿 Admin Side
- Add, edit, or delete products
- View and update order statuses (Pending, To Ship, To Receive, Completed)
- Monitor inventory actions
- Access dashboard overview for quick management

🗂️ Project Structure
6WCSERVER-WD-301-FLORAVIA/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   │   ├── basketRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── productRoutes.js
│   │   └── userRoutes.js
│   ├── seed/
│   │   └── seedProducts.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md

⚙️ Installation & Setup
1. Clone the Repository
git clone https://github.com/YOUR-USERNAME/6WCSERVER-WD-301-FLORAVIA.git
cd 6WCSERVER-WD-301-FLORAVIA

2. Backend Setup
cd backend
npm init -y
npm install express mongoose cors dotenv
npm install nodemon --save-dev


Run the backend server:
node server.js
# or
npx nodemon server.js

3. Frontend Setup
Open a new terminal and navigate to the frontend folder:
cd frontend
# (optional) create a temp folder for setup
mkdir temp && cd temp
npm init vue@latest


Follow the prompts:
• Project name → my-mevn-frontend
• Add TypeScript? → No
• Add JSX Support? → No
• Add Vue Router? → Yes
• Add Pinia for state management? → Yes
• Add Vitest for testing? → No
• Add ESLint? → Yes
• Add Prettier? → Yes

Then install dependencies:
npm install
npm install axios
npm install @vitejs/plugin-vue

Run the development server:
npm run dev

👤 Admin Credentials

To access the Admin Dashboard, use the following credentials:

Email	Password
email: cedricluis18@gmail.com
password: cedielord

⚠️ Note: For security reasons, these credentials are for testing and demonstration only.

🧠 Technologies Used
Frontend	Vue.js, Vite, Pinia, Axios
Backend	Node.js, Express.js
Database	MongoDB
Tools	ESLint, Prettier, dotenv, nodemon

👩‍💻 Team Members and Roles
Member	Responsibilities
Curley, Adrian D.	
- UI/UX / Frontend Developer
- Designs user interface and system layout using Vue.js; ensures responsiveness and user-friendly experience

Dungca, Cedric Luis R.	
- Database Administrator
- Designs MongoDB schema, manages collections, ensures data integrity and security

Rosal, Aira Mae T.	
- Backend Developer
- Develops API endpoints using Node.js and Express.js; ensures secure backend–frontend integration

Sanchez, Katherine G.	
- Quality Assurance / Tester
- Tests system functionalities, identifies bugs, and ensures all features are working before deployment
  
Sarmiento, Sofia Anne T.	
-Project Manager / UI/UX / Frontend Developer	
- Oversees project workflow, ensures design and development consistency, manages documentation and presentation


📊 Database Summary

Database Name: floravia
Collections: info, admin, products, cart, orders, order_details, inventory



This project is created for academic purposes under
Holy Angel University – Web Development 301
All rights reserved © 2025
