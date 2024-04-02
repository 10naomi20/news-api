const API_KEY = "&apiKey=568e43dbac1e4e08b344e06f40f460a4";
const TOP_URL = "https://newsapi.org/v2/top-headlines?country=us";


async function initialLoad(){
  try {
    const response = await fetch(`${TOP_URL}${API_KEY}`);
    const data = await response.json();
    renderToScreen(data);


  } catch (err) {
    console.error(err);
  }
}

function clearResults(){
  document.getElementById("option-2-enhanced-results").innerHTML = '';
}
function renderToScreen(data){
  let cards = "";
  for (const item of data.articles) {
    if(item.urlToImage){
      console.log(item)
      cards += render(item);
    }
    
  }

  document.getElementById("option-2-enhanced-results").innerHTML = cards;

}

function render(data) {
  return `
    <li class="card">
      <img src="${data.urlToImage}" alt="">
      <div class="card-content">
        <p class="subheader">
            ${data?.source?.name}
        </p>
        <h3 class="header">${data.title}</h3>
      </div>
    </li>`;
}

async function searchbarEventHandler () {
  let input = document.getElementById("searchbar").value;
  input = input.toLowerCase();
  clearResults();
  

  let SEARCH_URL = `https://newsapi.org/v2/everything?q=${input}&searchIn=title`;

  try {
    const response = await fetch(`${SEARCH_URL}${API_KEY}`);
    const data = await response.json();

    await renderToScreen(data);

  } catch (err) {
    console.error(err);
  }
}

initialLoad();

const searchbar = document.getElementById("searchbar");
searchbar.addEventListener("keyup", searchbarEventHandler);



// HOVER JS

// Select the header and card-news elements from the DOM
let headerElement = document.querySelector('.header');
let cardNewsElement = document.querySelector('.card-news');

// Function to toggle display
function toggleDisplay(elementToHide, elementToShow) {
    // Check if the element to hide is currently displayed
    if (elementToHide.style.display !== 'none') {
        elementToHide.style.display = 'none';
        elementToShow.style.display = 'block';
    } else {
        elementToHide.style.display = 'block';
        elementToShow.style.display = 'none';
    }
}

 // Initially, you might want to ensure the card-news is not displayed
 cardNewsElement.style.display = 'none';

 // Add a 'mouseenter' event listener to the header element
 headerElement.addEventListener('mouseenter', function() {
     toggleDisplay(headerElement, cardNewsElement);
 });

 // Add a 'mouseenter' event listener to the card-news element
 cardNewsElement.addEventListener('mouseenter', function() {
     toggleDisplay(cardNewsElement, headerElement);
 });