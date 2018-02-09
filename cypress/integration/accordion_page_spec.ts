import { AccordionPo } from '../support/accordion.po';

describe('Accordion page test suite', () => {
  const accordion = new AccordionPo();

  beforeEach(() => accordion.navigateTo());

  describe('Content section', () => {
    it('page loads and displays it\'s content', () => {
      cy.get('.content')
        .should('be.visible');
    });

    it('content header contains title and link to accordion component at github', () => {
      cy.get('.content-header').children('h1').as('title')
        .should('be.visible')
        .and('to.contain', accordion.pageTitle);

      cy.get('@title').children('a')
        .should('be.enabled')
        .and('have.attr', 'href', accordion.ghLinkToComponent);
    });

    it('usage code example is displayed at demo top section', () => {
      cy.get('demo-top-section').as('demoTop').children('h2')
        .should('be.visible')
        .and('to.contain', accordion.titleDefaultExample);

      cy.get('@demoTop').children('.prettyprint')
        .should('be.visible')
        .and('not.to.be.empty');
    });
  });

  describe('Simple accordion', () => {
    const basicDemo = accordion.exampleDemosArr.basic;

    it('each panel opens content at first click', () => {
      accordion.getAccordionPanel(basicDemo, 0).as('firstPanel')
        .click();

      cy.get('@firstPanel')
        .should('have.class', 'panel-open');

      accordion.getAccordionPanel(basicDemo, 1).as('secondPanel')
        .click();
      accordion.getAccordionPanel(basicDemo, 3).as('fourthPanel')
        .click();

      cy.get('@secondPanel')
        .should('have.class', 'panel-open');
      cy.get('@fourthPanel')
        .should('have.class', 'panel-open');
    });

    it('after double click panels are closed', () => {
      accordion.getAccordionPanel(basicDemo, 0).as('firstPanel')
        .dblclick();
      accordion.getAccordionPanel(basicDemo, 1).as('secondPanel')
        .dblclick();

      cy.get('@firstPanel')
        .should('not.to.have.class', 'panel-open');
      cy.get('@secondPanel')
        .should('not.to.have.class', 'panel-open');
    });
  });

  describe('Disabled accordion', () => {
    const disabledDemo = accordion.exampleDemosArr.disabled;

    it('first panel can be disabled or enabled', () => {
      accordion.clickByText(disabledDemo, accordion.buttonEnableDisable);

      accordion.getAccordionPanel(disabledDemo, 0).as('firstPanel').find('.text-muted')
        .should('to.be.exist');

      accordion.clickByText(disabledDemo, accordion.buttonEnableDisable);

      cy.get('@firstPanel').find('.text-muted')
        .should('not.to.be.exist');
    });
  });

  describe('Dynamic accordion', () => {
    const dynamicDemo = accordion.exampleDemosArr.dynamic;

    it('last panel can be controlled by toggler button', () => {
      accordion.clickByText(dynamicDemo, accordion.buttonPanelToggler);

      accordion.getAccordionPanel(dynamicDemo, 4).as('dynamicPanel')
        .should('not.have.class', 'panel-open');

      accordion.clickByText(dynamicDemo, accordion.buttonPanelToggler);

      cy.get('@dynamicPanel')
        .should('have.class', 'panel-open');
    });

    it('items in fourth collapse-panel can be added dynamic', () => {
      accordion.getAccordionPanel(dynamicDemo, 3).as('dynamicItemsPanel').click();

      cy.get('@dynamicItemsPanel').find('.panel-body').children('div')
        .should('have.length', 3);

      accordion.clickByText('@dynamicItemsPanel', accordion.buttonAddItem);

      cy.get('@dynamicItemsPanel').find('.panel-body').children('div')
        .should('have.length', 4);
    });
  });

  describe('Open only one at a time', () => {
    const onePanelDemo = accordion.exampleDemosArr.oneAtATime;

    it('closeOthers property sets as true - only one panel can be opened at a time', () => {
      cy.get(onePanelDemo).find('input').check();

      accordion.getAccordionPanel(onePanelDemo, 0).as('firstPanel').click()
        .should('have.class', 'panel-open');
      accordion.getAccordionPanel(onePanelDemo, 1).as('secondPanel')
        .should('not.have.class', 'panel-open');
      accordion.getAccordionPanel(onePanelDemo, 2).as('thirdPanel')
        .should('not.have.class', 'panel-open');

      cy.get('@thirdPanel').click()
        .should('have.class', 'panel-open');
      cy.get('@firstPanel')
        .should('not.have.class', 'panel-open');
      cy.get('@secondPanel')
        .should('not.have.class', 'panel-open');
    });

    it('closeOthers property sets as false - not only one panel can be opened at a time', () => {
      cy.get(onePanelDemo).find('input').uncheck();

      accordion.getAccordionPanel(onePanelDemo, 0).as('firstPanel').click()
        .should('have.class', 'panel-open');
      accordion.getAccordionPanel(onePanelDemo, 1).as('secondPanel')
        .should('not.have.class', 'panel-open');
      accordion.getAccordionPanel(onePanelDemo, 2).as('thirdPanel')
        .should('not.have.class', 'panel-open');

      cy.get('@thirdPanel').click()
        .should('have.class', 'panel-open');
      cy.get('@firstPanel')
        .should('have.class', 'panel-open');
      cy.get('@secondPanel')
        .should('not.have.class', 'panel-open');
    });
  });

  describe('Styling accordion', () => {
    const stylingDemo = accordion.exampleDemosArr.styling;

    it('first and third panel contains customClass style', () => {
      const stylesPanel = ['rgb(91, 192, 222)', 'rgb(255, 255, 255)'];
      const stylePanelBody = 'rgb(51, 122, 167)';

      accordion.getAccordionPanel(stylingDemo, 0).children('.card').as('firstPanel')
        .should('to.have.css', 'background-color', stylesPanel[0])
        .and('to.have.css', 'color', stylesPanel[1]);
      cy.get('@firstPanel').find('.panel-body')
        .should('to.have.css', 'background-color', stylePanelBody);

      accordion.getAccordionPanel(stylingDemo, 2).children('.card').as('thirdPanel')
        .should('to.have.css', 'background-color', stylesPanel[0])
        .and('to.have.css', 'color', stylesPanel[1]);
      cy.get('@thirdPanel').find('.panel-body')
        .should('to.have.css', 'background-color', stylePanelBody);
    });
  });

  describe('Configuring defaults', () => {
    const configDemo = accordion.exampleDemosArr.config;

    it('example opens only one panel at a time', () => {
      accordion.getAccordionPanel(configDemo, 0).as('firstPanel').click()
        .should('have.class', 'panel-open');
      accordion.getAccordionPanel(configDemo, 1).as('secondPanel')
        .should('not.have.class', 'panel-open');
      accordion.getAccordionPanel(configDemo, 2).as('thirdPanel')
        .should('not.have.class', 'panel-open');

      cy.get('@secondPanel').click()
        .should('have.class', 'panel-open');
      cy.get('@firstPanel')
        .should('not.have.class', 'panel-open');
      cy.get('@thirdPanel')
        .should('not.have.class', 'panel-open');
    });
  });
});
