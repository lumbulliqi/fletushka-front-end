import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>Fletushka Online</title>
        <meta
          name="description"
          content="Nëse kërkoni zbritje në ushqime, veshje, elektronikë, ose çfarëdo tjetër, ne kujdesemi për ju..."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <header>
          <nav className="navbar navbar-default stacked-menu">
            <div className="container">
              <div className="navbar-header">
                <button
                  type="button"
                  className="navbar-toggle collapsed"
                  data-toggle="collapse"
                  data-target=".navbar-collapse"
                >
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
              </div>
              <a className="navbar-brand" href="index.html">
                Fletushka Online
              </a>
              <div className="navbar-collapse collapse">
                <ul className="nav navbar-nav">
                  <li>
                    <a href="about.html">
                      <span>ABOUT</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
      </main>
    </>
  );
}
