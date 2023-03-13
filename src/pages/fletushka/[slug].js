import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import Layout from "@/components/Layout";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Flyer({ categories, flyer }, props) {
  return (
    <>
      <Layout categories={categories}>
        <section
          id="portfolio"
          className="single-flyer w-shadow info-box four-col"
        >
          <div className="container">
            <ul className="row portfolio list-unstyled lightbox" id="grid">
              <li
                key={flyer?.id}
                className="col-12 project"
                data-groups='["all"]'
              >
                <div className="project-details">
                  <h5 className="project-title">
                    {flyer?.attributes?.store?.data?.attributes?.Name}
                  </h5>
                  <p className="skill">{`Vlenë edhe ${flyer?.attributes?.flyerDate} ditë`}</p>
                </div>
                <div className="img-bg-color primary">
                  <Link
                    href={`/fletushka/${flyer?.attributes.Slug}`}
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
                </div>
              </li>
            </ul>
          </div>
        </section>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  // categories
  const rescat = await fetch(
    `${process?.env?.DATA}/categories?fields[0]=Slug&fields[1]=Name`
  );
  let categories = await rescat.json();

  if (!categories?.data) {
    categories = [];
  }

  const id = context.query.slug;

  // flyer
  const resflyer = await fetch(
    `${process?.env?.DATA}/flyers/${id}?fields[0]=Slug&fields[1]=EndDate&populate[Images][fields][0]=url&populate[Images][url][fields][1]=url&populate[store][fields][1]=Name`
  );
  let flyer = await resflyer.json();

  if (!flyer?.data) {
    flyer = [];
  }

  console.log("flyer id:", id);

  return {
    props: {
      categories,
      flyer: flyer?.data,
    },
  };
}

export default Flyer;
