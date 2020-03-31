const express = require('express')

const server = express()

server.use(express.json())

const projects = []

function checkProjectExists(req, res, next) {
  const { id } = req.params

  if(!projects[id]) {
    return res.status(400).json({"error": "Project not found"})
  }

  return next()
}

server.use((req,res,next) => {
  console.count('Number of requests');
  return next()
})

server.get('/projects', (req, res) => {
  return res.json(projects)
})

server.post('/projects', (req, res) => {
  const {id, title } = req.body

  const project = {
    id,
    title,
    tasks: []
  }

  projects.push(project)

  return res.json(projects)
})


server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params
  const { title } = req.body

  projects[id].title = title

  return res.json(projects)
})

server.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params

  projects.splice(id, 1)

  return res.json()
})

server.post('/projects/:id/tasks',checkProjectExists, (req, res) => {
  const { id } = req.params
  const { title } = req.body

  projects[id].tasks.push({title})

  return res.json(projects)
})


server.listen(3000)