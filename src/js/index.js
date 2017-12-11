(function() {
  const signinIcon = document.getElementsByClassName('js-signin-toggle')[0];
  const layeredBlock = new LayeredBlock(document.getElementsByClassName('js-layered-block')[0]);

  signinIcon.addEventListener('click', layeredBlock.toggle.bind(layeredBlock));
  new AuthForm(document.getElementsByClassName('js-auth-form')[0]).init();
})();
