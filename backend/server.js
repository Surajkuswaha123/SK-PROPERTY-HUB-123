const express = require("express");
const cors = require("cors");
require("dotenv").config();

const leadRoutes = require("./routes/leadRoutes");

const app = express();

/* ==========================
   MIDDLEWARE
========================== */

app.use(cors({
    origin: "http://127.0.0.1:5500"
}));

app.use(express.json());

/* ==========================
   ROUTES
========================== */

app.use("/api/leads", leadRoutes);

/* ==========================
   TEST ROUTE
========================== */

app.get("/", (req, res) => {
    res.send("SK Property Hub Backend Running Successfully 🚀");
});

/* ==========================
   SERVER
========================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
});