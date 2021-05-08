import { Router } from 'express';

const router = Router();

router.get('/api', function(req, res) {
  res.send('Home!');
});
router.get('/api/hello', function(req, res) {
  res.send('Hello World!');
});

router.get('/test/api', (req, res) => {
  res.send('test');
});


export default router;
