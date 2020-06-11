import { Application, Router } from "https://deno.land/x/oak/mod.ts";

import router from "./router.ts";

const port = 8000;

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

// app.addEventListener("listen", ({ secure, hostname, port }) => {
//   console.log(
//     `secure = ${secure}  Server hostname ${hostname} listening on port ${port}`,
//   );
// });

console.log(`listening on port ${port}`);
await app.listen({ port });
