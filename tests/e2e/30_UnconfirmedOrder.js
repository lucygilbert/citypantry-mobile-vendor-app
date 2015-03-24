describe('Unconfirmed order page', function() {
  var first = true;

  beforeEach(function() {
    if (first) {
      first = false;
      browser.get('/#/tab/orders');
      element.all(by.css('ion-item')).first().click();
    }
  });

  it('should show order details on order details page', function() {
    expect(element.all(by.css('p')).get(1).getText()).toBe('Ask for someone');
    expect(element.all(by.css('p')).get(2).getText()).toContain('Paint your car');
    expect(element.all(by.css('p')).get(3).getText()).toBe('Carrots');
    expect(element.all(by.css('p')).get(4).getText()).toBe('5');
  });

  it('should hide Accept button once clicked', function() {
    var acceptButton = element(by.id('acceptButton'));

    scrollTo(acceptButton);

    acceptButton.click();

    expect(acceptButton.isPresent()).toBe(false);
  });

  it('should show "No orders to show." if there are no orders for a section', function() {
    browser.get('/#/tab/orders');

    expect(element.all(by.css('ion-item')).first().getText()).toBe('No orders to show.');
  });
});
