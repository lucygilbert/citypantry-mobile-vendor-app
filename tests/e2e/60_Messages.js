describe('Message pages', function() {
  var first = true;

  beforeEach(function() {
    if (first) {
      first = false;
      element.all(by.css('ion-tabs .tab-item')).get(1).click();
      expect(browser.getCurrentUrl()).toMatch(/\/#\/tab\/messages$/);
    }
  });

  it('should display orders with messages', function() {
    expect(element(by.css('h2')).getText()).toMatch(/^Order #\d+$/);
    expect(element(by.css('.last-message')).getText()).toBe('I want orange ones please. Thanks.');
  });

  it('should redirect to message details on click', function() {
    element(by.css('ion-item.item-icon-left')).click();

    expect(browser.getCurrentUrl()).toMatch(/\/#\/tab\/messages\/[0-9a-f]{24}$/);
  });

  it('should display the messages on the details page', function() {
    expect(element.all(by.css('h2')).get(1).getText()).toBe('Customer');
    expect(element.all(by.css('h2')).get(2).getText()).toBe('Me');
    expect(element.all(by.css('h2')).get(3).getText()).toBe('Customer');

    expect(element.all(by.css('.message')).get(0).getText()).toBe('Hi, what colour are your carrots?');
    expect(element.all(by.css('.message')).get(1).getText()).toBe('They are orange or white.');
    expect(element.all(by.css('.message')).get(2).getText()).toBe('I want orange ones please.\nThanks.');
  });

  it('should send a new message', function() {
    element.all(by.css('ion-item')).last().click();

    element(by.css('textarea')).sendKeys('It\'s not about the money. It\'s about sending a message.');
    element(by.cssContainingText('button', 'Send')).click();

    element(by.cssContainingText('.popup-buttons button', 'OK')).click();

    expect(element.all(by.css('.message')).get(3).getText()).toBe('It\'s not about the money. It\'s about sending a message.');
  });
});
