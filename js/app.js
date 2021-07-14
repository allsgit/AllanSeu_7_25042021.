fetch('/js/recipes-list.json')
    .then(response => response.json())
    .then(data => {
        recipesCardCreator(data.recipes);
        appareilListCreator(data.recipes);
        ingredientListCreator(data.recipes);
        ustensilListCreator(data.recipes);
        MainFilter(data.recipes);
        filterByIngredient(data.recipes);
        filterByAppareil(data.recipes);
        filterByUstensils(data.recipes);
        tagAdd(data.recipes);
        openMenu()

    });

/// CONSTANTES GLOBALES ///
const mainContent = document.querySelector('main');
let userInput = document.querySelector('.search-bar-main');
const ingredientSearch = document.querySelector(
    '.advanced-input-search-ingredient'
);
const appareilSearch = document.querySelector(
    '.advanced-input-search-appareils'
);
const ustensilSearch = document.querySelector(
    '.advanced-input-search-ustensils'
); ////
const ingredientDiv = document.createElement('div');
const appareilDiv = document.createElement('div');
const ustensilDiv = document.createElement('div');
ingredientDiv.classList = 'ingredient-list-div';
const arrow = document.querySelectorAll('.arrow');

let tagFilter = [];
let tagUstensils = [];
let tagIngredients = [];
let tagAppareils = [];
let searchMain = [];
let isMenuOpen;
//
/////////////////////// CREATEUR DE CONTENU //

//*******CRÉER CARTES RECETTES
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

///
/////////////////////// FUNCTION DE RECHERCHE PRINCIPALE ///////////

