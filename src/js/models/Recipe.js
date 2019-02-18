import axios from 'axios';
import * as env from './env';

export default class Recipe{
    constructor(id){
        this.id = id;
    };

    async getRecipe(){
        try{
            const res = await axios(`https://www.food2fork.com/api/get?key=${env.key}&rId=${this.id}`);
            this.title          = res.data.recipe.title;
            this.author         = res.data.recipe.publisher;
            this.img            = res.data.recipe.image_url;
            this.url            = res.data.recipe.source_url;
            this.ingredients    = res.data.recipe.ingredients;
        }catch(error){
            console.log(error);
            alert('something went wrong :(');
        }
    }

    calcTime(){
        //asumming that we need 15 min for each 3 ing
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServing(){
        this.servings = 4;
    }
}