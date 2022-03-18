const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const connectDB = require('./config/database');
const Handlebars = require('handlebars');
const expbs = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const path = require('path') //core package of node
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
var passport = require('passport'); 
var flash        = require('connect-flash');
var validator = require('express-validator');
var paginateHelper = require('express-handlebars-paginate');
var moment = require('moment');
//var paginate = require('handlebars-paginate');

const posts = require('./routes/posts');
const usersn = require('./routes/usersn');
const products = require('./routes/products');
const shop = require('./routes/shopping');
const wishlist = require('./routes/wishlist');
const admin = require('./routes/admin');


// khoi dong app
const app = express()


const hbs = expbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'), 
    // ...implement newly added insecure prototype access
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    //create custom helpers
    helpers: {
        createPagination: paginateHelper.createPagination,
        calculation: function(value){
            return value + 7;
        },
        formatDate: function (date, format) {
            return moment(date).format(format);
        },        
    }
    
});
//khoi dong handlebar middle ware
app.engine('handlebars', hbs.engine);
//app.engine('handlebars', engine())
//pass javascript object into engine{} to configure templating engine {defaultlayout:'layouts',extname:'.handlebars'})
//{defaultlayout:'layouts'}: this will always search for layouts handlebars file
//{extension name:'.handlebars'}: to keep this as default as package ships
app.set('view engine', 'handlebars');
//Handlebars.registerHelper('paginate', paginate);


//khởi động bodyParser middleware
//cau hinh de app su dung body parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(validator());
//khởi động methodOverride middleware
app.use(methodOverride('_method'))

//khoi dong express middleware 
app.use(express.json())
app.use(express.urlencoded({extended: true}))
//app.use(express.static(path.join(__dirname, 'public')));

//use cookie-parser
app.use(cookieParser());
//use session
app.use(session({
    cookie: { httpOnly:true, maxAge: 30*24*60*60*1000},//luu session max la 30 ngay
    secret: 'p3tfri3nd',
    resave:false,
    saveUninitialized:false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());//store the user
   /*  store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/test-app',
        ttl: 14 * 24 * 60 * 60 // = 14 days. Default
    }) */

//push len view
app.use(function(req,res,next){
    res.locals.session = req.session;
    res.locals.user = req.user || null;    
    res.locals.message = req.session.message;
   delete req.session.message;//every time postback delete session messages. 
    res.locals.login = req.isAuthenticated();
    if (res.locals.login)
    {
        res.locals.admin = (req.user.role == 'admin');
        res.locals.visitor = (req.user.role == 'visitor');
    }   
    next();
}) 
/* const Dog = require('../models/Dog');
app.use(function(req,res,next){
    const allProducts = await Dog.find({}).lean();
    res.locals.allProducts = req.allProducts;
   // res.render('products/products', {allProducts})
    next();
})  */
//ket noi co so du lieu
connectDB();
require('./config/passport');
//routes cơ bản
//app.get('/', (req,res) => res.render('index', {title: 'Pet Friends | All About Your Pets'}))
app.get('/about', (req,res) => res.render('about', {title: 'About Us'}))
app.get('/faq', (req,res) => res.render('faq', {title: 'FAQ'}))
// app.get('/signinup', (req,res) => res.render('signinup', {title: 'Sign In | Sign Up'}))
//app.get('/products', (req,res) => res.render('products', {title: 'View All'}))
//app.get('/petspa', (req,res) => res.render('petspa', {title: 'Booking Services'}))
app.get('/product-details', (req,res) => res.render('product-details', {title: 'Detail'}))
app.get('/success', (req,res) => res.render('success', {title: 'Successfully Order'}))
app.get('/404', (req,res) => res.render('404', {title: '404 Not Found'}))
app.use('/500', (req,res) => res.render('500', {layout:'blank.handlebars',title: '500 Not Found'}))
// app.get('/wishlist', (req,res) => res.render('wishlist', {title: 'My Wish List'}))
//app.get('/shopping-cart', (req,res) => res.render('shopping-cart', {title: 'My Shopping Cart'}))
//app.get('/orders', (req,res) => res.render('orders', {title: 'My Orders'}))



//Mang routes vao. Mọi đường dẫn '/posts' sẽ dẫn tới file posts.js
app.use('/posts', posts)
app.use('/usersn', usersn)
app.use('/',require('./routes/index'));
app.use('/products', products)
app.use('/cart-test' , require('./routes/cart-test'))
app.use('/shop' , shop)
app.use('/wishlist',wishlist)
app.use('/admin',admin)
app.use('/booking',require('./routes/bookingservices'));

const Product =require('./models/Dog');
app.post('/getProducts', async(req, res)=>{
    let payload = req.body.payload.trim();
    let searchKey = await Product.find({name:{$regex: new RegExp('^'+payload+'.*','i')}}).exec();
                                                                //it has to start everything that we return from our query
                                                                //start with payload 
                                                                //and after that can be anything else so we use "dot"(can be any character)
                                                                //and zero or more by asterix "*"
                                                                //use comma to use a "i" flag to performs a case intensive search
    //Limit search results to 10
    searchKey = searchKey.slice(0,10);//the result will turn back with array so use "slice" it
    res.send({payload : searchKey});
})


//Set static folder path
//app.use(express.static(path.join(_dirname,'public')))
app.use('/static', express.static(path.join(__dirname, 'public')))
//app.get("*", (req,res) =>{res.sendFile("404.handlebars",express.static(path.join(__dirname, 'public')))});
// app.use(express.static('views/images'))
// app.use(express.static('public'))


/* var Cart = require('./models/CartModel');
app.use((req,res,next)=>{
    //var totalQuantity = Cart.getTotalQuantity(null); ;
    res.locals.session = req.session;    
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    req.session.cart = cart;   
    //lấy quantity để hiển thị số lượng trên giỏ hàng
    res.locals.totalQuantity = cart.totalQuantity;
    next();
}) */

//const productRoute = require('./routes/products');
const userRoute = require('./routes/users-test');
const Dog = require('./models/Dog');
const WishList = require('./models/WishList');
const User = require('./models/UserN');
const { faMehBlank } = require('@fortawesome/free-regular-svg-icons');




//Use Routes
//app.use('/api/v1/products', productRoute);
app.use('/api/v1/users-test', userRoute);




const PORT = 5000;

app.listen(PORT, () => console.log(`Server at ${PORT}`))

