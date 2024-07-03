describe('template spec', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('http://127.0.0.1:7001/')
  });

  it('Insere uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li')
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li .destroy')
      .invoke('show')
      .click();

    cy.get('.todo-list li')
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('.todo-list li .toggle')
      .first()
      .click();

    cy.contains('Active').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.contains('Completed').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.contains('All').click();
    cy.get('.todo-list li')
      .should('have.length', 2);
  });

  // Novo teste 1: Editar uma tarefa
  it('Edita uma tarefa existente', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li')
      .dblclick()
      .find('.edit')
      .clear()
      .type('TP2 de ES - Editado{enter}');

    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES - Editado');
  });

  // Novo teste 2: Marcar todas as tarefas como completas e depois como incompletas
  it('Marca todas as tarefas como completas e depois como incompletas', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('.todo-list li .toggle')
      .each(($el) => {
        cy.wrap($el).click();
      });

    cy.get('.todo-list li')
      .each(($el) => {
        cy.wrap($el).should('have.class', 'completed');
      });

    cy.get('.todo-list li .toggle')
      .each(($el) => {
        cy.wrap($el).click();
      });

    cy.get('.todo-list li')
      .each(($el) => {
        cy.wrap($el).should('not.have.class', 'completed');
      });
  });

  // Novo teste 3: Adicionar múltiplas tarefas e verificar sua presença
  it('Adiciona múltiplas tarefas e verifica se todas estão presentes', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}')
      .type('Estudar para provas{enter}');

    cy.get('.todo-list li')
      .should('have.length', 3)
      .eq(0).should('have.text', 'TP2 de ES')
      .next().should('have.text', 'Prova de ES')
      .next().should('have.text', 'Estudar para provas');
  });
});
