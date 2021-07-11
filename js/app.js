fetch ('/js/recipes-list.json')
  .then (response => response.json ())
  .then (data => {
    recipesCardCreator (data.recipes);
    appareilListCreator (data.recipes);
    ingredientListCreator (data.recipes);
    ustensilListCreator (data.recipes);
    MainFilter (data.recipes);
    filterByIngredient (data.recipes);
    filterByAppareil (data.recipes);
    filterByUstensils (data.recipes);
    tagAdd (data.recipes);
    openMenu ();
    advancedIngredientSearch (data.recipes);
    advancedUstensilsSearch (data.recipes);
    advancedAppareilsSearch (data.recipes);
  });

/// CONSTANTES GLOBALES ///
const mainContent = document.querySelector ('main');
let userInput = document.querySelector ('.search-bar-main');
const ingredientSearch = document.querySelector (
  '.advanced-input-search-ingredient'
);
const appareilSearch = document.querySelector (
  '.advanced-input-search-appareils'
);
const ustensilSearch = document.querySelector (
  '.advanced-input-search-ustensils'
); ////
const ingredientDiv = document.createElement ('div');
const appareilDiv = document.createElement ('div');
const ustensilDiv = document.createElement ('div');
ingredientDiv.classList = 'ingredient-list-div';
const arrow = document.querySelectorAll ('.arrow');

let tagFilter = [];
let tagUstensils = [];
let tagIngredients = [];
let tagAppareils = [];
let searchMain = [];
let isMenuOpen;
//
/////////////////////// CREATEUR DE CONTENU //

