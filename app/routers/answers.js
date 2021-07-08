const jwt = require('koa-jwt');
const Router = require('koa-router');
const router = new Router({ prefix: '/questions/:questionId/answers' });

const { secret } = require('../config');

const auth = jwt({ secret });

const { 
  find,
  findById,
  create,
  update,
  delete: del,
  checkAnswerExist,
  checkAnswerer
} = require('../controllers/answers');

router.get('/', find);

router.post('/', auth, create);

router.get('/:id', checkAnswerExist, findById);

router.patch('/:id', auth, checkAnswerExist, checkAnswerer, update);

router.delete('/:id', auth, checkAnswerExist, checkAnswerer, del); 

module.exports = router;