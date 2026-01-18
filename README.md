# 🛒 Items App (Next.js + Express)

A simple full-stack application built with **Next.js (App Router)** and **Express.js**.
This project demonstrates public pages, mock authentication, item listing, item details, and a protected page for adding new items.

---

## 🚀 Live Demo

🔗 **Live Site:** [https://item-app-xi.vercel.app/](https://item-app-xi.vercel.app/)
🔗 **Backend API:** [https://item-app-server.vercel.app/items](https://item-app-server.vercel.app/items)

---

## 🔐 Login Credentials (Mock Authentication)

```
Email: test@example.com
Password: 123456
```

---

## 📌 Project Features

### 🌐 Public Features

* Landing page with **7 sections** (Hero, Features, Categories, Popular Items, How It Works, Testimonials, CTA)
* Public **Items List Page**
* Public **Item Details Page**
* Responsive Navbar & Footer

### 🔐 Authentication

* Mock login using hardcoded email & password
* Authentication state stored in **cookies**
* Route protection for authenticated pages
* Auto redirect after successful login

### 🛍️ Items Management

* Fetch items from **Express.js API**
* Display items with:

  * Image
  * Name
  * Price
  * Description
* Dynamic route for item details

### ➕ Protected Page: Add Item

* Only accessible when logged in
* Add new items with:

  * Name
  * Price
  * Image URL
  * Description
* Data stored via Express.js backend
* Toast notification on successful item creation

---

## 🧭 Route Summary

| Route         | Description  | Access    |
| ------------- | ------------ | --------- |
| `/`           | Landing Page | Public    |
| `/login`      | Login Page   | Public    |
| `/items`      | Items List   | Public    |
| `/items/[id]` | Item Details | Public    |
| `/add-item`   | Add New Item | Protected |

---

## 🛠️ Technologies Used

### Frontend

* **Next.js 15/16** (App Router)
* React
* Tailwind CSS
* js-cookie
* react-hot-toast

### Backend

* **Express.js**
* REST API
* JSON-based data storage

### Deployment

* **Vercel** (Frontend)
* **Render / Railway** (Backend)

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/masad40/next-sc.git
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run frontend

```bash
npm run dev
```

### 4️⃣ Run backend (Express)

```bash
node index.js
```

---

## 📄 Project Purpose

This project was built as part of a learning task to understand:

* Next.js App Router fundamentals
* Client-side authentication
* Protected routes
* API integration
* Full-stack application workflow

---

## 👤 Author

**Asaduzzaman Masad**
🌐 Portfolio: [https://asaduzzaman-40.netlify.app](https://asaduzzaman-40.netlify.app)

---

## ⭐ Acknowledgement

Thanks to the assignment guidelines for helping structure this project and improve real-world Next.js skills.
