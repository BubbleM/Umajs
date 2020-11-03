import {
  Application,
  ApplicationOptions,
  Context,
  Middleware,
  composeMiddleware,
  State,
  Request,
  Response,
  REDIRECT_BACK,
  send,
  SendOptions
} from 'https://deno.land/x/oak/mod.ts';

class Koa<AS extends State = Record<string, any>> extends Application{
  constructor(option:ApplicationOptions<AS> = {}){
    super(option);
  }
}

export {
  Koa,
  Context,
  Middleware,
  composeMiddleware,
  Request,
  Response,
  REDIRECT_BACK,
  send,
  SendOptions
}