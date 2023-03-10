const IncomeSchema = require("../models/IncomeModel");

exports.addIncome = async (req, res) => {
    console.log(req.body);
    const { title, amount, category, description, date } = req.body;

    const income = IncomeSchema({ title, amount, category, description, date });

    console.log(income);

    try {
        if (!title || !category || !description || !date) {
            return res
                .status(400)
                .json({ message: "Required fields must contain some info..." });
        }
        if (amount <= 0 || !amount === "number") {
            return res.status(400).json({ message: "Enter a valid amount..." });
        }
        await income.save();
        res.status(200).json({ message: "Income Added Successfully..." });
    } catch (error) {
        res.status(500).json({ message: "Failed to add income..." });
        console.log(error);
    }
};

exports.getIncomes = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: "failed to get incomes...." });
    }
};

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({ message: "Income Deleted Successfully...." });
        })
        .catch((err) => {
            res.status(500).json({ message: "Failed to delete income....." });
        });
};
