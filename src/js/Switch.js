function SwitchElement(el) {
  this.el = el;
  this._isOn = this.el.className.indexOf('switch--is-off') === -1;
}

SwitchElement.prototype.toggle = function () {
  if (this._isOn) this.el.className += ' switch--is-off';
  else utils.removeClass(this.el, 'switch--is-off');
  this._isOn = !this._isOn;
};

SwitchElement.isSwitch = function(el) {
  return el.className.indexOf('switch') !== -1 || el.parentNode.className.indexOf('switch') !== -1;
};
