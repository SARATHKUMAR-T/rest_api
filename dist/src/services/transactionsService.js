"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionService = void 0;
const http_status_codes_1 = require("http-status-codes");
const db_connection_1 = require("../config/db_connection");
const types_1 = require("../types");
class TransactionServ {
    static instance;
    constructor() { }
    static getInstance() {
        if (!TransactionServ.instance) {
            TransactionServ.instance = new TransactionServ();
        }
        return TransactionServ.instance;
    }
    async fetchTransaction(id) {
        try {
            const [result] = await db_connection_1.db.query(`SELECT * FROM transactions WHERE employee_id=${id} AND active=1`);
            if (result.length === 0) {
                return new types_1.APIresponse(true, http_status_codes_1.StatusCodes.NOT_FOUND, http_status_codes_1.ReasonPhrases.NOT_FOUND);
            }
            return new types_1.APIresponse(false, http_status_codes_1.StatusCodes.OK, http_status_codes_1.ReasonPhrases.OK, result);
        }
        catch (error) {
            return new types_1.APIresponse(true, http_status_codes_1.StatusCodes.BAD_REQUEST, error.message);
        }
    }
    async addTransaction(id, transaction) {
        try {
            const [result] = await db_connection_1.db.query(`INSERT INTO transactions (employee_id,amount,payment_date) VALUES (${id},${transaction.amount},'${transaction.payment_date}')`);
            return new types_1.APIresponse(false, http_status_codes_1.StatusCodes.OK, http_status_codes_1.ReasonPhrases.OK);
        }
        catch (error) {
            return new types_1.APIresponse(true, http_status_codes_1.StatusCodes.BAD_REQUEST, error.message);
        }
    }
    async updateTransaction(id, transaction) {
        try {
            let sql = `UPDATE transactions SET`;
            if (transaction.amount) {
                sql += ` amount = ${transaction.amount},`;
            }
            if (transaction.payment_date) {
                sql += ` payment_date = '${transaction.payment_date}',`;
            }
            sql = sql.slice(0, -1);
            sql += ` WHERE employee_id = ${id}`;
            const [result] = await db_connection_1.db.query(sql);
            return new types_1.APIresponse(false, http_status_codes_1.StatusCodes.OK, http_status_codes_1.ReasonPhrases.OK);
        }
        catch (error) {
            return new types_1.APIresponse(true, http_status_codes_1.StatusCodes.BAD_REQUEST, error.message);
        }
    }
    async deleteTransaction(id) {
        try {
            const [result] = await db_connection_1.db.query(`UPDATE transactions SET active=0 WHERE employee_id=${id} `);
            return new types_1.APIresponse(false, http_status_codes_1.StatusCodes.OK, http_status_codes_1.ReasonPhrases.OK);
        }
        catch (error) {
            return new types_1.APIresponse(true, http_status_codes_1.StatusCodes.BAD_REQUEST, error.message);
        }
    }
}
exports.transactionService = TransactionServ.getInstance();