//*******CRÉER CARTES RECETTES
function recipesCardCreator (recipes) {
  recipes.map (recipeItem => {
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
    if (recipeItem.ingredients) {
      recipeItem.ingredients.map (element => {
        const ingredientType = document.createElement ('li');
        const ingredientQuantity = document.createElement ('p');

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

    recipesTitlte.innerText = `${recipeItem.name}`;
    recipesProcess.innerText = `${recipeItem.description}`;
    recipesTime.innerText = `${recipeItem.time}min`;
    timerIcon.src = '/images/timer.png';
  });
}
//*******CRÉER LISTE "PAR INGRÉDIENT" //
function ingredientListCreator (recipes) {
  const ingredientMenuList = document.querySelector ('.search-by-ingredient');
  ingredientMenuList.appendChild (ingredientDiv);

  recipes.map (ingredientItem => {
    const ingredientToItem = document.createElement ('li');
    ingredientToItem.className = 'ingredient-list';
    ingredientDiv.appendChild (ingredientToItem);
    ingredientToItem.innerText = String (ingredientItem);

    if (ingredientItem.ingredients) {
      ingredientToItem.innerText = ingredientItem.ingredients;
    } //
  });
}
//*******CRÉER LISTE "PAR INGRÉDIENT" //
function appareilListCreator (recipes) {
  const appareilMenuList = document.querySelector ('.search-by-appareil');
  appareilMenuList.appendChild (appareilDiv);

  recipes.map (element => {
    appareilDiv.classList = 'appareil-list-div';
    const newAppareilList = document.createElement ('li');
    newAppareilList.classList = 'appareil-li';
    appareilDiv.appendChild (newAppareilList);
    newAppareilList.innerText = element;
  });
}
function ustensilListCreator (recipes) {
  const ustensilMenuList = document.querySelector ('.search-by-ustensil');
  ustensilMenuList.appendChild (ustensilDiv);

  recipes.map (element => {
    ustensilDiv.classList = 'ustensil-list-div';
    const newUstensilList = document.createElement ('li');
    newUstensilList.classList = 'ustensil-li';
    ustensilDiv.appendChild (newUstensilList);
    newUstensilList.innerText = element;
  });
}
///
/////////////////////// FUNCTION DE RECHERCHE PRINCIPALE ///////////

//*******MAIN SEARCH //
function MainFilter (recipes) {
  const recettes = recipes;
  userInput.addEventListener ('keyup', () => {
    const userInputToLower = userInput.value.toLowerCase ();
    if (userInputToLower.length >= 3) {
      mainContent.innerHTML = ' ';
    }
    const result = recettes.filter (recipe =>
      filterBySearch (recipe, userInputToLower)
    );
    recipesCardCreator (result);

    if (result.length == 0) {
      mainContent.innerText =
        'Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc.';
    } else {
      mainContent.innerText = ' ';
      const resultMain = recettes.filter (recipe =>
        filterBySearch (recipe, userInputToLower)
      );
      recipesCardCreator (resultMain);
    }
  });
}
function filterBySearch (recipe, keyword) {
  return (
    titleContain (recipe, keyword) ||
    descriptionContain (recipe, keyword) ||
    recipeContainIngredient (recipe, keyword)
  );
}
function FilterByTag (recipe, activefilter) {
  return (
    advancedIngredientSearch (recipe, activefilter) ||
    advancedUstensilsSearch (recipe, activefilter) ||
    advancedAppareilsSearch (recipe, activefilter)
  );
}
// .. PAR TITRE
function titleAndDescriptionContain (recipe, keyword) {
  return (
    titleContain (recipe, keyword) &&
    descriptionContain (recipe, keyword) &&
    recipeContainIngredient (recipe, keyword)
  );
}
function titleContain (recipe, keyword) {
  return recipe.name.toLowerCase ().includes (keyword);
}
// .. PAR DESCRIPTION
function descriptionContain (recipe, keyword) {
  return recipe.description.toLowerCase ().includes (keyword);
}
// .. PAR INGREDIENTS
function ingredientContain (ingredient, keyword) {
  return ingredient.ingredient.toLowerCase ().includes (keyword);
}
// .. RECHERCHE CONTIENT DESCRIPTION OU INGREDIENT OU TITRE
function recipeContainIngredient (recipe, keyword) {
  return recipe.ingredients.some (ingredient =>
    ingredientContain (ingredient, keyword)
  );
}

function advancedIngredientSearch (recipe, activefilter) {
  console.log (
    String (recipe)
      .toLocaleLowerCase ()
      .includes (String (activefilter).toLocaleLowerCase ())
  );
  return String (recipe)
    .toLocaleLowerCase ()
    .includes (String (activefilter).toLocaleLowerCase ());
}
function advancedUstensilsSearch (recipe, activefilter) {}
function advancedAppareilsSearch (recipe, activefilter) {}

/////////////////////// FUNCTION DE RECHERCHE AVANCÉ ///////////

// .. PAR INGREDIENT //
function SearchByIngredient (ingredients, keyword) {
  return String (ingredients).toLowerCase ().includes (keyword);
}
function filterByIngredient (recipes) {
  const set = new Set ();
  recipes.map (element =>
    element.ingredients.map (element => {
      set.add (element.ingredient);
    })
  );

  ingredientSearch.addEventListener ('keyup', () => {
    const userInputIngredient = ingredientSearch.value.toLowerCase ();

    if (userInputIngredient.length == 0) {
      let ingredientDivSelector = document.querySelector (
        '.ingredient-list-div'
      );
      ingredientDivSelector.style.display = 'none';
    } else {
      ingredientDivSelector = document.querySelector ('.ingredient-list-div');
      const result = [...set].filter (ingredients =>
        SearchByIngredient (ingredients, userInputIngredient)
      );

      if (result.length == 0 || !result || userInputIngredient.length < 2) {
        ingredientDivSelector.style.display = 'none';
        isMenuOpen = false;
      } else {
        console.log ('ingredient match list creation');
        ingredientDivSelector.innerHTML = ' ';
        ingredientDivSelector.style.display = 'inline-flex';

        isMenuOpen = true;
        ingredientListCreator (result);
        tagAdd (recipes);
      }
    }
  });
}
// .. PAR APPAREIL //
function searchByAppareil (appareil, keyword) {
  return appareil.toLowerCase ().includes (keyword);
}
function filterByAppareil (recipes) {
  const set = new Set ();
  recipes.map (element => {
    set.add (element.appliance);
  });
  appareilSearch.addEventListener ('keyup', () => {
    const userInputappareil = appareilSearch.value.toLowerCase ();
    if (userInputappareil == 0) {
      appareilDiv.style.display = 'none';
    } else {
      const result = [...set].filter (appareil =>
        searchByAppareil (appareil, userInputappareil)
      );
      appareilDiv.innerHTML = ' ';
      appareilDiv.style.display = 'inline-flex';

      appareilListCreator (result);
      tagAdd (recipes);
      console.log (result);
    }
  });
}
// .. PAR USTENSILS //
function searchByUstensils (ustensil, keyword) {
  return String (ustensil).toLowerCase ().includes (keyword);
}
function filterByUstensils (recipes) {
  const set = new Set ();
  recipes.map (element => {
    element.ustensils.map (element => {
      set.add (element.toLowerCase ());
    });
  });

  ustensilSearch.addEventListener ('keyup', () => {
    const userInputUstensils = ustensilSearch.value.toLowerCase ();

    if (userInputUstensils == 0) {
      ustensilDiv.style.display = 'none';
    } else {
      const result = [...set].filter (ustensil =>
        searchByUstensils (ustensil, userInputUstensils)
      );
      ustensilDiv.innerHTML = ' ';
      ustensilDiv.style.display = 'inline-flex';
      ustensilListCreator (result);
      tagAdd (recipes);
    }
  });
}
////// TAG ADD /////
function tagAdd (recipes) {
  const SearchByLi = document.querySelectorAll ('li');
  const tagLine = document.querySelector ('.tag-add');
  const recipeMap = recipes.map (element => {
    return element.ingredients.map (element => element.ingredient);
  });

  SearchByLi.forEach (tag => {
    tag.addEventListener ('click', e => {
      if (
        tagIngredients.includes (e.target.textContent) ||
        tagAppareils.includes (e.target.textContent) ||
        tagAppareils.includes (e.target.textContent)
      ) {
        console.log ('deja la');
      } else {
        tagDiv = document.createElement ('div');
        tagDiv.classList = 'tagDiv';
        let closeCross = document.createElement ('img');
        closeCross.src = '/images/delete-item.png';
        closeCross.className = 'close-cross';
        const filterText = document.createElement ('p');
        filterText.className = 'item-tag';
        filterText.innerText = String (e.target.textContent);
        tagDiv.appendChild (filterText);
        tagDiv.appendChild (closeCross);

        if (e.target.className === 'appareil-li') {
          tagDiv.style.background = 'rgba(104, 217, 164, 1)';
          tagAppareils.push (e.target.textContent);
          tagLine.appendChild (tagDiv);
          console.log (tagAppareils);
        } else if (e.target.className === 'ustensil-li') {
          tagDiv.style.background = '#ed6454';
          tagUstensils.push (e.target.textContent);
          tagLine.appendChild (tagDiv);
          console.log (tagUstensils);
        } else if (e.target.className === 'ingredient-list') {
          tagDiv.style.background = '#3282F7';
          tagIngredients.push (e.target.textContent);
          tagLine.appendChild (tagDiv);
          console.log (tagIngredients);
        }

        const activedFilters = {
          ustensils: tagUstensils,
          ingredients: tagIngredients,
          appareils: tagAppareils,
        };

        const resultaIngredient = recipeMap.filter (element => {
          advancedIngredientSearch (element, activedFilters.ingredients);
        });
        recipesCardCreator(resultaIngredient)
      }

      document.querySelectorAll ('.close-cross').forEach (cross => {
        cross.addEventListener ('click', e => {
          e.target.parentNode.remove ();
          const tagFilterDelete = e.target.parentNode.textContent;
          tagAppareils = tagAppareils.filter (el => el !== tagFilterDelete);
          tagUstensils = tagUstensils.filter (el => el !== tagFilterDelete);
          tagIngredients = tagIngredients.filter (el => el !== tagFilterDelete);
          console.log ('ici les ingredient = ' + tagIngredients);
        });
      });
    });
  }); 
}

function openMenu () {
  arrow.forEach (arrowIcon => {
    arrowIcon.addEventListener ('click', e => {
      const next = e.target.nextElementSibling;
      if (isMenuOpen == true) {
        console.log (next);
        next.style.display = 'none';
        e.target.style.transform = 'rotate(180deg)';
        isMenuOpen = false;
      } else {
        next.style.display = 'inline-flex';
        isMenuOpen = true;
        e.target.style.transform = 'rotate(0deg)';
      }
    });
  });
}
/////
