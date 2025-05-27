class Column {
    constructor(id, title, cards = []) {
      this.id = id;
      this.title = title;
      this.cards = cards;
    }
  }

class ColumnComponent {
    constructor(column, onCardAdded, onCardDeleted, onCardMoved) {
      this.column = column;
      this.onCardAdded = onCardAdded;
      this.onCardDeleted = onCardDeleted;
      this.onCardMoved = onCardMoved;
      this.element = document.createElement('div');
      this.element.className = 'column';
      this.element.dataset.id = column.id;
  
      this.render();
      this.setupEventListeners();
      this.renderCards();
    }
  
    render() {
      this.element.innerHTML = `
        <h2 class="column-title">${this.column.title}</h2>
        <div class="cards-container"></div>
        <button class="add-card-btn">Добавить задачу</button>
      `;
  
      this.cardsContainer = this.element.querySelector('.cards-container');
      this.addCardBtn = this.element.querySelector('.add-card-btn');
    }
  
    setupEventListeners() {
      this.addCardBtn.addEventListener('click', () => {
        const text = prompt('Enter card text:');
        if (text) {
          this.onCardAdded(this.column.id, text);
        }
      });
  
      this.cardsContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
        const draggingCard = document.querySelector('.dragging');
        if (!draggingCard) return;
  
        const afterElement = this.getDragAfterElement(this.cardsContainer, e.clientY);
        if (afterElement) {
          this.cardsContainer.insertBefore(draggingCard, afterElement);
        } else {
          this.cardsContainer.appendChild(draggingCard);
        }
      });
  
      this.cardsContainer.addEventListener('drop', (e) => {
        e.preventDefault();
        const cardId = e.dataTransfer.getData('text/plain');
        const cardElement = document.querySelector(`[data-id="${cardId}"]`);
        
        if (cardElement && cardElement.parentElement !== this.cardsContainer) {
          const afterElement = this.getDragAfterElement(this.cardsContainer, e.clientY);
          let position = 0;
          
          if (afterElement) {
            const afterCardId = afterElement.dataset.id;
            const afterCardIndex = this.column.cards.findIndex(c => c.id === afterCardId);
            position = afterCardIndex;
          } else {
            position = this.column.cards.length;
          }
          
          this.onCardMoved(cardId, this.column.id, position);
        }
      });
    }
  
    getDragAfterElement(container, y) {
      const draggableElements = [...container.querySelectorAll('.card:not(.dragging)')];
  
      return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      }, { offset: Number.NEGATIVE_INFINITY, element: null }).element;
    }
  
    renderCards() {
      this.cardsContainer.innerHTML = '';
      this.column.cards.forEach(card => {
        const cardComponent = new CardComponent(card, this.onCardDeleted);
        this.cardsContainer.appendChild(cardComponent.getElement());
      });
    }
  
    updateColumn(column) {
      this.column = column;
      this.renderCards();
    }
  
    getElement() {
      return this.element;
    }
  }