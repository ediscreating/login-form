function LayeredBlock(el) {
  this.el = el;
  this._isOpened = this.el.className.indexOf('layered-block--hidden') === -1;

  const closeBtn = this.el.getElementsByClassName('layered-block__close-btn')[0];
  closeBtn.addEventListener('click', this.toggle.bind(this));
}

LayeredBlock.prototype.toggle = function () {
  if (this._isOpened) this.el.className += ' layered-block--hidden';
  else utils.removeClass(this.el, 'layered-block--hidden');
  this._isOpened = !this._isOpened;
};
