//@deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts";
import React from "https://dev.jspm.io/react@16.13.1";
//@deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom@16.13.1/server";
import { createApp } from "https://deno.land/x/servest@v1.3.1/mod.ts";
const app = createApp();
app.handle("/", async (req) => {
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html;charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>Form</title>
        </head>
        <body>
          <h1>Choose a color</h1>
          <form action="" method="post">
            <label htmlFor="color">Choose a color:</label>
            <select id="color" name="colorList">
              <option value="blue">Blue</option>
              <option value="red">Red</option>
              <option value="yellow">Yellow</option>
              <option value="orange">Orange</option>
            </select>
            <input type="submit"/>
          </form>
        </body>
      </html>,
    ),
  });
});
app.listen({ port: 8081 });