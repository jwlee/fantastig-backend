/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import Character, { CharacterType } from './model';
import User, { UserType } from '../user/model';
import { authenticateToken } from '../utils/auth';
/**
 * Router Definition
 */
export const router = express.Router();

/**
 * Controller Definitions
 */

/**
 * TODO
 * 1) better handler/validation for body
 * 2) better edge case handler for response
 */

// GET characters
router.get("/", async (req: Request, res: Response) => {
    try {
        const characters: CharacterType[] = await Character.find();

        res.status(200).json({characters});
    } catch (e) {
        res.status(500).json({errorMessage: 'Server Error. Please try it again later'});
    }
});

// GET character/:id
router.get("/:id", async (req: Request, res: Response) => {

    try {
        const character: CharacterType | null = await Character.findOne({_id: req.params.id});
        if (character) {
            return res.status(200).json({character});
        }
        return res.status(404).json({errorMessage: "Character not found"});
    } catch (e) {
        return res.status(500).json({errorMessage: 'Server Error. Please try it again later'});
    }
});

// POST character
router.post("/", authenticateToken, async (req: Request, res: Response) => {
    try {
        const character: CharacterType  = req.body;
        const user: UserType = req.user;

        const newCharacter = new Character({
            ...character,
            username: user.username
        });
        const response = await newCharacter.save();
        if (response) {
            return res.status(201).json(newCharacter);
        }
        return res.status(500).json({errorMessage: 'Server Error. Please try it again later'});
    } catch (e) {
        return res.status(500).json({errorMessage: 'Server Error. Please try it again later'});
    }
});

// PUT character/:name
router.put("/:id", authenticateToken, async (req: Request, res: Response) => {
    try {
        const charaterUpdate: CharacterType = req.body;
        const user: UserType = req.user;
        const response: any = await Character.findOneAndUpdate({_id: req.params.id, username: user.username}, charaterUpdate);
        if (response)  {
            return res.status(200).json({successMessage: 'Successfully updated', });
        }
        return res.status(500).json({errorMessage: 'Server Error. Please try it again later'});
    } catch (e) {
        return res.status(500).json({errorMessage: 'Server Error. Please try it again later'});
    }
});

// DELETE character/:id
router.delete("/:id", authenticateToken, async (req: Request, res: Response) => {
  try {
        const user: UserType = req.user;
        const response: any = await Character.findOne({_id: req.params.id, username: user.username}).remove();

        if (response)  {
            return res.status(200).json({successMessage: 'Successfully deleted'});
        }
        return res.status(500).json({errorMessage: 'Server Error. Please try it again later'});
    } catch (e) {
        return res.status(500).json({errorMessage: 'Server Error. Please try it again later'});
    }
});