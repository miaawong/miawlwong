import {
  AiFillGithub,
  AiOutlineInstagram,
  AiOutlineLinkedin,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="h-36 bg-[#fafafa]">
      <div className="flex justify-between max-w-screen-xl m-auto p-7">
        <p className="text-xl font-bold">Let&apos;s stay connected!</p>

        <div className="flex justify-between gap-2">
          <a
            href="https://instagram.com/miawlwong"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineInstagram size={30} color={"grey"} />
          </a>
          <a
            href="https://github.com/miaawong"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillGithub size={30} color={"grey"} />
          </a>
          <a
            href="https://linkedin.com/in/miawailamwong"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineLinkedin size={30} color={"grey"} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
