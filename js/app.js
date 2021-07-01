fetch ('/js/recipes-list.json')
  .then (response => response.json ())
  .then (data => {
    recipesCardCreator (data.recipes);
    appareilListCreator (data.recipes);
	  ingredientListCreator (data.recipes);
    ustensilListCreator (data.recipes)
    MainFilter (data.recipes);
    filterByIngredient (data.recipes);
    filterByAppareil (data.recipes);
    filterByUstensils (data.recipes)
  });
/// CONSTANTES GLOBALES //
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
);

const ingredientDiv = document.createElement ('div');
const appareilDiv = document.createElement ('div');
const ustensilDiv = document.createElement ("div")
ingredientDiv.classList = 'ingredient-list-div';
let tagFilter = []



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
    const ul = document.createElement ('ul');
    ul.classList = 'ingredient-ul';
    const ingredientToItem = document.createElement ('li');
    ul.appendChild (ingredientToItem);
    ingredientToItem.className = 'ingredient-list';
    ingredientDiv.appendChild (ul);
    ingredientToItem.innerText = String(ingredientItem);

    if (ingredientItem.ingredients) {
      console.log("uuu");
      ingredientToItem.innerText = ingredientItem.ingredients;
/*       console.log("oki");
      ingredientItem.ingredients.map (element => {
        if (element.ingredient) {


        }
      }); */
    } 
  });
}
//*******CRÉER LISTE "PAR INGRÉDIENT" //
function appareilListCreator (recipes) {
	const appareilMenuList = document.querySelector (".search-by-appareil")
	appareilMenuList.appendChild(appareilDiv)

  recipes.map (element => {
		appareilDiv.classList = ("appareil-list-div")
		const newAppareilList = document.createElement("li")
		newAppareilList.classList = ("appareil-li")
		appareilDiv.appendChild(newAppareilList)
		newAppareilList.innerText = element;   
  });
}
function ustensilListCreator (recipes) {
	const ustensilMenuList = document.querySelector (".search-by-ustensil")
	ustensilMenuList.appendChild(ustensilDiv)

  recipes.map (element => {
		ustensilDiv.classList = ("ustensil-list-div")
		const newUstensilList = document.createElement("li")
		newUstensilList.classList = ("ustensil-li")
		ustensilDiv.appendChild(newUstensilList)
		newUstensilList.innerText = element; 
    
  });
}



/////////////////////// FUNCTION DE RECHERCHE PRINCIPALE ///////////

//*******MAIN SEARCH //
function MainFilter (recipes) {
  const recettes = recipes;
  // je récupère mes recettes //
  userInput.addEventListener ('keyup', () => {
    const userInputToLower = userInput.value.toLowerCase ();
    // à la saisie si l'entrée est supérieur à 3 caract alors je clear //
    if (userInputToLower.length >= 3) {
      mainContent.innerHTML = ' ';
    }
    // je retourne le resultat par filtre de l'entrée utilisateur parametre)
    const result = recettes.filter (recipe =>
      filterBySearch (recipe, userInputToLower)
    );
    // je créer la gallery avec le resultat //
    recipesCardCreator (result);

    if (result.length == 0) {
      mainContent.innerText =
        'Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc.';
    } else {
      mainContent.innerText = ' ';
      const result = recettes.filter (recipe =>
        filterBySearch (recipe, userInputToLower)
      );
      recipesCardCreator (result);
    }
  });
}
function filterBySearch (recipe, keyword) {
  return (
    /*    j'interroge mes fonction de recherche si elle contienne le titre 
    ou la description ou l'ingrédient correspondant à ma saisie */
    titleContain (recipe, keyword) ||
    descriptionContain (recipe, keyword) ||
    recipeContainIngredient (recipe, keyword)
  );
}
// .. PAR TITRE
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
function titleAndDescriptionContain (recipe, keyword) {
  return (
    titleContain (recipe, keyword) &&
    descriptionContain (recipe, keyword) &&
    recipeContainIngredient (recipe, keyword)
  );
}



