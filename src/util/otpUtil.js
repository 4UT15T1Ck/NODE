import { GetCurrentDate } from './dateUtil.js'; 

export const RandomOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
};

export const GetExpiredOtp = () => {
    const currentTime = GetCurrentDate(); 
    const expirationTime = new Date(currentTime.getTime()); 
    expirationTime.setMinutes(currentTime.getMinutes() + 5);
    return expirationTime; 
};