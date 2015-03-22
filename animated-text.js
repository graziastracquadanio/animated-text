angular.module('animate-text', [])

.directive('animatedText', function () {
	return {
		restrict : 'E',
		link: function (scope, element, attrs){
			// convert single words to array
			var words = element.text().split(' ');
			var html = '';

			// insert the content inside a div
			html += '<div class="animated-letters-container ' + attrs.container + '">';
			var max_width = element.parent()[0].offsetWidth,
				single_width = Math.round(max_width / element.text().replace(/\s+/g, '').split('').length);

			angular.forEach(words, function(word) {
				// insert word in div
				html += '<div class="f-word">';
							
				angular.forEach(word.split(''), function(letter) {
					letter = letter.toUpperCase();
				
					var random = Math.floor((Math.random() * 4) + 1);
					switch (random) {
						case 1 : direction = 'up'; break;
						case 2 : direction = 'right'; break;
						case 3 : direction = 'down'; break;
						case 4 : direction = 'left'; break;
					}

					switch (letter) {
						case ';':
						case ':':
						case '.':
						case '*':
						case '&':
						case '@':
						case ',':
						case '!':
						case '\'':
						case '?':

							direction = 'right';
							break;
					}

					var single = '<div class="f-letter">' +
									'<span>' + letter + '</span>' +
									'<div class="inner ' + direction + '">' +
										'<div class="first">' + letter + '</div>' +
										'<div class="second">' + letter + '</div>' +
									'</div>' +
								'</div>';
					// append letter to container
					html += single;
				});

				html += '</div>';
			});
			html += '</div>';

			element.html(html);

			var animateLetter = function(letterElement) {
				if(letterElement.hasClass('animate')) {
					return;
				}
				letterElement.addClass('animate');

				setTimeout(function(){ 
					letterElement.removeClass('animate');
				}, 3000);
			};

			var animateRandomLetter = function () {
				var randomWord = Math.floor((Math.random() * words.length) + 1) - 1;
				var randomLetter = Math.floor((Math.random() * words[randomWord].length) + 1) - 1;

				var wordElement = element.children().eq(0).children().eq(randomWord),
					letterElement = wordElement.children().eq(randomLetter).children().eq(1);

				setTimeout(function(){ 
					animateLetter(letterElement);
				}, Math.floor((Math.random() * 4) + 1) * 1000);
			};

			var letters = element.children().children().children().children();
			letters.on('mouseover', function (event) {
				var target = angular.element(event.currentTarget);
				animateLetter(target);
			});

			window.setInterval(function () {
				animateRandomLetter();
				animateRandomLetter();

			}, 3000);
		}
	};
});