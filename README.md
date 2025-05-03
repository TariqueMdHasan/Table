# 📊 MERN Table App

A customizable and persistent table built with the MERN stack, featuring **draggable** and **resizable** columns. This app allows users to personalize their table layout and stores their preferences (column order and widths) using a Node.js/Express backend with MongoDB.

## ✨ Features

* 톱️ **Resizable columns** using [`react-table-column-resizer`](https://www.npmjs.com/package/react-table-column-resizer)
*  **Draggable columns** for reordering
*  **Persistent layout** saved in MongoDB
  Built with **React**, **Node.js**, **Express**, and **MongoDB**
   Easily extendable for future enhancements like sorting, filtering, and authentication

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

* Node.js (v14+)
* MongoDB (local or cloud instance)
* npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone[ https://github.com/TariqueMdHasan/Table.git
   cd mern-table-app
   ```

2. **Install server dependencies:**

   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies:**

   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**

   In the `server` directory, create a `.env` file:

   ```env
   MONGODB_URI=mongodb://localhost:27017/mern-table
   PORT=5000
   ```

5. **Start the development servers:**

   In two separate terminals:

   * Backend:

     ```bash
     cd server
     npm run dev
     ```

   * Frontend:

     ```bash
     cd client
     npm start
     ```

## 🧱 Project Structure

```
mern-table-app/
├── client/           # React frontend
│   ├── src/
│   └── public/
├── server/           # Node.js + Express backend
│   ├── models/
│   ├── routes/
│   └── controllers/
```


## APIs
  * API for creating data
    ```
    https://table-2jki.onrender.com/api/table/create
    ```
    *input method
    ```
    {
    "name": "Tofi",
    "amount": 21344,
    "description": "How",
    "checkbox": true
    }
    ```
    
  * API for getting all data (post method)
    ```
    https://table-2jki.onrender.com/api/table/full-table
    ```

 * API for getting data by limit and page number (det method)
   ```
   https://table-2jki.onrender.com/api/table/data?limit=5&page=1
   ```

* API for controlling whether checked or not checked, what is {patch method}
  ```
  https://table-2jki.onrender.com/api/table/data/${id}
  ```

* API for deleting row data (delete method)
  ```
  https://table-2jki.onrender.com/api/table/data/${id}
  ```



---

Made with ❤️ using the MERN stack.
