
/*
查找state中，指定id对应的下标
成功找到，返回下标；否则，返回-1
这个函数并不是mutation中定义的接口函数，它仅仅是mutation中各个接口函数要调用的一个局部函数
 */
function getIndexbyId(state, id) {

  console.log("Step:3.000--getIndexbyId()");

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

/*
查找state中，指定id对应的内容
成功找到，返回对象；否则，返回null
这个函数同样并不是mutation中定义的接口函数，它仅仅是mutation中各个接口函数要调用的一个局部函数
 */
function getItembyId(state, id) {

  console.log("Step:3.100--getItembyId()");

  var index = getIndexbyId(state, id);
  if(index === -1)
    return null;

  return state.todoItems[index];
}


/*
每个mutation都有一个字符串的事件类型 (type) 和一个回调函数 (handler)。
这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数。
mutation存在必须同步执行的限制
 */
const mutations = {
  initTodoItems(state, todoItems) {

    console.log("Step:3.200--mutations initTodoItems()");

    state.todoItems = todoItems  //将state中的todoItems初始化为函数的输入参数todoItems
  },


  toggleFinishedTodoItem(state, id){

    console.log("Step:3.300--mutations toggleFinishedTodoItem()");

    var item = getItembyId(state, id);  //通过id，得到要进行修改的item

    if(item)  //如果得到的item是有效的（非null）
    {
      item.isFinished = !item.isFinished;  //把item.isFinished属性的值取反
    }
  },


  addTodoItem(state, item){

    console.log("Step:3.400--mutations addTodoItem()");

    if(typeof(item) ==='string')
    {
      console.log("Step:3.401--mutations addTodoItem() JSON.parse()");
      item = JSON.parse(item);  //将JavaScript对象表示法的JSON字符串转换为对象
    }
    state.todoItems.push(item);  //将item对象保存到state.todoItems中
  },



  deleteTodoItem(state, id){

    console.log("Step:3.500--mutations deleteTodoItem()");

    var index = getIndexbyId(state, id);

    if(index === -1)
    {
       return ;
    }

    state.todoItems.splice(index, 1);  //splice()函数用来删除项目，index表示要删除项目的位置；1，表示要删除一个项目
  }
};

export default mutations
