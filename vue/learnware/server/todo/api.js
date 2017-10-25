module.exports = function(rest){

  console.log("Step:8.000--module.exports in api.js file.");

  var mongoose = require('mongoose');  //引用mongoose
  var Todo = mongoose.model("Todo");  //引用model.js文件中定义的Todo模式

    /*
    接下来定义的服务器callback函数的输入参数中，req应该为客户端发来的请求，res为服务器做出的响应
     */

  // rest.get：用来从数据库中获取数据
  rest.get('/db/todo', function(req, res) {  //如果服务器收到访问'/db/todo'的get请求,

      console.log("Step:8.100--rest.get('/db/todo').");

      Todo.find(function(err, todo) {  //从数据库的Todo模式中取出当前存储的内容，即todo

          console.log("Step:8.101--rest.get('/db/todo') with res.ok().");

          res.ok(todo);  //将取出的内容通过res.ok打包后返回给客户端
      });
  });


  // rest.get：用来从数据库中获取数据
  rest.get('/db/todo/:id', function(req, res) {  //如果服务器收到访问'/db/todo/:id'的get请求,

      console.log("Step:8.200--rest.get('/db/todo/:id').");

      var id = req.params.id;  //取得请求参数中存储的id，而params是与请求一起发送的URL参数，也就是/db/todo/:id中的id

      Todo.findById(id, function (err, todo) {  //根据id在Todo模式中查找相关条目
          if(todo) {

              console.log("Step:8.201--rest.get('/db/todo/:id') with res.ok().");

              res.ok(todo);  //如果找到，将找到的内容通过res.ok打包后返回给客户端
          }
          else {

              console.log("Step:8.202--rest.get('/db/todo/:id') with res.notFound.");

              res.notFound();  //否则，通过res.notFound告知客户端没有找到
          }
      })
  });


  // rest.put：用来对数据库中的已有信息进行更新
  rest.put('/db/todo/:id', function(req, res) {  //如果服务器收到访问'/db/todo/:id'的put请求

      console.log("Step:8.300--rest.put('/db/todo/:id').");

      var id = req.params.id;  //取得请求参数中存储的id

      Todo.update({_id:id},req.body,function(err){  //根据id，将Todo模式中匹配到的条目中的相关内容更新为req.body中的内容

          if(err) {  //如果发生错误

              console.log("Step:8.301--rest.put('/db/todo/:id') with res.internalServe().");

              return res.internalServerError();  //则通过res.internalServerErr告知客户端，本次操作服务器错误
          }

          console.log("Step:8.302--rest.put('/db/todo/:id') with res.accepted().");

          return res.accepted('/db/todo/' + encodeURI(id));  //否则，通过res.accepted告知客户端本次操作被接受，并返回URI
      });

  });


  // rest.pust：用来向数据库中添加新的条目
  rest.post('/db/todo', function(req, res) {  //如果服务器收到访问'/db/todo'的post请求

      console.log("Step:8.400--rest.post('/db/todo').");

      var todo = new Todo(req.body);  //使用请求参数的数据部分创建一个新的Todo数据条目
      todo.save();  //然后把创建好的数据条目存入数据库中
      res.ok(todo);  //通过res.ok，将创建好的条目打包后返回给客户端
  });


  // rest.delete：用来从数据库中删除相应的条目
  rest.delete('/db/todo/:id', function(req, res) {  //如果服务器收到访问'/db/todo/:id'的delete请求

      console.log("Step:8.500--rest.delete('/db/todo/:id').");

      var id = req.params.id;  //取得请求参数中存储的id

      Todo.findByIdAndRemove(id, function (err) {  //根据id在Todo模式中查找相关条目，如果找到就删除
          if (err) {  //如果发生错误

              console.log("Step:8.501--rest.delete('/db/todo/:id') with res.internalServerError().");

              console.log(err);
              return res.internalServerError();  //则通过res.internalServerErr告知客户端，本次操作服务器错误
          }

          console.log("Step:8.502--rest.delete('/db/todo/:id') with res.accepted().");

          return res.accepted();  //否则，通过res.accepted告知客户端本次操作被接受
      });
  });


  return rest;

};
