import { secureHeapUsed } from 'crypto';
import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie('token', token, {
        httpOnly: true, //cookie cannot be accessed or modified by the browser
        secure: process.env.NODE_ENV === 'production', //only works on https
        sameSite: 'strict', //prevent csrf attacks
        maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
    });

    return token;
};