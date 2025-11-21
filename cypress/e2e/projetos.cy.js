/// <reference types="cypress" />


Cypress.on('uncaught:exception', () => false);

describe('Fluxos Completos de Projetos (Ver, Detalhar, Voltar)', () => {

  beforeEach(() => {
    cy.visit('https://abengenharia.vercel.app/', { timeout: 10000 });
    cy.viewport(1280, 800);
  });

  const projetos = [
    { index: 0, nome: 'Projeto Residencial Moderno', url: '/moderno', titulo: 'Casa Moderna' },
    { index: 1, nome: 'Complexo Corporativo', url: '/corporativo', titulo: 'Prédio Corporativo' },
    { index: 2, nome: 'Centro Comercial & Lazer', url: '/comercial', titulo: 'Centro Comercial' },
    { index: 3, nome: 'Galpão de encomendas', url: '/galpao', titulo: 'Galpão comercial' },
    { index: 4, nome: 'Casa residencial', url: '/residencial', titulo: 'Ambiente Residencial' }
  ];

  projetos.forEach((projeto, i) => {
    
    it(`CT-${String(i + 7).padStart(2, '0')}: Deve realizar o fluxo completo de navegação para o projeto "${projeto.nome}" (Menu -> Carrossel -> Detalhes -> Voltar)`, () => {
      
      
      cy.log('PASSO 1: Acessar o projeto pelo menu ');
      cy.get('nav li').contains('Projetos').parent().trigger('mouseover');
      cy.contains('a', projeto.nome).click({ force: true });
      
      
      cy.log('PASSO 2: Validar slide e clicar em ver mais');
      cy.get('#projetos').scrollIntoView();
      
      
      cy.get('[class*="carouselSlide"]', { timeout: 10000 })
        .eq(projeto.index)
        .should('satisfy', ($el) => $el[0].className.includes('active'))
        .find('a')
        .contains('Ver Projeto Completo')
        .click({ force: true });

      
      cy.log('PASSO 3: Validar conteúdo da página interna ');
      cy.url().should('include', projeto.url);
      
      
      cy.get('h1').invoke('text').then(text => {
        expect(text.trim()).to.include(projeto.titulo);
      });

      
      cy.log('PASSO 4: Simular leitura (Scroll)');
      cy.scrollTo('bottom', { duration: 800 });
      cy.get('p').should('be.visible'); 

      
      cy.log(' PASSO 5: Voltar para a Home ');
      cy.scrollTo('top');
      cy.contains('Voltar ao site').click();
      cy.url().should('eq', 'https://abengenharia.vercel.app/');
    });
  });

  

});