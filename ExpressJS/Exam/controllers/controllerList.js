const homeCont = require('./home-controller');
const userCont = require('./user-controller');
const errorCont = require('./error-controller');
const teamCont = require('./team-controller');
const projectCont = require('./project-controller');

module.exports = {
    homeCont,
    userCont,
    teamCont,
    projectCont,
    errorCont
};
