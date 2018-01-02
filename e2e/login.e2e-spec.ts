import { browser, element, by } from 'protractor';
import { LoginPage } from './app.po';

describe('Login', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
  });

  it('should navigate to login page and find a login form', () => {
    page.navigateTo();    
    expect(browser.getTitle()).toEqual('Plataforma - Jetsoft');
    
    let loginName = element(by.id('loginName'));
    expect(loginName).toBeTruthy
    let loginPassword= element(by.id('loginPassword'));  
    expect(loginPassword).toBeTruthy
    let rememberButton = element(by.buttonText("Lembrar"));     
    expect(rememberButton).toBeTruthy
    let loginButton = element(by.css('button'));
    expect(loginButton).toBeTruthy
  });

  it('should navigate to login page and perform a login with errors', () => {
    page.navigateTo();    
    expect(browser.getTitle()).toEqual('Plataforma - Jetsoft');
   
    let loginName = element(by.id('loginName'));
    loginName.sendKeys('joão');
    let loginPassword= element(by.id('loginPassword'));  
    loginPassword.sendKeys('123456');
    let loginButton = element(by.css('button'));
    loginButton.click();

    // Wrong username/password. The page should stay in '/login'
    browser.waitForAngular();
    expect(browser.driver.getCurrentUrl()).toContain('/login');        
  });

  it('should navigate to login page and perform a login without errors', () => {
    page.navigateTo();    
    expect(browser.getTitle()).toEqual('Plataforma - Jetsoft');
   
    let loginName = element(by.id('loginName'));
    loginName.sendKeys('admin');
    let loginPassword= element(by.id('loginPassword'));  
    loginPassword.sendKeys('jetsoft');
    let loginButton = element(by.css('button'));
    loginButton.click();

    // Right username/password. The page should redirecto to '/home'
    browser.waitForAngular();
    expect(browser.driver.getCurrentUrl()).toContain('/home');    

    // browser.pause();
    // browser.sleep(50000);    
  });


});
