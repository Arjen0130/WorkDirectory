let axios = require("../axios");

var API_TODO_ROUTER ="/db/todo";


const actions = {


    AddItem({ commit }, itemObj) {
        console.log("Step:1.000--actions AddItem()");
        commit('addItem', itemObj);
    },


    ChangeItem({ commit }, itemObjWithIndex) {
        console.log("Step:1.100--actions ChangeItem()");
        commit('changeItem', itemObjWithIndex);
    },


    DeleteItem({ commit }, itemIndex) {
        console.log("Step:1.200--actions DeleteItem()");
        commit('deleteItem', itemIndex);
    },


    CommitItems({ commit }, itemsObj) {
        console.log("Step:1.300--actions CommitItems()");
        axios.delete(API_TODO_ROUTER)
            .then(function (response)
            {
                console.log("Step:1.301--actions CommitItems() then");
                let len = itemsObj.length;
                for(let i = 0; i < len; i++)
                {
                    axios.post(API_TODO_ROUTER, itemsObj[i]);
                }
            })
            .catch(function (error){
                console.log("Step:1.302--actions CommitItems() catch");
                console.log(error);
            });
    },


    InitItems({ commit }) {
        console.log("Step:1.400--actions InitItems()");
        return new Promise((on_result) =>{
            console.log('actions InitTodoItem');
            axios.get(API_TODO_ROUTER)
                .then(function (response){
                    console.log("Step:1.401--actions InitItems() then");
                    commit('initItems', response.data);

                    console.log(response);
                    on_result({result:true, message:response.data});
                })
                .catch( function (error)   {
                    console.log("Step:1.402--actions InitItems() catch");
                    console.log('error');
                    on_result({result:false, message:error});
                });
        });
    }

};

export default actions
