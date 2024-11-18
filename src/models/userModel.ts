import { Schema, model, Document } from 'mongoose'

interface IUser extends Document {
  firstName: string
  lastName: string
  email: string
  password: string
}

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
  },
  { timestamps: true },
)

const User = model<IUser>('user', userSchema)

export default User
