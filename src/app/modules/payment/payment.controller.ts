import { paymentServices } from "./payment.services";
import { catchAsync } from "../../utils/catchAsync";


const confirmationController = catchAsync(async (req, res) => {
    const { transactionId, status } = req.query;
    const result = await paymentServices.confirmationService(transactionId as string, status as string);

    res.send(result)
});

export const paymentControler = {
    confirmationController,
}