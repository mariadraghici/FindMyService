const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');
const cors = require('cors');

// Import Routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const brandRoutes = require('./routes/brand');
const modelRoutes = require('./routes/model');
const carRoutes = require('./routes/car');
const userRoutes = require('./routes/user');
const facilityRoutes = require('./routes/facility');

// Connect to MongoDB
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

// MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));

// Routes Middleware
app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/api", brandRoutes);
app.use("/api", modelRoutes);
app.use("/api", carRoutes);
app.use("/api", userRoutes);
app.use("/api", facilityRoutes);

// Error Handler Middleware
app.use(errorHandler);

const port = process.env.PORT || 8000;


app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});