/*global module:true*/
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
		var average = 0;
		var count = 0;
		for (var i = 0, length = array.length; i < length; i += 1) {
			var member = +array[i];
			if (!member && array[i] !== 0 && array[i] !== '0') {
				member -= 1;
			}
			if (array[i] === member) {
				average += member;
				count += 1;
			}
		}
		return average / count;
	};

	$.event.special.mousewheelintention = {
		version: '0.1.0',
	
		setup: function () {
			if (window.addEventListener) {
				window.addEventListener('mousewheel', mouseWheelListener, false);
				window.addEventListener('DOMMouseScroll', mouseWheelListener, false);
			} else if (window.attachEvent) {
				window.attachEvent('onmousewheel', mouseWheelListener);
			}
		},
		
		teardown: function () {
			if (window.removeEventListener) {
				window.removeEventListener('mousewheel', mouseWheelListener, false);
				window.removeEventListener('DOMMouseScroll', mouseWheelListener, false);
			} else if (window.detachEvent) {
				window.detachEvent('onmousewheel', mouseWheelListener);
			}
		}
	};

	$.fn.extend({
		mousewheelintention: function (fn) {
			return fn ? this.bind('mouseWheelIntention', fn) : this.trigger('mouseWheelIntention');
		},
		
		unmousewheelintention: function (fn) {
			return this.unbind('mouseWheelIntention', fn);
		}
	});

	var prevY = 0;
	var lastEvents = [];
	var lastThreeScrolls = new Array(10);

	// populate the lastEvents array with 1s
	for (var i = 0, j = 16; i < j; i += 1) {
		lastEvents.push(1);
	}

	function mouseWheelListener(event) {
		var args = Array.prototype.slice.call(arguments, 1);
		var y = Math.abs(event.wheelDeltaY);

		// use detail when not wheelDelta not available like in firefox
		if (!event.wheelDeltaY) {
			y = Math.abs(event.detail * 3);
		}

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

		prevY = y;
		return ($.event.dispatch || $.event.handle).apply(this, args);
	}

}));