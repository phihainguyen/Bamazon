var inquirer = require("inquirer")
var mysql = require("mysql")

//variables//
var totalBill = [];


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon_db"
});
connection.connect(function (err) {
  if (err) throw err;
  loadProducts();
});

function loadProducts() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.table(res);
    buyProduct();
  });
}
function buyProduct() {
  inquirer
    .prompt([
      {
        name: "productID",
        type: "input",
        message: "What is the Product ID you wish to purchase?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "quantity",
        type: "input",
        message: "How much would you like to buy?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function (answer) {
      console.log(answer.productID);
      connection.query("SELECT * FROM products WHERE id =?", [answer.productID], function (err, res) {
        for (let i = 0; i < res.length; i++) {
          console.log("item ID: " + res[i].id + " || " + res[i].name + " || " + " Quantity: " + answer.quantity+" ||  Quantity Remaining: " + res[i].quantity + "|| total: " + answer.quantity * res[i].price)
          if (res[i].quantity >= answer.quantity) {
            // console.log(true);
            // console.log(res)
            console.log("remaining " + res[i].name + ": " + (res[i].quantity - Number([answer.quantity])))
             var updateInventory = res[i].quantity - Number([answer.quantity])
            totalBill.push(answer.quantity * res[i].price)
            
            function update() {
              var query = connection.query(
                "UPDATE products SET ? WHERE ?", [
                  {quantity: updateInventory,},
                  {id: answer.productID,}
                ]
              )}
            update();
            pay();
          } else {
            console.log("Insufficient quantity!");
            buyProduct();
          }
        }
      })
    })
}
// function decision() {
//   inquirer
//     .prompt({
//       name: "verify",
//       type: "rawlist",
//       message: "What would you like to do?",
//       choices: [
//         "Continue shopping",
//         "Checkout"
//       ]
//     })
//     .then(function (answer) {
//       switch (answer.verify) {
//         case "Continue shopping":
//           buyProduct();
//           break;

//         case "Checkout":
//           pay();
//           break;
//       }
//     });
// }
function pay() {
  // inquirer
  //   .prompt({
  //     name: "payment",
  //     type: "confirm",
  //     message: "Are you sure you wish to checkout?"
  //   })
  //   .then(function confirmed() {
      console.log("Your total is $"+totalBill +" Thank You, come again!");
      readProducts();
    }
//     , 
//     function cancelled() {
//       console.log("Ok checkout when you are ready");
//       buyProduct();
//     });
// }
function readProducts() {
  console.log("\n");
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.table(res);
    connection.end();
  });
}