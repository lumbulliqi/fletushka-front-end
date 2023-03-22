import { setCookie } from "nookies";

export default async (req, res) => {
  const { password, identifier } = req?.body;

  try {
    let response = await fetch(`${process?.env?.NEXT_PUBLIC_DATA}/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: req?.body,
    });

    response = await response.json();

    console.log("response api", response);

    setCookie({ res }, "jwt", response?.jwt, {
      path: "/",
    });

    res.status(200).end();
  } catch (e) {
    console.log("e", e);
    res.status(400).send(e?.response?.data?.message[0].messages[0]);
  }
};
