import Router, {RouterContext} from "koa-router";
import bodyParser from "koa-bodyparser"
const articles = [
  {title: 'Hello article', fullText: 'some text to fill the body'},
  {title: 'another article', fullText: 'again here is some text here to fill'},
  {title: 'coventry university', fullText: 'some news about coventry university'},
  {title: 'smart campus', fullText: 'smart campus is coming to IVE'}
];
const router = new Router({prefix: '/api/v1/articles'});
const getAll = async (ctx: RouterContext, next: any) => {
  ctx.body = articles;
  await next();
}
const createArticle = async (ctx: RouterContext, next: any) => {
  let c: any = ctx.request.body;
  let title = c.title;
  let fullText = c.fullText;
  let newArticle = {title: title, fullText: fullText};
  articles.push(newArticle);
  ctx.status = 201;
  ctx.body = newArticle;
  await next();
}
const getById = async (ctx: RouterContext, next: any) => {
  let id = +ctx.params.id;
  if((id < articles.length +1) && (id>0)){
    ctx.body = articles[id-1];
  } else {
    ctx.status = 404;
  }
  await next();
}

const updateArticle = async (ctx: RouterContext, next: any) => {
  let id = +ctx.params.id;
  //let {title, fullText} = ctx.request.body;
  let c: any = ctx.request.body;
  let title = c.title;
  let fullText = c.fullText;
  if ((id < articles.length+1) && (id > 0)) {
    articles[id-1].title = title;
    articles[id-1].fullText = fullText;
    ctx.status = 200;    
    ctx.body = articles;
  } else {
    ctx.status = 404;
  }
  await next();
}

const deleteArticle = async (ctx: RouterContext, next: any) => {
  let id = +ctx.params.id;
  if((id < articles.length+1) && (id > 0)) {
    articles.splice(id-1, 1);
    ctx.status = 200;
    ctx.body = articles;
  } else {
    ctx.status = 404;
  }
  await next();
}

router.get('/', getAll);
router.post('/', bodyParser(),  createArticle);
router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})', updateArticle);
router.put('/:id([0-9]{1,})', bodyParser(), updateArticle);
router.delete('/:id([0-9]{1,})', deleteArticle);

export { router };