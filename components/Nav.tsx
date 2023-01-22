import styles from "../styles/Home.module.css";
import Link from "next/link";

const Nav = () => {
  return (
    <div className={styles.description}>
      <Link href="/" rel="noopener noreferrer">
        <h1 className="text-3xl font-normal">Adventures & Code </h1>
      </Link>
      <div className="flex gap-8">
        <Link href="/" rel="noopener noreferrer">
          home
        </Link>
      </div>
    </div>
  );
};

export default Nav;
