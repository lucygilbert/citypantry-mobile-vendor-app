describe('Logout', function() {
  it('should be able to logout', function() {
    element.all(by.css('ion-tabs .tab-item')).last().click();

    var logoutButton = element(by.id('logOutButton'));
    scrollTo(logoutButton);
    logoutButton.click();

    expect(browser.getCurrentUrl()).toMatch(/\/#\/login$/);
  });
});
