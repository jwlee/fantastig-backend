import { model, Schema, Document, Model} from 'mongoose';
import bcrypt from 'bcryptjs';

export interface UserType extends Document {
    firstName: string,
    lastName: string,
    username: string,
    password: string,
}

const UserSchema: Schema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: { 
        type: String,
        unique:true
    },
    password: {
        type: String,
        required: true,
    },
},{
    timestamps: true
});


// encrypt password before save
UserSchema.pre('save', function(next) {
    const user = this;
    if(!user.isModified || !user.isNew) { // don't rehash if it's an old user
        next();
    } else {
        const SALTING_ROUNDS: number = parseInt(process.env.SALTING_ROUNDS as string, 10);

        bcrypt.hash(user.password, SALTING_ROUNDS, function(err, hash) {
            if (err) {
                console.log('Error hashing password for user', user.name);
                next(err);
            } else {
                user.password = hash;
                next();
            }
        });
    }
});

const User: Model<UserType> = model('User', UserSchema);

export default User;