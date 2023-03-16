import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import Layout from "@/components/Layout";
import React from "react";
import { useRouter } from "next/router";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Flyer({ flyer_page, categories, flyer }, props) {
  const router = useRouter();

  function slidePage(index) {
    router.replace({
      pathname: router?.pathname,
      query: {
        slug: router?.query?.slug,
        page: index,
      },
    });
  }

  return (
    <>
      <Layout categories={categories}>
        <section
          id="portfolio"
          className="single-flyer w-shadow info-box four-col"
        >
          <div className="container">
            <div
              key={flyer?.id}
              className="col-12 project"
              data-groups='["all"]'
            >
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
              <div className="img-bg-color primary">
                <Link href="#" className="project-link" />
                <Swiper
                  initialSlide={flyer_page}
                  pagination={{
                    type: "progressbar",
                  }}
                  onSlideChange={(swiper) => slidePage(swiper.activeIndex)}
                  grabCursor={false}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  className="mySwiper"
                >
                  {flyer?.attributes?.Images?.data?.map((image, index) => (
                    <SwiperSlide key={index}>
                      <Image
                        unoptimized
                        priority
                        alt="Fletushka Online"
                        width={100}
                        height={100}
                        quality={100}
                        src={`${process?.env?.NEXT_PUBLIC_IMAGE}${image?.attributes?.url}`}
                      />
                    </SwiperSlide>
                  ))}
                  <div className="swiper-pagination"></div>
                </Swiper>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  let categories = [];
  let flyer = null;

  const id = context?.query.slug || 0;
  const flyer_page = context?.query?.page || 0;
  try {
    // categories
    const rescat = await fetch(
      `${process?.env?.NEXT_PUBLIC_DATA}/categories?fields[0]=Slug&fields[1]=Name`
    );
    categories = await rescat.json();

    if (!categories?.data) {
      categories = [];
    }

    // flyer
    const resflyer = await fetch(
      `${process?.env?.NEXT_PUBLIC_DATA}/flyers/${id}?fields[0]=Slug&fields[1]=EndDate&fields[2]=Valid&populate[Images][fields][0]=url&populate[Images][url][fields][1]=url&populate[store][fields][1]=Name&filters[Valid][$eq]=true`
    );
    flyer = await resflyer.json();

    if (!flyer?.data) {
      flyer = null;
    }
  } catch (error) {
    console.log("error", error);
  }

  return {
    props: {
      categories,
      flyer: flyer?.data || null,
      flyer_page: flyer_page,
    },
    notFound: !categories?.length || !flyer?.data || !flyer_page ? true : false,
  };
}

export default Flyer;
