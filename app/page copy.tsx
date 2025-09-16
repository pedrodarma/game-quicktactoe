"use client";

import { OrbitProgress } from "react-loading-indicators";
import styles from "./page.module.css";
import { Footer, Header, SquaredBackground } from "@components";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.background}>
        <SquaredBackground />
      </div>
      <main className={styles.main}>
        {/* <Header /> */}
        {/* <Board /> */}
        <div className={styles.landing}>
          <h1>QuickTacToe</h1>
          {/* <h2>Starting...</h2> */}
          <OrbitProgress
            variant="track-disc"
            speedPlus={-4}
            dense
            easing="linear"
            size="large"
          />
          {/* <p>Play Tic Tac Toe with friends in real-time.</p> */}
          <p>Waiting for opponent...</p>
          {/* <a href="/create" className={styles.primary}>
            Create Game
          </a>
          <a href="/join" className={styles.secondary}>
            Join Game
          </a> */}
        </div>
      </main>
      <Footer />
    </div>
  );
}
