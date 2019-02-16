import axios from 'axios';
import * as env from './env';

async function getResult(query){
    const proxy = 'https://cors-anywhere.herokuapp.com/';

    try{
        const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${env.key}&q=${query}`);
        const recipes = res.data.recipes;
        console.log(recipes);
    }catch(error){
        alert(error);
    }
    
}

getResult('pizza');
