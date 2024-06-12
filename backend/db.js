require('dotenv').config({ path: 'D:/MERN/Harkirat/Vs code files/todo_full/db.env' });

const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;
//console.log(uri)
mongoose.connect(uri)

const todoSchema = mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean
});


const Todo =  mongoose.model('Todo',todoSchema);


module.exports = {
    Todo
}