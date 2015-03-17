describe('Orders page', function() {
  var first = true;

  beforeEach(function() {
    if (first) {
      first = false;
      element.all(by.css('ion-tabs .tab-item')).first().click();
      expect(browser.getCurrentUrl()).toMatch(/\/#\/tab\/orders$/);
    }
  });

  it('should show the orders', function() {
    expect(element.all(by.css('.cp-td')).get(2).getText()).toContain('Customer');
  });

  it('should redirect to the order details page if an unconfirmed order is clicked', function() {
    element.all(by.css('ion-item')).first().click();
    expect(browser.getCurrentUrl()).toMatch(/\/#\/tab\/orders\/[0-9a-f]{24}$/);

    browser.get('/#/tab/orders');
  });

  it('should redirect to the upcoming order page if an upcoming order is clicked', function() {
    element.all(by.css('ion-item')).last().click();
    expect(browser.getCurrentUrl()).toMatch(/\/#\/tab\/orders\/upcoming\/[0-9a-f]{24}$/);

    browser.get('/#/tab/orders');
  });
});
