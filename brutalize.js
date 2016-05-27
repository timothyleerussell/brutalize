(function($) {

	$.fn.brutalize = function(options) {
		//Three easy steps to a faux brutalist website, inspired by Brutalist Websites: http://brutalistwebsites.com/
		//
		//Author: Timothy Lee Russell w/ valuable input from John Allison	  
		//
		//Copyright 2016 Timothy Lee Russell ( https://anatone.net )
		//Licensed under MIT ( https://github.com/timothyleerussell/brutalize/blob/master/LICENSE )
		
		//usage
		//
		//$(function() {
		//  if(getParameterByName('brutalize')) {	
		//	  $().brutalize({
		//		  preferredPrimaryColor: '#FF0000',
		//		  preferredSecondaryColor: '#00FF00',
		//		  preferredTertiaryColor: '#0000FF'
		//	  });	
		//  }
		//});
		//
		//add a querystring to the url: ?brutalize=true
		
		//RGB primary	  
		var settings = $.extend({
			preferredPrimaryColor: '#FF0000',
			preferredSecondaryColor: '#00FF00',
			preferredTertiaryColor: '#0000FF'	  	
		}, options);
	 
		var classes = [];
		var ids = [];
		//var fibonacci = [ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946 ];
		//TLR: oh c'mon, that's too much fibonacci, let's make this thing "responsive" :-/	  
		var fibonacci = [ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597 ];
		var theFibonacci100 = [ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89 ];
		var colorCounter = 0;
	 
		$('*').each(function() {
				//1. Get all the classes on the page	  	    	  
				if($(this).attr('class') !== undefined) {			  	
					var classList = $(this).attr('class').split(' ');				 	
					for(var i = 0; i < classList.length; i++) {
						classes.push(classList[i]);
					}				
				}
				
				//2. Get all the ids on the page			  
				if(this.id.length > 0) ids.push(this.id);
		});
		
		//3. Brutalize it!	  	  
		$(classes).each(function(index, value) {	 
			if(value.length > 0) 
			{
				var sel = '.' + value;
				var el = $(sel);
				
				if(randomBoolean() && el.children().length > randomIntFromInterval(0, 10)) {
					return;
				}
				
				//transformations
				if(randomBoolean()) colorSwitcher(el);
				if(randomBoolean()) randomTranslate(el);
				if(randomBoolean()) randomRotate(el);
				if(randomBoolean()) randomScale(el);
				if(randomBoolean()) randomSkew(el);
				if(randomBoolean()) randomFontSize(el);
			}
		});
		
		$(ids).each(function(index, value) {
			var sel = '#' + value;
			var el = $(sel);
			
			if(randomBoolean() && el.children().length > randomIntFromInterval(0, 10)) {	  	  
				return;
			}
			
			//transformations
			if(randomBoolean()) colorSwitcher(el);
			if(randomBoolean()) randomTranslate(el);
			if(randomBoolean()) randomRotate(el);
			if(randomBoolean()) randomScale(el);
			if(randomBoolean()) randomSkew(el);
			if(randomBoolean()) randomFontSize(el);
		});
		
		//fonts
		function randomFontSize(el) {
			var size = randomArbitrary(0.7, 1.3);
			el.css('font-size', size + 'em');
		};
		
		//skew it
		function randomSkew(el) {
			var degrees = randomIntFromInterval(0, 5);	  	
			//console.log('skew: ' + el.css('transform'));
			el.css('transform', 'skew(' + randomPlusMinus() + degrees + 'deg, ' + randomPlusMinus() + degrees + 'deg)');
		};
		
		//scale some
		function randomScale(el) {
			var width = randomArbitrary(0.75, 1.25);
			var height = randomArbitrary(0.75, 1.25);
			//console.log('scale: ' + el.css('transform'));
			el.css('transform', 'scale(' + randomPlusMinus() + width + ',' + randomPlusMinus() + height + ')');
		};
		
		//rotate maybe
		function randomRotate(el) {
			var degrees = randomIntFromInterval(0, theFibonacci100[randomIntFromInterval(0, theFibonacci100.length-1)]);
			//console.log('rotate: ' + el.css('transform'));
			el.css('transform', 'rotate(' + randomPlusMinus() + degrees + 'deg)');
		};
		
		//move it a bit
		function randomTranslate(el) {
			var x = fibonacci[randomIntFromInterval(0, fibonacci.length-1)];
			var y = fibonacci[randomIntFromInterval(0, fibonacci.length-1)];
			//console.log('translate: ' + el.css('transform'));
			el.css('transform', 'translate(' + randomPlusMinus() + x + 'px, ' + randomPlusMinus() +  y  + 'px)');
		};
		
		//color switcher (primary colors because...punk! w/ random colors thrown in because...)
		//TODO: add grayscale and black and white variations
		function colorSwitcher(el) {
			switch(colorCounter)
			{
				case 0 :
					var inverted = invertColor(randomBoolean() ? settings.preferredPrimaryColor : randomColor());
					el.css({
						 'color' : randomBoolean() ? settings.preferredPrimaryColor : randomColor(),
						 'background-color' : inverted
					});	  			
					break;
				case 1 :
					var inverted = invertColor(randomBoolean() ? settings.preferredSecondaryColor : randomColor());
					el.css({
						 'color' : randomBoolean() ? settings.preferredSecondaryColor : randomColor(),
						 'background-color' : inverted
					});	  
					break;
				case 2 :		  		
					var inverted = invertColor(randomBoolean() ? settings.preferredTertiaryColor : randomColor());
					el.css({
						 'color' : randomBoolean() ? settings.preferredTertiaryColor : randomColor(),
						 'background-color' : inverted
					});	  
					break;
			}
			colorCounter == 2 ? colorCounter = 0 : colorCounter++;
		};
		
		function invertColor(color) {
			var c = color;
			c = c.substring(1);
			c = parseInt(c, 16);
			c = 0xFFFFFF ^ c;
			c = c.toString(16);
			c = '#' + ("000000" + c).slice(-6);
			return c;
		};
		
		function randomColor() {
			var c;
			c = Math.floor(Math.random() * 0x1000000);
			c = c.toString(16);
			c = '#' + ("000000" + c).slice(-6);
			return c;
		};
		
		function randomBoolean() {
			return (Math.random() >= 0.5);
		};
		
		function randomPlusMinus() {
			var sign = ['', '-'];
			var signWeight = [7, 3]; // 70/30 ratio, lean towards positive
			var sum = 10;
			var weightMap = [];
			var current = 0;
			while(current < sign.length) {
				for(var i = 0; i < signWeight[current]; i++) {
					weightMap[weightMap.length] = sign[current];
				}
				current++;
			}
			var random = Math.floor(Math.random() * sum);
			return weightMap[random];	  	
		};
		
		function randomArbitrary(min, max) {
			return Math.random() * (max - min) + min;
		};
		
		function randomIntFromInterval(min, max)
		{
			return Math.floor(Math.random() * (max - min + 1) + min);
		};
		
		return this;
	};

}( jQuery));

function getParameterByName(name) {
		var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
		return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

$(function() {
	if(getParameterByName('brutalize')) {	
		$().brutalize({
			preferredPrimaryColor: '#FF4500',
			preferredSecondaryColor: '#800080',
			preferredTertiaryColor: '#FFFF00'
		});	
	}
});
