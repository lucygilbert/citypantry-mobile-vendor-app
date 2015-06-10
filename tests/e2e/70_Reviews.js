describe('Reviews pages', function() {
  var first = true;

  beforeEach(function() {
    if (first) {
      first = false;
      element.all(by.css('ion-tabs .tab-item')).last().click();
      expect(browser.getCurrentUrl()).toMatch(/\/#\/tab\/reviews$/);
    }
  });

  it('should display reviews', function() {
    expect(element(by.cssContainingText('strong', 'Carrots')).isPresent()).toBe(true);
    expect(element(by.cssContainingText('p', 'Very nice and very fresh!')).isPresent()).toBe(true);
    expect(element(by.cssContainingText('strong', 'Marshmallows')).isPresent()).toBe(true);
    expect(element(by.cssContainingText('p', 'Order was 20 minutes late')).isPresent()).toBe(true);
  });

  it('should redirect to review details on click', function() {
    element.all(by.css('ion-item.reviews')).first().click();

    expect(browser.getCurrentUrl()).toMatch(/\/#\/tab\/reviews\/[0-9a-f]{24}$/);
  });

  it('should display the review details on the details page', function() {
    expect(element(by.cssContainingText('strong', 'Customer')).isPresent()).toBe(true);
    expect(element(by.cssContainingText('strong', 'Company')).isPresent()).toBe(true);
    expect(element(by.cssContainingText('strong', 'Package')).isPresent()).toBe(true);
    expect(element(by.cssContainingText('strong', 'Order #')).isPresent()).toBe(true);
    expect(element(by.cssContainingText('strong', 'Review Date')).isPresent()).toBe(true);
    expect(element(by.cssContainingText('strong', 'Review')).isPresent()).toBe(true);

    expect(element(by.cssContainingText('p', 'Customer')).isPresent()).toBe(true);
    expect(element(by.cssContainingText('p', 'Aperture Science')).isPresent()).toBe(true);
    expect(element(by.cssContainingText('p', 'Carrots')).isPresent()).toBe(true);
    expect(element(by.css('p.id')).getText()).toMatch(/^[0-9]+$/);
    expect(element(by.css('p.date')).getText()).toMatch(/^([1-9]|[12][0-9]|3[01]) [A-S][a-y]{2} 20\d\d$/);
  });

});
