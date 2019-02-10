const Team = require('../models/Team');
const Project = require('../models/Project');
const User = require('../models/User');

const errorHandler = require('../controllers/error-controller');

module.exports = {
  createGet: (req, res) => {
    res.render('teams/create');
  },
  createPost: (req, res) => {
    let {name} = req.body;

    if(!name){
      res.locals.globalError = 'Name is required!';
      res.render('teams/create');
      return;
    }

    Team.create({name})
      .then(() =>{
        res.render('teams/manage');
      }).catch((e) => {
        console.error(e);
        errorHandler.error('server-error');
      });
  },
  manageGet: async (req, res) => {
    let searchParam = req.query.search;
    let teams = [];
    let users = [];

    if(req.user.roles.indexOf('Admin') > -1){
      teams = await Team.find();
      users = await User.find();
    }else {
      teams = await Team.find().populate(['projects', 'members']).exec();

      if(searchParam){
        teams = teams.filter(team =>
          team.name.indexOf(searchParam) > -1
        )
      }
    }

    res.render('teams/manage',{teams, users})
  },
  managePost: (req, res) => {
    let {teamId, userId} = req.body;

    if(!teamId || !userId){
      res.locals.globalError = 'Please select options for both fields.';
      res.render('teams/manage');
    }

    Team.findById(teamId)
      .then((team) => {
        User.findById(userId)
          .then((user) => {
            if(team.members.indexOf(userId) > -1){
              res.locals.globalError = 'User is already in this team.';
              res.render('errors/error-page');
              return;
            }

            team.members.push(userId);
            user.teams.push(teamId);
            try{
              team.save();
              user.save();

              res.redirect('/teams/manage')
            }catch(e){
              console.error(e);
            }
          }).catch((e) => {
            console.error(e);
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
  },
  leaveTeamPost: (req, res) => {
    let teamId = req.params.id;
    let user = req.user
    console.log(teamId);

    Team.findById(teamId)
      .then((team) => {
        team.members.remove(user._id);
        user.teams.remove(team._id);

        team.save();
        user.save();

        res.redirect('/profile');
        return;
      }).catch((e) => {
        console.error(e);
        res.locals.globalError = 'Team not found.';
        res.render('errors/error-page');
        return;
      })
  }

};
