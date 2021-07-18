
fetch ('/js/recipes-list.json')
.then (response => response.json ())
.then (data => {
  recipesCardCreator (data.recipes);
  
});

const mainContent = document.querySelector ('main');
let userInput = document.querySelector ('.search-bar-main');
const ingredientSearch = document.querySelector (
  '.advanced-input-search-ingredient'
);
const userInputIngredient = ingredientSearch.value.toLowerCase ();
const appareilSearch = document.querySelector (
  '.advanced-input-search-appareils'
);
const userInputappareil = appareilSearch.value.toLowerCase ();

const ustensilSearch = document.querySelector (
  '.advanced-input-search-ustensils'
); 
const ingredientDiv = document.createElement ('div');
const appareilDiv = document.createElement ('div');
const ustensilDiv = document.createElement ('div');
ingredientDiv.classList = 'ingredient-list-div';
const arrow = document.querySelectorAll ('.arrow');


function recipesCardCreator (recipes) {
for (let i = 0 ; i < recipes.length; i++ ) {
    const recipesCard = document.createElement ('section');
    const recipesDescription = document.createElement ('div');
    const recipesImg = document.createElement ('div');
    const recipesTitlte = document.createElement ('h2');
    const ingredientList = document.createElement ('ul');
    const recipesProcess = document.createElement ('p');
    const recipesTime = document.createElement ('p');
    const timerIcon = document.createElement ('img');

    recipesImg.classList = 'recette-img';
    recipesCard.classList = 'recette';
    recipesDescription.classList = 'recette-description';
    recipesTitlte.classList = 'recette-title';
    ingredientList.classList = 'ingredient-list';
    recipesProcess.classList = 'process';

    recipesTime.classList = 'time-to';
    timerIcon.classList = 'timer';

    mainContent.appendChild (recipesCard);
    recipesCard.appendChild (recipesImg);
    recipesCard.appendChild (recipesDescription);
    recipesDescription.appendChild (recipesTitlte);
    recipesDescription.appendChild (ingredientList);
    recipesDescription.appendChild (recipesProcess);
    recipesDescription.appendChild (recipesTime);
    recipesDescription.appendChild (timerIcon);

     if (recipes[i].ingredients) {
         for (let j = 0; recipes[i].ingredients[j]; j++) {
             const ingredientType = document.createElement ('li');
             const ingredientQuantity = document.createElement ('p');
             if (recipes.ingredients) {
                ingredientType.classList = 'ingredient-type';
                ingredientList.appendChild (ingredientType);
                ingredientType.innerText = recipes[i].ingredients[j];
             }
             for (let k = 0; recipes[i].ingredients[j].ingredient[k]; k++) {
                 
             }
             
             
         }
      /* recipeItem.ingredients.map (element => { */
        
      }
    }
}

/*
        if (element.ingredient) {
          ingredientType.classList = 'ingredient-type';
          ingredientList.appendChild (ingredientType);
          ingredientType.innerText = element.ingredient;
        }
        if (element.quantity) {
          ingredientQuantity.classList = 'quantity';
          ingredientType.appendChild (ingredientQuantity);
          ingredientQuantity.innerText = element.quantity;
        }
        if (element.unit) {
          ingredientQuantity.innerText = element.quantity + ' ' + element.unit;
        }
      });
    }
 */
  /*   recipesTitlte.innerText = `${recipeItem.name}`;
    recipesProcess.innerText = `${recipeItem.description}`;
    recipesTime.innerText = `${recipeItem.time}min`;
    timerIcon.src = '/images/timer.png';
  ; 
 
*/


