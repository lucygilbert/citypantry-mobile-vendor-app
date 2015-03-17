module.exports = {
  logout: function() {
    browser.get('/account');

    element(by.id('logOutButton')).click();

    browser.driver.wait(function() {
      return browser.driver.getCurrentUrl().then(function(url) {
        return (/\/login$/.test(url));
      });
    });
  },

  loginAsUser: function(email) {
    if (!email) {
      throw new Error('Must give an email address!');
    }

    browser.get('/login');

    element(by.id('login_email')).sendKeys(email);
    element(by.id('login_password')).sendKeys('password');

    element(by.css('login_submit')).click();

    browser.wait(function() {
      return browser.getCurrentUrl().then(function(url) {
        return (/\/$/.test(url));
      });
    });
  },

  scrollTo: function(element) {
    var webElement = element.getWebElement();
    browser.executeScript('arguments[0].scrollIntoView(false)', webElement);
  },
}
