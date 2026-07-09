require("dotenv").config();
const path = require('path');
const cors = require("cors");
const express = require('express');
const db = require('./config/db');

const benner = require('./src/modules/Benner/benner.route');
const userRoute = require('./src/modules/user/user.route');
const customer = require('./src/modules/customer/customer.route');
const addcart = require('./src/modules/cart/cart.route');
const admin = require('./src/modules/admin/admin.route');
const category = require('./src/modules/category/category.route');
const product = require('./src/modules/product/product.route');
const address = require('./src/modules/address/address.route');
const order = require('./src/modules/order/order.route');
const payment = require('./src/modules/payment/payment.route');
const footer = require('./src/modules/footer/footer.route');
const subscribers = require('./src/modules/subscribers/subscribers.route');
const brand = require('./src/modules/brands/brand.route');
const setting = require('./src/modules/setting/setting.route');
const contact=require('./src/modules/contact/contact.route')
const Addadmin=require('./src/modules/Addadmin/addmin.route');
const helmet = require('helmet');

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({
  limit: "50mb",
  extended: true,
}));

// ✅ FIX 1: wildcard '*' nahi, specific origin + credentials true
app.use(cors({
  origin: ["https://dairy-fresh-admin.vercel.app", "http://localhost:3000","https://dairyfresh-project-714s.vercel.app"],
  credentials: true
}));

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(express.json());

// ✅ Pehle static files
app.use('/uploads', express.static(path.join(__dirname, 'src', 'uploads')));

db();

// ✅ FIX 2: './api/setting' galat tha, '/api/setting' sahi hai
app.use('/api', userRoute);      // ✅ login/register pehle
app.use('/api', customer);
app.use('/api/setting', setting);
app.use('/api/footer', footer);
app.use('/api/brand', brand);
app.use('/api/benner', benner);
app.use('/api/admin', admin);
app.use('/api/cart', addcart);
app.use('/api/category', category);
app.use('/api/product', product);
app.use('/api', address);
app.use('/api', order);
app.use('/api', payment);
app.use('/api/contact', contact);
app.use('/api/addadmin', Addadmin);
app.use('/api/sub', subscribers);



const port = 3002;
app.listen(port, () => {
  console.log(`server is start ${port}`);
});