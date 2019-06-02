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

function displayProducts() {
  connection.query("SELECT * FROM products", function(err, results) {
      //Makes table
      var table = new Table({
        head: ["ID", "Product Name", "Price"]
      })
      
      console.log("Items for sale:")
      console.log("<-------------------------------------------------------->")
      for (var i = 0; i < results.length; i++) {
        table.push([results[i].id, results[i].product_name, results[i].price]);
      }
      console.log(table.toString());
      
      inquirer
        .prompt([
          {
            name: "itemID",
            type: "input",
            message: "Please enter the ID of the product you would like to buy.",
            validate: function(value) {
              if (isNaN(value) == false) {
                return true;
              } else {
                return false;
              }
            }
          },
          {
            name: "amount",
            type: "input",
            message: "How many would you like to buy?",
            validate: function(value) {
              if (isNaN(value) == false) {
                return true;
              } else {
                return false;
              }
            }
          }
        ])
        .then(function(answer) {
          // Get the info of the chosen item
          var chosenID = answer.itemID -1;
          var chosenQuantity = answer.amount;
          var price = results[chosenID].price * chosenQuantity

          if (parseInt(chosenQuantity) <= results[chosenID].stock_quantity) {
          console.log("Your total for " + answer.amount + " - " + results[chosenID].product_name + " is: $" + price.toFixed(2));
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  stock_quantity: results[chosenID].stock_quantity - chosenQuantity
                },
                {
                  id: results[chosenID].id
                }
              ],
              function(error) {
                if (error) throw err;
                console.log("Congrats, your item was successfully purchased!");
                console.log("<-------------------------------------------------------->")
                displayProducts();
              });
          }
          else {
            // bid wasn't high enough, so apologize and start over
            console.log("Sorry, there aren't enough in stock. Please adjust your order and try again.");
            console.log("<-------------------------------------------------------->")
            displayProducts();
          }  
          
        });
      })
}
displayProducts()