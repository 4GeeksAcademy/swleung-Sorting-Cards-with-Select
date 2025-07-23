const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const suits = [
  { symbol: "♦", class: "diamond" },
  { symbol: "♥", class: "heart" },
  { symbol: "♠", class: "spade" },
  { symbol: "♣", class: "club" }
];

const generateCard = () => {
  const valueIndex = Math.floor(Math.random() * values.length);
  const suit = suits[Math.floor(Math.random() * suits.length)];
  return {
    value: values[valueIndex],
    suit: suit.symbol,
    class: suit.class,
    rank: valueIndex
  };
};

const renderCard = (card) => {
  const div = document.createElement("div");
  div.className = `card ${card.class}`;
  div.innerHTML = `
    <div>${card.suit}</div>
    <div>${card.value}</div>
    <div>${card.suit}</div>
  `;
  return div;
};

const drawBtn = document.getElementById("drawBtn");
const sortBtn = document.getElementById("sortBtn");
const cardContainer = document.getElementById("cardContainer");
const logContainer = document.getElementById("logContainer");

let cards = [];
let log = [];

drawBtn.addEventListener("click", () => {
  const count = parseInt(document.getElementById("cardCount").value);
  if (isNaN(count) || count <= 0) return;

  cards = [];
  log = [];
  cardContainer.innerHTML = "";
  logContainer.innerHTML = "";

  for (let i = 0; i < count; i++) {
    cards.push(generateCard());
  }

  cards.forEach(card => cardContainer.appendChild(renderCard(card)));
});

sortBtn.addEventListener("click", () => {
  if (cards.length === 0) return;

  let copy = [...cards]; 
  for (let i = 0; i < copy.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < copy.length; j++) {
      if (copy[j].rank < copy[minIndex].rank) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [copy[i], copy[minIndex]] = [copy[minIndex], copy[i]];
      log.push([...copy]); 
    }
  }

  cardContainer.innerHTML = "";
  copy.forEach(card => cardContainer.appendChild(renderCard(card)));

  logContainer.innerHTML = "";
  log.forEach((step, index) => {
    const stepDiv = document.createElement("div");
    stepDiv.className = "card-container";
    stepDiv.innerHTML = `<strong>Step ${index + 1}</strong>`;
    step.forEach(card => {
      stepDiv.appendChild(renderCard(card));
    });
    logContainer.appendChild(stepDiv);
  });
});
