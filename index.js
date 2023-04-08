require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const port = process.env.PORT || 5000;
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const fileUpload = require('express-fileupload');
const path = require('path');
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_KEY, { useNewUrlParser: true, useUnifiedTopology: true }).then((result) => {
  app.listen(port);
});



app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload({
  limits: { fileSize: 600000 },
  abortOnLimit: true,
  createParentPath: true
}));

app.use('/uploads/images', express.static(path.join('uploads', 'images',)));

app.use(userRoutes);
app.use(productRoutes);
app.use(orderRoutes);

