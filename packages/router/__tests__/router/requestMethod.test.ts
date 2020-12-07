import { start, stop, send, post } from "../__fixtures__/app/app.ts";
import { test, assertEquals } from "../../../node-to-deno/test.ts";

test({
  name:
    "test @RequestMethod: only post @requestMethod: do post ===> index.onlyGet ===> /index/onlyGet",
  async fn() {
    await start();
    const index = await post("/index/onlyGet");
    assertEquals(index, "this method only can post");
    await stop();
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
