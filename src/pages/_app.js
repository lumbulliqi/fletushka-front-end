import "@/styles/bootstrap.min.css";
import "@/styles/globals.css";
import "@/styles/magnific-popup.css";
import "@/styles/animate.css";
import "@/styles/linear-icons.css";
import "@/styles/font-awesome.min.css";
import { useEffect } from "react";
import Router from "next/router";
import Image from "next/image";

function App({ Component, pageProps }) {
  useEffect(() => {
    Router.push("/maintenance"); // replace "/my-page" with the path of the page you want to redirect to
  }, []);

  return (
    <>
      <>
        <Image
          src="/banner.jpg"
          style={{ objectFit: "contain" }}
          unoptimized
          priority
          fill="false"
          alt="Fletushka Online"
        />
      </>
    </>
  );
}

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};

export default App;
