document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    if (app) {
      const boardComponent = new BoardComponent();
      app.appendChild(boardComponent.getElement());
    }
  });