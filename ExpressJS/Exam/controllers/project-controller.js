const Project = require('../models/Project');
const Team = require('../models/Team');
const errorHandler = require('../controllers/error-controller');

module.exports = {
  createGet: (req, res) => {
    res.render('projects/create');
  },
  createPost: (req, res) => {
    let {name, description} = req.body;

    if(!name || !description){
      res.locals.globalError = "Please fill all fields.";
      res.render('projects/create');
      return;
    }

    Project.create({name, description})
      .then(() => {
        res.redirect('/projects/manage');
      }).catch((e) => {
        console.error(e);
        errorHandler.error('server-error');
      });
  },
  manageGet: async (req, res) => {
    let searchParam = req.query.search;

    let teams = [];
    let projects = [];
    if(req.user.roles.indexOf('Admin') > -1){
      teams = await Team.find()
      projects = await Project.find({team: undefined});
    }else {
      projects = await Project.find().populate('team').exec();

      if(searchParam){
        projects = projects.filter(project =>
          project.name.indexOf(searchParam) > -1
        )
      }
    }
    res.render('projects/manage',{teams, projects})
  },
  managePost: (req, res) => {
    let {teamId, projectId} = req.body;

    if(!teamId || !projectId){
      res.locals.globalError = 'Please select options for both fields.';
      res.render('projects/manage');
    }

    Team.findById(teamId)
      .then((team) => {
        Project.findById(projectId)
          .then((project) => {
            team.projects.push(projectId);
            project.team = teamId;

            team.save();
            project.save(project);
            res.redirect('/projects/manage')
          }).catch((e) => {
            console.log(e);
            res.locals.globalError = 'Project not found.';
            res.render('errors/error-page');
            return;
          });
      }).catch((e) => {
        console.error(e);
        res.locals.globalError = 'Team not found.';
        res.render('errors/error-page');
        return;
      })
  }
}
