import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Link from "next/link";

function LoginComponent({ categories }, props) {
  const router = useRouter();
  const [userData, setUserData] = useState({
    identifier: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tempErrors = {};

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!emailRegex.test(userData.identifier)) {
      tempErrors.identifier = "Kërkohet adresa e emailit";
    }

    if (!passwordRegex.test(userData.password)) {
      tempErrors.password =
        "Fjalëkalimi duhet të jetë së paku 8 karaktere dhe të përmbajë të paktën një shkronjë dhe një numër";
    }

    setErrorMessage(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
      try {
        const usertemp = { ...userData };

        const asd = await fetch("/api/login", {
          method: "POST",
          body: JSON.stringify(usertemp),
        });

        const data = await asd;

        console.log("response page", await data.json());

        router.replace("/profili");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <>
      <Layout categories={categories}>
        <section id="portfolio" className="w-shadow info-box four-col">
          <div className="container">
            <div className="row contact-area">
              <div className="col-12 contact-form-area">
                <div>
                  <form id="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="identifier"
                        placeholder="Adresa elektronike"
                        name="identifier"
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <div className="help-block with-errors">
                      {errorMessage.identifier}
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Fjalëkalimi"
                        name="password"
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <div className="help-block with-errors">
                      {errorMessage.password}
                    </div>
                    <button
                      type="submit"
                      id="form-submit"
                      className="btn btn-md btn-primary-filled btn-form-submit"
                    >
                      KYÇU
                    </button>
                    <div id="msgSubmit" className="h3 text-center hidden"></div>
                    <p className="form-messege"></p>
                    <div className="clearfix"></div>
                    <p>
                      Nuk keni një llogari?
                      <Link href="/profili/regjistrohu"> Regjistrohu</Link>
                    </p>
                  </form>
                </div>
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
  try {
    // categories
    const rescats = await fetch(
      `${process?.env?.NEXT_PUBLIC_DATA}/categories?fields[0]=Slug&fields[1]=Name`
    );
    categories = await rescats.json();

    if (!categories?.data) {
      categories = [];
    }
  } catch (error) {
    console.log("error", error);
  }

  return {
    props: {
      categories,
    },
    // notFound: !categories?.length || !category ? true : false,
  };
}

export default LoginComponent;
