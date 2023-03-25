import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import nookies from "nookies";

function Profile({ categories, user }) {
  const router = useRouter();
  const { email, username } = user;

  const logout = async () => {
    try {
      await fetch("/api/logout", {
        method: "GET",
      });
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Layout categories={categories}>
        <section id="portfolio" className="w-shadow info-box four-col">
          <div className="container">
            <div>
              <div>Username: {username}</div>
              <div>Email: {email}</div>
              <button
                onClick={logout}
                type="submit"
                className="btn btn-md btn-primary-filled"
              >
                REGJISTROHU
              </button>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  let categories = [];
  const cookies = nookies.get(context);
  let user = null;
  try {
    // categories
    const rescats = await fetch(
      `${process?.env?.NEXT_PUBLIC_DATA}/categories?fields[0]=Slug&fields[1]=Name`
    );
    categories = await rescats.json();

    if (!categories?.data) {
      categories = [];
    }
    if (cookies?.jwt) {
      let data = await fetch(`${process?.env?.NEXT_PUBLIC_DATA}/users/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookies.jwt}`,
        },
      });

      data = await data.json();

      user = data;
    }
  } catch (error) {
    console.log("error", error);
  }
  if (!user?.id) {
    return {
      redirect: {
        permanent: false,
        destination: "/profili/regjistrohu",
      },
    };
  }

  return {
    props: {
      categories,
      user,
    },
    // notFound: !categories?.length || !category ? true : false,
  };
}

export default Profile;
