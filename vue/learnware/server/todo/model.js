console.log("Step:9.000--step into model.js file.");

var mongoose = require('mongoose');  //导入数据库
var Schema = mongoose.Schema;

// Define Todo schema
var TodoSchema = new Schema({  //设置数据库中要存储的数据模式
    label       :  String,
    isFinished  :  Boolean
});

// add schema to  model
// 需要注意的是，如果在模式中添加的是method，那么一定要在使用model进行编译之前添加好
mongoose.model('Todo', TodoSchema);  //使用model编译上述模式，模式名称为Todo
