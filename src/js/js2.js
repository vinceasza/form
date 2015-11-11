var modal = (function(){

  var $window = $(window);
  var $modal = $('<div class="modal"/>');
  var $content = $('<div class="modal-content"/>');
  var $close = $('<button role="button" class="modal-close">close</button>')

  $modal.append($content, $close);

  $close.on('click', function(e){
    e.preventDefault();
    modal.close();
  });

  return {
    center: function() {
      var top = Math.max($window.height() - $modal.outerHeight(), 0) / 2;
      var left = Math.max($window.width() - $modal.outerWidth(), 0) / 2;
      $modal.css({
        top: top + $window.scrollTop(),
        left: left + $window.scrollLeft()
      });
    },
    open: function(settings) {
      $content.empty().append(settings.content);

      $modal.css({
        width: settings.width || 'auto',
        height: settings.height || 'auto',
        opacity: 1
      }).appendTo('body');

      modal.center();
      $window.on('resize', modal.center);
    },
    close: function(){
      $content.empty();
      $window.off('resize', modal.center);
    }
  };
}());

(function(){
  var $content = $('.content').detach();

  $('.open-modal').on('click', function(e){
    e.preventDefault();
    modal.open({content: $content, width: 340, height: 300});
  });
}());



var Navbar = function(btn, nav, fixedState){
  this.btn = btn;
  this.nav = nav;


  this.toggleNav = function(){
    btn.on('click', function(e) {
      e.preventDefault();
      nav.parent().toggle();
    });
  }
  this.scrollToDiv = function(){
    nav.on('click','a',function(e){
      e.preventDefault();
      var hash = $(this).attr('href');
      var pos = $(hash).offset();
      $('html, body').animate({scrollTop: pos.top}, "slow");
    });
  }
  this.responsiveNav = function(){
    $(window).bind('load resize', function(){
      var winWidth = $(window).innerWidth();
      if (winWidth < 850){
        nav.parent().hide();
        btn.fadeIn();
      } else {
        nav.parent().fadeIn();
        btn.hide();
      }
    });
  }
  this.scrolly = function(){
    $(window).bind('scroll load', function(){
      var viewportTop = $(window).scrollTop();
      var winHeight = $(document).innerHeight();
      var a  = $('.navigation ul li a');
      for (var i=0; i < a.length; i++){
        var currentAnchor = a[i];
        var nextAnchor = a[i];
        var hash = $(currentAnchor).attr('href');
        var nextHash = $(nextAnchor).attr('href');
        var top = $(hash).offset().top;
        highlighter(hash,top,viewportTop);
      }
    });
  }
  function highlighter(hash,top, viewportTop){
    if ( viewportTop > top - 200 ) {
      $(".navigation ul li a").each(function(index){
        if (this.hash == hash){
          $(this).addClass('selected');
        } else {
          $(this).removeClass('selected');
        }
      });
    }
  }
};

$(document).ready(function(){


$('.navigation ul').navbar()




});









var navi = (function(){
  var $window = $(window);
  var $navUl = $('.navigation ul');

  return {
    checkWidth: function() {
      return $window.width();
    },
    toggle: function() {
      if (navi.checkWidth() < 750 || $window.on('resize', navi.checkWidth) < 750){
        $navUl.hide();
        $('.responsive-menu-btn').on('click', function(e) {
          e.preventDefault();
          $navUl.toggle();
        });
      }
    },
    scrollToDiv: function(){
      $navUl.on('click','a',function(e){
        e.preventDefault();
        var hash = $(this).attr('href');
        var pos = $(hash).offset();
        $('html, body').animate({scrollTop: pos.top}, "slow");
      });
    },
    highlighter: function(hash,top, viewportTop){
      if ( viewportTop > top - 200 ) {
        $(".navigation ul li a").each(function(index){
          if (this.hash == hash){
            $(this).addClass('selected');
          } else {
            $(this).removeClass('selected');
          }
        });
      }
    },
    scrollNav: function(){
      $window.bind('scroll load', function(){
        var viewportTop = $window.scrollTop();
        var winHeight = $(document).innerHeight();
        var a  = $('.navigation ul li a');
        for (var i=0; i < a.length; i++){
          var currentAnchor = a[i];
          var nextAnchor = a[i];
          var hash = $(currentAnchor).attr('href');
          var nextHash = $(nextAnchor).attr('href');
          var top = $(hash).offset().top;
          navi.highlighter(hash,top,viewportTop);
        }
      });
    }
  }
}());

(function(){


navi.toggle();
navi.scrollToDiv();
navi.scrollNav();

}());
