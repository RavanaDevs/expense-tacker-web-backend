import { Schema, model, Document } from 'mongoose'

interface IExpense extends Document {
  amount: number
  category: string
  description: string
  date: Date
  user: Schema.Types.ObjectId
}

const expenseSchema = new Schema<IExpense>(
  {
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  },
  { timestamps: true }
)

// Create indexes for common queries
expenseSchema.index({ user: 1, date: -1 })
expenseSchema.index({ category: 1 })

const Expense = model<IExpense>('expense', expenseSchema)

export default Expense 