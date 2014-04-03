jQuery Mousewheel With Intent Plugin
========

This plugin attempts to provide a way to distinguish a user's intentional mousewheel events from smooth scrolling accelerated events that are common with trackpads.

A new event is created with the namespace `mousewheelintention`. The event shares the same properties as a mousewheel event but includes a property namespaced `certainty`. This number from 0 to 1 represents the likelihood that the event being triggered was from user input. 1 being very certain it's from the user and 0 being very certain it is not from the user.

In order to use the plugin, simply bind the `mousewheelintention` event to an element.

It also provides two helper methods called `mousewheelintention` and `unmousewheelintention` that act just like other event helper methods in jQuery.

Here is an example of using both the bind and helper method syntax:

```js
// using on
$('#element').on('mousewheelintention', function (event) {
	console.log(event.certainty);
});

// using the event helper
$('#element').mousewheelintention(function (event) {
	console.log(event.certainty);
});
```

License
-------

Copyright (c) 2014 AOL, Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

The views and conclusions contained in the software and documentation are those
of the authors and should not be interpreted as representing official policies,
either expressed or implied, of the FreeBSD Project.