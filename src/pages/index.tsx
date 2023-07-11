import Head from "next/head";
import styles from "../styles/Home.module.scss";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const form = document.getElementById("form") as HTMLFormElement;
    const input = document.getElementById("search") as HTMLInputElement;
    const search_box = document.querySelector(`.${styles.search_box}`) as HTMLDivElement;
    const button = document.querySelector(`.${styles.search_button}`) as HTMLButtonElement;

    input.addEventListener("focus", () => {
      search_box.setAttribute("focused", "");
    });
    input.addEventListener("focusout", () => {
      search_box.removeAttribute("focused");
    });
    button.addEventListener("focus", () => {
      if (!input.value.length) {
        input.focus();
      } else {
        form.submit();
      }
    })

  }, []);

  return (
    <>
      <Head>
        <title>YouTube Downloader</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <div className={styles.topSection}>
          <div className={styles.title}>YouTube Downloader</div>
          <div className={styles.search}>
            <form action="/results" className={styles.form} id="form">
              <div className={styles.search_box}>
                <div className={styles.search_input}>
                  <input className={styles.input} autoFocus={true} id="search" name="search_query" placeholder="Link to video" />
                </div>
              </div>
            </form>
            <button className={styles.search_button}>
              <div>
                <svg
                  height="30"
                  viewBox="0 0 24 24"
                  width="30"
                  focusable="false"
                >
                  <path d="m20.87 20.17-5.59-5.59C16.35 13.35 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.35-.65 4.58-1.71l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"></path>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
