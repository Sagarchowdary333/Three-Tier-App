const express = require("express");
const cors = require("cors");

const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send("Employee Management Backend is Running...");
});

// Employee Routes
app.use("/employees", employeeRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});