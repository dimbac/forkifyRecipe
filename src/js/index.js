import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements} from './views/base';

/* Global State
    - Search object
    - current recipe object
    - Shopping list object
    - liked recipes
*/
const state = {};

const controlSearch = async () =>{
    // 1) Get query from view
    const query = searchView.getInput(); //then call getInput to get the value, and stores it to const query

    if(query){
        // 2) New search object and add to state
        state.search = new Search(query); //store it into global state object

        //3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResult();
        
        // 4) Search for recipes
        await state.search.getResult(); //after get state.search(query), then we can call getResult() method to searching that query

        //5) Render results on UI
        searchView.renderResult(state.search.result); //render UI, then call renderResult() [searchView.js] to get the state.search.result from getResult() [Search.js]

    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault(); //prevent reload
    controlSearch();
});

