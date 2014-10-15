// This is JS


// Looking for all the elements with the slider class (callback function)
// for every element its running this function
$('.slider').each(function(){
	// Variables 3 have jQuery references.
	var $this = $(this);
	var $group = $this.find('.slide-group');
	var $slides = $this.find('.slide');

	var buttonArray = [];
	var currentIndex = 0;
	var timeout;

// function that controls the movement of the images
function move(newIndex) {
	var animateLeft, slideLeft;

	advance(); // envokes the function

		if($group.is(':animated') || currentIndex === newIndex){
			return; //Stops the function if it is all ready moving.
		}

		// adds and removes classes to the index
		buttonArray [currentIndex].removeClass('active');
		buttonArray [newIndex].addClass('active');

		// moves the slideshow baised on the index of the array
		if (newIndex > currentIndex) {
			slideLeft = '100%';
			animateLeft = '-100%';
		} else {
			slideLeft = '-100%';
			animateLeft = '100%';
		}

		// chages the css and display of the variables
		$slides.eq(newIndex).css( {left: slideLeft, display: 'block'} );
		$group.animate( {left: animateLeft} , function() {
			$slides.eq(currentIndex).css( {display: 'none'} );
			$slides.eq(newIndex).css( {left: 0 } );
			$group.css( {left: 0 } );
			currentIndex = newIndex;
		});
}

// controls the speed of the slideshow, starts the timer. 
function advance() {
	clearTimeout(timeout);

		timeout = setTimeout(function(){
			if(currentIndex < ($slides.length - 1)) {
				move(currentIndex + 1);
			} else {
				move(0);
			}
		}, 6000); // spped of the interval
	}

//callback function of the former function.
$.each($slides, function(index) {

	var $button = $('<button type="button" class="slide-btn">&bull;</button>');

	// changes the class of the button to active when the corresponing image is showing.
	if (index === currentIndex) {
		$button.addClass('active');
	}

	// clicking on the button will change the index
	$button.on('click', function() {
		move(index);	
	
	// Puts the buttons in
	}).appendTo('.slide-buttons');
	buttonArray.push($button);
	});

	advance();

});

