import { Suspense } from "react";
import { renderToString } from "react-dom/server";
import { Page } from "#page";
import { Home } from "#home";

import type { IncomingMessage, ServerResponse } from "http";

function requestHandlerHTTP(
  request: IncomingMessage,
  response: ServerResponse,
) {
  const html = renderToString(
    <Suspense fallback={<p>Loading...</p>}>
      <Page title="home">
        <Home />
      </Page>
    </Suspense>,
  );
  response.end(html);
}

export { requestHandlerHTTP };
