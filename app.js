// $(".check-button").click(function() {
//   const selectedSide = $(this).parents(".polls-item-select");
//   const topParent = $(this).parents(".polls-item");
//   const selectedGraph = topParent.find(".graph-selected");

//   $(this).addClass("active");

//   if (selectedSide.hasClass("right")) {
//     topParent.addClass("selected right");
//   } else {
//     topParent.addClass("selected");
//   }

//   const p = selectedSide.children(".percent").text();
//   selectedGraph.css("width", p);

//   $("this :button").prop("disabled", true);
// });




// Handle animation of polls list
const section = document.querySelector('.polls');

function pollsAnimation(event) {

  if(event.target.classList.contains('button-svg')) {
    
    event.target.closest('.check-button').classList.add('button-active');
    event.target.querySelector('path').classList.add('button-active-svg');
  
    const pollsItem = event.target.closest('.polls-item');
    const selectedSide = event.target.closest('.polls-item-select');
    const selectedGraph = pollsItem.querySelector('.graph-selected');
    const percent = selectedSide.querySelector('.percent').innerText;
    
    if (selectedSide.classList.contains('right')) {
      pollsItem.classList.add('selected', 'right');
    } else {
      pollsItem.classList.add('selected');
    }
    
    setTimeout(function() {
      selectedGraph.style.width = percent;
    }, 200);
  }

}

section.addEventListener('click', pollsAnimation, true);




// Handle percent
const inputPercent = document.querySelectorAll('.input.number');

function calculatePercent() {
  const max = 100;

  if(this.value > max) {
    alert('It must be a number less than 100');
    this.value = 0;
  }

  if(this == inputPercent[0]) {
    inputPercent[1].value = max - inputPercent[0].value;
  } else if(this == inputPercent[1]) {
    inputPercent[0].value = max - inputPercent[1].value;
  }
}

for(let i = 0; i < inputPercent.length; i++) {
  inputPercent[i].addEventListener('input', calculatePercent);
}




// Handle the list maker
const generateButton = document.querySelector('.input-button');

function handleGenerate() {
  const inputs = document.querySelectorAll('.input');

  for(let i = 0; i < inputs.length; i++) {
    if (inputs[i].value == '') {
      alert('Please fill the inputs');
      return;
    }
  }

  const inputTitle = document.querySelector('.input.title');
  const inputOption = document.querySelectorAll('.input.option');
  const ul = document.querySelector('.polls-list');
  const li = document.createElement('li');
  li.classList.add('polls-item');

  let template = `
      <div class="polls-item-title">
        <div class="polls-item-select">
          <button class="check-button">
            <svg
              class="button-svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5003 16.515L6 12.0145L7.49973 10.5147L10.5003 13.5154L16.4992 7.51501L18 9.01484L10.5003 16.515Z"
                fill="#22294F"
              />
            </svg>
          </button>
          <p class="option">${inputOption[0].value}</p>
          <p class="percent hidden">${inputPercent[0].value}%</p>
        </div>
        <h4>${inputTitle.value}</h4>
        <div class="polls-item-select right">
          <button class="check-button">
            <svg
              class="button-svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5003 16.515L6 12.0145L7.49973 10.5147L10.5003 13.5154L16.4992 7.51501L18 9.01484L10.5003 16.515Z"
                fill="#22294F"
              />
            </svg>
          </button>
          <p class="option">${inputOption[1].value}</p>
          <p class="percent hidden">${inputPercent[1].value}%</p>
        </div>
      </div>
      <div class="polls-item-graph">
        <div class="graph-selected hidden">
          <img class="graph-ball" src="./asset/graph-ball.svg" />
        </div>
      </div>
    `

  li.innerHTML = template;
  ul.appendChild(li);

  for(let i = 0; i < inputs.length; i++) {
    inputs[i].value = '';
  }
}
  
generateButton.addEventListener('click', handleGenerate);