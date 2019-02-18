import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import {elements, renderLoader, clearLoader} from './views/base';

/* Global State
    - Search object
    - current recipe object
    - Shopping list object
    - liked recipes
*/
const state = {};

/** TODO:   SEARCH CONTROLLER   */
const controlSearch = async () =>{
    // 1) Get query from view
    const query = searchView.getInput(); //then call getInput to get the value, and stores it to const query

    if(query){
        // 2) New search object and add to state
        state.search = new Search(query); //create a new recipe object based on a model Recipe.js, saved it to state.recipe

        //3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResult();
        renderLoader(elements.searchRes);
        
        try{
            // 4) Search for recipes
            await state.search.getResult(); //after get state.search(query), then we can call getResult() method to searching that query

            //5) Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result); //render UI, then call renderResult() [searchView.js] to get the state.search.result from getResult() [Search.js]
        }catch(error){
            console.log(error);
            alert('Something wrong with the search....');
            clearLoader();
        }
        

    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault(); //prevent reload
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const goToPage = parseInt(btn.dataset.goto, 10); //btn .btn-inline then searching 'goto' number
        searchView.clearResult();
        searchView.renderResults(state.search.result, goToPage);
    }
});


/** TODO:   RECIPE CONTROLLER   */

const controlRecipe = async () =>{
    //Get ID from url
    const id = window.location.hash.replace('#', ''); //'#46956' to '46956'
    console.log(id);

    if(id){
        //prepare UI for changes

        // create new recipe object
        state.recipe = new Recipe(id); //create a new recipe object based on a model Recipe.js, saved it to state.recipe

        try{
            // get recipe data and parse ingrediet
            await state.recipe.getRecipe(); //call getRecipe(); from Recipe.js
            state.recipe.parseIngredients();

            //calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            //render recipe
            console.log(state.recipe);
        }catch(error){
            alert('Error processing recipe!');
        }
        
    }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));