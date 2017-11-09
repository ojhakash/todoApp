const express = require('express');
const _ = require('lodash');
const fs = require('fs');
const bodyParser = require('body-parser');
const uniqid = require('uniqid');

const {isRealString} = require('./utils/validation');

var app = express();

app.use(express.static(__dirname + '/public'));
const port = process.env.PORT || 3000;

var todos = [];
var id;
var todoItem = '';
var options = [];
var answers = [];

var todo = {
  id,
  todoItem,
  options,
  answers
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/todos',(req,res)=>{
  if(!isRealString(req.body.todoItem)){
    return res.status(400).send('todoItem should be a real string');
  }
  todo.id = uniqid();
  todo.todoItem = req.body.todoItem;
  todo.options = [];
  todo.answers = [];

  todos = JSON.parse(fs.readFileSync('todo-data.json'));

  if(todos.length === 0){
    fs.writeFileSync('todo-data.json', JSON.stringify([todo],undefined,2));
  }else{
    todos.push(todo);
    fs.writeFileSync('todo-data.json',JSON.stringify(todos,undefined,2) );
  }

  res.send(fs.readFileSync('todo-data.json'));
});

app.get('/todos',(req,res)=>{
  res.send(fs.readFileSync('todo-data.json'));
});

app.post('/todos/:id/options/create',(req,res)=>{
  var id = req.params.id;
  todos = JSON.parse(fs.readFileSync('todo-data.json'));
  todo = _.find(todos,(todo)=>todo.id === id);
  if(!todo){
    res.status(404).send();
  }else{
    todo.options = req.body.options;
    _.remove(todos,(todo)=>todo.id === id);
    todos.push(todo);
    fs.unlinkSync('./todo-data.json');
    fs.writeFileSync('todo-data.json',JSON.stringify(todos,undefined,2));
    res.send(todos);
  };
});

app.get('/todos/:id',(req,res)=>{
  var id = req.params.id;
  todos = JSON.parse(fs.readFileSync('todo-data.json'));
  var todo = _.find(todos,(todo)=>todo.id === id);

  if(!todo){
    res.status(404).send();
  }else{
    res.send(todo);
  };
});

app.post('/todos/:id/answers/create',(req,res)=>{
  var id = req.params.id;
  todos = JSON.parse(fs.readFileSync('todo-data.json'));
  todo = _.find(todos,(todo)=>todo.id === id);
  if(!todo){
    res.status(404).send();
  }else{
    if(todo.answers === undefined){
        todo.answers = [];
    }
    todo.answers.push(req.body.answer);
    _.remove(todos,(todo)=>todo.id === id);
    todos.push(todo);
    fs.unlinkSync('./todo-data.json');
    fs.writeFileSync('todo-data.json',JSON.stringify(todos,undefined,2));
    res.send(todos);
  };
});

app.delete('/todos/:id',(req,res)=>{
  var id = req.params.id;
  todos = JSON.parse(fs.readFileSync('todo-data.json'));

  todo = _.find(todos,(todo)=>todo.id === id);

  if(!todo){
    res.status(404).send();
  }else{
    _.remove(todos,(todo)=>todo.id === id);
    fs.unlinkSync('./todo-data.json');
    fs.writeFileSync('todo-data.json',JSON.stringify(todos,undefined,2) );
    res.send(todos);
  };
});

app.put('/todos/:id',(req,res)=>{
  var id = req.params.id;
  todos = JSON.parse(fs.readFileSync('todo-data.json'));

  todo = _.find(todos,(todo)=>todo.id === id);

  if(!todo){
    res.status(404).send();
  }else{
    _.remove(todos,(todo)=>todo.id === id);
    todo.id = id;
    todo.todoItem = req.body.todoItem;
    todos.push(todo);
    fs.writeFileSync('todo-data.json',JSON.stringify(todos,undefined,2) );
    res.send(todos);
  };

});

app.listen(port,()=>{
  console.log(`Server is up on ${port}`);
});
