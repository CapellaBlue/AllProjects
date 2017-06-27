

console.log('second hi');
$(window).scroll(function() {
    console.log($(window).scrolltop);

   if ($(window).scrollTop() > 345) {
     $('#nav_bar').addClass('sticky').fadeIn(1000);;
   }
   if ($(window).scrollTop() < 344) {
     $('#nav_bar').removeClass('sticky');
   }
 });


 // Cache selectors outside callback for performance.
    // var $window = $(window),
    //     $stickyEl = $('#nav_bar'),
    //     elTop = $stickyEl.offset().top;
    //
    // $window.scroll(function() {
    //      $stickyEl.toggleClass('sticky', $window.scrollTop() > elTop);
    //  });
