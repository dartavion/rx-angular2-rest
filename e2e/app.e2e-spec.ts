import { RxAngularPage } from './app.po';

describe('rx-angular App', function() {
  let page: RxAngularPage;

  beforeEach(() => {
    page = new RxAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
