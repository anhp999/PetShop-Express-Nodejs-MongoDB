"use strict"

module.exports = function CartModel(oldCart) {
	/* every call comes with the existing / old cart */
	this.items =  oldCart.items || {};
    this.totalQuantity = oldCart.totalQuantity || 0;
   // this.getTotalPrice = oldCart.getTotalPrice || 0;
    this.totalPrice = oldCart.totalPrice || 0;
    this.address = oldCart.address || {};
    this.paymentMethod = oldCart.paymentMethod || "COD";

	this.getTotalQuantity = () => {
        var quantity = 0;
        for (var id in this.items){
            quantity += parseInt(this.items[id].quantity);
        }
        return quantity;
    }

    this.getTotalPrice = () => {
        var price = 0 ;
        var Total = 0 ;
        for(var id in this.items){
            price = parseFloat(this.items[id].price)  * parseInt(this.items[id].quantity);
            Total += price;
        }
       // Total = parseFloat(Total).toFixed(2);
        return Total;
    }

    //add new group product/new item into the cart
    this.add = (item, id) => {        
        
        var storedItem = this.items[id];
        if(!storedItem) {
        // create a new entry
            storedItem = this.items[id] = {item: item, quantity : 1, price : item.price, Total: 0};
        }else{
            storedItem.quantity++;
        }  
        storedItem.Total = storedItem.price * storedItem.quantity;
        this.totalQuantity++;
        
        this.items[id].Total = storedItem.Total;
        this.items[id].price = this.items[id].price;
        this.items[id].quantity = storedItem.quantity;
        this.totalPrice = this.getTotalPrice();

        //storedItem.item.price = parseFloat(storedItem.item.price)
        // storedItem.quantity += parseInt(quantity); 
        //this.totalPrice += storedItem.Total;
        /* storedItem.item.price = parseFloat(storedItem.item.price);
        //cập nhật tổng số lượng sau khi check sản phẩm có hay chưa
       storedItem.quantity += parseInt(quantity);        
        storedItem.price = parseFloat(storedItem.item.price * storedItem.quantiy);
        this.totalQuantity = this.getTotalQuantity();
        this.totalPrice = this.getTotalPrice();
        return this.getCartItem(id); */
    }

	this.remove = (id) => {
        var storedItem = this.items[id];
        if(storedItem){
            this.totalQuantity -= this.items[id].quantity;
            delete this.items[id];
            

           //case1: this.totalQuantity = storedItem.quantity - this.getTotalQuantity();
           //case2: this.totalQuantity = storedItem.quantity - this.items.quantity;
           //case3: this.items.quantity = this.totalQuantity - storedItem.quantity;
          // storedItem.quantity = this.totalQuantity - this.items[id].quantity           
            //this.totalPrice = this.getTotalPrice();        
          //  this.totalPrice -= storedItem.item.price * storedItem.quantity;
         //this.totalQuantity -= storedItem.quantity++ ;
         //this.totalQuantity = this.getTotalQuantity()- storedItem.quantity;
        }
    };

	this. update = (id, quantity) => {
        var storedItem = this.items[id];
        if(storedItem && quantity > 0)
        {
            storedItem.quantity = quantity;
            storedItem.Total = parseFloat(storedItem.item.price * storedItem.quantity);
            this.totalQuantity = this.getTotalQuantity();
            this.totalPrice = this.getTotalPrice();
            this.items[id].Total = storedItem.Total;
            this.items[id].price = this.items[id].price;
            this.items[id].quantity = storedItem.quantity;            
        }
        return this.items[id];
    }

    this.updateMany = (item, id, quantity) => {
        var storedItem = this.items[id];
        if(storedItem)
        {
            storedItem.quantity = parseInt(quantity) +  parseInt(storedItem.quantity);
            storedItem.Total = parseFloat(storedItem.item.price * storedItem.quantity);
            this.totalQuantity = this.getTotalQuantity();
            this.totalPrice = this.getTotalPrice();
            this.items[id].Total = storedItem.Total;
            this.items[id].price = this.items[id].price;
           this.items[id].quantity = storedItem.quantity;
        }
        else
        {
            if(!storedItem)
            {
                storedItem = this.items[id] = {item: item, quantity : quantity, price : item.price, Total: 0};
                storedItem.quantity = quantity;
                storedItem.Total = parseFloat(storedItem.item.price * storedItem.quantity);
                this.totalQuantity = this.getTotalQuantity();
                this.totalPrice = this.getTotalPrice();
                this.items[id].Total = storedItem.Total;
                this.items[id].price = this.items[id].price;
                this.items[id].quantity = storedItem.quantity;            
            }
        }
        
        return this.items[id];
    }


    this.empty = () => {
        this.items = {};
        this.totalQuantity = 0 ;
        this.totalPrice = 0 ;
    }
    
    //give the cart item as an array 
    //khai báo và assign items là object nhưng để hiển thị ra handlebars thì cần ở dạng mảng nên mới khởi tạo array.
    this.generateArray = () =>{
        //this.items = {};
        var arr =[];
        //loop through items for the keys
       
        for(var item in this.items){
            //this.items[id].item.price = parseFloat(this.items[id].item.price).toFixed(2);
            //this.items[id].price = parseFloat(this.items[id].price).toFixed(2); 
            //push element on the array
            arr.push(item);
            //arr.push({productId:item.id, price: item.price, quantity:item.quantity, Total: item.Total });
        };
        return this.items;
    };

    //trả về đối tượng có items và chuyển thành dạng mảng
    this.getCart = function(){
        var cart ={
            //đối tượng "items" chuyển thành dạng mảng
            items: this.generateArray(),
            totalQuantity: this.totalQuantity,
            totalPrice: this.totalPrice,
            address: this.address,
            paymentMethod:this.paymentMethod
        };
        return cart;
    }

    this.getCartItem = function(id){
        var cartItem ={
            item: this.items[id],
            totalQuantity:this.getTotalQuantity(this.items[id]),
            totalPrice: this.getTotalPrice(this.items[id])
        }
        return [cartItem];
    }
}