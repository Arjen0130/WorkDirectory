<template>
  <div id="todo-app">
    <h1> Demo 10: Todo List(With Database) </h1>

    <p class="note" >操作提醒:
      <br />* 新增：在输入框中输入内容，回车可新增
      <br />* 修改：单击条目可设置为完成；
      <br />* 删除：双击条目可删除；

      <br /> <br />
    </p>



    <input type="text" v-model="newItem" @keyup.enter="addItem">

    <ul>
      <li v-for="(item,index) in items"
          :class="{'cls-finished': item.isFinished}"
          @click="toggleFinish(item)"
          @dblclick="deleteItem(item)"
          :key="'item'+index" >
        {{ item.label }}
      </li>
    </ul>

  </div>
</template>

<script>
  import store from './vuex/store.js'

  export default {
    data(){
        console.log("Step:0.000--data return newItem");
      return {
        newItem:""
      }
    },

      /*
      由于 Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在计算属性中返回某个状态.
       */
   computed:{
      items:{  //读取items的时候，将自动调用下面的get()函数
        get() {
            console.log("Step:0.100--computed items get()");
          return store.getters.todoItems;
        }
      }
    },

    methods: {

      addItem(){
          console.log("Step:0.200--methods addItem()");
        store.dispatch("AddTodoItem", {label:this.newItem, isFinished:false});
        this.newItem  = "";
      },

      toggleFinish(item){
          console.log("Step:0.300--methods toggleFinish()");
        store.dispatch("ToggleFinishedTodoItem", item);
      },

      deleteItem(item){
          console.log("Step:0.400--methods deleteItem()");
        store.dispatch("DeleteTodoItem", item._id);
      }
    },

    mounted(){
        console.log("Step:0.500--mounted");
      store.dispatch("InitTodoItem").then(function(data){
       console.log(data);
      });
    }
  }
</script>

<style rel="stylesheet/less" lang="less">

@import "./style.css";

  body{
    h1{

    }
  }

</style>
