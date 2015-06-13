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
    var expectations = {
      'p.cp-order-delivery-instruction': 'Ask for someone',
      'p.cp-order-parking-suggestion': 'Paint your car',
      'p.cp-order-package-name': 'Carrots',
      'p.cp-order-head-count': '5',
    };

    for (var selector in expectations) {
      var selectorElement = element(by.css(selector));
      scrollTo(selectorElement);
      expect(selectorElement.getText()).toContain(expectations[selector]);
    }
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
