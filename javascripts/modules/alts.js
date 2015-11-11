Alts = function(el) {
	var _this = this;
	this.el = $(el);
	this.bottomFix = 'bottomFix';
	this.position = this.el.position().top;
	this.footer = $('footer').dom;
	this.overflowHidden = false;

};

Alts.prototype.adHidden = function(){
	return app.window.scrollTop() > this.position;
};

Alts.prototype.onScroll = function(){
	this.lockCheck();
	if(!this.overflowHidden && this.adHidden()){
		this.hideOverflowing();
	}
};

Alts.prototype.lockCheck = function(){
	var visibleFooter = Utils.inViewport(this.footer).length;

	this.el.toggleClass('topFix', this.adHidden() && !visibleFooter );
	this.el.toggleClass('bottomFix', visibleFooter );
};


Alts.prototype.hideOverflowing = function() {
	var listItems = this.el.find('.alts__other__questions li').dom;

	this.overflowHidden = true;
	listItems.forEach(function(item){
		var inside = Utils.inViewport($(item).dom, 0 ,true).length;
		if(!inside){
			$(item).addClass('visuallyhidden');
		}

	});
};