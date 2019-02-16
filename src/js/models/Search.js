import axios from 'axios';
import * as env from './env';

export default class Search{
    constructor(query){
        this.query = query; //This line is added to the Search class, just an object, like 'Search.query = query;'
    }

    async getResult(query){
        const proxy = 'https://cors-anywhere.herokuapp.com/';

        try{
            const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${env.key}&q=${this.query}`); //because thisquery will be object once we call the getResult, ex: ('pizza') from index.js
            this.result = res.data.recipes; // res = pizza , the res will search 'pizza' in data.recipes 
            //console.log(this.result);
        }catch(error){
            alert(error);
        }
    }
}