🚀 CRM Management System

A Customer Relationship Management (CRM) System built with React.js and Spring Boot.

This application helps businesses manage customers, track leads, organize tasks, and monitor sales deals, while providing business insights through an analytics dashboard.

Login access:
email:admin1@gmail.com
password:123456

📌 Project Overview

The CRM platform centralizes customer interactions, sales pipelines, and task management into one system.

It enables organizations to:

✔ Manage customer data

✔ Track leads and conversions

✔ Monitor sales performance

✔ Assign tasks to team members

✔ View real-time business analytics

✨ Features

🔐 Authentication

Secure login system

JWT authentication

Protected API routes

Session-based access control

📊 Dashboard Analytics

The dashboard provides a real-time overview of business performance.

Key Metrics

👥 Total Customers

🎯 Total Leads

📋 Open Tasks

💰 Total Deals

📈 Total Revenue

Charts

📊 Revenue trend chart

🥧 Lead conversion pie chart

📉 Task status distribution

👥 Customer Management

Manage all customer information in one place.

Features:

✔ Add new customers

✔ View customer list

✔ Edit customer details

✔ Delete customers

✔ Store customer data:

Company

Phone

Email

Address

Notes

🎯 Lead Management

Track potential clients and convert them into customers.

Lead statuses:

New → Contacted → Converted → Lost

Features:

✔ Add leads

✔ Track lead source

✔ Assign sales representative

✔ Update lead status

✔ Edit / delete leads

📋 Task Management

Organize and track tasks assigned to team members.

Task features:

✔ Create tasks

✔ Assign tasks to users

✔ Set priority levels

Low

Medium

High

✔ Track task progress

Open

In Progress

Completed

✔ Manage deadlines

💰 Sales Management

Track deals and sales performance.

Sales stages:

Prospect → Negotiation → Won → Lost

Features:

✔ Create deals

✔ Associate deals with customers

✔ Track deal value

✔ Record closing date

✔ Manage sales pipeline

🛠 Technology Stack

🎨 Frontend

React.js

Axios

Recharts (analytics)

CSS

⚙ Backend

Spring Boot

Spring Security

JWT Authentication

REST API

🗄 Database

MySQL

🧰 Development Tools

Maven

Postman

GitHub

VS Code

IntelliJ IDEA

📁 Project Structure

crm-project
│
├── frontend (React)

│   ├── components

│   │   ├── Sidebar

│   │
│   ├── pages

│   │   ├── Dashboard

│   │   ├── Customers

│   │   ├── Leads

│   │   ├── Tasks

│   │   └── Sales
│   │
│   └── services
│
└── backend (Spring Boot)

    ├── controller
    
    ├── service
    
    ├── repository
    
    ├── model
    
    ├── security
    
    └── config
    
⚙ Installation & Setup

1️⃣ Clone the Repository

git clone https://github.com/FayazBalajipeta/crm-system.git

🔧 Backend Setup (Spring Boot)

Navigate to backend folder

cd crm-backend

Run the application

mvn spring-boot:run

Backend server runs at:

http://localhost:8081

💻 Frontend Setup (React)

Navigate to frontend folder

cd crm-frontend

Install dependencies

npm install

Run the application

npm start

Frontend runs at:

http://localhost:3000

🔗 API Endpoints

Authentication

POST /api/auth/login

POST /api/auth/register

Customers

GET /api/customers

POST /api/customers

PUT /api/customers/{id}

DELETE /api/customers/{id}

Leads

GET /api/leads

POST /api/leads

PUT /api/leads/{id}

DELETE /api/leads/{id}

Tasks

GET /api/tasks

POST /api/tasks

PUT /api/tasks/{id}

DELETE /api/tasks/{id}

Sales

GET /api/sales

POST /api/sales

PUT /api/sales/{id}

DELETE /api/sales/{id}

📊 Dashboard Preview

<img width="959" height="445" alt="CRM Dashboard" src="https://github.com/user-attachments/assets/750c9431-d999-4235-94d9-ac9f066e41dc" />

customers page preview
<img width="1912" height="781" alt="image" src="https://github.com/user-attachments/assets/3f4a9ac8-4110-4b45-9bc7-bcab9b30527a" />

leads page preview
<img width="1919" height="723" alt="image" src="https://github.com/user-attachments/assets/14d8786d-2b91-4975-bc8d-e3eb4a54bc41" />

task page preview
<img width="1917" height="714" alt="image" src="https://github.com/user-attachments/assets/693f4fbd-9a0b-43cc-952f-390d76af0ebb" />

sales page preview
<img width="1901" height="760" alt="image" src="https://github.com/user-attachments/assets/36d97230-c559-4516-80a8-2331718d8264" />



🚀 Future Enhancements


Possible improvements for future versions:

🔍 Global search

📄 Pagination

📧 Email notifications

🔐 Role-based access control

📊 Sales pipeline board

📤 Export reports

📱 Mobile responsive UI

🌙 Dark mode

👨‍💻 Author

Fayaz Balajipeta

Full Stack Developer
