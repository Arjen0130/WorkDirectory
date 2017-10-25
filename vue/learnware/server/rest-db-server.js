module.exports = function(app){

  console.log("Step:10.000--step into rest-db-server.js file.");

  if (!app) throw new Error('Must provide express instance.');
  var expressRest = require('express-rest');  //REST,又称为表述性状态转移，用来得到一个功能强、性能好、适宜通讯的架构

  var db = require('./config/mongoose')();  //这里引用mongoose.js文件，那么数据库已经连接成功，并配置好相关模式



  //增加对 json的支持
  var rest = expressRest(app, {
    serializers: {
      'application/json': {  //这里指明添加对json的支持
        deserialize: function (req, res, next) {  //反序列化函数什么都没有做
          next();
        },
        serialize: function (req, res, next) {  //序列化函数也什么都没有做
          next();
        }
      }
    }
  });


  //也就是说，这里的REST是用来进行通讯的
  rest = require('./todo/api.js')(rest);  //将api.js中定义的函数作为callback函数被数据库服务器调用


  return rest;

};


