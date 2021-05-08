import { Router } from 'express';

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


export default router;
