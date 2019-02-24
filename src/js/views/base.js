export const elements = {
    searchForm      : document.querySelector('.search'),
    searchInput     : document.querySelector('.search__field'),
    searchRes       : document.querySelector('.results'),
    searchResList   : document.querySelector('.results__list'),
    searchResPages  : document.querySelector('.results__pages'),
    recipe          : document.querySelector('.recipe'),
    shopping        : document.querySelector('.shopping__list'),
    likesMenu       : document.querySelector('.likes__field'),
    likesList       : document.querySelector('.likes__list'),
};

export const elementStrings = {
    loader: 'loader' //so, we can edit here if we want
};

export const renderLoader = parent => { //add new div for loader svg
    const loader = `
        <div class = "${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`); //we can look like this: .loader from elementStrings
    //see if loader show or not, if that so, delete it
    if(loader){
        loader.parentElement.removeChild(loader);
    }
};