var getLastUrlPart = function(url){
    return url.substr(url.lastIndexOf('/'));
};

var loginLinkSelector = '.top-bar a.user-login',
    logoutLinkSelector = '.top-bar a.user-logout',
    userMenuLinkSelector = '.top-bar li.user-menu a.dropdown-toggle';

describe('authentication', function() {

    describe('login link in main menu:', function(){

        var loginLink;

        beforeEach(function() {
            browser.get('/');
            loginLink = element(by.css(loginLinkSelector));
        });

        it('should exist and have the correct text', function(){
            expect(loginLink.isDisplayed()).toBe(true);
            expect(loginLink.getText()).toBe('Login');
        });

        describe('clicking the login link', function(){
            beforeEach(function(){
                loginLink.click();
            });

            it('should go to the login page', function(){
                browser.getCurrentUrl().then(function(url){
                    expect(getLastUrlPart(url)).toBe('/login');
                });
            });
        });
    }); // end 'login link in main menu'

    describe('login form:', function(){

        var usernameField,
            passwordField,
            submitButton;

        beforeEach(function(){
            browser.get('/login');
            usernameField = element(by.model('username'));
            passwordField = element(by.model('password'));
            submitButton = element(by.css('button[type="submit"]'));
        });

        afterEach(function(){
            // Clear localStorage to reset session
            browser.executeScript('window.sessionStorage.clear();');
            browser.executeScript('window.localStorage.clear();');
        });

        it('should have a login form', function(){
            expect(usernameField.isDisplayed()).toBeTruthy();
            expect(passwordField.isDisplayed()).toBeTruthy();
            expect(submitButton.isDisplayed()).toBeTruthy();
        });

        describe('submit form with wrong credentials', function(){
            beforeEach(function(){
                usernameField.sendKeys('foo');
                passwordField.sendKeys('bar');
                submitButton.click();
            });

            it('should display the failure message', function(){
                var failureMessage = element(by.css('div.login-failed'));
                expect(failureMessage.isDisplayed()).toBeTruthy();
            });

            it('should stay on the login page', function(){
                browser.getCurrentUrl().then(function(url){
                    expect(getLastUrlPart(url)).toBe('/login');
                });
            });
        }); // end 'submit form with wrong credentials'

        describe('submit form with correct credentials', function(){
            beforeEach(function(){
                usernameField.sendKeys('admin');
                passwordField.sendKeys('admin');
                submitButton.click();
            });

            it('should go to the home page', function(){
                browser.getCurrentUrl().then(function(url){
                    expect(getLastUrlPart(url)).toBe('/map');
                });
            });

            describe('logout link in the user menu', function(){
                var loginLink, logoutLink, userMenuLink;

                beforeEach(function(){
                    loginLink = element(by.css(loginLinkSelector));
                    userMenuLink = element(by.css(userMenuLinkSelector));
                    logoutLink = element(by.css(logoutLinkSelector));
                });

                it('should exist instead of the login link', function(){
                    expect(loginLink.isDisplayed()).toBeFalsy();
                    userMenuLink.click();
                    expect(logoutLink.isDisplayed()).toBeTruthy();
                });

                describe('clicking the logout link', function(){

                    beforeEach(function(){
                        userMenuLink.click();
                        logoutLink.click();
                    });

                    it('should change again to the login link', function(){
                        expect(userMenuLink.isDisplayed()).toBeFalsy();
                        expect(logoutLink.isDisplayed()).toBeFalsy();
                        expect(loginLink.isDisplayed()).toBeTruthy();
                    });
                });
            });
        }); // end 'submit form with correct credentials'

    }); // end 'login form'
}); // end 'login'
