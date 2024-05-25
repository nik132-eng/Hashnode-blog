import express from 'express'
import User from '../model/user.js'
import bcrypt from 'bcrypt';


export const signupUser = async (request, res) => {
    try{
        const hashedPassword = await bcrypt.hash(request.body.password, 10);

        const user = { name: request.body.name, username: request.body.username, password: hashedPassword }
        const newUser = new User(user);
        await newUser.save();

        return res.status(200).json({msg: 'signup successfull'})
    }catch(e){
        return res.status(500).json({msg: 'Error while signup the user'})
    }
}