describe('Login page', function() {
  beforeEach(function() {
    browser.get('/#/login');
   });

  function attemptLogIn(email, password) {
    element(by.id('login_email')).sendKeys(email);
    element(by.id('login_password')).sendKeys(password);

    element(by.id('login_submit')).click();
  }

  function expectPopupIsDisplayedAndHasMessage(message) {
    expect(element(by.css('.popup')).isDisplayed()).toBe(true);
    expect(element(by.css('div.popup-body span')).getText()).toBe(message);
  }

  it('should show an error modal if the email is wrong', function() {
    attemptLogIn('hurp@du.rp', 'password');
    expectPopupIsDisplayedAndHasMessage('Email/password is incorrect');
  });

  it('should show an error modal if the password is wrong', function() {
    attemptLogIn('vendor@bunnies.test', 'wrong');
    expectPopupIsDisplayedAndHasMessage('Email/password is incorrect');
  });

  it('should show an error modal if user is not vendor', function() {
    attemptLogIn('customer@bunnies.test', 'password');
    expectPopupIsDisplayedAndHasMessage('Vendors only.');
  });

  it('should redirect to Orders page upon successful login', function() {
    attemptLogIn('vendor@bunnies.test', 'password');
    expect(browser.getCurrentUrl()).toMatch(/\/#\/tab\/orders$/);

    browser.get('/#/tab/account');
    element(by.id('logOutButton')).click();
  });
});
