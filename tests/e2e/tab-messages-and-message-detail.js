ddescribe('Message pages', function() {
  var first = true;

  beforeEach(function() {
    if (first) {
      first = false;

      browser.get('/#/login');
      element(by.id('login_email')).sendKeys('vendor@bunnies.test');
      element(by.id('login_password')).sendKeys('password');
      element(by.id('login_submit')).click();

      element.all(by.css('.tab-item')).get(1).click();
    }
  });

  it('should display orders with messages', function() {
    expect(element(by.css('h2')).isDisplayed()).toBe(true);
    expect(element(by.css('p')).getAttribute('innerHTML')).toContain('I want orange ones please.');
  });

  it('should redirect to message details on click', function() {
    element(by.css('ion-item.item-icon-left')).click();

    expect(browser.getCurrentUrl()).toMatch(/\/#\/tab\/messages\/[0-9a-f]{24}$/);
  });

  it('should display the messages on the details page', function() {
    expect(element.all(by.css('h2')).get(1).getAttribute('innerHTML')).toBe('Customer');
    expect(element.all(by.css('h2')).get(2).getAttribute('innerHTML')).toBe('Me');
    expect(element.all(by.css('h2')).get(3).getAttribute('innerHTML')).toBe('Customer');

    expect(element.all(by.css('span')).get(3).getAttribute('innerHTML')).toBe('Hi, what colour are your carrots?');
    expect(element.all(by.css('span')).get(4).getAttribute('innerHTML')).toBe('They are orange or white.');
    expect(element.all(by.css('span')).get(5).getAttribute('innerHTML')).toBe('I want orange ones please.<br>\nThanks.');
  });

  it('should send a new message', function() {
    element.all(by.css('ion-item')).last().click();

    element(by.css('textarea')).sendKeys('It\'s not about the money. It\'s about sending a message.');
    element(by.cssContainingText('button', 'Send')).click();

    expect(element.all(by.css('span')).get(6).getAttribute('innerHTML')).toBe('It\'s not about the money. It\'s about sending a message.');
  });
});
