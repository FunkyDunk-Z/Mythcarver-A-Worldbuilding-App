import { Schema, model, Types, Document, Query } from 'mongoose'
import { hash, compare } from 'bcrypt'
import { randomBytes, createHash } from 'crypto'
// import Codex from './codexModel'

type UserCodex = {
  id: Types.ObjectId
  codexName: string
  createdby: Types.ObjectId
}[]

interface IUser {
  firstName: string
  lastName: string
  username: string
  email: string
  avatarURL?: string
  codex: UserCodex
}

interface UserDocument extends IUser, Document {
  password: string | undefined
  passwordConfirm?: string
  passwordChangedAt?: Date
  passwordResetToken?: string | undefined
  passwordResetExpiresIn?: Date | undefined
  active: boolean
  getUserInfo(): void
  changedPasswordAfter(JWTTimestamp: Date): boolean
  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>
  createPasswordResetToken(): string
}

const userSchema = new Schema<UserDocument>(
  {
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
        validator: function (value: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
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
        validator: function (this: UserDocument, value: string): boolean {
          return value === this.password
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
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  if (this.password) {
    this.password = await hash(this.password, 12)
  }

  this.passwordConfirm = undefined

  next()
})

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) {
    return next()
  }

  this.passwordChangedAt = new Date(Date.now() - 1000)
  next()
})

userSchema.pre(
  /^find/,
  async function (this: Query<UserDocument[], UserDocument>, next) {
    this.find({ active: { $ne: false } })

    const codex = await import('./codexModel')
    // console.log('codex needed for populate', codex)

    this.populate({
      path: 'codex',
      select: '-__v',
    })

    next()
  }
)

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await compare(candidatePassword, userPassword)
}

userSchema.methods.changedPasswordAfter = function (JWTTimestamp: Date) {
  if (this.passwordChangedAt instanceof Date) {
    const changedTimestamp = this.passwordChangedAt.getTime() / 1000
    return JWTTimestamp.getTime() < changedTimestamp
  }

  return false
}

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = randomBytes(32).toString('hex')

  this.passwordResetToken = createHash('sha256')
    .update(resetToken)
    .digest('hex')

  this.passwordResetExpiresIn = new Date(Date.now() + 10 * 60 * 1000)

  return resetToken
}

userSchema.methods.getUserInfo = function () {
  const { _id, email, username, firstName, lastName, codex, avatarURL } = this

  return {
    id: _id,
    email,
    username,
    firstName,
    lastName,
    codex,
    avatarURL,
  }
}

const User = model<UserDocument>('User', userSchema)

export default User
