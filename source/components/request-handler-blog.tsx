import { Suspense } from "react";
import { renderToString } from "react-dom/server";
import { Page } from "#page";
import { Blog } from "#blog";

import type { IncomingMessage, ServerResponse } from "http";

function requestHandlerHTTP(
  request: IncomingMessage,
  response: ServerResponse,
) {
  const html = renderToString(
    <Suspense fallback={<p>Loading...</p>}>
      <Page title="home">
        <Blog />
      </Page>
    </Suspense>,
  );
  response.end(html);
}

export { requestHandlerHTTP };
