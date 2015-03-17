module.exports = {
  logout: function() {
    browser.get('/#/tab/account');

    element(by.id('logOutButton')).click();
  },

  loginAsUser: function(email) {
    if (!email) {
      throw new Error('Must give an email address!');
    }

    browser.get('/#/login');

    element(by.id('login_email')).sendKeys(email);
    element(by.id('login_password')).sendKeys('password');
    element(by.id('login_submit')).click();
  },

  scrollTo: function(element) {
    var webElement = element.getWebElement();
    browser.executeScript('arguments[0].scrollIntoView(false)', webElement);
  },
}