/////////////////////// FUNCTION DE RECHERCHE AVANCÉ ///////////

// .. PAR INGREDIENT //
function SearchByIngredient (ingredients, keyword) {
  return String (ingredients).toLowerCase ().includes (keyword);
}
function filterByIngredient (recipes) {
  const set = new Set ();
  recipes.map (element =>
    element.ingredients.map (element => {
     set.add(element.ingredient) 
     ;
    })
  );


  ingredientSearch.addEventListener ('keyup', () => {
    const userInputIngredient = ingredientSearch.value.toLowerCase ();

    if (userInputIngredient.length == 0) {
      let ingredientDivSelector = document.querySelector (
        '.ingredient-list-div'
      );
      ingredientDivSelector.style.display = 'none';
      console.log ('ingredient list clear');
    } else {
      ingredientDivSelector = document.querySelector ('.ingredient-list-div');
      const result = [...set].filter (ingredients =>
        SearchByIngredient (ingredients, userInputIngredient)
      );
        console.log(result);
        console.log(new Set (result))
      if (result.length == 0 || !result || userInputIngredient.length < 2) {
        ingredientDivSelector.style.display = 'none';
      } else {
        console.log ('ingredient match list creation');
        ingredientDivSelector.innerHTML = ' ';
        ingredientDivSelector.style.display = 'inline-flex';
        ingredientListCreator (result);
        console.log(result);
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
    set.add(element.appliance);
    ;
  });

  appareilSearch.addEventListener ('keyup', () => {
    const userInputappareil = appareilSearch.value.toLowerCase ();

	if (userInputappareil == 0) {
		appareilDiv.style.display = "none"
	} else {
		const result = [...set].filter (appareil =>
			searchByAppareil (appareil, userInputappareil)
		  );
		  appareilDiv.innerHTML = " ";
		  appareilDiv.style.display = "inline-flex"

		  appareilListCreator (result);
      console.log(result);

	}

  
  });
}
// .. PAR USTENSILS //
function searchByUstensils (ustensil, keyword) {
  return String(ustensil).toLowerCase ().includes (keyword);
}
function filterByUstensils (recipes) {
  const set = new Set ();
  recipes.map (element => {
    element.ustensils.map(element => {
      set.add(element)
  });
  })


  ustensilSearch.addEventListener ('keyup', () => {
    const userInputUstensils = ustensilSearch.value.toLowerCase ();

	if (userInputUstensils == 0) {
		ustensilDiv.style.display = "none"
	}  else {
		const result = [...set].filter (ustensil =>
		 	searchByUstensils (ustensil, userInputUstensils) 
		  );
      console.log(result)
		  ustensilDiv.innerHTML = " ";
		  ustensilDiv.style.display = "inline-flex"
		  ustensilListCreator (result);
      tagAdd()

      console.log(result);
	}  

  
  });
}


////// TAG ADD /////
function tagAdd () {
  const searchTagUstensil = document.querySelectorAll(".ustensil-li")
  const tagLine = document.querySelector(".tag-add")
  let tagDiv;

  searchTagUstensil.forEach(tag => {
    tag.addEventListener("click", (e) => {
      if (tagFilter.includes(e.target.textContent)){
        console.log("tag déjà ajouté");
      } else {
      tagDiv = document.createElement("div")
      tagDiv.classList = "tagDiv"
      tagLine.appendChild(tagDiv)
      tagDiv.innerText = String(e.target.textContent)
      tagFilter.push(e.target.textContent)
      console.log(tagFilter);
      } 

      tagDiv.addEventListener("click" ,(e) => {
        e.target.remove()
        const tagFilterDelete = e.target.textContent
        tagFilter = tagFilter.filter(el => el !== tagFilterDelete)
        console.log(tagFilter);

        })
      })
    
  
});



}




function MenuOpen () {
  document.querySelector(".arrow").addEventListener("click", () => {
    
  })
}
MenuOpen()

