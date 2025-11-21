describe('Validação Rigorosa dos Canais de Contato', () => {

  beforeEach(() => {
    cy.visit('https://abengenharia.vercel.app/');
    
    cy.get('#contato').scrollIntoView();
  });

  it('CT-12: Botão WhatsApp deve abrir o link correto com número e mensagem', () => {
    
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });

   
    cy.contains('h3', 'WhatsApp').parents('[class*="contactCard"]').click();

    
    cy.get('@windowOpen').then((stub) => {
      
      const urlChamada = stub.args[0][0]; 
      
      
      cy.log('URL WhatsApp Capturada: ' + urlChamada);

      // Validações
      expect(urlChamada).to.contain('https://wa.me/5581991137039');
      
      expect(urlChamada).to.contain('text=Olá! Gostaria de saber mais sobre os serviços.');
    });
  });

  it('CT-13: Botão Instagram deve levar ao perfil exato com parâmetros', () => {
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });

    cy.contains('h3', 'Instagram').parents('[class*="contactCard"]').click();

    
    cy.get('@windowOpen').then((stub) => {
      const urlChamada = stub.args[0][0];
      
      cy.log('URL Instagram Capturada: ' + urlChamada);

      
      expect(urlChamada).to.eq('https://www.instagram.com/abengenhariape?igsh=Z3U1aTMzbGd3YzI3');
    });
  });

  it('CT-14: Card de E-mail deve exibir endereço correto', () => {
    cy.contains('h3', 'E-mail')
      .parents('[class*="contactCard"]')
      .within(() => {
        
        cy.get('p').should('contain.text', 'contato@abengenharia.com.br');
        
       
        cy.get('button').should('contain.text', 'Enviar E-mail');
      });
  });

});