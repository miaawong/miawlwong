import styles from "../styles/Home.module.css";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex  justify-between items-center ">
      <Link href="/" rel="noopener noreferrer">
        <h1 className="text-3xl font-normal">Mia Wong</h1>
      </Link>

      <div className="block lg:hidden" onClick={() => setIsOpen(!isOpen)}>
        <FiMenu size={30} color="black" />
      </div>

      {isOpen && (
        <div className="absolute w-full mobile-link bg-white top-0 left-0 z-50 p-10">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="absolute top-[35px] right-5"
          >
            <IoIosClose size={30} color="blackt" />
          </div>
          <div className="flex gap-8 flex-col text-xl ">
            <Link href="/" rel="noopener noreferrer" className="text-black">
              home
            </Link>
            <Link href="/work" rel="noopener noreferrer">
              work
            </Link>
            <Link href="/post" rel="noopener noreferrer">
              blog
            </Link>
            <Link href="/links" rel="noopener noreferrer">
              resources
            </Link>
          </div>
        </div>
      )}

      <div className="flex gap-8 hidden lg:flex">
        <Link href="/" rel="noopener noreferrer">
          home
        </Link>
        <Link href="/work" rel="noopener noreferrer">
          work
        </Link>
        <Link href="/post" rel="noopener noreferrer">
          blog
        </Link>
        <Link href="/links" rel="noopener noreferrer">
          resources
        </Link>
      </div>
    </div>
  );
};

export default Nav;
