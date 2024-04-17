"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressServiceS1 = void 0;
const http_status_codes_1 = require("http-status-codes");
const db_connection_1 = require("../config/db_connection");
const types_1 = require("../types");
const abstractAddressService_1 = require("../abstarctService/abstractAddressService");
class AddressServS1 extends abstractAddressService_1.AddressServiceAb {
    static instance;
    constructor() {
        super();
    }
    static getInstance() {
        if (!AddressServS1.instance) {
            AddressServS1.instance = new AddressServS1();
        }
        return AddressServS1.instance;
    }
    async getUserAddress(id) {
        try {
            const [result] = await db_connection_1.db.query(`SELECT address FROM address WHERE user_id=${id} AND 1=(SELECT active from users WHERE user_id=${id})`);
            if (result.length === 0) {
                return new types_1.APIresponse(true, http_status_codes_1.StatusCodes.NOT_FOUND, "No user Found");
            }
            return new types_1.APIresponse(false, http_status_codes_1.StatusCodes.OK, http_status_codes_1.ReasonPhrases.OK, result);
        }
        catch (error) {
            return new types_1.APIresponse(true, http_status_codes_1.StatusCodes.BAD_REQUEST, error.message);
        }
    }
    async addUserAddress(id, address) {
        try {
            const [result] = await db_connection_1.db.query(`INSERT INTO address (user_id,address) VALUES (${id},'${address}')`);
            return new types_1.APIresponse(false, http_status_codes_1.StatusCodes.OK, "address added successfully");
        }
        catch (error) {
            return new types_1.APIresponse(true, http_status_codes_1.StatusCodes.BAD_REQUEST, error.message);
        }
    }
    async deleteUserAddress(id) {
        try {
            const [result] = await db_connection_1.db.query(`UPDATE  address SET active=0 WHERE user_id=${id}`);
            return new types_1.APIresponse(false, http_status_codes_1.StatusCodes.OK, http_status_codes_1.ReasonPhrases.OK);
        }
        catch (error) {
            return new types_1.APIresponse(true, http_status_codes_1.StatusCodes.BAD_REQUEST, error.message);
        }
    }
    async updateUserAddress(id, address) {
        try {
            const [result] = await db_connection_1.db.query(`UPDATE address SET address='${address}' WHERE user_id=${id}`);
            return new types_1.APIresponse(false, http_status_codes_1.StatusCodes.OK, "address updated successfully");
        }
        catch (error) {
            return new types_1.APIresponse(true, http_status_codes_1.StatusCodes.BAD_REQUEST, error.message);
        }
    }
}
exports.AddressServiceS1 = AddressServS1.getInstance();