//*******MAIN SEARCH //
function MainFilter(recipes) {
    const recettes = recipes;
    userInput.addEventListener('keyup', () => {
        const userInputToLower = userInput.value.toLowerCase();
        if (userInputToLower.length >= 3) {
            mainContent.innerHTML = ' ';
        }
        const result = recettes.filter(recipe =>
            filterBySearch(recipe, userInputToLower)
        );
        recipesCardCreator(result);
        if (result.length == 0) {
            mainContent.innerText =
                'Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc.';
        } else {
            mainContent.innerText = ' ';

            recipesCardCreator(searchRecipesWithTag(recipes, userInputToLower, tagIngredients, tagUstensils, tagAppareils));
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
    return recipe.ingredients.some(ingredient =>
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

/**
 * FONCTION DE RECHERCHE INGREDIENT DANS LISTE INGREDIENT/USTENSILS/APAREIL
 */

// .. PAR INGREDIENT //
function SearchByIngredient(ingredients, keyword) {
    return String (ingredients).includes(String(keyword));
}

function filterByIngredient(recipes) {
    const set = new Set();
    recipes.map(element =>
        element.ingredients.map(element => {
            set.add(element.ingredient.toLowerCase());
        })
    );
    let ingredientDivSelector = document.querySelector(
        '.ingredient-list-div'
    );

    ingredientSearch.addEventListener('keyup', () => {
        const userInputIngredient = ingredientSearch.value.toLowerCase();

        if (userInputIngredient.length == 0) {

            ingredientDivSelector.style.display = 'none'; 

        } else {
            ingredientDivSelector = document.querySelector('.ingredient-list-div');
            const result = [...set].filter(ingredients =>
                SearchByIngredient(ingredients, userInputIngredient)
            );
            if (result.length == 0) {
                ingredientDivSelector.style.display = 'none';
                isMenuOpen = false;
            } else {
                console.log('ingredient match list creation');
                ingredientDivSelector.innerHTML = ' ';
                ingredientDivSelector.style.display = 'inline-flex';

                isMenuOpen = true;
                ingredientListCreator(result);

                tagAdd(recipes);
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
    recipes.map(element => {
        set.add(element.appliance);
    });
    appareilSearch.addEventListener('keyup', () => {
        const userInputappareil = appareilSearch.value.toLowerCase();
        if (userInputappareil == 0) {
            appareilDiv.style.display = 'none';
        } else {
            const result = [...set].filter(appareil =>
                searchByAppareil(appareil, userInputappareil)
            );
            appareilDiv.innerHTML = ' ';
            appareilDiv.style.display = 'inline-flex';
            appareilListCreator(result);
            tagAdd(recipes);
        }
    });
}
// .. PAR USTENSILS //
function searchByUstensils(ustensil, keyword) {
    return String(ustensil).toLowerCase().includes(keyword);
}

function filterByUstensils(recipes) {
    const set = new Set();
    recipes.map(element => {
        element.ustensils.map(element => {
            set.add(element.toLowerCase());
        });
    });

    ustensilSearch.addEventListener('keyup', () => {
        const userInputUstensils = ustensilSearch.value.toLowerCase();
        if (userInputUstensils == 0) {
            ustensilDiv.style.display = 'none';
        } else {
            const result = [...set].filter(ustensil =>
                searchByUstensils(ustensil, userInputUstensils)
            );
            ustensilDiv.innerHTML = ' ';
            ustensilDiv.style.display = 'inline-flex';
            ustensilListCreator(result);
            tagAdd(recipes);
        }
    });
}

//*******CRÉER LISTE "PAR INGRÉDIENT" //
function ingredientListCreator(recipes) {
    const ingredientMenuList = document.querySelector('.search-by-ingredient');
    ingredientMenuList.appendChild(ingredientDiv);
    recipes.map(ingredientItem => {
        const ingredientToItem = document.createElement('li');
        ingredientToItem.className = 'ingredient-list';
        ingredientDiv.appendChild(ingredientToItem);
        ingredientToItem.innerText = ingredientItem;
    

        if (ingredientItem.ingredients) {
            ingredientToItem.innerText = ingredientItem.ingredients;
        } //
    });
}

function appareilListCreator(recipes) {
    const appareilMenuList = document.querySelector('.search-by-appareil');
    appareilMenuList.appendChild(appareilDiv);

    recipes.map(element => {
        appareilDiv.classList = 'appareil-list-div';
        const newAppareilList = document.createElement('li');
        newAppareilList.classList = 'appareil-li';
        appareilDiv.appendChild(newAppareilList);
        newAppareilList.innerText = element;
    });
}

function ustensilListCreator(recipes) {
    const ustensilMenuList = document.querySelector('.search-by-ustensil');
    ustensilMenuList.appendChild(ustensilDiv);

    recipes.map(element => {
        ustensilDiv.classList = 'ustensil-list-div';
        const newUstensilList = document.createElement('li');
        newUstensilList.classList = 'ustensil-li';
        ustensilDiv.appendChild(newUstensilList);
        newUstensilList.innerText = element;
    });
}

/**
 * FONCTION DE RECHERCHE AVANCÉ PAR TAG INGREDIENT/APPAREIL/USTENSIL
 */

function AdvancSearchIngredients(recipe, tag) {
    const recipeMap = recipe.ingredients.map(element => element.ingredient.toLowerCase());
    return tag.every(element => recipeMap.includes(element))
}

function AdvancSearchUstensils(recipe, tag) {
    return tag.every(element => recipe.ustensils.includes(element))
}

function AdvancSearchAppareils(recipe, tag) {
    return tag.length == 0 || (tag.length == 1 && tag[0] == recipe.appliance); // bloquer fonction ajout + de 1 tag appliance //
}

function searchRecipesWithTag(recipes, userInputToLower, tagIngredients, tagUstensils, tagAppareils) {
    const mainFilter = recipes.filter(recipe => filterBySearch(recipe, userInputToLower));
    const recipesIngredient = mainFilter.filter(element => AdvancSearchIngredients(element, tagIngredients))
    const recipesUstensils = recipesIngredient.filter(element => AdvancSearchUstensils(element, tagUstensils))
   /*  const recipesAppareils = recipesUstensils.filter(element => AdvancSearchAppareils(element, tagAppareils)) */
    const recipiesToDisplay = recipes.filter(element => recipesIngredient.includes(element) &&
        recipesUstensils.includes(element) && mainFilter.includes(element)/* recipesAppareils.includes(element) */);
    return recipiesToDisplay
}

/**
 * FONCTION AJOUT DE TAG
 */
function tagAdd(recipes) {
    const SearchByLi = document.querySelectorAll('li');
    const tagLine = document.querySelector('.tag-add');

    SearchByLi.forEach(tag => {
        tag.addEventListener('click', e => {
            if (
                tagIngredients.includes(e.target.textContent) ||
                tagAppareils.includes(e.target.textContent) ||
                tagUstensils.includes(e.target.textContent)
            ) {
                console.log('tag déjà utilisé');
                if (tagUstensils.length == 1) {
                    console.log("ne peux pas ajouter + de 1 ustensil")
                }
            } else {
                tagDiv = document.createElement('div');
                tagDiv.classList = 'tagDiv';
                let closeCross = document.createElement('img');
                closeCross.src = '/images/delete-item.png';
                closeCross.className = 'close-cross';
                const filterText = document.createElement('p');
                filterText.className = 'item-tag';
                filterText.innerText = String(e.target.textContent);
                tagDiv.appendChild(filterText);
                tagDiv.appendChild(closeCross);
                if (e.target.className === 'appareil-li') {
                    tagDiv.style.background = 'rgba(104, 217, 164, 1)';
                    tagAppareils.push(e.target.textContent);
                    tagLine.appendChild(tagDiv);
                 
                } else if (e.target.className === 'ustensil-li') {
                    tagDiv.style.background = '#ed6454';
                    tagUstensils.push(e.target.textContent);
                    tagLine.appendChild(tagDiv);
             
                } else if (e.target.className === 'ingredient-list') {
                    tagDiv.style.background = '#3282F7';
                    tagIngredients.push(e.target.textContent.toLowerCase());
                    tagLine.appendChild(tagDiv);
         
                }
                mainContent.innerHTML = ' ';
                recipesCardCreator(searchRecipesWithTag(recipes, tagIngredients, tagUstensils, tagAppareils))
            }

            document.querySelectorAll('.close-cross').forEach(cross => {
                cross.addEventListener('click', e => {
                    e.target.parentNode.remove();
                    const tagFilterDelete = e.target.parentNode.textContent;
                    tagAppareils = tagAppareils.filter(el => el !== tagFilterDelete);
                    tagUstensils = tagUstensils.filter(el => el !== tagFilterDelete);
                    tagIngredients = tagIngredients.filter(el => el !== tagFilterDelete);
                    mainContent.innerHTML = ' ';
                    recipesCardCreator(searchRecipesWithTag(recipes, tagIngredients, tagUstensils, tagAppareils))

                });
            });
        });
    });
}
/**
 * FERMER OUVRIR MENU RECHERCHE AVANCÉ
 */
function openMenu() {
    arrow.forEach(arrowIcon => {
        arrowIcon.addEventListener('click', e => {
            const next = e.target.nextElementSibling;
            if (isMenuOpen == true) {
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