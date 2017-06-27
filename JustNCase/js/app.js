console.log("allo");
$(function(){
  // Begin Window Onload Function
  console.log("but hello");


  $( ".menu-container ").on('click', function() {
    $( "#nav-elements" ).toggleClass("show");
  });
  $("#about-link").on('click', function(){
    $('.about-j-modal').css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 2000);
  });



  $(window).scroll(function() {
    console.log($(window).scrollTop());

    if( $(window).scrollTop() > 1400){
      console.log("scrolling");
      $('.about-j-modal').css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 2000);
    };


 });


  // End Window Onload Function
});
