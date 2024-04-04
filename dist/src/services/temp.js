"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async;
fetchUser(id, string, next, express_1.NextFunction);
Promise < RowDataPacket[] > {
    try: {
        const: a, RowDataPacket, []:  = await new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users WHERE user_id=${id}`, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        }),
        console, : .log(a, "res"),
        return: a
    }, catch(error) {
        console.log(error, "error from catch block");
        next(new AppError("Invalid Query", 500));
        throw error; // Rethrow the error to maintain the promise rejection
    }
    // Either explicitly return void or Promise<void> here if you want to satisfy TypeScript
    // return; // or return Promise.resolve();
};
