export const submitSnippet = () => {
  // add a sample snippet
  cy.get(`[data-cy="snippet-input"]`).type(snippetCode, { delay: 1 });

  // assert the button is enabled
  cy.get(`[data-cy="submit"]`).should("be.visible");

  // submit the snippet
  cy.get(`[data-cy="submit"]`).click();
};

const snippetCode = `
    HEADERS = {
      'Accept': '*/*',
      'Accept-Language': 'en-US,en;q=0.9,ru;q=0.8',
      'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnROYW1lIjoid2ViYXBwLXYzMSIsInNjb3BlIjoic3RhdGljLWNvbnRlbnQtYXBpLGN1cmF0aW9uLWFwaSxuZXh4LWNvbnRlbnQtYXBpLXYzMSx3ZWJhcHAtYXBpIn0.mbuG9wS9Yf5q6PqgR4fiaRFIagiHk9JhwoKES7ksVX4',
    }`;
