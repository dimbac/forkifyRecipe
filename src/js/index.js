import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import {elements, renderLoader, clearLoader} from './views/base';

/* Global State
    - Search object
    - current recipe object
    - Shopping list object
    - liked recipes
*/
const state = {};


/**  
 * SEARCH CONTROLLER  
 */
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


/** 
 * RECIPE CONTROLLER   
 * */
const controlRecipe = async () =>{
    //Get ID from url
    const id = window.location.hash.replace('#', ''); //'#46956' to '46956'

    if(id){
        //prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight selected search item
        if (state.search) searchView.highlightSelected(id); //if there a search after reload page, it will still select+render

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
            clearLoader();
            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id)
                );
        }catch(error){
            alert('Error processing recipe!');
        }
        
    }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


/** 
 * LIST CONTROLLER  
 */
const controlList = () => {
    // Create a new list IF there in none yet
    if(!state.list) state.list = new List();

    //add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
}

// Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // handle the delete button
    if(e.target.matches('.shopping__delete, .shopping__delete *')){
        //delete from state
        state.list.deleteItem(id); // const id that have target.closest

        //delete from UI
        listView.deleteItem(id);

    // handle the count update
    }else if(e.target.matches('.shopping__count--value')){
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
});


/** 
 * LIKE CONTROLLER  
 */
const controlLike = () =>{
    if(!state.likes) state.likes = new Likes();

    const currentID = state.recipe.id;

    //User has NOT yet liked current recipe
    if(!state.likes.isLiked(currentID)){
        // add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );

        // Toggle the like button
        likesView.toggleLikeBtn(true);

        // Add like to UI list
        likesView.renderLike(newLike);


    //User HAS liked current recipe    
    }else{
        // remove like from the state
        state.likes.deleteLike(currentID);

        // Toggle the like button
        likesView.toggleLikeBtn(false);

        // Remove like from UI list
        likesView.deleteLike(currentID);
    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
};

// Restore liked recipes on page load
window.addEventListener('load', () => {

    state.likes = new Likes(); 

    //restore likes
    state.likes.readStorage();

    //toggle like menu button
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    // render the existing likes
    // The second likes is the array. So state.likes is the new object and to call the likes array on that, we add another likes to that object. 
    state.likes.likes.forEach(like => likesView.renderLike(like));
});


// handling recipe button click
elements.recipe.addEventListener('click', e => {
    if(e.target.matches('.btn-decrease, .btn-decrease *')){ // * mean all inside of this parent element
        if(state.recipe.servings > 1){
            state.recipe.updateServings('dec');        
            recipeView.updateServingsIngredients(state.recipe);
        }

    } else if(e.target.matches('.btn-increase, .btn-increase *')){ 
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);   
    } else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        //add ingredients to shopping list
        controlList();
    } else if(e.target.matches('.recipe__love, .recipe__love *')){
        //like controller
        controlLike();
    }
});