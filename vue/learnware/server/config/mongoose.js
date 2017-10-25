console.log("Step:7.000--step into mongoose.js file.");


var mongoose = require('mongoose');

var config = require('./config');  //这里引用的config.js文件应该只是用来配置一个数据库服务器的参数

module.exports = function(){

  console.log("Step:7.100--module.exports in mongoose.js file.");

  /*
  这句话说明，这里不是mongodb数据库服务器，而只是一个接口。那么，db就是用来访问这个服务器的接口
   */
  var db = mongoose.connect(config.mongodb);  //使用前面引用的数据库服务器参数，来连接数据库服务器

    //注意，数据库连接成功后，接下来定义的callback函数就会被数据库服务器使用
  require("../todo/model");  //调用todo/model.js文件，从而完成数据库中要存储的数据模式的定义

  return db;
};
