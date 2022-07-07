import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import commerce from "../lib/commerce";
import styles from "../styles/Home.module.css";
import Link from "next/link";
export async function getStaticProps() {
  const { data: products } = await commerce.products.list();
  const { data: categories } = await commerce.categories.list();

  return {
    props: { products, categories },
    //this page and function will be refreshed every 30 seconds
    revalidate: 30,
  };
}

export default function Home({ products, categories, addToCart }) {
  const [searchTerm, setSearchTerm] = useState("");
  // console.log(products, categories);
  return (
    <div className={styles.container}>
      <Head>
        <title>Online store</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Link href="/cart">
          <a>cart</a>
        </Link>
        <input
          role="searchbox"
          value={searchTerm}
          type="text"
          title="Search"
          placeholder="Search products"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />

        {searchTerm.length > 0 ? (
          <>
            <h2 id="search-results-heading">Search results</h2>
            <ul aria-labelledby="search-results-heading">
              {products
                .filter((product) =>
                  product.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((product) => {
                  return <li key={product.id}>{product.name}</li>;
                })}
            </ul>
          </>
        ) : (
          <>
            <ul aria-label="categories">
              {categories.map((category) => {
                return (
                  <li aria-label="category" key={category.id}>
                    <h2 id={`category-${category.name}`}>{category.name}</h2>
                    <ul aria-labelledby={`category-${category.name}`}>
                      {products
                        .filter((product) => {
                          product.categories.find((c) => c.id == category.id);
                        })
                        .slice(0, 1)
                        .map((product) => {
                          return <li key={product.id}> {product.name}</li>;
                        })}
                    </ul>
                  </li>
                );
              })}
            </ul>
            <h2 id="all-products-heading">All Products</h2>
            {/* we used labeledby because to refer to the h2 id */}
            <ul aria-labelledby="all-products-heading">
              {products.map((product) => {
                return (
                  <li
                    onClick={() => {
                      addToCart(product.id);
                    }}
                    key={product.id}
                  >
                    {" "}
                    {product.name}
                  </li>
                );
              })}
            </ul>{" "}
          </>
        )}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
