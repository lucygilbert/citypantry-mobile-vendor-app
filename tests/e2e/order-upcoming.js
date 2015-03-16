describe('Upcoming order page', function() {
  var first = true;

  beforeEach(function() {
    if (first) {
      first = false;

      browser.get('/#/login');
      element(by.id('login_email')).sendKeys('vendor@bunnies.test');
      element(by.id('login_password')).sendKeys('password');
      element(by.id('login_submit')).click();

      element.all(by.css('ion-item')).last().click();
    }
  });

  it('should hide the Left Kitchen button when clicked', function() {
    element.all(by.css('.button')).get(4).click();

    element(by.css('.popup-buttons button')).click();

    expect(element.all(by.css('.button')).count()).toBe(8);
  });

  it('should hide the Late < 15 Minutes button when clicked', function() {
    element.all(by.css('.button')).get(4).click();

    element(by.css('.popup-buttons button')).click();

    expect(element.all(by.css('.button')).count()).toBe(7);
  });

  it('should hide the Late > 15 Minutes button when clicked', function() {
    element.all(by.css('.button')).get(4).click();

    element(by.css('.popup-buttons button')).click();

    expect(element.all(by.css('.button')).count()).toBe(6);
  });

  it('should hide the Delivered button when clicked', function() {
    element.all(by.css('.button')).get(3).click();

    element(by.css('.popup-buttons button')).click();

    expect(element.all(by.css('.button')).count()).toBe(5);
  });

  it('should redirect to Order Details when the View Order button is clicked', function() {
    element.all(by.css('.button')).last().click();

    expect(browser.getCurrentUrl()).toMatch(/\/#\/tab\/orders\/[0-9a-f]{24}$/);
  });
});
