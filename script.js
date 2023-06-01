
const container = document.querySelector('.game');

// Licznik usuniętych elementów
let deletedCount = 0;

// Czas trwania gry w sekundach
const gameTime = 90;

let timeWait = 1100

// Generowania losowej liczby
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Funkcja do dodawania nowych elementów 
function addElement() {

  // Nowy element
  const element = document.createElement('img');
  element.style.width = '5em'
  element.src = 'assets/logo.png'
  element.style.borderRadius = '50%'

  element.addEventListener('click', deleteElement);

  // Losowe pozycje dla elementu
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  const elementSize = 50; 

  const randomLeft = getRandomNumber(0, containerWidth - elementSize);
  const randomTop = getRandomNumber(0, containerHeight - elementSize);

  
  element.style.position = 'absolute';
  element.style.left = `${randomLeft}px`;
  element.style.top = `${randomTop}px`;

  
  container.appendChild(element);

  setTimeout(() => {
    element.parentNode.removeChild(element);
  }, timeWait);

  
}

// Funkcja do usuwania elementów i aktualizowania licznika
function deleteElement(event) {
    
    if (event.target === this){
    this.parentNode.removeChild(this);

    // Zwiększ licznik usuniętych elementów
    deletedCount++;
  
    // Aktualizuj tekst licznika
    const counter = document.querySelector('.counter');
    counter.textContent = `Punkty: ${deletedCount}`;
    }
}


// Ustaw interwał czasowy 
let intervalId;

// Odliczanie czasu
let remainingTime = gameTime;

// Zmienna informująca, czy gra jest w trakcie
let gameOn = true;

function updateTimer() {
  const timer = document.querySelector('.time');
  timer.textContent = `Pozostały czas: ${remainingTime}s`;

  if (remainingTime <= 0) {
    clearInterval(intervalId);
    timer.textContent = 'Czas się skończył!';
    endGame();
  }

  remainingTime--;
}

const timerIntervalId = setInterval(updateTimer, 1000);

function addButtonNewGame() {
    let newGameButton = document.querySelector('.new-game');
    if (!newGameButton)  {
      const newGameButton = document.createElement('button');
      newGameButton.textContent = 'Nowa Gra';
      newGameButton.classList.add('new-game');
      newGameButton.addEventListener('click', getNewGame);
  
      container.appendChild(newGameButton);
  
    }}
  
// Funkcja rozpoczynająca nową grę
function getNewGame() {
  
  container.innerHTML = '';

  deletedCount = 0;
  remainingTime = gameTime;
  graTrwa = true;

  intervalId = setInterval(addElement, 450);

  const newGameButton = document.querySelector('.new-game');
  if (newGameButton){
  newGameButton.parentNode.removeChild(newGameButton);
  }
  
  const counter = document.querySelector('.counter');
  counter.textContent = `Punkty: ${deletedCount}`;

  updateTimer();
}

// Funkcja wywoływana po zakończeniu czasu
function endGame() {
  gameOn = false;
  container.innerHTML = ''
  addButtonNewGame();
}

// Inicjalizacja gry
intervalId = setInterval(addElement, 450);
updateTimer();

