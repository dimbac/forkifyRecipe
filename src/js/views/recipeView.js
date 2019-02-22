import {elements} from './base';
//import {Fraction} from 'fractional';
import Fraction from 'fraction.js';


export const clearRecipe = () => {
    elements.recipe.innerHTML = '';
};

const formatCount = (count) => {
    /* if(count){
        const [int, dec] = count.toString().split('.').map( el => parseInt(el, 10)); //it will find string with '.' then split and as new array using map() with function parseInt

        if(!dec) return count; //if no decimal, ex: 2 remain 2  , --> simply return count

        if(int === 0){ 
            // 0.5 --> 'int' is 0, 'dec' is 5
            const fr = new Fraction(count);
            return `${fr.numerator}/${fr.denominator}`; // 1 = numerator / 2 = denominator --> '1/2'
        }else{ 
            // 2.5
            const fr = new Fraction(count - int); // 2.5-2 --> 0.5 --> 5/10 --> 1/2
            return `${int} ${fr.numerator}/${fr.denominator}`; 
        }
    }
    return '?'; */

    if(count){
        const num = new Fraction(count).simplify(0.00001);
        return num.toFraction(true);
    }
    return '?';
};

const createIngredient = ingredient => `
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${formatCount(ingredient.count)}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ingredient.unit}</span>
            ${ingredient.ingredient}
        </div>
    </li>

`;

export const renderRecipe = recipe =>{
    const markup = `
            <figure class="recipe__fig">
                <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
                <h1 class="recipe__title">
                    <span>${recipe.title}</span>
                </h1>
            </figure>
            <div class="recipe__details">
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-stopwatch"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                    <span class="recipe__info-text"> minutes</span>
                </div>
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-man"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                    <span class="recipe__info-text"> servings</span>

                    <div class="recipe__info-buttons">
                        <button class="btn-tiny btn-decrease">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button class="btn-tiny btn-increase">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>

                </div>
                <button class="recipe__love">
                    <svg class="header__likes">
                        <use href="img/icons.svg#icon-heart-outlined"></use>
                    </svg>
                </button>
            </div>

            <div class="recipe__ingredients">
                <ul class="recipe__ingredient-list">
                    ${recipe.ingredients.map(el => createIngredient(el)).join('')} 
                    
                </ul>

                <button class="btn-small recipe__btn recipe__btn--add">
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-shopping-cart"></use>
                    </svg>
                    <span>Add to shopping list</span>
                </button>
            </div>

            <div class="recipe__directions">
                <h2 class="heading-2">How to cook it</h2>
                <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
                </p>
                <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
                    <span>Directions</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>

                </a>
            </div>
    `;
    elements.recipe.insertAdjacentHTML('afterbegin', markup);
};

export const updateServingsIngredients = recipe => {
    //update servings
    document.querySelector('.recipe__info-data--people').textContent = recipe.servings;

    //update ingredients
    const countElements = Array.from(document.querySelectorAll('.recipe__count'));
    countElements.forEach((el, i) => {
        el.textContent = formatCount(recipe.ingredients[i].count);
    })

}