var Tracking = function(el) {
	this.el = el;
	this.firstScroll = true;
	this.newSections = $(el).children('section').dom;
};

Tracking.prototype.section = function(){
	//Scroll triggers on page load, ignore first
	if(this.firstScroll){
		this.firstScroll = false;
		return;
	}

	var visibleItems = Utils.inViewport(this.newSections);
	for (var i = visibleItems.length - 1; i >= 0; i--) {
		var item = visibleItems[i],
		firstClass = $(item).attr('class').split(" ")[0];

		this.newSections.remove(item);
		this.event(firstClass);

	}
};

Tracking.prototype.event = function(name) {
	var obj = {
		meta_log: {
			c: 'public-action',
			m: name
		}
	};
	Utils.api('/api/system/log', obj);
};

Human = function(el) {
	var _this = this;
	this.el = el;
};

Human.prototype.check = function(){
	$(this.el).on('touchstart mousemove', function(e) {
		$(this.el).off(e);
		if(!localStorage.confimed) {
			localStorage.confimed = "true";
			Utils.api('/guiapi/auth/verify');
		}
	});
};