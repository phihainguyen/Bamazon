var inquirer = require("inquirer")
var mysql = require("mysql")

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
function buyProduct(){
  inquirer
  .prompt([
    {
    name: "productID",
    type: "input",
    message: "What is the Product ID you wish to purchase?",
    validate: function(value) {
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
    validate: function(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    }
  }
  ])
  .then(function(answer){
    console.log(answer.productID);
    connection.query("SELECT * FROM products WHERE id =?", [answer.productID], function(err, res){
      for (let i = 0; i < res.length; i++) {
        console.log("item ID: " +res[i].id + " || "+res[i].name +" || "+ " Quantity: "+ answer.quantity)
        
      }
    }
    )
  })
}
