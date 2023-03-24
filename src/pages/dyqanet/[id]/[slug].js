import Layout from "@/components/Layout";
import Image from "next/image";
import Link from "next/link";

function Store({ store, categories }, props) {
  return (
    <>
      <Layout categories={categories}>
        <div id="page-content" className="container">
          <section id="project">
            <div className="row">
              <div className="col-sm-7">
                <div className="project-content-area">
                  <h4>{store?.Name}</h4>
                  <Image
                    alt={`Fletushka Online | ${store?.Name}`}
                    width={400}
                    height={400}
                    src={`${process?.env?.NEXT_PUBLIC_IMAGE}${store?.Logo?.data?.attributes?.url}`}
                  />
                </div>
              </div>

              <div className="col-sm-5 project-sidebar right">
                <div className="section-description light">
                  <h4>Rreth {store?.Name}</h4>
                  <p>{store?.Description}</p>

                  <div className="info-buttons">
                    <h6>Kontakto {store?.Name}</h6>
                    <Link
                      href={`https://${store?.Website}`}
                      passHref
                      target={"_blank"}
                      className="btn btn-primary-filled"
                    >
                      <span>Faqja</span>
                    </Link>
                    <Link
                      href={`tel:+${store?.PhoneNumber}`}
                      className="btn btn-primary-filled"
                    >
                      <span>Numri i telefonit</span>
                    </Link>
                    <Link
                      href={`mailto:${store?.Email}`}
                      className="btn btn-primary-filled"
                    >
                      <span>Adresa elektronike</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  let categories = [];
  let store = null;

  try {
    // categories
    const rescats = await fetch(
      `${process?.env?.NEXT_PUBLIC_DATA}/categories?fields[0]=Slug&fields[1]=Name`
    );
    categories = await rescats.json();

    if (!categories?.data) {
      categories = [];
    }

    const slug = context.query.id;
    const res_store = await fetch(
      `${process?.env?.NEXT_PUBLIC_DATA}/stores/${slug}/?populate[Logo][fields][0]=url&populate[Logo][url][fields][1]=url`
    );
    store = await res_store.json();

    if (!store?.data?.id) {
      store = null;
    }
  } catch (error) {
    console.log("error", error);
  }

  return {
    props: {
      categories,
      store: store?.data?.attributes,
    },
  };
}

export default Store;
