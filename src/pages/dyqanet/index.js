import Layout from "@/components/Layout";
import Image from "next/image";
import Link from "next/link";

function Stores({ categories, stores }, props) {
  return (
    <>
      <Layout categories={categories}>
        <section id="portfolio" className="w-shadow info-box four-col">
          <div className="container">
            <ul className="row portfolio list-unstyled lightbox" id="grid">
              {stores?.data === 0 || !stores ? (
                <p class="no-data-currently">Për momentin nuk ka dyqane</p>
              ) : (
                stores?.map((store) => (
                  <li
                    key={store?.id}
                    className="col-xs-12 col-sm-12 col-md-3 project"
                    data-groups='["all"]'
                  >
                    <div className="img-bg-color primary">
                      <Link
                        href={`/dyqanet/${store?.id}/${store?.attributes?.Slug}`}
                        className="project-link"
                      >
                        <Image
                          alt={`Fletushka Online | ${store?.Name}`}
                          width={200}
                          height={200}
                          src={`${process?.env?.NEXT_PUBLIC_IMAGE}${store?.attributes?.Logo?.data?.attributes?.url}`}
                        />
                      </Link>

                      <div className="project-details">
                        <h5 className="project-title">
                          {store?.attributes?.Name}
                        </h5>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </section>
      </Layout>
    </>
  );
}
export async function getStaticProps() {
  let stores = [];
  let categories = [];

  try {
    // categories
    const rescat = await fetch(
      `${process?.env?.NEXT_PUBLIC_DATA}/categories?populate[flyers][fields][0]=id`
    );
    categories = await rescat.json();

    if (!categories?.data) {
      categories = [];
    }
    // stores
    const res_store = await fetch(
      `${process?.env?.NEXT_PUBLIC_DATA}/stores?[fields][0]=Name&[fields][1]=Slug&[fields][2]=Email&populate[Logo][fields][0]=url&populate[Logo][url][fields][1]=url&randomSort=true`
    );
    stores = await res_store.json();

    if (!res_store) {
      stores = [];
    }
  } catch (error) {
    console.log("error", error);
  }

  return {
    props: {
      stores: stores?.data || null,
      categories,
    },
    revalidate: parseInt(process?.env?.NEXT_PUBLIC_UPDATE_TIME),
  };
}

export default Stores;
