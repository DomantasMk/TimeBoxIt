const {buildSchema} = require('graphql');

module.exports = buildSchema(`
type Task {
    _id: ID!
    title: String!
    description: String
    from: String
    to: String
    date: String
    state: Boolean
    topic: Topic
}

type User {
    _id: ID!
    email: String!
    username: String!
    password: String
    addedTasks: [Task!]
}
type AuthenticationData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
}
type Topic {
    _id: ID!
    title: String!
    description: String
}

input TaskInput {
    title: String
    description: String
    from: String
    to: String
    date: String
    state: Boolean
    topic: String
}

input UserInput{
    email: String!
    username: String!
    password: String!
}

input TopicInput{
    title: String
    description: String
}

type RootQuery{
    tasks: [Task!]!
    users: [User!]
    topics: [Topic!]
    login(email: String!, password: String!): AuthenticationData!
    authenticate(token: String!): Boolean
}

type RootMutation{
    createTask(taskInput: TaskInput): Task
    updateTask(id: ID!, taskInput: TaskInput): Task
    deleteTask(id: ID!): Boolean
    createTopic(topicInput: TopicInput): Topic
    updateTopic(id: ID!, topicInput: TopicInput): Topic
    deleteTopic(id: ID!): Boolean
    createUser(userInput: UserInput): User
}

schema{
    query: RootQuery
    mutation: RootMutation
}

`);