import { Suspense } from "react";
import ReactDOMServer from "react-dom/server";

function App({ name }) {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <h1>Hello React running in {name}</h1>
      </Suspense>
    </div>
  );
}
function requestHandlerHTTP(request, response) {
  console.log(ReactDOMServer);
  const { renderToString } = ReactDOMServer;
  console.log(renderToString);
  const html = renderToString(<App name={request.url} />);
  response.end(html);
  //ReactDOMServer.renderToPipeableStream(<App />).pipe(response);

  // const { pipe } = renderToPipeableStream(<App />, {
  //   bootstrapScripts: ["/main.js"],
  //   onShellReady() {
  //     response.setHeader("content-type", "text/html");
  //     pipe(response);
  //   },
  // });
}

async function requestHandlerStream(request, response) {
  if (request.method === "OPTIONS") {
    response.writeHead(204);
    response.end();
    return;
  }
  let items = 0;
  const abortController = new AbortController();
  request.once("close", (_) => {
    console.log(`connection was closed!`, items);
    abortController.abort();
  });
  try {
    response.writeHead(200, { "content-type": "text/html" });

    console.log(ReactDOMServer);
    const { renderToPipeableStream } = ReactDOMServer;
    console.log(renderToPipeableStream);
    const { pipe } = renderToPipeableStream(<App name="hmm" />, {
      bootstrapScripts: ["/main.js"],
      onShellReady() {
        pipe(response);
      },
    });
  } catch (error) {
    if (!error.message.includes("abort")) throw error;
  }
}

export { requestHandlerHTTP, requestHandlerStream };
