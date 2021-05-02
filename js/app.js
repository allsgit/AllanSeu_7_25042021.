fetch('/js/recipes-list.json')
	.then((response) => response.json())
	.then((data) => {
		recipesCardCreator(data.recipes)
		filterby(data.recipes)
	});

	const mainContent = document.querySelector("main");


	function recipesCardCreator (recipes) {
		recipes.map(element => {
	
			const recipesCard = document.createElement("section");
			const recipesDescription = document.createElement("div");
			const recipesImg = document.createElement ("div");
			const recipesTitlte = document.createElement("h2");
			const ingredientList = document.createElement ("ul")
			const recipesProcess = document.createElement ("p")
			const recipesTime = document.createElement ("p")
			const timerIcon = document.createElement ("img")

			recipesImg.classList = ("recette-img")
			recipesCard.classList = ("recette");
			recipesDescription.classList = ("recette-description")
			recipesTitlte.classList =("recette-title")
			ingredientList.classList =("ingredient-list")
			recipesProcess.classList =("process")
			
			recipesTime.classList = ("time-to")
			timerIcon.classList = ("timer")


			mainContent.appendChild(recipesCard);
			recipesCard.appendChild(recipesImg);
			recipesCard.appendChild(recipesDescription);
			recipesDescription.appendChild(recipesTitlte);
			recipesDescription.appendChild(ingredientList);
			recipesDescription.appendChild(recipesProcess);
			recipesDescription.appendChild(recipesTime);
			recipesDescription.appendChild(timerIcon);

			

			const ingredientTypeArray = element.ingredients.map(element =>{
				const ingredientType = document.createElement ("li")
				const ingredientQuantity = document.createElement ("p")

					if (element.ingredient) {
						
						ingredientType.classList =("ingredient-type")
						ingredientList.appendChild(ingredientType)
						ingredientType.innerText = element.ingredient;
						
					} if (element.quantity){
						
						ingredientQuantity.classList =("quantity")
						ingredientType.appendChild(ingredientQuantity);
						ingredientQuantity.innerText = element.quantity;

					} if (element.unit) {
						ingredientQuantity.innerText = element.quantity + " " + element.unit;
					}
				
					
				
				return element
				
			} )




			recipesTitlte.innerText = `${element.name}`;
			recipesProcess.innerText = `${element.description}`
			recipesTime.innerText = `${element.time}min`;
			timerIcon.src = "/images/timer.png"

		})
	}

	function filterby (recipes) {
		recipes.map(element => {
			const userInput = document.querySelector (".search-bar-main")

	
				userInput.addEventListener("input", () => {
					if (!userInput.value.length) {
						recipesCardCreator (recipes)
					} else {
						mainContent.innerHTML = " ";	
					};
				if (userInput.value.match(element.name)) {
					console.log("cocorico");
	
				}})
				
				
			
				
	
	
			})
		}
		