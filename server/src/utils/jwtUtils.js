import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';

// function to generate a jwt
export const generateToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET, { expiresIn: '24h' });
};

// function to verify jwts
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
};