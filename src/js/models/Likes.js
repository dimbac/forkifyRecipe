export default class Likes {
    constructor(){
        this.likes = [];
    }

    addLike(id, title, author, img){
        const like = {id, title, author, img};
        this.likes.push(like); //push 'like' into empty array this.likes[]

        // Persist data in localStorage
        this.persistData();

        return like;
    }

    deleteLike(id){
        const index = this.likes.findIndex(el => el.id === id); // const index will search that matches with input 'id'
        this.likes.splice(index, 1);// the array 'likes' use splice to start and take. We use 'index' for start position at, then take one element

        // Persist data in localStorage
        this.persistData();

    }

    isLiked(id){
        return this.likes.findIndex(el => el.id === id) !== -1; //if minus, it will turn out to be false
    }

    getNumLikes(){
        return this.likes.length;
    }

    persistData(){
        //save data to this.likes array. then convert an array to a string (using JSON.stringify())
        localStorage.setItem('likes', JSON.stringify(this.likes)); 
    }

    readStorage(){
        //convert 'likes' to back data structure before
        const storage = JSON.parse(localStorage.getItem('likes'));

        //basically restoring all our likes from localStorage
        if(storage) this.likes = storage;
    }
}