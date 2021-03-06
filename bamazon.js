var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
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
    run();
}

function run() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        for(i=0;i<results.length;i++){
            console.log("Item ID: " + results[i].item_id + " Product Name: " + results[i].product_name + " Cost: " + results[i].price);
        }
        inquirer
        .prompt([
            {
            name: "id",
            type: "input",
            message: "What is the ID of the product you would like to purchase?"
            },
            {
                name: "request",
                type: "input",
                message: "How many units would you like to purchase?"
            }
        ])
        .then(function(answer){
            var selected = results[parseInt(answer.id)-1];
            if(selected.stock_quantity<answer.request){
                console.log("Insufficient quantity. We only have "+selected.stock_quantity+" of "+answer.request);
                startagain();
            }else{
                var update = selected.stock_quantity - answer.request;
                connection.query(
                    'UPDATE products SET stock_quantity = ? Where item_id = ?',
                    [update,answer.id],
                function(err){
                    if (err) throw err;
                    var cost = answer.request*selected.price;
                    console.log("You have purchased "+answer.request+" units for $"+ cost);
                    startagain();
                })
                
            }
        }    )
})
}

function startagain(){
    inquirer
                  .prompt({
                    name: "startorend",
                    type: "list",
                    message: "Would you like to make another purchase or exit?",
                    choices: ["PURCHASE", "EXIT"]
                  })
                  .then(function(answer) {
                    if (answer.startorend === "PURCHASE") {
                        start();
                    }
                    else if(answer.startorend === "EXIT") {
                        connection.end();
                    } else{
                        connection.end();
                    }
                  });
}







