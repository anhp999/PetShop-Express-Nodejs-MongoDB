/* $(document).ready(()=>{
    $('.add-to-cart').on('click',addtoCart);
}); */

//var filterRadio = $(".flexRadioDefault:checked").val();
$(document).ready(()=>{
    $('.add-to-wishlist').on('click',addtoWishList);
    $('.changetoSubCate').on('click',changetoSubCate);
    $('.add-to-wish-list').on('click',addWishList);
    $('.flexRadioDefault').on('click',filterRadio)
    
   // $('#addProduct').on('click',addProduct);
   // $('#allCategory').on('change',selectCate);
   // $('#addProduct').on('change',selectSubCate);
});

function addtoWishList(){
   // const id = $(this).attr('data-id');
   // var quantity = 1;
    $.ajax({
        url:'/wishlist',
        type:'GET',
       // data:{'id':id, 'quantity':quantity,'isPost':true},
        success:function(result)
        {            
            alert('Success');              
        },
        error: function(){
            alert('No data');
        }
    })
}
function changetoSubCate(){
    const id = $(this).attr('data-id');
    // var quantity = 1;
     $.ajax({
         url:'/admin'+id,
         type:'POST',
        data:{'id':id},
         success:function(result)
         {            
             alert('Success');              
         },
         error: function(){
             alert('No data');
         }
     })
 }
function addWishList(){
    const id = $(this).attr('data-id');
    const price = $(this).attr('value');
   //const value =$(this).attr();
    //let condition = value === '0' ? false : true;
    $.ajax({
        url:'/wishlist/product/add/',
        type:'POST',
        data : {'id':id, 'price':price },
        success:function(result){
            console.log(result);
        },
        error: function(){
            alert('No data');
        }
    })
}

let $allCategory = $( '#allCategory' ),
		$allsubCategory = $( '#allsubCategory' ),
    $options = $allsubCategory.find( 'option' );
    
$allCategory.on( 'change', function() {
	$allsubCategory.html( $options.filter( '[data-dep="' + this.value + '"]' ) );
} ).trigger( 'change' );



/* function addtoCart(){
    //lấy id của sản phẩm   
   const id = $(this).attr('data-id');
    //const id = req.params.id;
    var quantity = 1;
    //gọi lên server
    $.ajax({
        url:'/cart',
        type:'POST',
        data:{id, quantity},
        success:function(result){
            console.log(result);
            $('#cart-badge').html(result.totalQuantity);
        },
        error: function(){
            alert('No data');
        }
    })
}  */
