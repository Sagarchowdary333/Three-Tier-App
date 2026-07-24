const API_URL = "http://localhost:5000/employees";

// Load Employees
async function loadEmployees() {

    const response = await fetch(API_URL);

    const employees = await response.json();

    const table = document.getElementById("employeeTable");

    table.innerHTML = "";

    employees.forEach(employee => {

        table.innerHTML += `
        <tr>

            <td>${employee.id}</td>

            <td>${employee.name}</td>

            <td>${employee.department}</td>

            <td>${employee.salary}</td>

            <td>

                <button
                    class="delete"
                    onclick="deleteEmployee(${employee.id})">
                    Delete
                </button>

            </td>

        </tr>
        `;

    });

}

// Add Employee
async function addEmployee() {

    const name = document.getElementById("name").value;

    const department = document.getElementById("department").value;

    const salary = document.getElementById("salary").value;

    if(name==="" || department==="" || salary===""){
        alert("Please fill all fields");
        return;
    }

    await fetch(API_URL,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            name,
            department,
            salary
        })

    });

    document.getElementById("name").value="";

    document.getElementById("department").value="";

    document.getElementById("salary").value="";

    loadEmployees();

}

// Delete Employee
async function deleteEmployee(id){

    await fetch(`${API_URL}/${id}`,{

        method:"DELETE"

    });

    loadEmployees();

}

loadEmployees();