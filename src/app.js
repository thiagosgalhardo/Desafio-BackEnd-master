const express = require("express");
const { uuid } = require("uuidv4");
const cors = require("cors");


const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
 
  response.send(repositories);

});

app.post("/repositories", (request, response) => {
 
  const repositorio = {
    id: uuid(),
    title: request.body.title,
    url: request.body.url,
    techs: request.body.techs,
    likes: 0,
  }

  repositories.push(repositorio);
  response.send(repositories);

});

app.put("/repositories/:id", (request, response) => {

  const id = request.params.id;
  const index = repositories.findIndex(repo => repo.id === id);
    if (index == -1 ) {
      response.send ("Não existe");
    };

  const repositorio = repositories[index];                    
   repositorio.title = request.body.title;
   repositorio.url = request.body.url;
   repositorio.techs = request.body.techs;


repositories.splice(index, 1);

repositories.push(repositorio);

response.send("Sucesso");


  console.log('repo', repositorio);
  console.log(index);
  
  
});

app.delete("/repositories/:id", (req, res) => {
  
  const id = req.params.id;
  const index = repositories.findIndex(repo => repo.id === id);
  repositories.splice(index, 1);
  res.send(repositories);
  
});

app.post("/repositories/:id/like", (request, response) => {

  const id = request.params.id;
  const index = repositories.findIndex(repo => repo.id === id);
    if (index == -1 ) {
      response.send ("Não existe");
      return;
    };

  const repositorio = repositories[index];                    
   repositorio.likes++;

repositories.splice(index, 1);

repositories.push(repositorio);

response.send("Sucesso");


  console.log('repo', repositorio);
  console.log(index);
  
  
});

module.exports = app;
