const mainContent = document.querySelector('main');
let userInput = document.querySelector('.search-bar-main');

fetch('/js/recipes-list.json')
	.then((response) => response.json())
	.then((data) => {
		recipesCardCreator(data.recipes);
		filterBy(data.recipes);
    displaySortBy (data.recipes)
	});
function recipesCardCreator(recipes) {
	recipes.map((element => {
		const recipesCard = document.createElement('section');
		const recipesDescription = document.createElement('div');
		const recipesImg = document.createElement('div');
		const recipesTitlte = document.createElement('h2');
		const ingredientList = document.createElement('ul');
		const recipesProcess = document.createElement('p');
		const recipesTime = document.createElement('p');
		const timerIcon = document.createElement('img');

		recipesImg.classList = 'recette-img';
		recipesCard.classList = 'recette';
		recipesDescription.classList = 'recette-description';
		recipesTitlte.classList = 'recette-title';
		ingredientList.classList = 'ingredient-list';
		recipesProcess.classList = 'process';

		recipesTime.classList = 'time-to';
		timerIcon.classList = 'timer';

		mainContent.appendChild(recipesCard);
		recipesCard.appendChild(recipesImg);
		recipesCard.appendChild(recipesDescription);
		recipesDescription.appendChild(recipesTitlte);
		recipesDescription.appendChild(ingredientList);
		recipesDescription.appendChild(recipesProcess);
		recipesDescription.appendChild(recipesTime);
		recipesDescription.appendChild(timerIcon);

		element.ingredients.map((element => {
      console.log(element);
			const ingredientType = document.createElement('li');
			const ingredientQuantity = document.createElement('p');

			if (element.ingredient) {
				ingredientType.classList = 'ingredient-type';
				ingredientList.appendChild(ingredientType);
				ingredientType.innerText = element.ingredient;
			}
			if (element.quantity) {
				ingredientQuantity.classList = 'quantity';
				ingredientType.appendChild(ingredientQuantity);
				ingredientQuantity.innerText = element.quantity;
			}
			if (element.unit) {
				ingredientQuantity.innerText =
					element.quantity + ' ' + element.unit;
			}
		}));

		recipesTitlte.innerText = `${element.name}`;
		recipesProcess.innerText = `${element.description}`;
		recipesTime.innerText = `${element.time}min`;
		timerIcon.src = '/images/timer.png';
	}));
}

function filterBy(recipes) {
	userInput.addEventListener('keyup', () => {
		mainContent.innerHTML = ' ';
		const recettes = recipes.map((recette) => recette);
		const userInputToLower = userInput.value.toLowerCase();

		// FILTER BY NAME //
		const recipesName = recettes.filter((recette) =>
			recette.name.toLowerCase().includes(userInputToLower)
		);
		// FILTER BY APPAREIL //
		const recipesAppliance = recettes.filter((recette) =>
			recette.appliance.toLowerCase().includes(userInputToLower)
		);
		// FILTER BY DESCRIPTION //
		const recipesDescription = recettes.filter((recette) =>
			recette.description.toLowerCase().includes(userInputToLower)
		);

		// FILTER BY TEMPS DE PREPARATION //
		const recipesUstencils = recettes.map((recette) =>
			recette.ustensils.filter((u) => u.includes(userInputToLower))
		);

		// FILTER BY INGREDIENT //
		const recipesIngredient = recettes.map((a) =>
			a.ingredients.filter((b) =>
				b.ingredient.toLowerCase().includes(userInputToLower)
			)
		);

		if (recipesName) {
			recipesCardCreator(recipesName);
		}
		else if (recipesAppliance) {
			recipesCardCreator(recipesAppliance);
		}
		if (recipesDescription) {
			recipesCardCreator(recipesDescription);
		}
		if (recipesUstencils) {
			recipesCardCreator(recipesUstencils);
		}
		if (recipesIngredient) {
		}
	});
}

function displaySortBy () {
  const arrows = document.querySelectorAll (".arrow")
  const searchByIngredient = document.querySelector('.search-by-ingredient')
  arrows.forEach(arrow => {
    let isMenuOpen = false;
    arrow.addEventListener('click', () => {
      
      if (isMenuOpen == false){
      searchByIngredient.style.height = "20%"
      isMenuOpen = true;
    } else {
      searchByIngredient.style.height = "69px"
      isMenuOpen = false;
    }
  })
  })
}
