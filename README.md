Although it has fewer features than the UI draggable library, it is also much smaller. AnimaDrag allows draggable items to be eased by jQuery animation, which UI draggables do not allow. This allows for a richer display of the transition between two locations, with full easing support.

Because it relies on animation during its transition, it is recommended to use with the jQuery Easing Plugin.

Because it is so lightweight, it doesn't have anything built into it to know where to drop the draggable area when it is let go of. You'll need to use the "after" callback and append it somewhere yourself with $(this).appendTo(location);

All Options (at default values):

	jQuery(element).animaDrag({
	    speed: 400,
	    interval: 300,
	    easing: null,
	    cursor: 'move',
	    boundary: document.body,
	    grip: null,
	    overlay: true,
	    after: function(e) {},
	    during: function(e) {},
	    before: function(e) {},
	    afterEachAnimation: function(e) {}
	});

Original and samles at http://wayfarerweb.com/jquery/plugins/animadrag/