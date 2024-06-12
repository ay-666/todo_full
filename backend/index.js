const express = require('express');
const zod = require('zod');
const { todoSchema , idSchema } = require('./types');
const { Todo } = require('./db');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors());


app.post('/todo',async function(req,res){
    const todo = req.body;

    const response = todoSchema.safeParse(todo);
    if(!response.success){
        res.status(411).json({
            msg:'Incorrect Input'
        });
        return ; 
    }

    const newTodo = await Todo.create({
        title:todo.title,
        description:todo.description,
        completed:false
    });

    res.json({
        msg:"Todo created"
    });
});

app.get('/todos',async function(req,res){
    const todos = await Todo.find({});
    res.json({
        todos
    });
});

app.put('/completed',async function(req,res){
    const updatedPayload = req.body;

    const response = idSchema.safeParse(updatedPayload);
    if(!response.success){
        res.status(411).json({
            msg:'Incorrect Input'
        });
        return;
    }

    const updatedTodo = await Todo.updateOne({_id:req.body.id},{
        completed:true
    });

    res.json({
        msg:'To do marked as completed'
    });

});

app.delete('/todo',async function(req,res){
    const idPayload = req.body;
    const response = idSchema.safeParse(idPayload);
    if(!response.success){
        res.status(411).json({
            msg:"Incorrect input"
        });
        return;
    }
    await Todo.deleteOne({_id:req.body.id});

    res.json({
        msg:"Todo deleted"
    });

});



app.listen(3000);