Expandable = function(el) {
	this.el = $(el);
	this.trigger = $(el).find('.trigger');
	this.hidden = $(el).find('.collapsed');

	this.setListeners();
};

Expandable.prototype.setListeners = function() {
	var _this = this;
	this.trigger.on('click', function(e) {
		e.preventDefault();
		$(_this.hidden).removeClass('collapsed');
		_this.focus()
	});
};

Expandable.prototype.focus = function() {
	this.textarea = this.el.find('textarea').dom[0];
	if(typeof this.textarea !== 'undefined'){
		this.textarea.focus();
	}
}