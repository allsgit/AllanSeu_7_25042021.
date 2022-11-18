fetch("/js/recipes-list.json")
  .then((response) => response.json())
  .then((data) => {
    recipesCardCreator(data.recipes);
    appareilListCreator(data.recipes);
    ingredientListCreator(data.recipes);
    ustensilListCreator(data.recipes);
    filterByIngredient(data.recipes);
    filterByAppareil(data.recipes);
    filterByUstensils(data.recipes);
    tagAdd(data.recipes);
    openMenu();
    MainAlgoTwo(data.recipes);
  });

/// CONSTANTES GLOBALES ///
const mainContent = document.querySelector("main");
let userInput = document.querySelector(".search-bar-main");
const ingredientSearch = document.querySelector(
  ".advanced-input-search-ingredient"
);
const userInputIngredient = ingredientSearch.value.toLowerCase();
const appareilSearch = document.querySelector(
  ".advanced-input-search-appareils"
);
const userInputappareil = appareilSearch.value.toLowerCase();
const ustensilSearch = document.querySelector(
  ".advanced-input-search-ustensils"
);
const ingredientDiv = document.createElement("div");
const appareilDiv = document.createElement("div");
const ustensilDiv = document.createElement("div");
ingredientDiv.classList = "ingredient-list-div";
const arrow = document.querySelectorAll(".arrow");

let tagFilter = [];
let tagUstensils = [];
let tagIngredients = [];
let tagAppareils = [];
let searchMain = [];
let isMenuOpen;

//**************CRÉER CARTES RECETTES**************//
function recipesCardCreator(recipes) {
  recipes.map((recipeItem) => {
    const recipesCard = document.createElement("section");
    const recipesDescription = document.createElement("div");
    const recipesImg = document.createElement("div");
    const recipesTitlte = document.createElement("h2");
    const ingredientList = document.createElement("ul");
    const recipesProcess = document.createElement("p");
    const recipesTime = document.createElement("p");
    const timerIcon = document.createElement("img");

    recipesImg.classList = "recette-img";
    recipesCard.classList = "recette";
    recipesDescription.classList = "recette-description";
    recipesTitlte.classList = "recette-title";
    ingredientList.classList = "ingredient-list";
    recipesProcess.classList = "process";

    recipesTime.classList = "time-to";
    timerIcon.classList = "timer";

    mainContent.appendChild(recipesCard);
    recipesCard.appendChild(recipesImg);
    recipesCard.appendChild(recipesDescription);
    recipesDescription.appendChild(recipesTitlte);
    recipesDescription.appendChild(ingredientList);
    recipesDescription.appendChild(recipesProcess);
    recipesDescription.appendChild(recipesTime);
    recipesDescription.appendChild(timerIcon);
    if (recipeItem.ingredients) {
      recipeItem.ingredients.map((element) => {
        const ingredientType = document.createElement("li");
        const ingredientQuantity = document.createElement("p");

        if (element.ingredient) {
          ingredientType.classList = "ingredient-type";
          ingredientList.appendChild(ingredientType);
          ingredientType.innerText = element.ingredient;
        }
        if (element.quantity) {
          ingredientQuantity.classList = "quantity";
          ingredientType.appendChild(ingredientQuantity);
          ingredientQuantity.innerText = element.quantity;
        }
        if (element.unit) {
          ingredientQuantity.innerText = element.quantity + " " + element.unit;
        }
      });
    }

    recipesTitlte.innerText = `${recipeItem.name}`;
    recipesProcess.innerText = `${recipeItem.description}`;
    recipesTime.innerText = `${recipeItem.time}min`;
    timerIcon.src = "../images/timer.png";
  });
}
//**************CRÉER LISTE RECHERCHE AVANCÉ **************//
function ingredientListCreator(recipes) {
  const ingredientMenuList = document.querySelector(".search-by-ingredient");
  ingredientMenuList.appendChild(ingredientDiv);

  recipes.map((element) => {
    const ingredientToItem = document.createElement("li");
    ingredientToItem.className = "ingredient-list";
    ingredientDiv.appendChild(ingredientToItem);
    ingredientToItem.innerText = element;
  });
}
function appareilListCreator(recipes) {
  const appareilMenuList = document.querySelector(".search-by-appareil");
  appareilMenuList.appendChild(appareilDiv);

  recipes.map((element) => {
    appareilDiv.classList = "appareil-list-div";
    const newAppareilList = document.createElement("li");
    newAppareilList.classList = "appareil-li";
    appareilDiv.appendChild(newAppareilList);
    newAppareilList.innerText = element;
  });
}
function ustensilListCreator(recipes) {
  const ustensilMenuList = document.querySelector(".search-by-ustensil");
  ustensilMenuList.appendChild(ustensilDiv);

  recipes.map((element) => {
    ustensilDiv.classList = "ustensil-list-div";
    const newUstensilList = document.createElement("li");
    newUstensilList.classList = "ustensil-li";
    ustensilDiv.appendChild(newUstensilList);
    newUstensilList.innerText = element;
  });
}

