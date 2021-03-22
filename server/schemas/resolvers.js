const { User, Thought } = require('../models');

const resolvers = {
    Query: {
        // Get all Users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        },
        // Get a single User by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        },
        // Get all thoughts / a user's thoughts
        thoughts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Thought.find(params).sort({ createdAt: -1 });
        },
        // Get single thought by ID
        thought: async (parent, { _id }) => {
            return Thought.findOne({ _id });
        }
    }
};

module.exports = resolvers;