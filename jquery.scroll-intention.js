/*global module:true, Modernizr:true*/
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS style for Browserify
		module.exports = factory;
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var arrayremove = function (array, from, to) {
		var rest = array.slice((to || from) + 1 || array.length);
		array.length = from < 0 ? array.length + from : from;
		return array.push.apply(array, rest);
	};
	
	var average = function (array) {
		var av = 0;
		var cnt = 0;
		var len = array.length;
		for (var i = 0; i < len; i += 1) {
			var e = +array[i];
			if (!e && array[i] !== 0 && array[i] !== '0') {
				e -= 1;
			}
			if (array[i] === e) {
				av += e;
				cnt += 1;
			}
		}
		return av / cnt;
	};

	var startY = 0;
	var prevY = 0;
	var lastEvents = [];
	var lastThreeScrolls = new Array(10);
	var intentional = false;
	var resetTimer = null;

	// populate the lastEvents array with 1s
	for (var i = 0, j = 16; i < j; i += 1) {
		lastEvents.push(1);
	}

	function mouseWheelListener(event) {
		var y = Math.abs(event.wheelDeltaY);

		// use detail when not wheelDelta not available like in firefox
		if (!event.wheelDeltaY) {
			y = Math.abs(event.detail * 3);
		}
		var nextY = startY + y;
		var percent = prevY / nextY;

		// update the lastEvents array
		arrayremove(lastEvents, 0);
		lastEvents.push(y);

		var scrolling = average(lastEvents.slice(0, 5)) < average(lastEvents.slice(5));

		if (scrolling) {
			arrayremove(lastThreeScrolls, 0);
			lastThreeScrolls.push(1);
		} else {
			arrayremove(lastThreeScrolls, 0);
			lastThreeScrolls.push(0);
		}

		event.certainty = average(lastThreeScrolls);

		$(window).trigger('mouseWheelIntention', event);

		prevY = y;
	}

	if (window.addEventListener) {
		window.addEventListener('mousewheel', mouseWheelListener, false);
		window.addEventListener('DOMMouseScroll', mouseWheelListener, false);
	} else if (window.attachEvent) {
		window.attachEvent('onmousewheel', mouseWheelListener);
	}

}));