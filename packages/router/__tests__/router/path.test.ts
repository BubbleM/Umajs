import { start, stop, send } from "../__fixtures__/app/app.ts";
import { test, assertEquals } from "../../../node-to-deno/test.ts";

test({
  name: "test default && @Path && @Private: method add @Path decorator",
  async fn() {
    await start();

    // default router ===> index.index ===> /index/index
    const index = await send("/index/index");
    assertEquals(index, "this is index router");

    // only method @path: regexp router ===> index.reg ===> /reg/index
    const reg = await send("/reg/index");
    assertEquals(reg, "this is reg router");

    // only method @path: static router ===> index.test ===> /static/test
    const stat = await send("/static/test");
    assertEquals(stat, "this is static router");

    // only method @path: method cannot find in default ===> index.reg ===> /index/reg
    const nopath = await send("/index/reg");
    console.log("..................." + nopath);
    assertEquals(nopath, "Not Found");
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

test({
  name: "test default && @Path && @Private: clazz add @Path decorator",
  async fn() {
    // only clazz @path: default router cannot use default index ===> template.index ===> /template
    const reg1 = await send("/template");
    assertEquals(reg1, "Not Found");

    // only clazz @path: default router ===> template.index ===> /template/index
    const reg2 = await send("/template/index");
    assertEquals(reg2, "this is index router in template");

    // only clazz @path: no path router ===> template.index ===> /tpl/index
    const reg3 = await send("/tpl/index");
    assertEquals(reg3, "Not Found");

    // only clazz @path: no path router ===> template.index ===> /tpl/template/index
    const reg4 = await send("/tpl/template/index");
    assertEquals(reg4, "Not Found");

    // clazz @path & method @path: regexp router ===> template.reg ===> /tpl/reg/index
    const reg5 = await send("/tpl/reg/test");
    assertEquals(reg5, "this is reg router in template");

    // clazz @path & method @path: static router ===> template.test ===> /tpl/static/test
    const reg6 = await send("/tpl/static/test");
    assertEquals(reg6, "this is static router in template");

    // clazz @path & method @path:  method cannot find in default ===> template.reg ===> /tpl/reg
    const reg7 = await send("/tpl/reg");
    assertEquals(reg7, "Not Found");
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

test({
  name: "test default && @Path && @Private: private",
  async fn() {
    // method @path & private: private cannot find ===> index.inline ===> /index/inline
    const nopath = await send("/index/inline");
    assertEquals(nopath, "Not Found");

    // clazz @path & private: private cannot find ===> template.inline ===> /tpl/inline
    const nopath1 = await send("/tpl/inline");
    assertEquals(nopath1, "Not Found");

    await stop();
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
