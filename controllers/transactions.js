const Transactions = require('../models/trasactions');
/**
 * @description get transactions
 * @path        GET /api/v1/transactions
 */
exports.getTransactions = async (req, res, next) => {
    try {
        const trans = await Transactions.find();

        return res.status(200).json({
            success: true,
            count: trans.length,
            data: trans
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message || 'Server error'
        });
    }
}

/**
 * @description add transactions
 * @path        POST /api/v1/transactions
 */
exports.addTransactions = async (req, res, next) => {
    try {
        const trans = await Transactions.create(req.body);

        return res.status(201).json({
            success: true,
            count: trans.length,
            data: trans
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: messages
            });
        }
        return res.status(500).json({
            success: false,
            error: error.message || 'Server error'
        });
    }
}

/**
 * @description delete transactions
 * @path        DELETE /api/v1/transactions
 */
exports.deleteTransactions = async (req, res, next) => {
    try {
        const { id } = req.params;
        const trans = await Transactions.findById(id);
        if (!trans) {
            return res.status(404).json({
                success: false,
                error: 'No translation found'
            });
        }

        await trans.remove();
        return res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message || 'Server error'
        });
    }
}