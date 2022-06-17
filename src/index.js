import React from 'react'; // Ядро реакта, react core
import ReactDOM from 'react-dom/client'; // Монтування компонента в додаток
import App from './App';

// Рендеремо компонент App та складуємо його в компонент root
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
