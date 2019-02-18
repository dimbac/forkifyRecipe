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
        state.search = new Search(query); //store it into global state object

        //3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResult();
        renderLoader(elements.searchRes);
        
        // 4) Search for recipes
        await state.search.getResult(); //after get state.search(query), then we can call getResult() method to searching that query

        //5) Render results on UI
        clearLoader();
        searchView.renderResults(state.search.result); //render UI, then call renderResult() [searchView.js] to get the state.search.result from getResult() [Search.js]

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

const r = new Recipe(46956);
r.getRecipe();
console.log(r);