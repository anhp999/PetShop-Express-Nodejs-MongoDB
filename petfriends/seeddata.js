//const dotenv = require('dotenv');
const fs = require('fs'); //file system variable to read json file
//const colors = require('colors');
const config = require('config')
const database = config.get('mongoURI')
const db = require('./config/database');

//Load ENV variables
//dotenv.config(option:{path:'./config/default.json'})]

//Load models
/* const Product = require('./models/Product');
const Order = require('./models/Order');
const User = require('./models/User-test'); 


const Category = require('./models/Category');
const Category2 = require('./models/Category-2'); */

const Dog = require('./models/Dog');
// const ProdImg = require('./models/ProductImage'); 

//Connect to Mongo Database
db().then();

//Read the JSON files
//const products = fs.readFileSync(`${__dirname}/_seedData/products.json`);

/* const product_data = fs.readFileSync('./_seedData/products.json');
const products = JSON.parse(product_data.toString()); 

const order_data = fs.readFileSync('./_seedData/orders.json');
const orders = JSON.parse(order_data.toString());

const user_data = fs.readFileSync('./_seedData/users.json');
const users = JSON.parse(user_data.toString());

const category_data = fs.readFileSync('./_seedData/categories.json');
const categories = JSON.parse(category_data.toString());
const category2_data = fs.readFileSync('./_seedData/categories-2.json');
const categories2 = JSON.parse(category2_data.toString()); */

const dog_data = fs.readFileSync('./_seedData/dogs.json');
const dogs = JSON.parse(dog_data.toString());
/* const img_data = fs.readFileSync('./_seedData/productImg.json');
const imgs = JSON.parse(img_data.toString()); */

/* const filepath = './_seedData/products.json';
const products = fs.readFile(filepath,'utf-8', (err, jsonString) => {
        if(err){
           console.log(err);
        }
        else {
            try{
                const data = JSON.parse(jsonString);
                console.log(data);
            } catch (err){
                console.log('Error parsing JSON', err);
            } 
        }     
    });    */

//Import sample data in DB
const importData = async() => {
    try {
/*         await Product.create(products);
        await Category.create(categories);
        await User.create(users);
        await Order.create(orders);
        await Category2.create(categories2); */
        await Dog.create(dogs);
/*         await ProdImg.create(imgs); */
        console.log(`Data successfully imported`);
        process.exit();  
    }
    catch (err){
        console.log(err);
    }
}

//Delete data from DB
const deleteData = async () => {
    try{
 /*        await Product.deleteMany();
        await User.deleteMany();
        await Order.deleteMany();
        await Category.deleteMany();
        await Category2.deleteMany(); */
        await Dog.deleteMany();
        // await ProdImg.deleteMany();
        console.log(`Data successfully deleted`);
        process.exit();        
    } 
    catch (err){
        console.log(err);
    }
}

//define function should be called
//console.log(process.argv);
if (process.argv[2] === '-i'){
    importData().then();
}else if(process.argv[2] === '-d'){
    deleteData().then();
}


