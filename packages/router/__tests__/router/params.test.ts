import { start, stop, send } from "../__fixtures__/app/app.ts";
import { test, assertEquals } from "../../../node-to-deno/test.ts";

test({
  name:
    "test @Param && @Query：params & query: get ===> index.params ===> /home/:name?title=xx",
  async fn() {
    await start();
    const index = await send("/home/username?title=hello");
    assertEquals(index, "name=username, title=hello");
    await stop();
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
