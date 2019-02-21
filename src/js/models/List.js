import uniqid from 'uniqid';

export default class List{
    constructor(){
        this.items = []; //all item will push to empty array
    }

    addItem(count, unit, ingredient){
        const item = {
            id: uniqid(), // it will create identifier ID for each of the items
            count,
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }

    deleteItem(id){
        const index = this.items.findIndex(el => el.id === id);

        // [2,4,8] splice(1,1) (start at position 1, take one element) => return 4, original array is [2,8]
        this.items.splice(index, 1);//we start at position where id, we only remove one element
    }

    updateCount(id, newCount){
        this.items.find(el => el.id === id).count = newCount;
    }
}