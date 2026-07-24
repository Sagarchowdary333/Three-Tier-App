const express = require("express");

const router = express.Router();

const {
    getEmployees,
    addEmployee,
    deleteEmployee
} = require("../controllers/employeeController");

// Get All Employees
router.get("/", getEmployees);

// Add Employee
router.post("/", addEmployee);

// Delete Employee
router.delete("/:id", deleteEmployee);

module.exports = router;