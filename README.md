# 🏦 Zerov-Bank API

## 📌 Overview

Zerov-Bank API adalah backend aplikasi perbankan sederhana yang dibangun menggunakan NestJS dan Prisma. API ini memungkinkan pengguna untuk melakukan registrasi, login, mengelola akun bank, serta melakukan transaksi seperti deposit, withdraw, dan transfer.

---

## 🚀 Features

### 🔐 Authentication

* Register user
* Login user (JWT Authentication)

### 👤 User

* Get profile
* Update profile

### 🏦 Account

* Create account
* Get all user accounts
* Get account by ID
* Update account
* Delete account

### 💸 Transaction

* Deposit
* Withdraw
* Transfer
* Get transaction history
* Get transaction detail

### 🛡️ Authorization

* JWT-based authentication
* Role-Based Access Control (Admin & Customer)

---

## 🛠️ Tech Stack

* NestJS
* Prisma ORM
* PostgreSQL
* JWT Authentication
* PNPM

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd zerov-bank
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Setup Environment Variables

Buat file `.env`:

```env
DATABASE_URL="your_database_url"
JWT_SECRET="your_secret_key"
```

---

### 4. Run Migration

```bash
pnpm prisma migrate dev
```

---

### 5. Run Application

```bash
pnpm run start:dev
```

---

## 🌐 API Base URL

### Local:

```
http://localhost:3000
```

### Production:

```
https://your-railway-url.up.railway.app
```

---

## 🧪 API Testing

Gunakan Postman atau tools lainnya untuk testing endpoint.

Contoh:

* `POST /auth/login`
* `GET /accounts`
* `POST /transactions/transfer`

---

## 🔑 Authentication

Gunakan Bearer Token:

```
Authorization: Bearer <your_token>
```

---

## 📦 Project Structure

```
src/
├── auth/
├── user/
├── account/
├── transaction/
├── prisma/
```

---

## ✅ Status

* ✔ Authentication
* ✔ Account CRUD
* ✔ Transaction (Deposit, Withdraw, Transfer)
* ✔ Transaction History
* ✔ Role-Based Access

---

## 📌 Notes

* Pastikan database sudah terkoneksi
* Gunakan Prisma migrate untuk update schema
* Token JWT memiliki masa berlaku (default: 1 hari)

---

## 🎯 Future Improvements

## Swagger Documentation ##
https://milestone-4-zahratunnisa1-production.up.railway.app/api

* Unit Testing (Jest)

## Deployment optimization ##
## milestone-4-zahratunnisa1-production.up.railway.app (Link Railway)##

---

## 👩‍💻 Author

Zahra



