const tasksResolver = require('./tasksResolver');
const usersResolver = require('./usersResolver');

const rootResolver = {
    ...tasksResolver,
    ...usersResolver
}

module.exports = rootResolver;