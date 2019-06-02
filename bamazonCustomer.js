var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_db"
});

// connect to the mysql server and sql database
function displayProducts() {
  connection.query("SELECT id, product_name, price FROM products", function(err, results) {
      if (err) throw err;
      // once you have the items, prompt the user for which they'd like to bid on
      inquirer
        .prompt([
          {
            name: "choice",
            type: "rawlist",
            choices: function() {
              var choiceArray = [];
              for (var i = 0; i < results.length; i++) {
                choiceArray.push(results[i].product_name);
              }
              return choiceArray;
            },
            message: "Please enter the ID of the product you would like to buy?"
          },
          {
            name: "amount",
            type: "input",
            message: "How many would you like to buy?",
          }
        ])
        // .then(function(answer) {
        //   // when finished prompting, insert a new item into the db with that info
        //   connection.query(
        //     "INSERT INTO auctions SET ?",
        //     {
        //       item_name: answer.item,
        //       category: answer.category,
        //       starting_bid: answer.startingBid || 0,
        //       highest_bid: answer.startingBid || 0
        //     },
        //     function(err) {
        //       if (err) throw err;
        //       console.log("Your auction was created successfully!");
        //       // re-prompt the user for if they want to bid or post
        //       start();
        //     }
        //   );
        // });
      })
}
displayProducts()