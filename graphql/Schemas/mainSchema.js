const {buildSchema} = require('graphql');

module.exports = buildSchema(`
type Task {
    _id: ID!
    title: String!
    description: String
    date: String
    state: Boolean
}

type User {
    _id: ID!
    email: String!
    password: String
    addedTasks: [Task!]
}
type AuthenticationData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

input TaskInput {
    title: String
    description: String
    date: String
    state: Boolean
}

input UserInput{
    email: String!
    password: String!
}

type RootQuery{
    tasks: [Task!]!
    users: [User!]
    login(email: String!, password: String!): AuthenticationData!
}

type RootMutation{
    createTask(taskInput: TaskInput): Task
    updateTask(id: ID!, taskInput: TaskInput): Task
    deleteTask(id: ID!): Boolean
    createUser(userInput: UserInput): User
}

schema{
    query: RootQuery
    mutation: RootMutation
}

`);