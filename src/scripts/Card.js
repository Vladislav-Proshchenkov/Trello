class Card {
  constructor(id, text, columnId) {
    this.id = id;
    this.text = text;
    this.columnId = columnId;
  }
}

class CardComponent {
    constructor(card, onDelete) {
      this.card = card;
      this.onDelete = onDelete;
      this.element = document.createElement('div');
      this.element.className = 'card';
      this.element.draggable = true;
      this.element.dataset.id = card.id;
  
      this.render();
      this.setupEventListeners();
    }
  
    render() {
      this.element.innerHTML = `
        <div class="card-content">${this.card.text}</div>
        <span class="delete-card">✕</span>
      `;
    }
  
    setupEventListeners() {
      const deleteBtn = this.element.querySelector('.delete-card');
      deleteBtn.addEventListener('click', () => this.onDelete(this.card.id));
  
      this.element.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', this.card.id);
        this.element.classList.add('dragging');
      });
  
      this.element.addEventListener('dragend', () => {
        this.element.classList.remove('dragging');
      });
    }
  
    getElement() {
      return this.element;
    }
  }