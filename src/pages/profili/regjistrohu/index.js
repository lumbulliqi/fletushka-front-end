import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Link from "next/link";

function RegisterComponent({ categories }, props) {
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    password: "",
    username: "",
  });

  const [errorMessage, setErrorMessage] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tempErrors = {};

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const nameRegex = /^[a-zA-Z]{3,}(([',. -][a-zA-Z]{3,})?[a-zA-Z]*)*$/;

    if (!nameRegex.test(userData.name)) {
      tempErrors.name = "Kërkohet emri juaj";
    }

    if (!emailRegex.test(userData.email)) {
      tempErrors.email = "Kërkohet adresa e emailit";
    }

    if (!passwordRegex.test(userData.password)) {
      tempErrors.password =
        "Fjalëkalimi duhet të jetë së paku 8 karaktere dhe të përmbajë të paktën një shkronjë dhe një numër";
    }

    setErrorMessage(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
      try {
        const usertemp = { ...userData, username: userData.email };

        await fetch("/api/register", {
          method: "POST",
          body: JSON.stringify(usertemp),
        });

        router.replace("/profili");
      } catch (err) {
        console.log(err.response.data);
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
                        id="name"
                        placeholder="Emri juaj"
                        name="name"
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <div className="help-block with-errors">
                      {errorMessage.name}
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Adresa elektronike"
                        name="email"
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <div className="help-block with-errors">
                      {errorMessage.email}
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
                      REGJISTROHU
                    </button>
                    <div id="msgSubmit" className="h3 text-center hidden"></div>
                    <p className="form-messege"></p>
                    <div className="clearfix"></div>
                    <p>
                      Keni një llogari?<Link href="/profili/kycu"> Kyçu</Link>
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

export default RegisterComponent;
