const tasksResolver = require('./tasksResolver');
const usersResolver = require('./usersResolver');
const topicsResolver = require('./topicsResolver');

const rootResolver = {
    ...tasksResolver,
    ...usersResolver,
    ...topicsResolver
}

module.exports = rootResolver;