//**************MAIN SEARCH **************//

function MainAlgoTwo(recipes) {
  userInput.addEventListener("keyup", () => {
    const resultRecipes = [];
    const userInputToLower = userInput.value.toLowerCase();

    if (userInputToLower.length < 1) {
      mainContent.innerText = " ";
      recipesCardCreator(recipes);
    } else if (userInputToLower.length > 1) {
      for (let i = 0; i < recipes.length; i++) {
        for (let j = 0; j < recipes[i].ingredients.length; j++) {
          if (
            recipes[i].ingredients[j].ingredient
              .toLowerCase()
              .includes(userInputToLower)
          ) {
            resultRecipes.push(recipes[i]);
          }
          if (recipes[i].name.toLowerCase().includes(userInputToLower)) {
            resultRecipes.push(recipes[i]);
          }
          if (recipes[i].description.toLowerCase().includes(userInputToLower)) {
            resultRecipes.push(recipes[i]);
          }
        }
      }

      if (resultRecipes.length === 0) {
        mainContent.innerText =
          "Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc.";
        console.log(mainContent);
      } else {
        mainContent.innerText = " ";
        const setResultRecipes = new Set(resultRecipes);
        console.log(new Set(resultRecipes));

        recipesCardCreator(
          searchRecipesWithTag(
            [...setResultRecipes],
            userInputToLower,
            tagIngredients,
            tagUstensils,
            tagAppareils
          )
        );
        filterByIngredient([...setResultRecipes]);
        filterByAppareil([...setResultRecipes]);
        filterByUstensils([...setResultRecipes]);
        tagAdd(recipes);
      }
    }
  });
}
function filterBySearch(recipe, keyword) {
  return (
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
// .. RECHERCHE CONTIENT DESCRIPTION OU INGREDIENT OU TITRE
function recipeContainIngredient(recipe, keyword) {
  return recipe.ingredients.some((ingredient) =>
    ingredientContain(ingredient, keyword)
  );
}
function titleAndDescriptionContain(recipe, keyword) {
  return (
    titleContain(recipe, keyword) &&
    descriptionContain(recipe, keyword) &&
    recipeContainIngredient(recipe, keyword) &&
    AdvancSearchIngredients(recipes, ingredient)
  );
}
//**********FONCTION DE RECHERCHE AVANCÉ PAR TAG INGREDIENT/APPAREIL/USTENSIL
function searchRecipesWithTag(
  recipes,
  userInputToLower,
  tagUstensils,
  tagAppareils
) {
  const mainFilter = recipes.filter((recipe) =>
    filterBySearch(recipe, userInputToLower)
  );
  const recipesIngredient = mainFilter.filter((element) =>
    AdvancSearchIngredients(element, tagIngredients)
  );
  const recipesUstensils = recipesIngredient.filter((element) =>
    AdvancSearchUstensils(element, tagUstensils)
  );
  const recipesAppareils = recipesUstensils.filter((element) =>
    AdvancSearchAppareils(element, tagAppareils)
  );
  const recipiesToDisplay = recipes.filter(
    (element) =>
      recipesIngredient.includes(element) &&
      recipesUstensils.includes(element) &&
      recipesAppareils.includes(element)
  );
  return recipiesToDisplay;
}

//**************FONCTION DE RECHERCHE AVANCÉ INGREDIENT/USTENSILS/APAREIL **************++

// .. PAR INGREDIENT //
function SearchByIngredient(ingredients, keyword) {
  return String(ingredients).includes(String(keyword));
}
function filterByIngredient(recipes) {
  const set = new Set();
  recipes.map((element) =>
    element.ingredients.map((element) => {
      set.add(element.ingredient.toLowerCase());
    })
  );

  let ingredientDivSelector = document.querySelector(".ingredient-list-div");
  ingredientDivSelector.innerHTML = " ";
  const result = [...set].filter((ingredients) =>
    SearchByIngredient(ingredients, userInputIngredient)
  );
  ingredientListCreator(result);

  ingredientSearch.addEventListener("keyup", () => {
    const userInputIngredient = ingredientSearch.value.toLowerCase();

    if (ingredientSearch.value.length > 0) {
      if (userInputIngredient.length == 0) {
        ingredientDivSelector.style.display = "none";
      } else {
        ingredientDivSelector = document.querySelector(".ingredient-list-div");
        const result = [...set].filter((ingredients) =>
          SearchByIngredient(ingredients, userInputIngredient)
        );

        if (result.length == 0) {
          ingredientDivSelector.style.display = "none";
          isMenuOpen = false;
        } else {
          ingredientDivSelector.innerHTML = " ";
          ingredientDivSelector.style.display = "inline-flex";

          isMenuOpen = true;
          ingredientListCreator(result);
          tagAdd(recipes);
        }
      }
    }
  });
}
// .. PAR APPAREIL //
function searchByAppareil(appareil, keyword) {
  return appareil.toLowerCase().includes(keyword);
}
function filterByAppareil(recipes) {
  const set = new Set();
  recipes.map((element) => {
    set.add(element.appliance);
  });
  appareilDiv.innerHTML = " ";
  const result1 = [...set].filter((appareil) =>
    searchByAppareil(appareil, userInputappareil)
  );
  appareilListCreator(result1);

  appareilSearch.addEventListener("keyup", () => {
    if (appareilSearch.value.length > 0) {
      const userInputappareil = appareilSearch.value.toLowerCase();
      if (userInputappareil == 0) {
        appareilDiv.style.display = "none";
        isMenuOpen = false;
      } else {
        const result = [...set].filter((appareil) =>
          searchByAppareil(appareil, userInputappareil)
        );
        isMenuOpen = true;
        appareilDiv.innerHTML = " ";
        appareilDiv.style.display = "inline-flex";
        appareilListCreator(result);
        tagAdd(recipes);
      }
    }
  });
}
// .. PAR USTENSILS //
function searchByUstensils(ustensil, keyword) {
  return String(ustensil).toLowerCase().includes(keyword);
}
function filterByUstensils(recipes) {
  const userInputUstensils = ustensilSearch.value.toLowerCase();

  const set = new Set();
  recipes.map((element) => {
    element.ustensils.map((element) => {
      set.add(element.toLowerCase());
    });
  });
  ustensilDiv.innerHTML = " ";
  const result = [...set].filter((ustensil) =>
    searchByUstensils(ustensil, userInputUstensils)
  );
  ustensilListCreator(result);

  ustensilSearch.addEventListener("keyup", () => {
    const userInputUstensils = ustensilSearch.value.toLowerCase();
    if (userInputUstensils == 0) {
      ustensilDiv.style.display = "none";
    } else {
      const result = [...set].filter((ustensil) =>
        searchByUstensils(ustensil, userInputUstensils)
      );
      ustensilDiv.innerHTML = " ";
      ustensilDiv.style.display = "inline-flex";
      ustensilListCreator(result);
      tagAdd(recipes);
    }
  });
}

//***************FONCTION AJOUT DE TAG**************//

function tagAdd(recipes) {
  const SearchByLi = document.querySelectorAll("li");
  const tagLine = document.querySelector(".tag-add");

  SearchByLi.forEach((tag) => {
    tag.addEventListener("click", (e) => {
      if (
        tagIngredients.includes(e.target.textContent) ||
        tagAppareils.includes(e.target.textContent) ||
        tagUstensils.includes(e.target.textContent)
      ) {
        console.log("tag déjà utilisé");
        if (tagUstensils.length == 1) {
        }
      } else {
        tagDiv = document.createElement("div");
        tagDiv.classList = "tagDiv";
        let closeCross = document.createElement("img");
        closeCross.src = "../images/delete-item.png";
        closeCross.className = "close-cross";
        const filterText = document.createElement("p");
        filterText.className = "item-tag";
        filterText.innerText = String(e.target.textContent);
        tagDiv.appendChild(filterText);
        tagDiv.appendChild(closeCross);
        if (e.target.className === "appareil-li") {
          tagDiv.style.background = "rgba(104, 217, 164, 1)";
          tagAppareils.push(e.target.textContent);
          tagLine.appendChild(tagDiv);
        } else if (e.target.className === "ustensil-li") {
          tagDiv.style.background = "#ed6454";
          tagUstensils.push(e.target.textContent.toLowerCase());
          tagLine.appendChild(tagDiv);
        } else if (e.target.className === "ingredient-list") {
          tagDiv.style.background = "#3282F7";
          tagIngredients.push(e.target.textContent.toLowerCase());
          tagLine.appendChild(tagDiv);
        }
        mainContent.innerHTML = " ";
        recipesCardCreator(
          searchRecipesWithTag(
            recipes,
            tagIngredients,
            tagUstensils,
            tagAppareils
          )
        );
      }

      document.querySelectorAll(".close-cross").forEach((cross) => {
        cross.addEventListener("click", (e) => {
          e.target.parentNode.remove();
          const tagFilterDelete = e.target.parentNode.textContent;
          tagAppareils = tagAppareils.filter((el) => el !== tagFilterDelete);
          tagUstensils = tagUstensils.filter((el) => el !== tagFilterDelete);
          tagIngredients = tagIngredients.filter(
            (el) => el !== tagFilterDelete
          );
          mainContent.innerHTML = " ";
          recipesCardCreator(
            searchRecipesWithTag(
              recipes,
              tagIngredients,
              tagUstensils,
              tagAppareils
            )
          );
        });
      });
    });
  });
}
// .. GESTION DE RECHERCHE PAR AJOUT DE TAG

function AdvancSearchIngredients(recipe, tag) {
  const recipeMap = recipe.ingredients.map((element) =>
    element.ingredient.toLowerCase()
  );
  return tag.every((element) => recipeMap.includes(element));
}
function AdvancSearchUstensils(recipe, tag) {
  const recipeMap = recipe.ustensils.map((element) => element.toLowerCase());

  return tag.every((element) => recipeMap.includes(element.toLowerCase()));
}
function AdvancSearchAppareils(recipe, tag) {
  return tag.length == 0 || (tag.length == 1 && tag[0] == recipe.appliance); // bloquer fonction ajout + de 1 tag appliance //
}
/**
 * FERMER OUVRIR MENU RECHERCHE AVANCÉ
 */
function openMenu() {
  let lastClicked = [];
  arrow.forEach((arrowIcon) => {
    if (lastClicked.length == 0) {
      arrowIcon.addEventListener("click", (e) => {
        const next = e.target.nextElementSibling;
        if (isMenuOpen == true) {
          lastClicked = [];
          next.style.display = "none";
          e.target.style.transform = "rotate(0deg)";
          isMenuOpen = false;
        } else {
          lastClicked.push(next.className);
          next.style.display = "inline-flex";
          isMenuOpen = true;
          e.target.style.transform = "rotate(180deg)";
        }
      });
    }
  });
}
