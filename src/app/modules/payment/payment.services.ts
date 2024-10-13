import path from "node:path"
import { readFileSync } from "fs";
import { verifyPayment } from "./payment_utils";
import { UserModel } from "../User/user.model";


const confirmationService = async (transactionId: string, status: string) => {
    const response = await verifyPayment(transactionId);
    const userEmail = response.cus_email;

    if (response.pay_status === 'Successful') {
        await UserModel.findOneAndUpdate(
            { email: userEmail },
            { isVerified: true },
            {new: true}
        );
    }

    let filePath;

    if (status === "success") {
        filePath = path.join(__dirname, "../../../views/success.html");
    } else if (status === "fail") {
        filePath = path.join(__dirname, "../../../views/fail.html");
    }

    const template = readFileSync(filePath!, "utf-8");

    return template;
}

export const paymentServices = {
    confirmationService,
}