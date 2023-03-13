import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Fletushka Online</title>
        <meta
          name="description"
          content="Nëse kërkoni zbritje në ushqime, veshje, elektronikë, ose çfarëdo tjetër, ne kujdesemi për ju..."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
