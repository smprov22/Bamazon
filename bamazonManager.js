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
    console.log("show products");
}

function lowInventory() {
    console.log("show low inventory");
}

function addInventory() {
    console.log("add to inventory");
}

function addProduct() {
    console.log("add products to inventory")
}


options();