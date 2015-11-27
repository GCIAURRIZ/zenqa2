Alts = function(el) {
	var _this = this;
	this.el = $(el);
	this.ad = $('.cta');
	this.footer = $('footer');
};

Alts.prototype.showing = function(element){
	return Utils.inViewport(element.dom).length;
};

Alts.prototype.onScroll = function(){
	Utils.toggleClass(this.el,'topFix', !this.showing(this.ad) );
	Utils.toggleClass(this.el,'bottomFix', this.showing(this.footer) );
};