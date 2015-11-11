Alts = function(el) {
	var _this = this;
	this.el = $(el);
	this.bottomFix = 'bottomFix'
	this.position = this.el.position().top
	this.footer = $('footer').dom

};

Alts.prototype.lockCheck = function(){
	var scrollpos = $(window).scrollTop(),
		visibleAd = scrollpos > this.position,
		visibleFooter = Utils.inViewport(this.footer).length;

	this.el.toggleClass('topFix', visibleAd && !visibleFooter )
	this.el.toggleClass('bottomFix', visibleFooter )

}