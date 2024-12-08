require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const auth = require("./middleware/authMiddleware");
const categoryRoutes = require("./routers/categoryRoutes");
const practiceRoutes = require("./routers/practiceRoutes");
const recordRoutes = require("./routers/recordRoutes");
const patientRoutes = require("./routers/patientRoutes");
const metricRoutes = require("./routers/metricRoutes");
const {authRouter} = require('./routers/authRouter');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
const corsOptions = {
  origin: "https://smartlife-poc.netlify.app", // Allowed origins
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "authorization"], // Headers allowed in requests
  credentials: true, // Allow credentials (cookies, auth headers)
};

app.use(cors(corsOptions));
 app.use(bodyParser.json());

app.get('/', (req,res)=>{
   res.send('Hello');
})
// Routes
app.use("/api", authRouter);
app.use("/api/categories", auth, categoryRoutes);
app.use("/api/practices", auth, practiceRoutes);
app.use("/api/records", auth ,recordRoutes);
app.use("/api/patients", auth , patientRoutes);
app.use("/api/metrics", auth, metricRoutes);
 
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
