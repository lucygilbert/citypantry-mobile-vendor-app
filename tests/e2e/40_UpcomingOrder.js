describe('Upcoming order page', function() {
  var first = true;
  var buttons;

  beforeEach(function() {
    if (first) {
      first = false;
      browser.get('/#/tab/orders');
      element.all(by.css('ion-item')).last().click();
    }

    buttons = element.all(by.css('ion-content .button'));
  });

  function expectButtons(expectedButtons) {
    expect(buttons.count()).toBe(expectedButtons.length);

    for (var i = 0; i < expectedButtons.length; i++) {
      expect(buttons.get(i).getText()).toBe(expectedButtons[i]);
    }
  }

  it('should show buttons to take an action', function() {
    expectButtons(['Delivered', 'Left kitchen', 'Late < 15 minutes', 'Late > 15 minutes', 'Call City Pantry', 'View order details']);
  })

  it('should hide the Left Kitchen button when clicked', function() {
    buttons.get(1).click();

    element(by.css('.popup-buttons button')).click();

    expectButtons(['Delivered', 'Late < 15 minutes', 'Late > 15 minutes', 'Call City Pantry', 'View order details']);
  });

  it('should hide the Late < 15 Minutes button when clicked', function() {
    buttons.get(1).click();

    element(by.css('.popup-buttons button')).click();

    expectButtons(['Delivered', 'Late > 15 minutes', 'Call City Pantry', 'View order details']);
  });

  it('should hide the Late > 15 Minutes button when clicked', function() {
    buttons.get(1).click();

    element(by.css('.popup-buttons button')).click();

    expectButtons(['Delivered', 'Call City Pantry', 'View order details']);
  });

  it('should hide the Delivered button when clicked', function() {
    buttons.get(0).click();

    element(by.css('.popup-buttons button')).click();

    expectButtons(['Call City Pantry', 'View order details']);
  });

  it('should redirect to Order Details when the View Order button is clicked', function() {
    element.all(by.css('.button')).last().click();

    expect(browser.getCurrentUrl()).toMatch(/\/#\/tab\/orders\/[0-9a-f]{24}$/);
  });
});
