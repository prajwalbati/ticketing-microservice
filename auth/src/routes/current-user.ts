import express from 'express';

import { currentUser, requireAuth } from '@satik-tickets/common';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, requireAuth, (req, res) => {
    return res.send({currentUser: req.currentUser});
});

export { router as currentUserRouter };