$('#pagination li').addClass('page-item');
$('#pagination li a').addClass('page-link')

$("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
    $("#success-alert").slideUp(500);
});
$("#success-alert1").fadeTo(2000, 500).slideUp(500, function(){
    $("#success-alert1").slideUp(500);
});

$("#success-alert2").fadeTo(2000, 500).slideUp(500, function(){
    $("#success-alert2").slideUp(500);
});

$("#success-alert3").fadeTo(2000, 500).slideUp(500, function(){
    $("#success-alert3").slideUp(500);
});

$("#success-alert4").fadeTo(2000, 500).slideUp(500, function(){
    $("#success-alert4").slideUp(500);
});


$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })
