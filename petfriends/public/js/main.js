//global
var products=[];
var cartItems=[];
var cart_n = document.getElementById('cart_n');

//divs
var dogDiv = document.getElementById("dogDiv");
var catDiv = document.getElementById("catDiv");
var flashsaleDiv = document.getElementById("flashsaleDiv");

//information
var Dog =[
    {name:'',price: 1},
    {name:'',price: 1},
    {name:'',price: 1},
    {name:'',price: 1},
    {name:'',price: 1},
    {name:'',price: 1},
];
var Cat =[
    {name:'',price: 1},
    {name:'',price: 1},
    {name:'',price: 1},
    {name:'',price: 1},
    {name:'',price: 1},
    {name:'',price: 1},
];
var FlashSale =[
    {name:'',price: 1},
    {name:'',price: 1},
    {name:'',price: 1},
    {name:'',price: 1},
    {name:'',price: 1},
    {name:'',price: 1},
];
//HTML
function HTMLdogProduct(con){
    let URL =`../img/dog/dog${con}.jpeg`;
    let btn =`btnDog${con}`;
    return`
        <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
                <img class="card-img-top" style="height:16rem;" scr="${URL}" alt="Card image cap">
                <div class="card-body">
                    <i style="color:orange;" class="fa fa-star"></i>
                    <i style="color:orange;" class="fa fa-star"></i>
                    <i style="color:orange;" class="fa fa-star"></i>
                    <i style="color:orange;" class="fa fa-star"></i>
                    <i style="color:orange;" class="fa fa-star"></i>
                    <p class="card-text">${Dog[con-1].name}</p>
                    <p class="card-text">Price:${Dog[con-1].price}.00</p>
                    <div class="d-flex justify-content-between align-item-center">
                        <div class="btn-group">
                            <button type="button" onclick="cart2('${Dog[con-1].name}',
                            '${Dog[con-1].price}','${URL}','${con}','${btn}')"
                            class ="btn btn-sm btn-outline-secondary"><a style="color:inherit;" href="/cart">Buy</a></button>
                            <button id="${btn}" type="button" onclick="cart('${Dog[con-1].name}','${Dog[con-1].price}','${URL}','${con}','${btn}')"
                            class="btn btn-sm btn-outline-secondary">Add to cart</button>
                        </div>
                        <small class="text-muted">FREE SHIPPING</small>
                    </div>
                </div>
            </div>
    `
}
function HTMLflsaleProduct(con){
    let URL =`../img/flsale/flsale${con}.jpeg`;
    let btn =`btnflsale${con}`;
    return`
        <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
                <img class="card-img-top" style="height:16rem;" scr="${URL}" alt="Card image cap">
                <div class="card-body">
                    <i style="color:orange;" class="fa fa-star"></i>
                    <i style="color:orange;" class="fa fa-star"></i>
                    <i style="color:orange;" class="fa fa-star"></i>
                    <i style="color:orange;" class="fa fa-star"></i>
                    <i style="color:orange;" class="fa fa-star"></i>
                    <p class="card-text">${flsale[con-1].name}</p>
                    <p class="card-text">Price:${flsale[con-1].price}.00</p>
                    <div class="d-flex justify-content-between align-item-center">
                        <div class="btn-group">
                            <button type="button" onclick="cart2('${flsale[con-1].name}',
                            '${flsale[con-1].price}','${URL}','${con}','${btn}')"
                            class ="btn btn-sm btn-outline-secondary"><a style="color:inherit;" href="/cart">Buy</a></button>
                            <button id="${btn}" type="button" onclick="cart('${flsale[con-1].name}','${flsale[con-1].price}','${URL}','${con}','${btn}')"
                            class="btn btn-sm btn-outline-secondary">Add to cart</button>
                        </div>
                        <small class="text-muted">FREE SHIPPING</small>
                    </div>
                </div>
            </div>
    `
}
function HTMLcatProduct(con){
    let URL =`../img/cat/cat${con}.jpeg`;
    let btn =`btnCat${con}`;
    return`
        <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
                <img class="card-img-top" style="height:16rem;" scr="${URL}" alt="Card image cap">
                <div class="card-body">
                    <i style="color:orange;" class="fa fa-star"></i>
                    <i style="color:orange;" class="fa fa-star"></i>
                    <i style="color:orange;" class="fa fa-star"></i>
                    <i style="color:orange;" class="fa fa-star"></i>
                    <i style="color:orange;" class="fa fa-star"></i>
                    <p class="card-text">${Cat[con-1].name}</p>
                    <p class="card-text">Price:${Cat[con-1].price}.00</p>
                    <div class="d-flex justify-content-between align-item-center">
                        <div class="btn-group">
                            <button type="button" onclick="cart2('${Cat[con-1].name}',
                            '${Cat[con-1].price}','${URL}','${con}','${btn}')"
                            class ="btn btn-sm btn-outline-secondary"><a style="color:inherit;" href="/cart">Buy</a></button>
                            <button id="${btn}" type="button" onclick="cart('${Cat[con-1].name}','${Cat[con-1].price}','${URL}','${con}','${btn}')"
                            class="btn btn-sm btn-outline-secondary">Add to cart</button>
                        </div>
                        <small class="text-muted">FREE SHIPPING</small>
                    </div>
                </div>
            </div>
    `
}
//ANIMATION
function animation(){
    const toast=swal.mixin({
        toast:true,
        position:'top-end',
        showConfirmButton:false,
        timer:1000
    });
    toast({
        type:'success',
        title:'Added to shopping cart'
    });
}
//CART FUNCTIONS
function cart(name,price,url,con,btncart){
    var item={
        name:name,
        priceL:price,
        url:url,
    }
    cartItems.push(item);
    let storage = JSON.parse(localStorage.getItem("cart"));
    if(storage==null){
        products.push(item);
        localStorage.setItem("cart",JSON.stringify(products));
    } else{
        products=JSON.parse(localStorage.getItem("cart"));
        products.push(item);
        localStorage.setItem("cart",JSON.stringify(products));
        
    }
    products=JSON.parse(localStorage.getItem("cart"));
    cart_n.innerHTML=`[${products.length}]`;
    document.getElementById(btncart).style.display="none";
}

(()=>{
    for(let index = 1; index <=6; index++){
        dogDiv.innerHTML+=`$[HTML.dogProduct(index)]`;
    }
    for (let index = 1; index <=3; index++){
        catDiv.innerHTML+=`${HTMLcatProduct(index)}`;
        flashsaleDiv.innerHTML+=`${HTMLflashsaleProduct(index)}`;
    }
    if(localStorage.getItem("cart")==null){

    } else{
        products = JSON.parse(localStorage.getItem("cart"));
        cart_n.innerHTML=`[${products.length}]`;
    }
})();