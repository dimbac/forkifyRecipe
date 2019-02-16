import Search from './models/Search'

/* Global State
    - Search object
    - current recipe object
    - Shopping list object
    - liked recipes
*/
const state = {};

const controlSearch = async () =>{
    // 1) Get query from view
    const query = 'pizza';

    if(query){
        // 2) New search object and add to state
        state.search = new Search(query); //store it into global state object

        //3) Prepare UI for results

        // 4) Search for recipes
        //await state.search.getResult(); //after searching 'pizza', then we can call getResult() method

        //5) Render results on UI
        //console.log(state.search.result); //then call result from this.result of getResult()
    }
}

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault(); //prevent reload
    controlSearch();
});

