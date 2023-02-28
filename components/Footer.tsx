import {
  AiFillGithub,
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineYoutube,
  AiOutlineMail,
} from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-[-100px] bg-[#fafafa] p-10">
      <div className="flex justify-between items-center max-w-screen-xl m-auto ">
        <p className="text-xl font-bold">Mia Wong</p>

        <div className="flex justify-between gap-2">
          <a
            href="https://tiktok.com/@miawlwong"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTiktok size={20} color={"grey"} />
          </a>
          <a
            href="https://instagram.com/miawlwong"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineInstagram size={20} color={"grey"} />
          </a>
          <a
            href="https://youtube.com/@miawlwong"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineYoutube size={20} color={"grey"} />
          </a>

          <a
            href="https://github.com/miaawong"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillGithub size={20} color={"grey"} />
          </a>
          <a
            href="https://linkedin.com/in/miawailamwong"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineLinkedin size={20} color={"grey"} />
          </a>
          <a
            href="mailto:miawlwong@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineMail size={20} color={"grey"} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
