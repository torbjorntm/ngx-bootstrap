import { DatepickerPo } from '../support/datepicker.po';

describe('Datepicker demo page test suite', () => {
  const datepicker = new DatepickerPo();

  beforeEach(() => datepicker.navigateTo());

  describe('Content section', () => {
    it('datepicker page loads and displays it\'s content', () => {
      cy.get('.content')
        .should('be.visible');
    });

    it('content header contains title and link to datepicker component at github', () => {
      cy.get('.content-header').children('h1').as('title')
        .should('be.visible')
        .and('to.contain', datepicker.pageTitle);

      cy.get('@title').children('a')
        .should('be.enabled')
        .and('have.attr', 'href', datepicker.ghLinkToComponent);
    });

    it('usage code example is displayed at demo top section', () => {
      cy.get('demo-top-section').as('demoTop').children('h2')
        .should('be.visible')
        .and('to.contain', datepicker.titleDefaultExample);

      cy.get('@demoTop').children('.prettyprint')
        .should('be.visible')
        .and('not.to.be.empty');
    });
  });

  describe('Basic demo', () => {
    const basic = datepicker.exampleDemosArr.basic;

    it('basic date- and daterangepicker can be opened by click on toggler', () => {
      const buttonDatepicker = 'Date Picker';
      const buttonDateRangePicker = 'Date Range Picker';

      datepicker.clickByText(basic, buttonDatepicker);
      cy.get('bs-datepicker-container')
        .should('to.be.visible');

      datepicker.clickByText(basic, buttonDateRangePicker);
      cy.get('bs-daterangepicker-container')
        .should('to.be.visible');
    });
  });

  describe('Custom date format', () => {
    const customFormat = datepicker.exampleDemosArr.customFormat;

    it('datepicker with custom date format can be opened by click on output', () => {
      cy.get(customFormat).find('input').click();

      cy.get('bs-datepicker-container')
        .should('to.be.visible');
    });
  });

  describe('Reactive forms', () => {
    const reactiveForms = datepicker.exampleDemosArr.reactiveForms;

    it('chosen date can be displayed in reactive form', () => {
      cy.get(reactiveForms).find('input[placeholder="Datepicker"]').click();
      cy.get('bs-datepicker-container').find('td[role="gridcell"]').as('datepickerDays');
      datepicker.clickByText('@datepickerDays', '15');

      cy.get(reactiveForms).find('.code-preview')
        .should('to.contain', '"date": "2018-02-15');
    });
  });
});
