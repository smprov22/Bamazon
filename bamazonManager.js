var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("cli-table");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon_db"
});

function options() {
    inquirer
        .prompt([
          {
            name: "actions",
            type: "rawlist",
            message: "Please choose from the following actions.",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
          },
        ])
        .then(function(answer) {
            if (answer.actions === "View Products for Sale") {
                viewProducts();
            } else if (answer.actions === "View Low Inventory") {
                lowInventory();
            } else if (answer.actions === "Add to Inventory") {
                addInventory();
            } else if (answer.actions === "Add New Product") {
                addProduct();
            }
        })
}

function viewProducts() {
    connection.query("SELECT * FROM products", function(err, results) {
        //Makes table
        var table = new Table({
          head: ["ID", "Product Name", "Department", "Price", "Quantity"]
        })
        
        console.log("Items for sale:")
        console.log("<-------------------------------------------------------->")
        for (var i = 0; i < results.length; i++) {
          table.push([results[i].id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity]);
        }
        console.log(table.toString());
        nextAction();
    })
    
}

function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 20", function(err, results) {
        //Makes table
        var table = new Table({
          head: ["ID", "Product Name", "Department", "Price", "Quantity"]
        })
        
        console.log("Items for sale:")
        console.log("<-------------------------------------------------------->")
        for (var i = 0; i < results.length; i++) {
          table.push([results[i].id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity]);
        }
        console.log(table.toString());
        nextAction();
    })
}

function addInventory() {
    connection.query("SELECT * FROM products", function(err, results) {
        //Makes table
        var table = new Table({
          head: ["ID", "Product Name", "Department", "Price", "Quantity"]
        })
        
        console.log("Items for sale:")
        console.log("<-------------------------------------------------------->")
        for (var i = 0; i < results.length; i++) {
          table.push([results[i].id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity]);
        }
        console.log(table.toString());
    
        inquirer
            .prompt([
                {
                name: "id",
                type: "input",
                message: "Select the ID of the product you'd like to add inventory to.",
                },
                {
                name: "quantity",
                type: "input",
                message: "How much stock would you like to add?",
                }
            ])
            .then(function(answer) {
                var chosenID = answer.id - 1;
                var quantity = parseInt(answer.quantity)
                console.log("Successfully added to inventory");
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                    {
                        stock_quantity: results[chosenID].stock_quantity + quantity
                    },
                    {
                        id: answer.id
                    }
                    ],
                    
                )
                nextAction();
            })
    })
}

function addProduct() {
    inquirer
        .prompt([
            {
            name: "product",
            type: "input",
            message: "Enter new product",
            },
            {
            name: "department",
            type: "input",
            message: "Enter department",
            },
            {
            name: "price",
            type: "input",
            message: "Enter price",
            },
            {
            name: "quantity",
            type: "input",
            message: "Enter quantity",
            }
        ])
        .then(function(answer) {
        connection.query("INSERT INTO products SET ?", 
        {
            product_name: answer.product,
            department_name: answer.department,
            price: answer.price,
            stock_quantity: answer.quantity
          },
        function(err, results) {
            console.log("Product inserted!\n");
            nextAction2();
        })
    })
}

function nextAction() {
    inquirer
        .prompt([
          {
            name: "actions",
            type: "rawlist",
            message: "What would you like to do next?",
            choices: ["Add to Inventory", "Add New Product", "Exit"]
          },
        ])
        .then(function(answer) {
            if (answer.actions === "Add to Inventory") {
                addInventory();
            } else if (answer.actions === "Add New Product") {
                addProduct();
            } else {
                connection.end();
            }
        })
}

function nextAction2() {
    inquirer
        .prompt([
          {
            name: "actions",
            type: "rawlist",
            message: "What would you like to do next?",
            choices: ["Add to Inventory", "View Products", "Exit"]
          },
        ])
        .then(function(answer) {
            if (answer.actions === "Add to Inventory") {
                addInventory();
            } else if (answer.actions === "View Products") {
                viewProducts();
            } else {
                connection.end();
            }
        })
}


options();