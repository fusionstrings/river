import { Suspense } from "react";
import ReactDOMServer from "react-dom/server.browser";

function App({name}) {
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
  const html = renderToString(<App name={Unit} />);
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

// async function requestHandlerStream(request, response) {
//   const headers = {
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "*",
//   };

//   if (request.method === "OPTIONS") {
//     response.writeHead(204, headers);
//     response.end();
//     return;
//   }
//   let items = 0;
//   const abortController = new AbortController();
//   request.once("close", (_) => {
//     console.log(`connection was closed!`, items);
//     abortController.abort();
//   });
//   try {
//     response.writeHead(200, headers);

//     console.log(ReactDOMServer);
//     const { renderToReadableStream } = ReactDOMServer;
//     console.log(renderToReadableStream);
//     const stream = await renderToReadableStream(<App />, {
//       bootstrapScripts: ["/main.js"],
//     });
//     await stream
//       // pipeTo é a ultima etapa
//       .pipeTo(
//         new WritableStream({
//           async write(chunk) {
//             await setTimeout(200);
//             items++;
//             response.write(chunk);
//           },
//           close() {
//             response.end();
//           },
//         }),
//         {
//           signal: abortController.signal,
//         },
//       );
//   } catch (error) {
//     if (!error.message.includes("abort")) throw error;
//   }
// }

export { requestHandlerHTTP };
