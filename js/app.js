const mainContent = document.querySelector('main');
let userInput = document.querySelector('.search-bar-main');
const ingredientSearch = document.querySelector(
  '.advanced-input-search-ingredient'
);


fetch('/js/recipes-list.json')
  .then(response => response.json())
  .then(data => {
    recipesCardCreator(data.recipes);
    MainFilter(data.recipes);
    filterByIngredient(data.recipes);
    ingredientListCreator(data.recipes);
  });

/////////////////////// CREATEUR DE CONTENU //

// CRÉER CARTES RECETTES//
function recipesCardCreator(recipes) {
  recipes.map(recipeItem => {
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
    if (recipeItem.ingredients) {
      recipeItem.ingredients.map(element => {
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
          ingredientQuantity.innerText = element.quantity + ' ' + element.unit;
        }
      });
    }

    recipesTitlte.innerText = `${recipeItem.name}`;
    recipesProcess.innerText = `${recipeItem.description}`;
    recipesTime.innerText = `${recipeItem.time}min`;
    timerIcon.src = '/images/timer.png';
  });
}
// CRÉER LISTE "PAR INGRÉDIENT" //
function ingredientListCreator(recipes) {
  const ingredientDiv = document.createElement('div');
  ingredientDiv.classList = 'ingredient-list-div';
  ingredientMenuList = document.querySelector('.search-by-ingredient');
  ingredientMenuList.appendChild(ingredientDiv);

  recipes.map(ingredientItem => {
    if (ingredientItem.ingredients) {
      ingredientItem.ingredients.map(element => {
        if (element.ingredient) {
          const ul = document.createElement('ul');
          ul.classList =("ingredient-ul")
          const ingredientItem = document.createElement('li');
          ul.appendChild(ingredientItem);
          ingredientItem.classList = 'ingredient-list';
          ingredientDiv.appendChild(ul);
          ingredientItem.innerText = element.ingredient;

        }
      });
    }
  });
}



/////////////////////// FUNCTION DE RECHERCHE///////////


// MAIN SEARCH //
function MainFilter (recipes) {
  const recettes = recipes;
  // je récupère mes recettes //
  userInput.addEventListener('keyup', () => {
    const userInputToLower = userInput.value.toLowerCase();
    // à la saisie si l'entrée est supérieur à 3 caract alors je clear //
    if (userInputToLower.length >= 3) {
      mainContent.innerHTML = ' ';
    }
    // je retourne le resultat par filtre de l'entrée utilisateur parametre)
    const result = recettes.filter(recipe =>
      filterBySearch(recipe, userInputToLower)
    );
    // je créer la gallery avec le resultat //
    recipesCardCreator(result);

    if (result.length == 0) {
      mainContent.innerText =
        'Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc.';
    } else {
      mainContent.innerText = ' ';
      const result = recettes.filter(recipe =>
        filterBySearch(recipe, userInputToLower)
      );
      recipesCardCreator(result);
    }
  });
}
function filterBySearch(recipe, keyword) {
  return (
 /*    j'interroge mes fonction de recherche si elle contienne le titre 
    ou la description ou l'ingrédient correspondant à ma saisie */
    titleContain(recipe, keyword) ||
    descriptionContain(recipe, keyword) ||
    recipeContainIngredient(recipe, keyword)
  );
}

   // .. PAR TITRE 
function titleContain(recipe, keyword) {
  return recipe.name.toLowerCase().includes(keyword);
}
  // .. PAR DESCRIPTION
function descriptionContain(recipe, keyword) {
  return recipe.description.toLowerCase().includes(keyword);
}
  // .. PAR INGREDIENTS
function ingredientContain(ingredient, keyword) {
    return ingredient.ingredient.toLowerCase().includes(keyword);
  } 
function recipeContainIngredient(recipe, keyword) {
  return recipe.ingredients.some(ingredient =>
    ingredientContain(ingredient, keyword)
  );
}

 //.. SI LE TITRE OU LA DESCRIPTION CONTIENT LA RECHERCHE 
function titleAndDescriptionContain(recipe, keyword) {
  return (
    titleContain(recipe, keyword) &&
    descriptionContain(recipe, keyword) &&
    recipeContainIngredient(recipe, keyword)
  );
}


function filterByIngredient(recipes) {

  const ingredientMap = recipes.map (element => element.ingredients.map (element => {
      console.log(element.ingredient);
      return element.ingredient
    })
  )
  console.log(ingredientMap);
 
  ingredientSearch.addEventListener('keyup', () => {
    const userInputIngredient = ingredientSearch.value.toLowerCase();
    
    if (userInputIngredient.length == 0) {
      let ingredientDiv = document.querySelector('.ingredient-list-div');
      ingredientDiv.style.width = "0px"

    } else {
      ingredientDiv = document.querySelector('.ingredient-list-div');
      ingredientDiv.remove()
      const result = ingredientMap.filter(ingredient => 
        recipeContainIngredient(ingredient, userInputIngredient)
      );
      ingredientListCreator (result)
      console.log(result);


      if (result == 0) {
        ingredientDiv.style.height = "0px"

      }


    }

  });
}

