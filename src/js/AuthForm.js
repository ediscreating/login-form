const AuthForm = (function() {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const inputValidators = {
    email: function(str) {
      return emailRegex.test(str);
    },
    password: function(str) {
      return str.length >= 5;
    },
  };

  function AuthForm(el) {
    this.el = el;
    this.btnEl = this.el.getElementsByClassName('auth-form__submit-btn')[0];

    this._initted = false;
    this._isBtnDisabled = this.btnEl.className.indexOf('auth-form__submit-btn--is-disabled') !== -1;
    this._values = {};
  }

  AuthForm.prototype.init = function() {
    if (this._initted) return;

    this._initted = true;

    const formElements = this.el.elements;

    this._values['email'] = formElements.email.value;
    this._values['password'] = formElements.email.password;

    const switchInstance = new SwitchElement(document.getElementsByClassName('js-form-switch')[0]);

    this.el.addEventListener('click', e => {
      if (SwitchElement.isSwitch(e.target)) switchInstance.toggle();
    });

    this.el.addEventListener('submit', e => {
      e.preventDefault();
      if (this.validate('password') && this.validate('email')) alert('Form Submitted');
    });

    this.el.addEventListener('input', e => {
      this._values[e.target.name] = e.target.value;

      if (this.validate('password') && this.validate('email')) {
        utils.removeClass(this.btnEl, 'auth-form__submit-btn--is-disabled');
        this._isBtnDisabled = false;
      } else if (!this._isBtnDisabled) {
        this.btnEl.className += ' auth-form__submit-btn--is-disabled';
        this._isBtnDisabled = true;
      }
    });
  };

  AuthForm.prototype.validate = function(inputName) {
    const val = this._values[inputName] || '';
    return inputValidators[inputName](val);
  };

  return AuthForm;
})();
