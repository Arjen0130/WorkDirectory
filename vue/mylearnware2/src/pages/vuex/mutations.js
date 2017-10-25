

function getIndexbyId(state, id) {
    console.log("Step:3.000--getIndexbyId");
    for(var i in state.todoItems)
    {
        var item = state.todoItems[i];

        if(item._id === id)
        {
            return i;
        }
    }
    return -1;
}

function getItembyId(state, id) {
    console.log("Step:3.100--getItembyId");
    var index = getIndexbyId(state, id);
    if(index === -1)
        return null;

    return state.todoItems[index];
}

const mutations = {


    addItem(state, itemObj){

        console.log("Step:3.200--mutations addItem()");

        if(typeof(itemObj) ==='string')
        {
            console.log("Step:3.201--mutations addItem() if string part");

            item = JSON.parse(itemObj);
        }

        state.localItems.push(itemObj);
    },


    changeItem(state, itemObjWithIndex){

        console.log("Step:3.300--mutations changeItem()");

        if(itemObjWithIndex.index === -1)
        {
            console.log("Step:3.301--mutations changeItem() if -1 part");

            return;
        }

        console.log("itemObjWithIndex.index = " + itemObjWithIndex.index
            + " itemObjWithIndex.label = " + itemObjWithIndex.label);
        state.localItems[itemObjWithIndex.index] = {label: itemObjWithIndex.label};
    },


    deleteItem(state, itemIndex){

        console.log("Step:3.400--mutations deleteItem()");

        if(itemIndex === -1)
        {
            console.log("Step:3.401--mutations deleteItem() if -1 part");

            return;
        }

        state.localItems.splice(itemIndex, 1);
    },


    initItems(state, itemsObj) {

        console.log("Step:3.500--mutations initItems()");

        let len = itemsObj.length;

        console.log("len = " + len);

        state.localItems.splice(0);

        for(let i = 0; i < len; i++)
        {
            console.log("itemsObj.label = " + itemsObj[i].label);
            //state.todoItems[i] = {label: itemsObj[i].label};
        }
        state.localItems = itemsObj.slice(0);
    },

};

export default mutations
