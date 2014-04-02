/*global module:true*/

// mousewheel event hooks borrowed from
// https://github.com/brandonaaron/jquery-mousewheel/

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

	var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'];
	var toBind = ('onwheel' in document || document.documentMode >= 9) ? ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'];

	if ($.event.fixHooks) {
		for (var l = toFix.length; l;) {
			$.event.fixHooks[toFix[--l]] = $.event.mouseHooks;
		}
	}
	
	$.event.special.mousewheelintention = {
		version: '0.1.0',
	
		setup: function () {
			if (this.addEventListener) {
				for (var i = toBind.length; i;) {
					this.addEventListener(toBind[--i], mouseWheelListener, false);
				}
			} else {
				this.onmousewheel = mouseWheelListener;
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
			return fn ? this.bind('mousewheelintention', fn) : this.trigger('mousewheelintention');
		},
		unmousewheelintention: function (fn) {
			return this.unbind('mousewheelintention', fn);
		}
	});

	var prevY = 0;
	var lastEvents = [];
	var lastScrolls = [];

	// populate the lastEvents array with 1s
	for (var i = 0; i < 16; i += 1) {
		lastEvents.push(1);
	}

	// populate the lastScrolls array with0s
	for (var j = 0; j < 10; j += 1) {
		lastScrolls.push(0);
	}

	function mouseWheelListener(event) {
		var orginalEvent = event || window.event;
		var args = Array.prototype.slice.call(arguments, 1);

		event = $.event.fix(orginalEvent);
		event.type = 'mousewheelintention';
		
		var y = Math.abs(event.originalEvent.wheelDeltaY);

		// use detail when not wheelDelta not available like in firefox
		if (!event.originalEvent.wheelDeltaY) {
			y = Math.abs(event.originalEvent.detail * 3);
		}

		// update the lastEvents array
		arrayremove(lastEvents, 0);
		lastEvents.push(y);

		var scrolling = average(lastEvents.slice(0, 5)) < average(lastEvents.slice(5));

		if (scrolling) {
			arrayremove(lastScrolls, 0);
			lastScrolls.push(1);
		} else {
			arrayremove(lastScrolls, 0);
			lastScrolls.push(0);
		}

		event.certainty = average(lastScrolls);

		args.unshift(event);

		prevY = y;
		return ($.event.dispatch || $.event.handle).apply(this, args);
	}

}));