OtherQuestions = function(el) {
	this.el = $(el);
	this.parent = this.el.parent();
	this.listOffset = this.el.position().top + this.parent.position().top;
	this.viewOffset = window.innerHeight - this.listOffset;
	this.listItems = this.el.children().dom;

	this.hide();
};

OtherQuestions.prototype.hide = function() {
	var _this = this;
	this.listItems.forEach(function(listItem){
		var item = $(listItem),
			itemOffset = item.position().top+item.height(),
			outside = itemOffset > _this.viewOffset;
		console.log(itemOffset, _this.viewOffset )
		outside ? item.addClass('visuallyhidden') : false;
	});
};