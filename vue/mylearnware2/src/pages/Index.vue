<template>
  <div id="todo-app">
    <h1> testDemo: Table(With Database) </h1>

    <p class="note" >操作提醒:
      <br />* 添加：在输入框中输入内容，单击“添加”按钮即可；
      <br />* 修改：首先单击需要修改的条目，然后在输入框中输入修改后的内容，最后单击“修改”按钮即可；
      <br />* 删除：首先打击需要删除的条目，然后单击“删除”按钮即可；
      <br />* 提交：单击“提交”按钮即可；
      <br />* 下载：单击“下载”按钮即可；

      <br /> <br />
    </p>

    <input type="text" v-model="newItem">
    <button v-text="btnTextAdd" @click="addItem"></button>
    <button v-text="btnTextChange" @click="changeItem"></button>
    <button v-text="btnTextDelete" @click="deleteItem"></button>
    <button v-text="btnTextCommit" @click="commitItems"></button>
    <button v-text="btnTextLoad" @click="loadItems"></button>

    <ul>数据库中的内容
      <li v-for="(dbItem,dbIndex) in dbItems"
          :key="'dbItem'+dbIndex" >
        {{ dbItem.label }}
      </li>
    </ul>

    <ul>浏览器本地的内容
      <li v-for="(localItem,localItemIndex) in localItems"
          @click="selectItem(localItemIndex)"
          :key="'localItem'+localItemIndex" >
        {{ localItem.label }}
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
                newItem: "",
                dbItems: {},
                localIndex: -1,

                btnTextAdd: "添加",
                btnTextChange: "修改",
                btnTextDelete: "删除",
                btnTextCommit: "提交",
                btnTextLoad: "下载",

                tmpItem: {}
            }
        },


        computed:{
            localItems:{  //读取items的时候，将自动调用下面的get()函数
                get() {
                    console.log("Step:0.100--computed items get()");
                    return store.getters.localItems;
                }
            },
        },


        methods: {

            addItem(){
                console.log("Step:0.200--methods addItem()");
                store.dispatch("AddItem", {label:this.newItem});
            },

            changeItem(){
                console.log("Step:0.300--methods changeItem()");
                store.dispatch("ChangeItem", {label:this.newItem, index:this.localIndex});
            },

            deleteItem(){
                console.log("Step:0.400--methods deleteItem()");
                store.dispatch("DeleteItem", this.localIndex);
            },

            commitItems(){
                console.log("Step:0.500--methods commitItems()");
                store.dispatch("CommitItems", this.localItems);
            },

            loadItems(){
                console.log("Step:0.600--methods loadItems()");
                let self = this;
                store.dispatch("InitItems").then(function(data){
                    console.log("Step:0.601--methods loadItems() then");
                    self.dbItems = self.localItems.slice(0);
                    console.log(data);
                });
            },

            selectItem(localItemIndex){
                console.log("Step:0.700--methods selectItem()");
                this.localIndex = localItemIndex;
                this.newItem = this.localItems[this.localIndex].label;
            },
        },

        mounted(){
            console.log("Step:0.800--methods mounted()");
            let self = this;
            store.dispatch("InitItems").then(function(data){
                console.log("Step:0.801--methods mounted() then");
                self.dbItems = self.localItems.slice(0);
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
