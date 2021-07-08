const jwt = require('koa-jwt');
const Router = require('koa-router');
const router = new Router({ prefix: '/questions/:questionId/answers/:answerId/comments' });

const { secret } = require('../config');

const auth = jwt({ secret });

const { 
  find,
  findById,
  create,
  update,
  delete: del,
  checkCommentExist,
  checkCommentator
} = require('../controllers/comments');

router.get('/', find);

router.post('/', auth, create);

router.get('/:id', checkCommentExist, findById);

router.patch('/:id', auth, checkCommentExist, checkCommentator, update);

router.delete('/:id', auth, checkCommentExist, checkCommentator, del); 

module.exports = router;