import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { UserModel } from "../User/user.model";
import { TLoginUser, TRegisterUser } from "./auth.interface";
import { createToken } from "../../utils/verifyJWT";
import config from "../../config";
import { USER_STATUS } from "../User/user.constant";
import bcrypt from 'bcrypt';
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken"
import { transporter } from "../../utils/nodeMailerSetup";

interface IJwtPayload extends JwtPayload {
    id?: string;  // Optional 'id' property if it's present
}


const registerUser = async (payload: TRegisterUser) => {
    // checking if the user is exist
    const user = await UserModel.isUserExistsByEmail(payload?.email);

    if (user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is already exist!');
    }

    const newUser = await UserModel.create(payload);

    const jwtPayload = {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profilePhoto: newUser.profilePhoto,
        role: newUser.role,
        status: newUser.status,
        isVarified: newUser.isVerified,
        isDeleted: newUser.isDeleted,
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string
    );

    const refreshToken = createToken(
        jwtPayload,
        config.jwt_refresh_secret as string,
        config.jwt_refresh_expires_in as string
    );

    return {
        accessToken,
        refreshToken,
    };
};


const userLogin = async (payload: TLoginUser) => {
    // checking if the user is exist
    const user = await UserModel.isUserExistsByEmail(payload?.email);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
    }

    // checking if the user is blocked
    const userStatus = user?.status;

    if (userStatus === USER_STATUS.BLOCKED) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
    }

    //checking if the password is correct

    if (!(await UserModel.isPasswordMatched(payload?.password, user?.password)))
        throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

    //create token and sent to the  client

    const jwtPayload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePhoto: user.profilePhoto,
        role: user.role,
        status: user.status,
        isVarified: user.isVerified,
        isDeleted: user.isDeleted,
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string
    );

    const refreshToken = createToken(
        jwtPayload,
        config.jwt_refresh_secret as string,
        config.jwt_refresh_expires_in as string
    );

    return {
        accessToken,
        refreshToken,
    };
};


const changePassword = async (
    userData: JwtPayload,
    payload: { oldPassword: string; newPassword: string }
) => {
    // checking if the user is exist
    const user = await UserModel.isUserExistsByEmail(userData.email);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
    }

    // checking if the user is blocked

    const userStatus = user?.status;

    if (userStatus === USER_STATUS.BLOCKED) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
    }

    //checking if the password is correct

    if (!(await UserModel.isPasswordMatched(payload.oldPassword, user?.password))) {
        throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
    }


    //hash new password
    const newHashedPassword = await bcrypt.hash(
        payload.newPassword,
        Number(config.bcrypt_salt_rounds)
    );

    await UserModel.findOneAndUpdate(
        {
            email: userData.email,
            role: userData.role,
        },
        {
            password: newHashedPassword,
            passwordChangedAt: new Date(),
        }
    );

    return null;
};

const forgotPassword = async (email: string) => {

    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User with this email does not exist');
    }

    // Generate a JWT token for password reset
    const resetToken = jwt.sign(
        { id: user._id },
        config.jwt_access_secret as string, // Your JWT secret key
        { expiresIn: '10m' }
    );

    const resetUrl = `${config.client_url}/reset-password/${resetToken}`;

    // Send reset link to user's email
    const mailOptions = {
        to: user.email,
        from: config.email_user,
        subject: 'Password Reset Request',
        html: `
            <div style={{
                display: 'flex',
                flex-derection: "column",
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',  // পুরো ভিউপোর্টের উচ্চতা জুড়ে সেন্টার করার জন্য
                backgroundColor: '#f0f0f0',  // হালকা ব্যাকগ্রাউন্ড রঙ
                fontFamily: 'Arial, sans-serif',
                textAlign: 'center',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }}>
                <p style={{ fontSize: '18px', color: '#555' }}>দূর মিয়া পাসওয়ার্ড মনে থাকে না!🤓</p>
                <h1 style={{ fontSize: '20px', color: '#333' }}>পাসওয়ার্ড চেঞ্জ করার রাজ্যে আপনাকে স্বাগতম😳</h1>
                <p style={{ fontSize: '16px', color: '#777' }}>
                    এই
                    <a href=${resetUrl} style={{
                        color: '#4CAF50',  // লিংকের জন্য সবুজ রঙ
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        marginLeft: '5px'
                    }}>
                        লিংকে
                    </a>
                    ক্লিক কইরা চেঞ্জ করে নেন।
                </p>
            </div>
        `
    };

    const result = await transporter.sendMail(mailOptions);

    return result;
}

const resetPassword = async (token: string, password: string) => {
    const decoded = jwt.verify(token, config.jwt_access_secret as string) as IJwtPayload;

    const user = await UserModel.findOne({
        _id: decoded.id,
    });

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "Invalid or expired token'");
    }

    const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));

    const result = await UserModel.findByIdAndUpdate(
        decoded.id,
        { password: hashedPassword },
        { new: true }
    )

    return result;
}





export const AuthServices = {
    registerUser,
    userLogin,
    changePassword,
    forgotPassword,
    resetPassword,
};