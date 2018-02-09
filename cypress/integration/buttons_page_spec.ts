import { ButtonsPo } from '../support/buttons.po';

describe('Buttons page test suite', () => {
  const buttons = new ButtonsPo();

  const buttonNames = ['Left', 'Middle', 'Right'];
  const buttonOutput = ['left', 'middle', 'right'];

  beforeEach(() => buttons.navigateTo());

  describe('Content section', () => {
    it('buttons page loads and displays it\'s content', () => {
      cy.get('.content')
        .should('be.visible');
    });

    it('content header contains title and link to button component at github', () => {
      cy.get('.content-header').children('h1').as('title')
        .should('be.visible')
        .and('to.contain', buttons.pageTitle);

      cy.get('@title').children('a')
        .should('be.enabled')
        .and('have.attr', 'href', buttons.ghLinkToComponent);
    });

    it('usage code example is displayed at demo top section', () => {
      cy.get('demo-top-section').as('demoTop').children('h2')
        .should('be.visible')
        .and('to.contain', buttons.titleDefaultExample);

      cy.get('@demoTop').children('.prettyprint')
        .should('be.visible')
        .and('not.to.be.empty');
    });
  });

  describe('Single button', () => {
    const singleBtn = buttons.exampleDemosArr.basic;

    it('example contains header, that can be changed by click on button', () => {
      const defaultVal = '1';
      const afterClickVal = '0';

      cy.get(singleBtn).as('singleButton').children('.card-header').as('header')
        .should('to.contain', defaultVal);

      cy.get('@singleButton').children('button').click();
      cy.get('@header')
        .should('to.contain', afterClickVal);
    });
  });

  describe('Checkbox', () => {
    const checkboxDemo = buttons.exampleDemosArr.checkbox;

    it('checkboxes can be checked or unchecked', () => {
      buttons.clickByText(checkboxDemo, buttonNames[0]);
      buttons.clickByText(checkboxDemo, buttonNames[1]);

      cy.get(checkboxDemo).children('.card-header').as('output')
        .should('to.contain', `"${buttonOutput[0]}": true`);
      cy.get('@output')
        .should('to.contain', `"${buttonOutput[1]}": false`);
    });
  });

  describe('Checkbox with Reactive Form', () => {
    const checkboxWithForm = buttons.exampleDemosArr.checkboxWithForms;

    it('checkboxes can be checked or unchecked and its\' states are displayed at reactive form', () => {
      buttons.clickByText(checkboxWithForm, buttonNames[1]);
      buttons.clickByText(checkboxWithForm, buttonNames[2]);

      cy.get(checkboxWithForm).children('.card-header').as('output')
        .should('to.contain', `"${buttonOutput[1]}": false`);
      cy.get('@output')
        .should('to.contain', `"${buttonOutput[2]}": true`);

      buttons.clickByText(checkboxWithForm, buttonNames[1]);
      cy.get('@output')
        .should('to.contain', `"${buttonOutput[1]}": true`);
    });
  });

  describe('Radio buttons', () => {
    const radioBtn = buttons.exampleDemosArr.radioBtn;

    it('two examples of using ngModel with radio buttons are displayed', () => {
      cy.get(radioBtn).eq(0).as('radioBtns').find('.btn-group').as('allRadios').eq(0).as('radioNgModel');
      cy.get('@allRadios').eq(1).as('radioBtn');

      cy.get('@radioNgModel').find('.btn').eq(0).click();
      cy.get('@radioBtns').children('.card-header').as('formOutput')
        .should('to.contain', 'Left');

      cy.get('@radioBtn').find('.btn').eq(1).click();
      cy.get('@formOutput')
        .should('to.contain', 'Middle');
    });
  });

  describe('Uncheckable radio', () => {
    const radio = buttons.exampleDemosArr.radioBtn;

    it('Radio and Uncheckable Radio example contains checkboxes and radioButtons', () => {
      cy.get(radio).eq(1).as('uncheckRadio').find('.btn-group').as('uncheckableRadio');

      cy.get('@uncheckableRadio').find('.btn').eq(2).click();
      cy.get('@uncheckRadio').children('.card-header').as('formOutput')
        .should('to.contain', 'Right');

      cy.get('@uncheckableRadio').find('.btn').eq(2).click();
      cy.get('@formOutput')
        .should('to.contain', 'null');
    });
  });

  describe('Radio with Reactive Forms', () => {
    const radioWithForm = buttons.exampleDemosArr.radioBtnWithForms;

    it('radio example should dynamicly update reactive form', () => {
      const val = ['A', 'B', 'C'];

      cy.get(radioWithForm).as('radioReactiveForms').find('.btn').as('radioBtn').eq(0).click();
      cy.get('@radioReactiveForms').children('.card-header').as('output')
          .should('to.contain', `"radio": "${val[0]}"`);

      cy.get('@radioBtn').eq(1).click();
      cy.get('@output')
        .should('to.contain', `"radio": "${val[1]}"`);
    });
  });

  describe('Disabled Buttons', () => {
    const disabled = buttons.exampleDemosArr.disabled;

    it('disabled buttons examples contains button, that can be disabled', () => {
      cy.get(disabled).as('disabledButton')
        .should('to.have.descendants', '.btn-primary')
        .and('to.have.descendants', '.btn-warning');

      buttons.clickByText(disabled, 'Enable/Disable');

      cy.get('@disabledButton').contains('Button')
        .should('not.to.be.enabled');
    });
  });
});
