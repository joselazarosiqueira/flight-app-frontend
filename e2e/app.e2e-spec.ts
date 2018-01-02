import { browser } from 'protractor';
import { AppPage } from './app.po';

describe('platform-ui App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display the Login title', () => {
    page.navigateTo();
    // expect(page.getParagraphText()).toEqual('JetSoft app!');
    expect(browser.getTitle()).toEqual('Plataforma - Jetsoft');     
  });
});
