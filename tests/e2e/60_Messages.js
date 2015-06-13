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
    var senders = element.all(by.css('h2'));
    expect(senders.get(0).getText()).toBe('Customer');
    expect(senders.get(1).getText()).toBe('Me');
    expect(senders.get(2).getText()).toBe('Customer');

    var messages = element.all(by.css('.message'));
    expect(messages.get(0).getText()).toBe('I want orange ones please.\n\nThanks.');
    expect(messages.get(1).getText()).toBe('They are orange or white.');
    expect(messages.get(2).getText()).toBe('Hi, what colour are your carrots?');
  });

  it('should send a new message', function() {
    element.all(by.css('ion-item')).last().click();

    element(by.css('textarea')).sendKeys('It\'s not about the money. It\'s about sending a message.');
    element(by.cssContainingText('button', 'Send')).click();

    element(by.cssContainingText('.popup-buttons button', 'OK')).click();

    // The order of the messages varies depending on how long it took to get to this test, because
    // the fixture messages do not all have the same date sent. So we only assert that the count is
    // now 4.
    expect(element.all(by.css('.message')).count()).toBe(4);
  });
});
