import Koa from "koa";
//import Router, {RouterContext} from "koa-router";
import /*Router, */ { RouterContext } from "koa-router";
import logger from "koa-logger";
import json from "koa-json";

import { router as articles } from "./routes/articles";

const app: Koa = new Koa();
//const router: Router = new Router();
app.use(logger());
app.use(json());
//app.use(router.routes());
app.use(articles.routes());

app.use(async (ctx: RouterContext, next: any) => {
  try {
    await next();
    if (ctx.status === 404) {
      ctx.body = { err: "Resource not found" };
    }
  } catch (err: any) {
    ctx.body = { err: err };
  }

})

app.listen(10888);