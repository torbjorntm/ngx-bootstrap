import { DropdownsPo } from '../support/dropdowns.po';

describe('Dropdowns demo page test suite', () => {
  const dropdowns = new DropdownsPo();

  beforeEach(() => dropdowns.navigateTo());

  describe('Content section', () => {
    it('dropdowns page loads and displays it\'s content', () => {
      cy.get('.content')
        .should('be.visible');
    });

    it('content header contains title and link to dropdown component at github', () => {
      cy.get('.content-header').children('h1').as('title')
        .should('be.visible')
        .and('to.contain', dropdowns.pageTitle);

      cy.get('@title').children('a')
        .should('be.enabled')
        .and('have.attr', 'href', dropdowns.ghLinkToComponent);
    });

    it('usage code example is displayed at demo top section', () => {
      cy.get('demo-top-section').as('demoTop').children('h2')
        .should('be.visible')
        .and('to.contain', dropdowns.titleDefaultExample);

      cy.get('@demoTop').children('.prettyprint')
        .should('be.visible')
        .and('not.to.be.empty');
    });
  });

  describe('Single button dropdowns', () => {
    const singleBtn = dropdowns.exampleDemosArr.singleButton;

    it('single button dropdown is shown after click on toggler', () => {
      const togglerText = 'Button dropdown';
      const showIndicator = 'show';

      dropdowns.clickByText(singleBtn, togglerText);
      cy.get(singleBtn).find('.dropdown-menu').as('dropdownMenu')
        .should('to.have.class', showIndicator);

      dropdowns.clickByText(singleBtn, togglerText);
      cy.get('@dropdownMenu')
        .should('not.to.have.class', showIndicator);
    });
  });

  describe('Trigger by tag \<\a\>', () => {
    const triggerTag = dropdowns.exampleDemosArr.triggerByTag;

    it('dropdowns can be triggered by tag a', () => {
      cy.get(triggerTag).children('span').as('triggerTag')
        .should('not.to.have.descendants', '.dropdown-menu');

      cy.get('@triggerTag').children('a').as('link').click();
      cy.get('@triggerTag').children('.dropdown-menu').as('dropdownMenu')
        .should('to.have.class', 'show');

      cy.get('@link').click();
      cy.get('@dropdownMenu')
        .should('not.to.have.class', 'show');
    });
  });

  describe('Split button dropdowns', () => {
    const splitBtn = dropdowns.exampleDemosArr.splitButton;

    it('dropdown could have split button', () => {
      const buttonText = 'Action';
      const showIndicator = 'show';

      dropdowns.clickByText(splitBtn, buttonText);
      cy.get(splitBtn).children('.btn-group').as('splitButton').children('.dropdown-menu')
        .should('not.to.have.class', showIndicator);

      cy.get('@splitButton').children('.dropdown-toggle').click();
      cy.get('@splitButton').children('.dropdown-menu')
        .should('to.have.class', showIndicator);
    });
  });

  describe('Disabled menu', () => {
    const disabled = dropdowns.exampleDemosArr.disabledMenu;

    it('dropdown button can be disabled', () => {
      const btnEnableDisable = 'Enable/Disable';

      dropdowns.clickByText(disabled, btnEnableDisable);
      cy.get(disabled).find('.dropdownToggle')
        .should('not.to.be.enabled');
    });
  });
});
