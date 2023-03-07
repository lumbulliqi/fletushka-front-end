import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

function Home({ categories }) {
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
              <Link href="" className="navbar-brand">
                Fletushka Online
              </Link>
              <div className="navbar-collapse collapse">
                <ul className="nav navbar-nav">
                  {categories?.data?.map((category) => (
                    <li key={category?.id}>
                      <Link href={category?.attributes.Slug}>
                        {category?.attributes.Name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>
        </header>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `${process.env.DATA}/categories?fields[0]=Slug&fields[1]=Name`
  );
  let categories = await res.json();

  if (!categories?.data) {
    categories = [];
  }

  return {
    props: {
      categories,
    },
  };
}

export default Home;
