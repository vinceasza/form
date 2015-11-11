var sLength = jQuery('.slide').length;
var sWidth = jQuery('.slide').outerWidth(true);
var wrapperWidth = sWidth * (sLength + 1);
var sShow = 2;

jQuery('.slide-wrapper').css('width', wrapperWidth);

var counter = 0;

jQuery('.left').on('click', function(e){
  e.preventDefault();
  moveLeft(jQuery('.slide-wrapper'), sWidth, sLength, sShow);
  console.log(counter);
});

jQuery('.right').on('click', function(e){
  e.preventDefault();
  moveRight(jQuery('.slide-wrapper'), sWidth, sLength);
  console.log(counter);
});


function moveLeft(slides, sWidth, sLength, sShow){
  if (counter < sLength - sShow){
    slides.animate({
      left: '-=' + sWidth + 'px'
    }, 300, function(){});
    counter += 1;
  }
}

function moveRight(slides, sWidth){
  if (counter > 0){
    slides.animate({
      left: '+=' + sWidth + 'px'
    }, 300, function(){});
    counter -= 1;
  }
}
