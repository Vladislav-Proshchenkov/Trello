class Board {
    constructor(columns = []) {
      this.columns = columns;
    }
  }

class BoardComponent {
    constructor() {
      this.element = document.createElement('div');
      this.element.className = 'board';
      this.board = StorageService.loadBoard() || this.createInitialBoard();
      this.render();
    }
  
    createInitialBoard() {
      const columns = [
        new Column('col-1', 'Сделать'),
        new Column('col-2', 'В процессе'),
        new Column('col-3', 'Выполнено'),
      ];
      return new Board(columns);
    }
  
    render() {
      this.element.innerHTML = '';
      this.board.columns.forEach(column => {
        const columnComponent = new ColumnComponent(
          column,
          (columnId, text) => this.addCard(columnId, text),
          (cardId) => this.deleteCard(cardId),
          (cardId, newColumnId, position) => this.moveCard(cardId, newColumnId, position)
        );
        this.element.appendChild(columnComponent.getElement());
      });
    }
  
    addCard(columnId, text) {
      const column = this.board.columns.find(col => col.id === columnId);
      if (!column) return;
  
      const cardId = 'card-' + Date.now();
      const card = new Card(cardId, text, columnId);
      column.cards.push(card);
      this.saveAndRender();
    }
  
    deleteCard(cardId) {
      for (const column of this.board.columns) {
        const cardIndex = column.cards.findIndex(card => card.id === cardId);
        if (cardIndex !== -1) {
          column.cards.splice(cardIndex, 1);
          this.saveAndRender();
          break;
        }
      }
    }
  
    moveCard(cardId, newColumnId, position) {
      let card = null;
      let sourceColumn = null;
  
      for (const column of this.board.columns) {
        const cardIndex = column.cards.findIndex(c => c.id === cardId);
        if (cardIndex !== -1) {
          card = column.cards[cardIndex];
          sourceColumn = column;
          column.cards.splice(cardIndex, 1);
          break;
        }
      }
  
      if (!card || !sourceColumn) return;
  
      card.columnId = newColumnId;
  
      const targetColumn = this.board.columns.find(col => col.id === newColumnId);
      if (targetColumn) {
        targetColumn.cards.splice(position, 0, card);
        this.saveAndRender();
      } else {
        sourceColumn.cards.push(card);
        this.saveAndRender();
      }
    }
  
    saveAndRender() {
      StorageService.saveBoard(this.board);
      this.render();
    }
  
    getElement() {
      return this.element;
    }
  }