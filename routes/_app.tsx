import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>tako-api-doc-template</title>
        <link rel="stylesheet" href="/styles.css" />
        <script src="/a.js"></script>
        <link
          rel="stylesheet"
          href="/github-markdown.css"
        />
      </head>
      <body class="bg-[#181818]" f-client-nav>
        <Component />
      </body>
    </html>
  );
}
