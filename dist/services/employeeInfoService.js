"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeInfoService = void 0;
const http_status_codes_1 = require("http-status-codes");
const db_connection_1 = require("../config/db_connection");
const types_1 = require("../types");
class EmployeeInfoServ {
    static instance;
    constructor() { }
    static getInstance() {
        if (!EmployeeInfoServ.instance) {
            EmployeeInfoServ.instance = new EmployeeInfoServ();
        }
        return EmployeeInfoServ.instance;
    }
    async fetchEmployeeInfo(id) {
        try {
            const [result] = await db_connection_1.db.query(`SELECT * FROM employee_info WHERE employee_id=${id} AND active=1`);
            if (result.length === 0) {
                return new types_1.APIresponse(true, http_status_codes_1.StatusCodes.NOT_FOUND, http_status_codes_1.ReasonPhrases.NOT_FOUND);
            }
            return new types_1.APIresponse(false, http_status_codes_1.StatusCodes.OK, http_status_codes_1.ReasonPhrases.OK, result);
        }
        catch (error) {
            return new types_1.APIresponse(true, http_status_codes_1.StatusCodes.BAD_REQUEST, error.message);
        }
    }
    async addEmployeeInfo(id, info) {
        try {
            const [result] = await db_connection_1.db.query(`INSERT INTO employee_info (user_id,role_,join_date,employee_id)
        VALUES (${id},'${info.role_}','${info.join_date}',${info.employee_id})
        `);
            return new types_1.APIresponse(false, http_status_codes_1.StatusCodes.OK, http_status_codes_1.ReasonPhrases.OK);
        }
        catch (error) {
            return new types_1.APIresponse(true, http_status_codes_1.StatusCodes.BAD_REQUEST, error.message);
        }
    }
    async removeEmployeeInfo(id) {
        try {
            const [result] = await db_connection_1.db.query(`UPDATE employee_info SET active=0 WHERE employee_id=${id}`);
            return new types_1.APIresponse(false, http_status_codes_1.StatusCodes.OK, http_status_codes_1.ReasonPhrases.OK);
        }
        catch (error) {
            return new types_1.APIresponse(true, http_status_codes_1.StatusCodes.BAD_REQUEST, error.message);
        }
    }
    async updateEmployeeInfo(id, info) {
        try {
            let sql = `UPDATE employee_info SET`;
            if (info.employee_id) {
                sql += ` employee_id = '${info.employee_id}',`;
            }
            if (info.join_date) {
                sql += ` join_date = '${info.join_date}',`;
            }
            if (info.relive_date) {
                sql += ` relive_date = '${info.relive_date}',`;
            }
            if (info.role_) {
                sql += ` role_ = '${info.role_}',`;
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
}
exports.EmployeeInfoService = EmployeeInfoServ.getInstance();
