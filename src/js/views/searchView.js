import {elements} from './base';


export const getInput = () => elements.searchInput.value; //it will return value to const getInput

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResult = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

/*  'pasta with tomato and spinach'       
    cur.length is 5 because split method, it will search until string space then split
              0 + 5
    acc: 0/ acc + cur.length = 5 / ['pasta']
    acc: 5/ acc + cur.length = 9 / ['pasta', 'with]
    acc: 9/ acc + cur.length = 15 / ['pasta', 'with, 'tomato']
    acc: 15/ acc + cur.length = 18 / ['pasta', 'with, 'tomato'] / it more than limit, so it will not push
    acc: 18/ acc + cur.length = 24 / ['pasta', 'with, 'tomato']

*/
const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if(title.length > limit){
        title.split(' ').reduce((acc, cur) => {
            if(acc + cur.length <= limit){
                //if its still under or equal of the limit, then we push to new array
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        return `${newTitle.join(' ')}...`; //return the result, then join with string ...)
    }
    return title;
};

const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

//we must pass number of page so we can print that number to interface. and also type for next and back button
const createButton = (page, type) => `

    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page -1 : page + 1}>
        <span>Page ${type === 'prev' ? page -1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

const renderButtons = (page, numResults, resPerpage) => {
    const pages = Math.ceil(numResults / resPerpage); //ex: if we have 30 pages, each page have 10 result, 30/10 = 3 
    let button;

    if(page === 1 && pages > 1){
        //button to go to next page
        button = createButton(page, 'next');
    }else if (page < pages){
        //both buttons
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    }else if(page === pages && pages > 1){
        //button to go to prev page
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button)
};

export const renderResults = (recipes, page = 1, resPerpage = 10) => {
    //render results of current page
    const start = (page - 1) * resPerpage; 
    const end = page * resPerpage;

    recipes.slice(start, end).forEach(renderRecipe);

    //render pagination button
    renderButtons(page, recipes.length, resPerpage); //page is current page (1)/ recipes is array all of recipe / resPerPage show 10
};