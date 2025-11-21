/// <reference types="cypress" />

describe('Funcionalidade da NavBar e Responsividade Mobile', () => {

  beforeEach(() => {
    cy.visit('https://abengenharia.vercel.app/', { timeout: 10000 });
  });

  
  context('Desktop: Navegação Institucional', () => {
    beforeEach(() => {
      cy.viewport(1280, 800); 
    });

    it('CT-01 a CT-04: Deve verificar se os links principais (Início, Quem Somos, Serviços, Contato) levam às seções corretas na página', () => {
      
      
     
      cy.get('nav').contains('Início').click();
      cy.url().should('include', '#inicio');
      cy.get('h1').contains('Soluções').should('be.visible');
      cy.wait(500);

      
      const links = [
        { texto: 'Quem Somos', seletor: '#quem-somos' },
        { texto: 'Serviços',   seletor: '#servicos' },
        { texto: 'Contato',    seletor: '#contato' }
      ];
      
      links.forEach(item => {
        cy.get('nav').contains(item.texto).click();
        cy.url().should('include', item.seletor);
        cy.get(item.seletor).should('be.visible');
        cy.wait(500);
      });
    });
  });

 
  context('Mobile: Menu Hambúrguer e Layout', () => {
    beforeEach(() => {
      cy.viewport('iphone-x');
    });

    it('CT-05: Deve validar se o menu hambúrguer abre corretamente ao ser clicado em dispositivos móveis', () => {
      
      cy.get('#mobile-navigation').should('not.be.visible');
      
      
      cy.get('button[aria-label*="Abrir menu"]').click();
      
      
      cy.get('#mobile-navigation')
        .should('be.visible')
        .and('satisfy', ($el) => {
           return $el[0].className.includes('active');
        });
    });

    it('CT-06: Deve validar se o menu móvel fecha automaticamente após o usuário clicar em um link de navegação', () => {
      
      cy.get('button[aria-label*="Abrir menu"]').click();
      
      
      cy.get('#mobile-navigation').contains('Serviços').click({ force: true });
      
      
      cy.wait(500); 
      cy.get('#mobile-navigation').should('not.be.visible');
      
     
      cy.get('#servicos').should('be.visible');
    });

    it('CT-15: Deve verificar se o layout dos serviços se adapta para mobile, empilhando os cards verticalmente (responsividade)', () => {
      
      cy.get('#servicos').scrollIntoView();
      cy.wait(500);

      
      
      cy.get('[class*="serviceCard"]').eq(0).then($card1 => {
        cy.get('[class*="serviceCard"]').eq(1).then($card2 => {
          
          expect($card2.offset().top).to.be.greaterThan($card1.offset().top);
        });
      });
    });
  });

});