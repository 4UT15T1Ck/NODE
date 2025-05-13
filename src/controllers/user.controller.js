import userService from "../services/user.service.js";
import jwt from "jsonwebtoken";
import { mailService } from "../configs/sendMail.config.js";

class UserController {
    async SendEmail(req, res, next) {
        try {
            const email = req.body.email;

            const mailOptions = {
                emailFrom: "saygex@gmail.com",
                emailTo: email,
                emailSubject: "this a threat for say gex",
                emailText: "This a threat for say gex",
            };

            const result = await mailService.sendMail(mailOptions);
            if (!result) {
                return res.status(404).json({ message: "Error sending email" });
            }
            console.log("result: ", result);
            return res.status(200).json({ message: "Email sent successfully", data: result });
        } catch (err) {
            next(err);
            return res.status(500).json({ message: "Error logging in user" });
        }
    }

    async Login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "Missing require fields" });
            }
            console.log("controller: ", email, password);

            const token = await userService.Login(email, password);
            if (!token) {
                return res.status(404).json({ message: "Error logging in user at service" });
            }

            return res.status(200).json({ message: "Login successfully", data: token });
        } catch (err) {
            next(err);
            return res.status(500).json({ message: "Error logging in user" });
        }
    }

    async Register(req, res, next) {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return res.status(400).json({ message: "All fields are required" });
            }
            const user = await userService.Register(name, email, password);
            if (!user) {
                return res.status(400).json({ message: "User registration failed" });
            }
            return res.status(201).json({ message: "User registered successfully", data: user });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async GetAll(req, res, next) {
        try {
            const users = await userService.GetAll();
            return res.status(200).json({ data: users });
        } catch (error) {
            next(error);
        }
    }

    async GetById(req, res, next) {
        try {
            const id = req.params.id;
            const user = await userService.GetById(id);
            if (!user) {
                return res.status(404).json("Not Found");
            }
            return res.status(200).json({ data: user });
        } catch (error) {
            next(error);
        }
    }

    async Create(req, res, next) {
        try {
            const body = req.body;
            const newUser = await userService.Create(body);
            if (!newUser) {
                return res.status(400).json("Bad Request");
            }
            return res.status(201).json({ data: newUser });
        } catch (error) {
            next(error);
        }
    }

    async Update(req, res, next) {
        try {
            const id = req.params.id;
            const body = req.body;
            const updatedUser = await userService.Update(id, body);
            if (!updatedUser) {
                return res.status(404).json("Not Found");
            }
            return res.status(200).json("Updated Successfully");
        } catch (error) {
            next(error);
        }
    }

    async Delete(req, res, next) {
        try {
            const id = req.params.id;
            const deleted = await userService.Delete(id);
            if (!deleted) {
                return res.status(404).json("Not Found");
            }
            return res.status(200).json("Deleted Successfully");
        } catch (error) {
            next(error);
        }
    }

    async ForgotPassword(req, res, next) {
        try {
            const { email } = req.body;
            if (!email) {
                return res.status(400).json({ message: "Missing email" });
            }
            const result = await userService.ForgotPassword(email);
            if (!result) {
                return res.status(404).json({ message: "Error sending email" });
            }
            return res.status(200).json({ message: "Email sent successfully", data: result });
        } catch (error) {
            next(error);
        }
    }

    async ResetPassword(req, res, next) {
        try {
            const otp = req.body.otp;
            const email = req.body.email;
            const password = req.body.password;
            if (!password) {
                return res.status(400).json({ message: "Missing password" });
            }
            const result = await userService.ResetPassword(otp, email, password);
            if (!result) {
                return res.status(404).json({ message: "Error resetting password" });
            }
            return res.status(200).json({ message: "Password reset successfully", data: result });
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();
