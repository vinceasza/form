

  $(document).ready(function(){

      //set height of #home section and its child divs
      var winHeight = $(window).height();
      var double = winHeight * 2;
      $('#home').height(double);
      $('iframe').height(winHeight);
      $('.one').height(winHeight);

      //place playvideo button in center of screen
      var btnHeight = $('.video-btn img').height();
      var center = (winHeight / 2) - (btnHeight / 2);
      $('.video-btn').css('bottom', center);

      //set parallax scrolling on £home section
      var obj = $('#home');
      $(window).scroll(function(){
        var $window = $(this);
        var yPos = -($window.scrollTop() / obj.data('speed'));
        var coords = '50% ' + yPos + 'px';
        obj.css('background-position', coords);
      });

      //hide video iframe on load
      var vid = $('iframe').detach();
      //show video button on click
      $('a.video-btn').on('click', function(e){
        e.preventDefault();
        $('.video').append(vid);
      });

      //animate scroll to video button
      var pos = $('.video-btn').offset().top - center;
      $('.scroll').on('click', function(e){
        e.preventDefault();
        $('html,body').animate({
          scrollTop: pos + "px"
        });
      })

      //lazy load icons when in view
      $('.image img').viewportChecker({
        classToAdd: 'showing',
        offset: 100
      });

});
