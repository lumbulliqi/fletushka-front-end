import Layout from "@/components/Layout";

function Category({ category, categories }, props) {
  return (
    <>
      <Layout categories={categories}>{category?.slug}</Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  // categories
  const rescats = await fetch(
    `${process?.env?.DATA}/categories?fields[0]=Slug&fields[1]=Name`
  );
  let categories = await rescats.json();

  if (!categories?.data) {
    categories = [];
  }

  // category
  const slug = context.query.slug;

  const rescat = await fetch(
    `${process?.env?.DATA}/categories?fields[0]=Slug&fields[1]=Name&filters[slug][$eq]=${slug}&populate=*`
  );
  let category = await rescat.json();

  const res_stores = await fetch(`${process?.env?.DATA}/stores?populate=*`);
  let stores = await res_stores.json();

  if (!stores?.data) {
    stores = [];
  }

  if (!category?.data) {
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
