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

function Category({ category, categories }, props) {
  const [slide, setSlide] = useState({});

  return (
    <>
      <Layout categories={categories}>
        <section id="portfolio" className="w-shadow info-box four-col">
          <div className="container">
            <ul className="row portfolio list-unstyled lightbox" id="grid">
              {category?.stores?.map((store) =>
                store?.Flyers?.map((flyer) => (
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
                          {flyer?.Images?.map((image, index) => (
                            <SwiperSlide key={index}>
                              <Image
                                alt="Fletushka Online"
                                width={200}
                                height={200}
                                src={`${process?.env?.NEXT_PUBLIC_IMAGE}${image?.url}`}
                              />
                            </SwiperSlide>
                          ))}
                          <div className="swiper-pagination"></div>
                        </Swiper>
                      </Link>

                      <div className="project-details">
                        <h5 className="project-title">{store?.Name}</h5>
                        <p className="skill">
                          {store?.flyerDate >= 0
                            ? `Vlenë edhe ${flyer?.attributes?.flyerDate} ditë`
                            : "Nuk vlenë më"}
                        </p>
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

export async function getServerSideProps(context) {
  // categories
  const rescats = await fetch(
    `${process?.env?.NEXT_PUBLIC_DATA}/categories?fields[0]=Slug&fields[1]=Name`
  );
  let categories = await rescats.json();

  if (!categories?.data) {
    categories = [];
  }

  // category
  const slug = context.query.id;

  const rescat = await fetch(
    `${process?.env?.NEXT_PUBLIC_DATA}/categories/${slug}`
  );
  let category = await rescat.json();

  if (!category) {
    category = [];
  }

  return {
    props: {
      category,
      categories,
    },
  };
}

export default Category;
