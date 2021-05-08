import { Router } from 'express';
import User from './models/User';

const router = Router();

router.get('/', function(req, res) {
  res.send('Home!');
});
router.get('/hello', function(req, res) {
  res.send('Hello World!');
});

router.get('/test', (req, res) => {
  res.send('test');
});

router.post('/user', async (req, res) => {
  const { email, firstName, lastName } = req.query;
  const newUser = await new User({
    email,
    firstName,
    lastName,
  })
    .save()
    .catch((e: Error) => res.status(500).send(e.message));

  res.send(newUser);
});

export default router;
