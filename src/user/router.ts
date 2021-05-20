/**
 * Required External Modules and Interfaces
 */

 import express, { Request, Response } from "express";
 import bcrypt from 'bcryptjs';
 import jwt from 'jsonwebtoken';

 import User, { UserType } from './model';
 import Character, { CharacterType } from '../character/model';
 import { authenticateToken } from '../utils/auth';
 import { AUTH_OPTIONS } from '../config';

/**
 * Router Definition
 */
export const router = express.Router();

/**
 * Controller Definitions
 */

// POST create user
router.post("/register", async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, username, password } = req.body;
        
        const currentUser: UserType | null = await User.findOne({username: username});

        if (currentUser) {
            res.status(500).json({'errorMessage': 'This username is already taken'});
        }
        else {
            const newUser: UserType = new User({
                firstName,
                lastName,
                username,
                password
            });
        
            const response = await newUser.save();
            if (response) {
                return res.status(201).json({});
            }
            return res.status(500).json({errorMessage: 'Server Error. Please try it again later'});
        }
    } catch (e) {
        return res.status(500).json({errorMessage: 'Server Error. Please try it again later'});
    }
});


// POST login user
router.post("/login", async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user: UserType | null = await User.findOne({username}); 

        if (user) {
            const match = await bcrypt.compare(password, user.password); 
            
            const payload = { username: user.username };
            const token = jwt.sign(payload, process.env.JWT_SECRET, AUTH_OPTIONS);

            if (match) {
                return res.status(200).json({ token });
            } 
            return res.status(404).json({errorMessage: 'Authentication error'});    
        }
        else {
            return res.status(500).json({errorMessage: 'User is not found'});    
        }
    } catch (e) {
        return res.status(500).json({errorMessage: 'Server Error. Please try it again later'});
    }
});

// GET get characters associate with username
router.get("/characters", authenticateToken, async (req: Request, res: Response) => {
    try {
        const user: UserType = req.user;
        
        const currentUser: UserType | null = await User.findOne({username: user.username});

        if (currentUser) {
            const characters: CharacterType[] = await Character.find({username: user.username});
            res.status(200).json({characters});
        }
        else {
            return res.status(500).json({'errorMessage': 'This username is doesnt exist'});
        }
    } catch (e) {
        return res.status(500).json({errorMessage: 'Server Error. Please try it again later'});
    }
});