import express from 'express';
import Account from '../models/account';
import { logger } from '../modules/logger';

import { isCorrectUsernameFormat, isCorrectPasswordFormat } from '../modules/validation';

const router = express.Router();

router.post('/signup', (request, response) => {
    const { username, password } = request.body;

    if (!isCorrectUsernameFormat(username)) {
        return response.json({
            error: "incorrect username. username must be between 4-20 characters",
        });
    }

    if (!isCorrectPasswordFormat(password)) {
        return response.json({
            error: "incorrect password. the password must be between 8-20 characters and contain a number",
        });
    }

    Account.findOne({ username: username }, (err, exists) => {
        if(err) { 
            logger.error(`${err}`);        
            throw err;
        }

        if(exists) {
            return response.json({
                error: `"${username}" is aleady exists`
            });
        }

        let account = new Account({ username, password });
        account.password = account.generateHash(account.password);
        account.save(err => {
           if(err) { 
               logger.error(`${err}`);        
               throw err;
           }

           request.session.loginInfo = {
               _id: account._id,
               username: account.username
           };

           return response.json({ });
        });
    });
});

router.post('/signin', (req, res) => {
    if(typeof req.body.password !== "string") {
        return res.status(401).json({
            error: "LOGIN FAILED",
            code: 1
        });
    }

    Account.findOne({ username: req.body.username}, (err, account) => {
        if(err) throw err;

        // CHECK ACCOUNT EXISTANCY
        if(!account) {
            return res.status(401).json({
                error: "LOGIN FAILED",
                code: 1
            });
        }

        if(!account.validateHash(req.body.password)) {
            return res.status(401).json({
                error: "LOGIN FAILED",
                code: 1
            });
        }

        req.session.loginInfo = {
            _id: account._id,
            username: account.username
        };

        return res.json({ success: true });
    });
});

router.get('/getinfo', (req, res) =>{
    if(typeof req.session.loginInfo === "undefined") {
        return res.status(401).json({ error: 1 });
    }

    return res.json({ info: req.session.loginInfo });
});

router.post('/logout', (req, res) => {
    req.session.destroy(err => { if(err) throw err; });
    return res.json({ success: true });
});

export default router;