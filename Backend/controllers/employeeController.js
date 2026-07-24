const db = require("../db");

// Get All Employees
const getEmployees = (req, res) => {

    const sql = "SELECT * FROM employees";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

};

// Add Employee
const addEmployee = (req, res) => {

    const { name, department, salary } = req.body;

    const sql =
        "INSERT INTO employees (name, department, salary) VALUES (?, ?, ?)";

    db.query(sql, [name, department, salary], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            success: true,
            message: "Employee Added Successfully",
            employeeId: result.insertId
        });

    });

};

// Delete Employee
const deleteEmployee = (req, res) => {

    const id = req.params.id;

    const sql = "DELETE FROM employees WHERE id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            success: true,
            message: "Employee Deleted Successfully"
        });

    });

};

module.exports = {
    getEmployees,
    addEmployee,
    deleteEmployee
};