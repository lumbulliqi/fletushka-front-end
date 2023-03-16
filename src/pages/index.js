import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import Layout from "@/components/Layout";
import { useState } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Home({ categories, flyers }) {
  const [slide, setSlide] = useState({});

  return (
    <>
      <Layout categories={categories}>
        <section id="portfolio" className="w-shadow info-box four-col">
          <div className="container">
            <ul className="row portfolio list-unstyled lightbox" id="grid">
              {flyers?.data?.map((flyer) => (
                <li
                  key={flyer?.id}
                  className="col-xs-12 col-sm-12 col-md-3 project"
                  data-groups='["all"]'
                >
                  <div className="img-bg-color primary">
                    <Link
                      href={`/fletushka/${flyer?.id}?page=${
                        slide?.[flyer?.id] || 0
                      }`}
                      className="project-link"
                    >
                      <Swiper
                        pagination={{
                          type: "progressbar",
                        }}
                        onSlideChange={(swiper) => {
                          setSlide({
                            ...slide,
                            [flyer?.id]: swiper?.activeIndex,
                          });
                        }}
                        grabCursor={false}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiper"
                      >
                        {flyer?.attributes?.Images?.data?.map(
                          (image, index) => (
                            <SwiperSlide key={index}>
                              <Image
                                alt="Fletushka Online"
                                width={200}
                                height={200}
                                src={`${process?.env?.NEXT_PUBLIC_IMAGE}${image?.attributes?.url}`}
                              />
                            </SwiperSlide>
                          )
                        )}
                        <div className="swiper-pagination"></div>
                      </Swiper>
                    </Link>

                    <div className="project-details">
                      <h5 className="project-title">
                        {flyer?.attributes?.store?.data?.attributes?.Name}
                      </h5>
                      <p className="skill">
                        {flyer?.attributes?.flyerDate >= 0
                          ? `Vlenë edhe ${flyer?.attributes?.flyerDate} ditë`
                          : "Nuk vlenë më"}
                      </p>
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
  let categories = [];
  let flyers = [];
  try {
    // categories
    const rescat = await fetch(
      `${process?.env?.NEXT_PUBLIC_DATA}/categories?fields[0]=Slug&fields[1]=Name`
    );
    categories = await rescat.json();

    if (!categories?.data) {
      categories = [];
    }

    // flyers
    const resflyer = await fetch(
      `${process?.env?.NEXT_PUBLIC_DATA}/flyers?fields[0]=Slug&fields[1]=EndDate&fields[2]=Valid&populate[Images][fields][0]=url&populate[Images][url][fields][1]=url&populate[store][fields][1]=Name&filters[Valid][$eq]=true`
    );
    flyers = await resflyer.json();

    if (!flyers?.data) {
      flyers = [];
    }
  } catch (error) {
    console.log("error", error);
  }
  return {
    props: {
      categories,
      flyers,
    },
    notFound: !categories?.length || !flyers?.length ? true : false,
    revalidate: parseInt(process?.env?.NEXT_PUBLIC_UPDATE_TIME),
  };
}

export default Home;
