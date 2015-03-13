describe('Orders and order details page', function() {
  var first = true;

  beforeEach(function() {
    if (first) {
      first = false;

      browser.get('/#/login');
      element(by.id('login_email')).sendKeys('vendor@bunnies.test');
      element(by.id('login_password')).sendKeys('password');
      element(by.id('login_submit')).click();
    }
  });

  it('should show the orders', function() {
    expect(element.all(by.css('.cp-td')).get(2).getText()).toContain('Customer');
  });

  it('should redirect to the order details page if an unconfirmed order is clicked', function() {
    element.all(by.css('ion-item')).first().click();
    expect(browser.getCurrentUrl()).toMatch(/\/#\/tab\/orders\/[0-9a-f]{24}$/);

    browser.get('/#/orders');
  });

  it('should redirect to the upcoming order page if an upcoming order is clicked', function() {
    element.all(by.css('ion-item')).last().click();
    expect(browser.getCurrentUrl()).toMatch(/\/#\/tab\/orders\/upcoming\/[0-9a-f]{24}$/);

    browser.get('/#/orders');
  });

  it('should show order details on order details page', function() {
    element.all(by.css('ion-item')).first().click();

    expect(element.all(by.css('p')).get(1).getText()).toBe('Ask for someone');
    expect(element.all(by.css('p')).get(2).getText()).toBe('Carrots');
    expect(element.all(by.css('p')).get(3).getText()).toBe('5');
  });

  it('should hide Accept button once clicked', function() {
    scrollTo(element(by.id('acceptButton')).getWebElement());

    element(by.id('acceptButton')).click();

    expect(element(by.id('acceptButton')).isPresent()).toBe(false);
  });

  it('should show "No orders to show." if there are no orders for a section', function() {
    browser.get('/#/orders');

    expect(element.all(by.css('ion-item')).first().isDisplayed()).toBe(true);
  });
});
