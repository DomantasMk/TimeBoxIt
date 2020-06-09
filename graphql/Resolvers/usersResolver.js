const User = require('../../models/user');
const jsonWebToken = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

module.exports = {
    users: () =>{
        //Return password should be null
        return User.find().populate('addedTasks');
    },  
    createUser: (args) =>{
        return User.findOne({email: args.userInput.email}).then(user =>{
            if(user){
                throw new Error('User exists already.');
            }
            else{
                return bcrypt.hash(args.userInput.password, 12); 
            }
        })
        .then(hashedPassword => {
            const user = new User({
                email: args.userInput.email,
                username: args.userInput.username,
                password: hashedPassword

            });
            return user.save();
        })
        .then(result => {
            return {...result._doc, password: null, _id : result.id}
        })
        .catch(err => {
            throw err;
        })

    },
    login: async ({email, password}) =>{
        const user = await User.findOne({email: email});

        if(!user){
            //rework into custom error messages with status codes
            throw new Error('User does not exist!');
        }
        const PasswordMatches = await bcrypt.compare(password, user.password);
        if(!PasswordMatches){
            throw new Error('Password is incorrect');
        }
        const token = jsonWebToken.sign({userId: user.id, email: user.email}, 'ThisIsAKeyForHashingTheTokenForSecurity',
        {expiresIn: '1000h'});

        return {userId: user.id,
                token:token,
                tokenExpiration: 1000}
    },
    authenticate: ({token}, req) =>{
        try{
            tokenVerification = jsonWebToken.verify(token, 'ThisIsAKeyForHashingTheTokenForSecurity');
        }
        catch{
            return false;
        }
        if(!tokenVerification){
            return false;
        }
        return true;
    }
}