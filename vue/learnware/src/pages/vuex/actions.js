let axios = require("../axios");

var API_TODO_ROUTER ="/db/todo";

/*
可以在 action 内部执行异步操作。
使用 then 时，你将接收下面这样的响应：
axios.get('/user/12345')
  .then(function(response) {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });

 */
const actions = {

  InitTodoItem ({ commit }) {  //用到ES2015的参数解构来简化代码（特别是我们需要调用commit很多次的时候）
    return new Promise((on_result) =>{

        //console.log('actions InitTodoItem');
        console.log("Step:1.000--actions InitTodoItem()");

        axios.get(API_TODO_ROUTER)
        /*
        then()方法是异步执行
        就是当.then()前的方法执行完后再执行then()内部的程序
        这样就避免了，数据没获取到等的问题
        */
        .then(function (response){

            console.log("Step:1.001--actions InitTodoItem() then");

          commit('initTodoItems', response.data);

          console.log(response);

          on_result({result:true, message:response.data});
        })
        .catch( function (error)   {

            console.log("Step:1.002--actions InitTodoItem() catch");
          console.log('error');

          on_result({result:false, message:error});
        } );
    });
  },


  AddTodoItem({ commit }, item) {

      console.log("Step:1.100--actions AddTodoItem()");

    axios.post(API_TODO_ROUTER, item)
      .then(function (response){

          console.log("Step:1.101--actions AddTodoItem() then");

        commit('addTodoItem', response.data);
      })
      .catch( function (error)   {

          console.log("Step:1.102--actions AddTodoItem() catch");

          console.log(error);
      } );
  },


  ToggleFinishedTodoItem ({ commit }, item) {

      console.log("Step:1.200--actions ToggleFinishedTodoItem()");

    axios.put(API_TODO_ROUTER+"/"+item._id, {isFinished: !(item.isFinished)})
      .then(function (response){

          console.log("Step:1.201--actions ToggleFinishedTodoItem() then");

        commit('toggleFinishedTodoItem', item._id);
      })
      .catch( function (error)   {

          console.log("Step:1.202--actions ToggleFinishedTodoItem() catch");

          console.log(error);
      } );
  },


  DeleteTodoItem ({ commit }, id) {

      console.log("Step:1.300--actions DeleteTodoItem()");

    axios.delete(API_TODO_ROUTER+"/"+id)
      .then(function (response){

          console.log("Step:1.301--actions DeleteTodoItem() then");

        commit('deleteTodoItem', id);
      })
      .catch( function (error)   {

          console.log("Step:1.302--actions DeleteTodoItem() catch");

          console.log(error);
      } );
  }



};

export default actions
