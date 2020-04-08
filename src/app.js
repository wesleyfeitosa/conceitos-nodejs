const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.status(200).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(repo => repo.id === id);

  if (!repository) {
    return response.status(400).json({ error: "Repository Id not found." });
  };

  const { title, url, techs } = request.body;

  repository.title = title ? title : repository.title;
  repository.url = url ? url : repository.url;
  repository.techs = techs ? techs : repository.techs;

  return response.status(200).json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repo => repo.id === id);

  if(repositoryIndex < 0){
    return response.status(400).json({error: "Repository Id not found."});
  };

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(repo => repo.id === id);

  if(!repository){
    return response.status(400).json({error: "Repository Id not found."});
  }

  repository.likes++;

  return response.status(200).json(repository);
});

module.exports = app;
