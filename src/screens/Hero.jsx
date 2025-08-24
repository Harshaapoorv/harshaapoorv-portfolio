import contentConfig from "../assets/content.json";
import { InView } from "react-intersection-observer";

const Hero = ({ setActiveSection }) => {
  const pageConfig = contentConfig.hero;
  return (
    <InView
      as={"section"}
      onChange={(inView) => {
        if (inView) setActiveSection("hero");
      }}
      threshold={0.4}
    >
      <main
        id="hero"
        className="flex flex-row justify-space-between hero shadow-md px-4"
      >
        <section className="flex flex-col justify-center min-h-screen text-left px-4 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{`Hi, I'm ${pageConfig.name}`}</h1>
          <p className="text-lg text-gray-700 max-w-xl mb-6">{`${pageConfig.tagline}`}</p>
          <section className="buttons flex-col md:flex-row">
            <a
              href="/pdfs/resume.pdf"
              download={"Harsha_Apoorv_Resume.pdf"}
              className="text-white font-medium button hover:bg-[#617460] transition-all duration-200"
            >
              <img src="/download.svg" /> Download Resume
            </a>
            <a
              href="mailto:harshaapoorva164@gmail.com"
              className="text-white hover:underline font-medium buttonSecondary hover:text-[#617460]"
            >
              Hire me
              <img src="/hireme.svg" />
            </a>
          </section>
        </section>
        <section className="flex justify-center min-h-screen animate-fade-in-up image">
          <img src="/avatar.svg" />
        </section>
      </main>
    </InView>
  );
};

export default Hero;
