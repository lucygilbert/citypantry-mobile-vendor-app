describe('Account settings page', function() {
  var first = true;

  beforeEach(function() {
    if (first) {
      first = false;
      element.all(by.css('ion-tabs .tab-item')).get(2).click();
      expect(browser.getCurrentUrl()).toMatch(/\/#\/tab\/account$/);
    }
  });

  function clickEditIcon(index) {
    var icon = element.all(by.css('.item-icon-left')).get(index);
    scrollTo(icon);
    icon.click();
  }

  function save() {
    element(by.cssContainingText('.popup-buttons .button-positive', 'Save')).click();
    element(by.cssContainingText('.popup-buttons .button-positive', 'OK')).click();
  }

  function cancel() {
    element(by.cssContainingText('.popup-buttons .button-default', 'Cancel')).click();
  }

  it('should update name field', function() {
    clickEditIcon(0);
    element(by.id('name')).clear().sendKeys('Big Kahuna Burger');
    save();

    clickEditIcon(0);
    expect(element(by.id('name')).getAttribute('value')).toBe('Big Kahuna Burger');
    cancel();
  });

  it('should update description field', function() {
    clickEditIcon(1);
    element(by.id('description')).clear().sendKeys('That is one tasty burger!');
    save();

    clickEditIcon(1);
    expect(element(by.id('description')).getAttribute('value')).toBe('That is one tasty burger!');
    cancel();
  });

  it('should update max people field', function() {
    clickEditIcon(2);
    element(by.id('maxPeople')).clear().sendKeys('30');
    save();

    clickEditIcon(2);
    expect(element(by.id('maxPeople')).getAttribute('value')).toBe('30');
    cancel();
  });

  it('should update web address', function() {
    clickEditIcon(3);
    element(by.id('url')).clear().sendKeys('bigkahuna.com');
    save();

    clickEditIcon(3);
    expect(element(by.id('url')).getAttribute('value')).toBe('bigkahuna.com');
    cancel();
  });

  it('should update Facebook address', function() {
    clickEditIcon(4);
    element(by.id('facebookUrl')).clear().sendKeys('facebook.com/bigkahuna');
    save();

    clickEditIcon(4);
    expect(element(by.id('facebookUrl')).getAttribute('value')).toBe('facebook.com/bigkahuna');
    cancel();
  });

  it('should update Twitter address', function() {
    clickEditIcon(5);
    element(by.id('twitterUrl')).clear().sendKeys('twitter.com/bigkahuna');
    save();

    clickEditIcon(5);
    expect(element(by.id('twitterUrl')).getAttribute('value')).toBe('twitter.com/bigkahuna');
    cancel();
  });

  it('should update Google+ address', function() {
    clickEditIcon(6);
    element(by.id('googlePlusUrl')).clear().sendKeys('plus.google.com/bigkahuna');
    save();

    clickEditIcon(6);
    expect(element(by.id('googlePlusUrl')).getAttribute('value')).toBe('plus.google.com/bigkahuna');
    cancel();
  });

  it('should update Youtube address', function() {
    clickEditIcon(7);
    element(by.id('youtubeUrl')).clear().sendKeys('youtube.com/bigkahuna');
    save();

    clickEditIcon(7);
    expect(element(by.id('youtubeUrl')).getAttribute('value')).toBe('youtube.com/bigkahuna');
    cancel();
  });
});
