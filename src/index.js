import './styles/main.css';
import { BoardComponent } from './scripts/Board';
import { Card } from './scripts/Card';
import { Column } from './scripts/Column';
import { StorageService } from './scripts/StorageService';

export { BoardComponent, Card, Column, StorageService };

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
});