const ExpenseSchema = require('../models/ExpenseModel')

exports.addExpense = async (req, res) => {
    console.log(req.body);
    const { title, amount, category, description, date } = req.body;

    const expense = ExpenseSchema({ title, amount, category, description, date });

    console.log(expense);

    try {
        if (!title || !category || !description || !date) {
            return res
                .status(400)
                .json({ message: "Required fields must contain some info..." });
        }
        if (amount <= 0 || !amount === "number") {
            return res.status(400).json({ message: "Enter a valid amount..." });
        }
        await expense.save();
        res.status(200).json({ message: "Expense Added Successfully..." });
    } catch (error) {
        res.status(500).json({ message: "Failed to add expense..." });
        console.log(error);
    }
};

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: "failed to get expenses...." });
    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((expense) => {
            res.status(200).json({ message: "Expense Deleted Successfully...." });
        })
        .catch((err) => {
            res.status(500).json({ message: "Failed to delete expense....." });
        });
};
