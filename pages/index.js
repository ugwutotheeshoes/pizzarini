/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import { FaPizzaSlice } from "react-icons/fa";

import { BaseClient } from "@xata.io/client";

export async function getServerSideProps() {
  const xata = new BaseClient({
    branch: "main",
    apiKey: process.env.API_KEY,
    databaseURL:
      "https://Ugwu-s-workspace-mv4vl6.us-east-1.xata.sh/db/pizzarini",
  });

  const records = await xata.db["pizza-menu"].getAll();
  console.log(records);

  return {
    props: {
      pizzas: records,
    },
  };
}

export default function Home({ pizzas }) {
  const [menuItems, setMenuItems] = useState(menu);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };
  const trigger = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };
  return (
    <div className={styles.App}>
      <div className={styles.icon}>
        <div className={styles.logo}>
          <h2>Luigi's Pizza</h2>
          <FaPizzaSlice className={styles.slice} />
        </div>
        {isOpen ? <button onClick={trigger}>go back</button> : ""}
      </div>
      {!isOpen ? (
        <div
          className={styles.toggle}
          style={isOpen ? { marginTop: 0 } : { marginTop: 280 }}
        >
          <p className={styles.itemText}>
            Step into heaven in the form of a pizza slice.
          </p>
          <button onClick={toggle}>see pizza menu</button>
        </div>
      ) : (
        ""
      )}
      {isOpen ? (
        <div className={styles.container}>
          {pizzas.map((menuItem) => {
            const { id, title, img, price, desc } = menuItem;
            return (
              <article key={id} className={styles.menuItem}>
                <img src={img} alt={title} className={styles.photo} />
                <div className={styles.itemInfo}>
                  <header>
                    <h4>{title}</h4>
                    <h4 className={styles.price}>${price}</h4>
                  </header>
                  <p className={styles.itemText}>{desc}</p>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        ""
      )}
      <footer className={styles.footer}>Luigi's Pizza | 2022</footer>
    </div>
  );
}
