$(document).ready(()=>{
    $('.plus-btn').on('click',increQty);
    $('.minus-btn').on('click',decreQty);
    $('.plus-btn1').on('click',increQty1);
    $('.minus-btn1').on('click',decreQty1);
    $('.addwithQuantities').on('click',addwithQuantities);
});

function updateQuantity(quantity,id){
     //gọi lên server
     $.ajax({
         url:'/cart-test/'+id,
         type:'POST',
         data:{'id':id, 'quantity':quantity,'isUpdate':true},
         success:function(result){
            getTotal(result[0].item.item._id,result[0].item.Total);
            getTotalPrice(result[0].totalPrice);
            getTotalQuantity(result[0].totalQuantity)
            console.log(result);},
         error: function(){
             alert('No data');
         }
     })
}

function getTotal(id,total){
    $('#total'+id).html("$ "+ total);}
function getTotalPrice(totalPrice){
    $('#totalPr').html("$ "+ totalPrice);}
function getTotalQuantity(quantity){
    $('#totalQty').html(quantity);
    $('#cart-badge').html(quantity);}

function increQty() {
    const plusBtn = $(this).attr('data-id');

    var inputQty = parseInt($('#qty'+plusBtn).val())+1;

    $('#qty'+plusBtn).val(inputQty);
    updateQuantity(inputQty,plusBtn);  

}
function decreQty() {
    const minusBtn = $(this).attr('data-id');

    var inputQty = parseInt($('#qty'+minusBtn).val())-1;    
    if (isNaN(inputQty) || inputQty <= 0) 
    {
        input.value = 1;
    }
    $('#qty'+minusBtn).val(inputQty);
    updateQuantity(inputQty,minusBtn);  
}
var quantity = 0;
function increQty1() {
    const plusBtn = $(this).attr('data-id');
    var inputQties = parseInt($('#qties' + plusBtn).val())+1;
    $('#qties'+plusBtn).val(inputQties);
    quantity = $('#qties'+plusBtn).val();
}
function decreQty1() {
    const minusBtn = $(this).attr('data-id');
    var inputQties = parseInt($('#qties' + minusBtn).val())-1;
    if (isNaN(inputQties) || inputQties <= 0) 
    {
        input.value = 1;
    }    
    $('#qties'+minusBtn).val(inputQties);
    quantity = $('#qties'+minusBtn).val();
}

function addwithQuantities(){
    const id = $(this).attr('data-id');
   const quantity = $('#qties'+id).val();
   //$('#qties'+id).val()
    //gọi lên server
    $.ajax({
        url:'/cart-test/addwithQuantities/'+id,
        type:'POST',
        data:{'id':id, 'quantity': quantity},
        success:function(result){
           getTotal(result[0].item.item._id,result[0].item.Total);
            getTotalPrice(result[0].totalPrice);
            getTotalQuantity(result[0].totalQuantity);
           console.log(result);},
        error: function(){
            alert('No data');
        }
    })
}