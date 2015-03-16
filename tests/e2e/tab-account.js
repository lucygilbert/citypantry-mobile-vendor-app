describe('Account settings page', function() {
  var first = true;

  beforeEach(function() {
    if (first) {
      first = false;

      browser.get('/#/login');
      element(by.id('login_email')).sendKeys('vendor@bunnies.test');
      element(by.id('login_password')).sendKeys('password');
      element(by.id('login_submit')).click();

      element.all(by.css('.tab-item')).last().click();
    }
  });

  it('should update name field', function() {
    element.all(by.css('.item-icon-left')).first().click();
    element(by.id('name')).clear();
    element(by.id('name')).sendKeys('Big Kahuna Burger');
    element.all(by.css('.button-positive')).get(1).click();
    element.all(by.css('.button-positive')).get(1).click();

    element.all(by.css('.item-icon-left')).first().click();
    expect(element(by.id('name')).getAttribute('value')).toBe('Big Kahuna Burger');
    element(by.css('.button-default')).click();
  });

  it('should update description field', function() {
    element.all(by.css('.item-icon-left')).get(1).click();
    element(by.id('description')).clear();
    element(by.id('description')).sendKeys('That is one tasty burger!');
    element.all(by.css('.button-positive')).get(1).click();
    element.all(by.css('.button-positive')).get(1).click();

    element.all(by.css('.item-icon-left')).get(1).click();
    expect(element(by.id('description')).getAttribute('value')).toBe('That is one tasty burger!');
    element(by.css('.button-default')).click();
  });

  it('should update max people field', function() {
    element.all(by.css('.item-icon-left')).get(2).click();
    element(by.id('maxPeople')).clear();
    element(by.id('maxPeople')).sendKeys('30');
    element.all(by.css('.button-positive')).get(1).click();
    element.all(by.css('.button-positive')).get(1).click();

    element.all(by.css('.item-icon-left')).get(2).click();
    expect(element(by.id('maxPeople')).getAttribute('value')).toBe('30');
    element(by.css('.button-default')).click();
  });

  it('should update web address', function() {
    element.all(by.css('.item-icon-left')).get(3).click();
    element(by.id('url')).clear();
    element(by.id('url')).sendKeys('bigkahuna.com');
    element.all(by.css('.button-positive')).get(1).click();
    element.all(by.css('.button-positive')).get(1).click();

    element.all(by.css('.item-icon-left')).get(3).click();
    expect(element(by.id('url')).getAttribute('value')).toBe('bigkahuna.com');
    element(by.css('.button-default')).click();
  });

  it('should update Facebook address', function() {
    element.all(by.css('.item-icon-left')).get(4).click();
    element(by.id('facebookUrl')).clear();
    element(by.id('facebookUrl')).sendKeys('facebook.com/bigkahuna');
    element.all(by.css('.button-positive')).get(1).click();
    element.all(by.css('.button-positive')).get(1).click();

    element.all(by.css('.item-icon-left')).get(4).click();
    expect(element(by.id('facebookUrl')).getAttribute('value')).toBe('facebook.com/bigkahuna');
    element(by.css('.button-default')).click();
  });

  it('should update Twitter address', function() {
    element.all(by.css('.item-icon-left')).get(5).click();
    element(by.id('twitterUrl')).clear();
    element(by.id('twitterUrl')).sendKeys('twitter.com/bigkahuna');
    element.all(by.css('.button-positive')).get(1).click();
    element.all(by.css('.button-positive')).get(1).click();

    element.all(by.css('.item-icon-left')).get(5).click();
    expect(element(by.id('twitterUrl')).getAttribute('value')).toBe('twitter.com/bigkahuna');
    element(by.css('.button-default')).click();
  });

  it('should update Google+ address', function() {
    element.all(by.css('.item-icon-left')).get(6).click();
    element(by.id('googlePlusUrl')).clear();
    element(by.id('googlePlusUrl')).sendKeys('plus.google.com/bigkahuna');
    element.all(by.css('.button-positive')).get(1).click();
    element.all(by.css('.button-positive')).get(1).click();

    element.all(by.css('.item-icon-left')).get(6).click();
    expect(element(by.id('googlePlusUrl')).getAttribute('value')).toBe('plus.google.com/bigkahuna');
    element(by.css('.button-default')).click();
  });

  it('should update Youtube address', function() {
    element.all(by.css('.item-icon-left')).get(7).click();
    element(by.id('youtubeUrl')).clear();
    element(by.id('youtubeUrl')).sendKeys('youtube.com/bigkahuna');
    element.all(by.css('.button-positive')).get(1).click();
    element.all(by.css('.button-positive')).get(1).click();

    element.all(by.css('.item-icon-left')).get(7).click();
    expect(element(by.id('youtubeUrl')).getAttribute('value')).toBe('youtube.com/bigkahuna');
    element(by.css('.button-default')).click();
  });

  it('should redirect to Order Details when the View Order button is clicked', function() {
    element.all(by.css('.item-icon-left')).last().click();

    expect(browser.getCurrentUrl()).toMatch(/\/#\/login$/);
  });
});
