import express from 'express'
import User from '../model/user.js'
import Token from '../model/token.js'
import jwt from 'jsonwebtoken';

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

export const loginUser = async (req, res) => {
    let user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json({ msg: 'Username does not match' });
    }
  
    try {
      let match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        const accessToken = jwt.sign(
          {
            id: user._id,
            name: user.name,
            username: user.username,
          },
          process.env.ACCESS_SECRET_KEY,
          { expiresIn: 900 }
        );
        const refreshToken = jwt.sign(
          {
            id: user._id,
            name: user.name,
            username: user.username,
          },
          process.env.REFRESH_SECRET_KEY
        );
  
        const newToken = new Token({ token: refreshToken });
        await newToken.save();
  
        res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, name: user.name, username: user.username });
      } else {
        res.status(400).json({ msg: 'Password does not match' })
      }
    } catch (error) {
      console.log("error ˇ", error)
      res.status(500).json({ msg: 'error while login the user' })
    }
  }