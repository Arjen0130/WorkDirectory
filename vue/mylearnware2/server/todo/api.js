module.exports = function(rest){

  var mongoose = require('mongoose');
  var Todo = mongoose.model("Todo");


    rest.get('/db/todo', function(req, res) {

        Todo.find(function(err, todo) {
            res.ok(todo);
        });

    });


    rest.post('/db/todo', function(req, res) {

        var todo = new Todo(req.body);
        todo.save();

        res.ok(todo);

    });


    rest.delete('/db/todo', function(req, res) {

        Todo.remove(function (err) {

            if (err) {

                console.log(err);
                return res.internalServerError();
            }

            return res.accepted();
        });
    });

  return rest;

};
