import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Layout({ categories, children }) {
  const [menu, setMenu] = useState(false);

  return (
    <main>
      <header>
        <nav className="navbar navbar-default stacked-menu">
          <div className="container">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                onClick={() => setMenu((menu) => !menu)}
                data-toggle="collapse"
                data-target=".navbar-collapse"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>
            <Link href="/" className="navbar-brand">
              <Image
                src="/logo.png"
                priority
                width={400}
                height={100}
                alt="Fletushka Online"
              />
            </Link>
            <div className={`navbar-collapse ${!menu ? "menu-hide" : ""}`}>
              <ul className="nav navbar-nav">
                {categories?.data?.map((category) => (
                  <li key={category?.id}>
                    <Link
                      href={`/kategoria/${category?.id}/${category?.attributes.Slug}`}
                    >
                      {category?.attributes.Name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </header>
      {children}
    </main>
  );
}
