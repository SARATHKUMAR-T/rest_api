"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userInstance = void 0;
const userService_1 = __importDefault(require("../services/userService"));
class userController {
    static instance;
    constructor() { }
    static getInstance() {
        if (!userController.instance) {
            userController.instance = new userController();
        }
        return userController.instance;
    }
    async getUser(req, res, next) {
        try {
            const result = await userService_1.default.fetchUser(req.params.id);
            res.status(result.status).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async newUser(req, res, next) {
        try {
            const result = await userService_1.default.addUser(req.body);
            res.status(result.status).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async updateUser(req, res, next) {
        try {
            const result = await userService_1.default.updateUser(req.body, req.params.id);
            res.status(result.status).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async deleteUser(req, res, next) {
        try {
            const result = await userService_1.default.removeUser(req.params.id);
            res.status(result.status).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async getReport(req, res, next) {
        try {
            const result = await userService_1.default.userReport(req.params.id);
            if (result.data)
                return res.status(result.status).download(result.data);
            return res.status(result.status).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    // public async getBase64(req: Request, res: Response, next: NextFunction) {
    //   const id = req.params.id;
    //   try {
    //     const result = await userServ.userReport(id);
    //     //  creation of excel sheet
    //     const workbook = new Excel.Workbook();
    //     const worksheet = workbook.addWorksheet("employee report");
    //     const reportColumns = [
    //       { key: "employee_id", header: "Employee Id" },
    //       { key: "user_name", header: "Employee Name" },
    //       { key: "role_", header: "Role" },
    //       { key: "address", header: "Address" },
    //       { key: "amount", header: "Salary" },
    //       { key: "payment_date", header: "Pay Date" },
    //     ];
    //     worksheet.columns = reportColumns;
    //     result.forEach((item: any) => {
    //       worksheet.addRow(item);
    //     });
    //     const filepath = path.format({
    //       dir: "./src/reports",
    //       base: `${result[0].user_name}'s report.xlsx`,
    //     });
    //     await workbook.xlsx.writeFile(filepath);
    //     fs.readFile(filepath, (err, data) => {
    //       if (err) {
    //         return res.status(500).json({ message: "unable to fetch report" });
    //       }
    //       const encoded = Base64.encode(data.toString());
    //       return res.status(200).json({
    //         File: encoded,
    //         message: "Report fetched successfully",
    //       });
    //     });
    //   } catch (error: Error | any) {
    //     console.log(error, "error while fetching report");
    //     next(new AppError(error.message, 404));
    //   }
    // }
    async addEmployee(req, res, next) {
        try {
            // const result = await userServ.addEmployeeInfo(req.params.id, req.body);
            // if (result.data) return res.status(result.status).download(result.data);
            // return res.status(result.status).json(result);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.userInstance = userController.getInstance();
