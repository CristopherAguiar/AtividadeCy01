describe('template spec', () => {
  beforeEach(() => {
    cy.visit('https://3076-cypress-alurapic-front.vercel.app/#/home')
  })

  function generateRandomUserName() {
    const randomChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return 'user_' + result;
  }

  it('Usuario deve conseguir se cadastrar com sucesso', () => {
    const randomUserName = generateRandomUserName();

    cy.get('[data-test="register"]').click();
    cy.get('[data-test="fullName"]').type('Cristopher Ravagnani Aguiar');
    cy.get('[data-test="registerUserName"]').type(randomUserName);
    cy.get('[data-test="email"]').type('Claytion@gmail.com');
    cy.get('[data-test="registerPassword"]').type('12345678');
    cy.get('[data-test="btnRegister"]').click();
    cy.wait(3000);
  })

  it('Deve verificar para cada campo se aparece a mensagem sobre o preenchimento incorreto ou não preenchimento das informações', () => {
    cy.get('[data-test="register"]').click();
    
    // Testar campo de email
    cy.get('[data-test="email"]').type('email_invalido');
    cy.get('[data-test="btnRegister"]').click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.include('Invalid e-mail');
    });
    cy.wait(1000);

    // Testar campo de nome completo
    cy.get('[data-test="fullName"]').clear();
    cy.get('[data-test="fullName"]').type('A');
    cy.get('[data-test="btnRegister"]').click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.include('Mininum length is 2');
    });
    cy.wait(1000);

    // Testar campo de nome de usuário
    cy.get('[data-test="registerUserName"]').clear()
    cy.get('[data-test="registerUserName"]').type('u');
    cy.get('[data-test="btnRegister"]').click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.include('Mininum length is 2');
    });
    cy.wait(1000);

    // Testar campo de senha
    cy.get('[data-test="registerPassword"]').clear()
    cy.get('[data-test="registerPassword"]').type('123');
    cy.get('[data-test="btnRegister"]').click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.include('Mininum length is 8');
    });
    cy.wait(1000);

    // Voltar à página inicial
    cy.visit('https://3076-cypress-alurapic-front.vercel.app/#/home');
  })

  it('Usuario deve conseguir fazer login com sucesso', () => {
    cy.get('[data-test="loginUserName"]').click();
    cy.get('[data-test="loginUserName"]').type('cristopher_aguiar');
    cy.get('[data-test="loginPassword"]').type('12345678');
    cy.get('[data-test="loginBtn"]').click();
    cy.wait(3000);
  })
  

  it('Deve exibir mensagem de erro quando não inserir informações de login', () => {
    cy.get('[data-test="loginUserName"]').click();
    cy.get('[data-test="loginUserName"]').clear(); 
    cy.get('[data-test="loginPassword"]').clear(); 
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.include('User name is required!');
      expect(alertText).to.include('Password is required!');
    });
    cy.wait(3000);
  })
})
