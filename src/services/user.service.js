import User from "../models/user.model.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import { passUtil } from "../util/passUtil.js";
import { RandomOTP, GetExpiredOtp } from "../util/otpUtil.js";
import { GetCurrentTime } from "../util/dateUtil.js";
import jwt from "jsonwebtoken";
import { mailService } from "../configs/sendMail.config.js";

class UserService {
    constructor() {
        this.user = User;
    }

    async Login(email, password) {
        try {
            const existedUser = await this.user.findOne({ email });
            if (!existedUser) {
                throw new Error("User not found");
            }

            const checkPass = await passUtil.compare(password, existedUser.password);

            if (!checkPass) {
                throw new Error("Password does not match");
            }

            //neu dang nhap thanh cong, tra ve token
            const accessToken = jwt.sign({ id: existedUser._id }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
            });
            const refreshToken = jwt.sign({ id: existedUser._id }, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
            });

            console.log("accessToken: ", accessToken);
            console.log("refreshToken: ", refreshToken);
            return { accessToken, refreshToken };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async Register(name, email, password) {
        try {
            const existedUser = await this.user.findOne({ email });
            if (existedUser) {
                throw new Error("User already exists");
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            if (!hashedPassword) {
                throw new Error("Error hashing password");
            }

            const newUser = new this.user({
                name,
                email,
                password: hashedPassword,
            });
            const savedUser = await newUser.save();
            if (!savedUser) {
                throw new Error("Error saving user");
            }
            return savedUser;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async GetAll() {
        try {
            return await this.user.find({});
        } catch (error) {
            throw new Error("Error retrieving users: " + error.message);
        }
    }

    async GetById(id) {
        const user = await this.user.find({ _id: new ObjectId(id) });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }

    async Create(user) {
        const newUser = await this.user.insertOne(user);
        if (newUser) {
            return newUser;
        }
        throw new Error("User creation failed");
    }

    async Update(id, user) {
        const result = await this.user.updateOne({ _id: new ObjectId(id) }, { $set: user });
        if (!result) {
            throw new Error("Update failed");
        }
        return result;
    }

    async Delete(id) {
        const result = await this.user.deleteOne({ _id: new ObjectId(id) });
        if (!result) {
            throw new Error("Delete failed");
        }
        return result;
    }

    async ForgotPassword(email) {
        try {
            const existedUser = await this.user.findOne({ email });
            if (!existedUser) {
                throw new Error("User not registered yet");
            }

            const otp = RandomOTP();
            const expiredOtp = GetExpiredOtp();

            existedUser.otp = otp;
            existedUser.otpExpire = expiredOtp;
            const updatedUser = await existedUser.save();

            if (!updatedUser) {
                throw new Error("Error saving OTP");
            }

            const mailOptions = {
                emailFrom: "oliver31@ethereal.email",
                emailTo: email,
                emailSubject: "Reset Your Password",
                emailText: `OTP: ${otp}. Expire in 5 minute.`,
            };

            const result = await mailService.sendMail(mailOptions);
            if (!result) {
                throw new Error("Error sending email");
            }

            return mailOptions;
        } catch (err) {
            throw new Error(`Failed to send password reset email: ${err.message}`);
        }
    }

    async ResetPassword(otp, email, newPassword) {
        try {
            const user = await this.user.findOne({ email });
            if (!user) {
                throw new Error("User not found");
            }

            if (!user.otp || !user.otpExpire) {
                throw new Error("No pending OTP");
            }

            if (user.otp !== otp) {
                throw new Error("Invalid OTP");
            }

            const currentTimeStamp = GetCurrentTime();
            if (currentTimeStamp > user.optExpire) {
                user.otp = undefined;
                user.otpExpire = undefined;
                await user.save();
                throw new Error("OTP has expired. Please request a new OTP.");
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            if (!hashedPassword) {
                throw new Error("Error hashing password");
            }

            user.password = hashedPassword;
            user.otp = undefined;
            user.otpExpire = undefined;

            const updatedUser = await user.save();

            return user;
        } catch (err) {
            throw new Error(`Failed to reset password: ${err.message}`);
        }
    }
}

export default new UserService();
