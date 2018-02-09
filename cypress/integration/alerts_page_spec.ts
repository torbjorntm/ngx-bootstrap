import { AlertsPo } from '../support/alerts.po';

describe('Alerts page test suite', () => {
  const alerts = new AlertsPo();

  let alertTypes: string[];
  let stylesColors: string[];

  beforeEach(() => alerts.navigateTo());

  describe('Content section', () => {
    it('page loads and displays it\'s content', () => {
      cy.get('.content')
        .should('be.visible');
    });

    it('content header contains title and link to alert component at github', () => {
      cy.get('.content-header').children('h1').as('title')
        .should('be.visible')
        .and('to.contain', alerts.pageTitle);

      cy.get('@title').children('a')
        .should('be.enabled')
        .and('have.attr', 'href', alerts.ghLinkToComponent);
    });

    it('usage code example is displayed at demo top section', () => {
      cy.get('demo-top-section').as('demoTop').children('h2')
        .should('be.visible')
        .and('to.contain', alerts.titleDefaultExample);

      cy.get('@demoTop').children('.prettyprint')
        .should('be.visible')
        .and('not.to.be.empty');
    });
  });

  describe('Basic alert', () => {
    const basicDemo = alerts.exampleDemosArr.basic;

    it('success, info, warning and danger types of alerts are displayed', () => {
      alertTypes = [
        'alert-success',
        'alert-info',
        'alert-warning',
        'alert-danger'
      ];

      alertTypes.forEach(type => cy.get(`${ basicDemo } .${ type }`)
        .should('be.visible'));
    });
  });

  describe('Link color', () => {
    const linkDemo = alerts.exampleDemosArr.link;

    it('links can be provided by class alert-link', () => {
      cy.get(linkDemo).find('div').as('alertsLink').each(() => {
        cy.get('@alertsLink').find(alerts.linkClass)
          .should('have.attr', 'href', '#');
      });
    });
  });

  describe('Additional content', () => {
    const contentDemo = alerts.exampleDemosArr.content;

    it('alert with additional content contains html elements', () => {
      cy.get(contentDemo).find('div')
        .should('to.have.descendants', 'h4')
        .and('to.have.descendants', 'p');
    });
  });

  describe('Dismissing alert', () => {
    const dismissingDemo = alerts.exampleDemosArr.dismissing;

    it('alerts can stop being dismissible', () => {
      cy.get(dismissingDemo).find('alert').as('dismissAlert').last()
        .should('to.have.descendants', '.close');

      alerts.clickByText(dismissingDemo, alerts.buttonToggler);
      cy.get('@dismissAlert').last()
        .should('not.to.have.descendants', '.close');
    });

    it('alerts can all be closed and then resetting to default state', () => {
      cy.get(dismissingDemo).find('alert').as('dismissAlert').each($alert => {
        $alert.find('.close').click();
      });

      cy.get('@dismissAlert')
        .should('not.to.have.descendants', 'div');

      alerts.clickByText(dismissingDemo, alerts.buttonReset);
      cy.get('@dismissAlert')
        .should('to.have.descendants', 'div');
    });
  });

  describe('Dynamic html', () => {
    const dynamicHtml = alerts.exampleDemosArr.dynamicHtml;

    it('each alert contains style and content from component', () => {
      alertTypes = [
        'alert-success',
        'alert-info',
        'alert-danger'
      ];

      cy.get(dynamicHtml).find('alert').children('div').as('alertsDynamic').each(($alert, i) => {
        expect($alert).to.have.class(alertTypes[i]);
        cy.get('@alertsDynamic').eq(i)
          .should('be.visible')
          .and('to.have.descendants', 'span');
      });
    });
  });

  describe('Dynamic content', () => {
    const dynamicContent = alerts.exampleDemosArr.dynamicContent;

    it('alert\'s content can be changed by click on button', () => {
      cy.get(dynamicContent).find('.alert').as('alertDynamicText')
        .should('to.contain', alerts.dynamicAlertText[0]);

      alerts.clickByText(dynamicContent, alerts.buttonChangeText);
      cy.get('@alertDynamicText')
        .should('to.contain', alerts.dynamicAlertText[1])
        .and('not.to.contain', alerts.dynamicAlertText[0]);

      alerts.clickByText(dynamicContent, alerts.buttonChangeText);
      cy.get('@alertDynamicText')
        .should('to.contain', alerts.dynamicAlertText[2]);

      alerts.clickByText(dynamicContent, alerts.buttonReset);
      cy.get('@alertDynamicText')
        .should('to.contain', alerts.dynamicAlertText[0])
        .and('not.to.contain', alerts.dynamicAlertText[2]);
    });
  });

  describe('Global styling', () => {
    const globalStyle = alerts.exampleDemosArr.globalStyling;

    it('each alert has added style', () => {
      stylesColors = ['rgb(123, 31, 162)', 'rgb(74, 20, 140)', 'rgb(255, 255, 255)'];

      cy.get(globalStyle).find('.alert')
        .should('to.have.css', 'background-color', stylesColors[0])
        .and('to.have.css', 'border-color', stylesColors[1])
        .and('to.have.css', 'color', stylesColors[2]);
    });
  });

  describe('Component level styling', () => {
    const componentStyle = alerts.exampleDemosArr.localStyling;

    it('each alert has added style', () => {
      stylesColors = ['rgb(0, 150, 136)', 'rgb(0, 105, 92)', 'rgb(255, 255, 255)'];

      cy.get(componentStyle).find('.alert')
        .should('to.have.css', 'background-color', stylesColors[0])
        .and('to.have.css', 'border-color', stylesColors[1])
        .and('to.have.css', 'color', stylesColors[2]);
    });
  });

  describe('Configuring defaults', () => {
    const configDemo = alerts.exampleDemosArr.config;

    it('each alert contains added config', () => {
      alertTypes = [
        'alert-success',
        'alert-info'
      ];

      cy.get(configDemo).find('.alert').as('configuredAlerts').eq(0)
        .should('to.have.class', alertTypes[0]);
      cy.get('@configuredAlerts').eq(1)
        .should('to.have.class', alertTypes[1]);
    });
  });
});
