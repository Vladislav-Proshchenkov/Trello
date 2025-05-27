class StorageService {
  static STORAGE_KEY = 'trello-board';

  static saveBoard(board) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(board));
  }

  static loadBoard() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }
}