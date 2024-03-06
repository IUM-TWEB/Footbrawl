
$(document).ready(function(){
  var carousel = $('#carouselExample');

  // Funzione per mettere in pausa il carosello
  $('#pauseButton').click(function() {
    carousel.carousel('pause');
  });

  // Funzione per riprendere il carosello
  $('#playButton').click(function() {
    carousel.carousel('cycle');
  });
});