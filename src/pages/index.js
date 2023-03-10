import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import Layout from "@/components/Layout";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Home({ categories, flyers }) {
  return (
    <>
      <Layout categories={categories}>
        <section id="portfolio" className="w-shadow info-box four-col">
          <div className="container">
            <ul className="row portfolio list-unstyled lightbox" id="grid">
              {flyers?.data?.map((flyer) => (
                <li
                  key={flyer?.id}
                  className="col-xs-6 col-md-3 project"
                  data-groups='["all"]'
                >
                  <div className="img-bg-color primary">
                    <Link
                      href={`/fletushka/${flyer?.id}`}
                      className="project-link"
                    />
                    <Swiper
                      pagination={{
                        type: "progressbar",
                      }}
                      grabCursor={false}
                      navigation={true}
                      modules={[Pagination, Navigation]}
                      className="mySwiper"
                    >
                      {flyer?.attributes?.Images?.data?.map((image, index) => (
                        <SwiperSlide key={index}>
                          <Image
                            unoptimized
                            alt="Fletushka Online"
                            width={100}
                            height={100}
                            src={`${process?.env?.IMAGE}${image?.attributes?.url}`}
                          />
                        </SwiperSlide>
                      ))}
                      <div className="swiper-pagination"></div>
                    </Swiper>
                    <div className="project-details">
                      <h5 className="project-title">
                        {flyer?.attributes?.store?.data?.attributes?.Name}
                      </h5>
                      <p className="skill">{`Vlen?? edhe ${flyer?.attributes?.flyerDate} dit??`}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  // categories
  const rescat = await fetch(
    `${process?.env?.DATA}/categories?fields[0]=Slug&fields[1]=Name`
  );
  let categories = await rescat.json();

  if (!categories?.data) {
    categories = [];
  }
  // flyers
  const resflyer = await fetch(
    `${process?.env?.DATA}/flyers?fields[0]=Slug&fields[1]=EndDate&populate[Images][fields][0]=url&populate[Images][url][fields][1]=url&populate[store][fields][1]=Name`
  );
  let flyers = await resflyer.json();

  if (!flyers?.data) {
    flyers = [];
  }

  return {
    props: {
      categories,
      flyers,
    },
  };
}

export default Home;
