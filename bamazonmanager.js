//Create a new Node application called bamazonManager.js. Running this application will:


//List a set of menu options:
//View Products for Sale
//View Low Inventory
//Add to Inventory
//Add New Product
//If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
//If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
//If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
//If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "kitten123",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

function start(){
    inquirer
                  .prompt({
                    name: "options",
                    type: "list",
                    message: "",
                   choices: ["VIEW PRODUCTS FOR SALE","VIEW LOW INVENTORY","ADD TO INVENTORY","ADD NEW PRODUCT"]
                  })
                  .then(function(answer) {
                    if (answer.options === "VIEW PRODUCTS FOR SALE") {
                        viewproduct();
                    }
                    else if(answer.options === "VIEW LOW INVENTORY") {
                        lowinventory();
                    }
                    else if(answer.options === "ADD TO INVENTORY"){
                        addinventory();
                    }
                    else if(answer.options === "ADD NEW PRODUCT"){
                        newproduct();
                    }
                  });
}

function viewproduct(){
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        for(i=0;i<results.length;i++){
            console.log("Item ID: " + results[i].item_id + " Product Name: " + results[i].product_name + " Price: " + results[i].price + " Quantity: " + results[i].stock_quantity);
        }})
    start();
}
function lowinventory(){
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        for(i=0;i<results.length;i++){
           if(results[i].stock_quantity<5){
            console.log("Item ID: " + results[i].item_id + " Product Name: " + results[i].product_name + " Price: " + results[i].price + " Quantity" + results[i].stock_quantity);
           } 
        }
    })
    start();
}

var total;
var stock;

function addinventory(){
    inquirer
        .prompt([
            {
            name: "id",
            type: "input",
            message: "What is the ID of the product you would like to add inventory to?"
            },
            {
                name: "addition",
                type: "input",
                message: "How many units would you like to add?"
            }
        ])
        .then(function(answer){
            connection.query("SELECT * FROM products", function(err, results) {
                if (err) throw err;
                var index = parseInt(answer.id) - 1;
                stock = parseInt(results[index].stock_quantity);
                total = stock + parseInt(answer.addition);
                })
            connection.query(
                'UPDATE products SET stock_quantity = ? Where item_id = ?',
                [total,answer.id],
            function(err){
                if (err) throw err;
                console.log("Item ID "+answer.id+" has been updated with a quantity of "+total);
                start();
            })
        })
}
function newproduct(){
    inquirer
        .prompt([
            {
            name: "name",
            type: "input",
            message: "What is the name of the product you would like to add?"
            },
            {
                name: "dep",
                type: "input",
                message: "What department is this product in?"
                },
            {
                name: "price",
                type: "input",
                message: "What is the price of the product?"
                },
            {
                name: "stock",
                type: "input",
                message: "How many units would you like to add?"
            }
        ])
        .then(function(answer){
            var sql = "INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES("
            + answer.name+ "," +answer.dep+ "," +parseInt(answer.price) + "," + parseInt(answer.stock) + ")";
            console.log(sql);
    connection.query(sql,function(err){
        if (err) throw err;
        console.log("Your product has been successfully added.");
        start();
    })})
}


//If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
//If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
//If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
//If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
