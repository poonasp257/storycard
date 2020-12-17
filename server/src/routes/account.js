import express from 'express';
import Account from '../models/account';
import { logger } from '../modules/logger';

import { isCorrectUsernameFormat, isCorrectPasswordFormat } from '../modules/validation';

const router = express.Router();

router.post('/signup', (request, response) => {
    const { username, password } = request.body;

    if (!isCorrectUsernameFormat(username)) {
        return response.json({
            error: "Incorrect username. username must be between 4-20 characters",
        });
    }

    if (!isCorrectPasswordFormat(password)) {
        return response.json({
            error: "Incorrect password. the password must be between 8-20 characters and contain a number",
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

           return response.json();
        });
    });
});

router.post('/signin', (request, response) => {
    const { username, password } = request.body;

    if(typeof password !== "string") {
        return response.json({
            error: "The username or password field is empty"
        });
    }

    Account.findOne({ username }, (err, account) => {
        if(err) { 
            logger.error(`${err}`);        
            throw err;
        }

        const errorMessage = "Incorrect username or password";

        if(!account) {
            return response.json({ 
                error: errorMessage  
            });
        }

        if(!account.validateHash(password)) {
            return response.json({
                error: errorMessage 
            });
        }

        request.session.loginInfo = {
            _id: account._id,
            username: account.username
        };

        return response.json();
    });
});

router.get('/getInfo', (req, res) => {
    if(typeof req.session.loginInfo === "undefined") {
        return res.json({ 
            error: "Your session is expired, please log in again" 
        });
    }

    return res.json({ username: req.session.loginInfo.username });
});

router.post('/logout', (req, res) => {
    req.session.destroy(err => { if(err) throw err; });
    return res.json({ success: true });
});

export default router;