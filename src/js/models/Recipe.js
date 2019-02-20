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

    calcServings(){
        this.servings = 4;
    }

    parseIngredients(){

        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbps', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g']; //take array of unitshort, then join with kg or g

        //basically a loop of ingredient into a new array
        const newIngredients = this.ingredients.map(el => {
            // 1) Uniform units
            let ingredient = el.toLowerCase(); //convert this.ingredient as el to lowecase then saved into let ingredient
            unitsLong.forEach((unit, i) => {// 'unitsLong' use forEach method to looping this.ingre. use 'unit' as unitsLong. then use ingredient(of lowecase) then replacing 'unit' to 'unitsShort'
                ingredient = ingredient.replace(unit, unitsShort[i]);
            })

            // 2) Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' '); //replace into new ingred

            // 3) Parse ingredients into count, unit, ingredient
            const arrIng    = ingredient.split(' ');//whatever there 'space', it will split
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2)); //includes() is a brand new array -> const 'units'


            let objIng;
            if(unitIndex > -1){
                //there is a unit
                //start position zero until unitIndex. ex: 4 1/2 cups, arrCount is [4, 1/2]
                //ex: 4 cups, arrCount is [4]
                const arrCount = arrIng.slice(0, unitIndex); 

                let count;
                if(arrCount === 1){
                    count = eval(arrIng[0].replace('-', '+'));
                } else{
                    
                    count = eval(arrIng.slice(0, unitIndex).join('+')); //ex: eval("4+1/2") --> 4.5
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                }; 

            }else if(parseInt(arrIng[0], 10)){
                //there is NO unit, but 1st element is number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ') // start at position one
                }
            }else if(unitIndex === -1){
                //there is NO unit and NO number in 1st position
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }


            return objIng;
        });
        this.ingredients = newIngredients;
    }
}