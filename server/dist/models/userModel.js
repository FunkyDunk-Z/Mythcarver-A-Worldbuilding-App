import { Schema, model } from 'mongoose';
import { hash, compare } from 'bcrypt';
import { randomBytes, createHash } from 'crypto';
const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'please provide a first name'],
    },
    lastName: {
        type: String,
        required: [true, 'please provide a last name'],
    },
    username: {
        type: String,
        required: [true, 'please provide a username'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'please provide a valid email'],
        unique: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Invalid email address format',
        },
    },
    password: {
        type: String,
        required: [true, 'please provide a valid password'],
        minLength: [3, 'password must be at least three characters'],
    },
    passwordConfirm: {
        type: String,
        required: [true, 'please confirm password'],
        validate: {
            validator: function (value) {
                return value === this.password;
            },
            message: 'passwords do not match!',
        },
        select: false,
    },
    avatarURL: String,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpiresIn: Date,
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
    codex: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Codex',
        },
    ],
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
userSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    if (this.password) {
        this.password = await hash(this.password, 12);
    }
    this.passwordConfirm = undefined;
    next();
});
userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew)
        return next();
    this.passwordChangedAt = new Date(Date.now() - 1000);
    next();
});
userSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } });
    // console.log(this)
    this.populate({
        path: 'codex',
        select: 'codexName',
    });
    next();
});
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await compare(candidatePassword, userPassword);
};
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt instanceof Date) {
        const changedTimestamp = this.passwordChangedAt.getTime() / 1000;
        return JWTTimestamp.getTime() < changedTimestamp;
    }
    return false;
};
userSchema.methods.createPasswordResetToken = function () {
    const resetToken = randomBytes(32).toString('hex');
    this.passwordResetToken = createHash('sha256')
        .update(resetToken)
        .digest('hex');
    this.passwordResetExpiresIn = new Date(Date.now() + 10 * 60 * 1000);
    return resetToken;
};
userSchema.methods.getUserInfo = function () {
    const { _id, email, username, firstName, lastName, codex, avatarURL } = this;
    return {
        id: _id,
        email,
        username,
        firstName,
        lastName,
        codex,
        avatarURL,
    };
};
const User = model('User', userSchema);
// const codexSchema = new Schema<ICodex>({
//   createdBy: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   codexName: String,
//   species: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: 'Species',
//     },
//   ],
//   traits: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: 'Traits',
//     },
//   ],
//   nations: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: 'Nations',
//     },
//   ],
//   factions: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: 'Factions',
//     },
//   ],
//   characters: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: 'Character',
//     },
//   ],
//   locations: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: 'Locations',
//     },
//   ],
//   settlements: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: 'Settlements',
//     },
//   ],
//   campaigns: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: 'Campaigns',
//     },
//   ],
// })
// // codexSchema.pre(/^find/, function (next) {
// //   this.populate({
// //     path: 'characters',
// //     select: '-__v ',
// //   })
// //   next()
// // })
// codexSchema.pre('save', async function (next) {
//   try {
//     const user: IUser | null = await User.findById(this.createdBy)
//     if (user) {
//       user.codex.push(this._id)
//       await user.save()
//     }
//     next()
//   } catch (error) {
//     next()
//   }
// })
// const Codex = model<ICodex>('Codex', codexSchema)
export default User;
