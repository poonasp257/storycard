import express from 'express';
import account from './account';
import item from './item';

const router = express.Router();

router.use('/account', account);
router.use('/item', item);

export default router;