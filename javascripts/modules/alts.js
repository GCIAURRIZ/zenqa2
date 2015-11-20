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

Alts.prototype.footerHidden = function(){
	return !Utils.inViewport(this.footer).length;
};

Alts.prototype.onScroll = function(){
	this.lock();
	if(!this.overflowHidden && (this.adHidden() && this.footerHidden()) ){
		this.hideOverflowing();
	}
};

//sets right column to fixed.
Alts.prototype.lock = function(){
	this.el.toggleClass('topFix', this.adHidden() && this.footerHidden() );
	this.el.toggleClass('bottomFix', !this.footerHidden() );
};

//hides overflowing items
Alts.prototype.hideOverflowing = function() {
	var listItems = this.el.find('.altsOtherQuestions li').dom;

	this.overflowHidden = true;
	listItems.forEach(function(item){
		var inside = Utils.inViewport($(item).dom, 0 ,true).length;
		if(!inside){
			$(item).addClass('visuallyhidden');
		}

	});
};