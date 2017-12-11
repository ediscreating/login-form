"use strict";

var utils = {
  removeClass: function removeClass(el, className) {
    var i = el.className.indexOf(className);

    if (i === -1) return;

    var elClass = el.className.split('');
    var l = className.length;

    if ((elClass[i - 1] === " " || !Boolean(elClass[i - 1])) && (elClass[i + l] === " " || !Boolean(elClass[i + l]))) {
      el.className = [].concat(elClass.slice(0, i), elClass.slice(i + l)).join('').trim().split(' ').filter(Boolean).join(' ');
    }
  }
};

function LayeredBlock(el) {
  this.el = el;
  this._isOpened = this.el.className.indexOf('layered-block--hidden') === -1;

  var closeBtn = this.el.getElementsByClassName('layered-block__close-btn')[0];
  closeBtn.addEventListener('click', this.toggle.bind(this));
}

LayeredBlock.prototype.toggle = function () {
  if (this._isOpened) this.el.className += ' layered-block--hidden';else utils.removeClass(this.el, 'layered-block--hidden');
  this._isOpened = !this._isOpened;
};

function SwitchElement(el) {
  this.el = el;
  this._isOn = this.el.className.indexOf('switch--is-off') === -1;
}

SwitchElement.prototype.toggle = function () {
  if (this._isOn) this.el.className += ' switch--is-off';else utils.removeClass(this.el, 'switch--is-off');
  this._isOn = !this._isOn;
};

SwitchElement.isSwitch = function (el) {
  return el.className.indexOf('switch') !== -1 || el.parentNode.className.indexOf('switch') !== -1;
};

var AuthForm = function () {
  var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  var inputValidators = {
    email: function email(str) {
      return emailRegex.test(str);
    },
    password: function password(str) {
      return str.length >= 5;
    }
  };

  function AuthForm(el) {
    this.el = el;
    this.btnEl = this.el.getElementsByClassName('auth-form__submit-btn')[0];

    this._initted = false;
    this._isBtnDisabled = this.btnEl.className.indexOf('auth-form__submit-btn--is-disabled') !== -1;
    this._values = {};
  }

  AuthForm.prototype.init = function () {
    var _this = this;

    if (this._initted) return;

    this._initted = true;

    var formElements = this.el.elements;

    this._values['email'] = formElements.email.value;
    this._values['password'] = formElements.email.password;

    var switchInstance = new SwitchElement(document.getElementsByClassName('js-form-switch')[0]);

    this.el.addEventListener('click', function (e) {
      if (SwitchElement.isSwitch(e.target)) switchInstance.toggle();
    });

    this.el.addEventListener('submit', function (e) {
      e.preventDefault();
      if (_this.validate('password') && _this.validate('email')) alert('Form Submitted');
    });

    this.el.addEventListener('input', function (e) {
      _this._values[e.target.name] = e.target.value;

      if (_this.validate('password') && _this.validate('email')) {
        utils.removeClass(_this.btnEl, 'auth-form__submit-btn--is-disabled');
        _this._isBtnDisabled = false;
      } else if (!_this._isBtnDisabled) {
        _this.btnEl.className += ' auth-form__submit-btn--is-disabled';
        _this._isBtnDisabled = true;
      }
    });
  };

  AuthForm.prototype.validate = function (inputName) {
    var val = this._values[inputName] || '';
    return inputValidators[inputName](val);
  };

  return AuthForm;
}();

(function () {
  var signinIcon = document.getElementsByClassName('js-signin-toggle')[0];
  var layeredBlock = new LayeredBlock(document.getElementsByClassName('js-layered-block')[0]);

  signinIcon.addEventListener('click', layeredBlock.toggle.bind(layeredBlock));
  new AuthForm(document.getElementsByClassName('js-auth-form')[0]).init();
})();