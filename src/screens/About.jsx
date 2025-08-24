import contentConfig from "../assets/content.json";
import { InView } from "react-intersection-observer";
import SkillCarousel from "../components/SkillCarousal";

const About = ({ setActiveSection }) => {
  const pageConfig = contentConfig.about;
  return (
    <InView
      as={"section"}
      onChange={(inView) => {
        if (inView) setActiveSection("about");
      }}
      threshold={0.4}
    >
      <section
        id="about"
        className="flex flex-col min-h-screen justify-space-between about shadow-md"
      >
        <section className="flex flex-col justify-center items-center text-center px-4 animate-fade-in-up aboutInner">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">{`${pageConfig.title}`}</h2>
          <img src="/avatar.svg" width={181} height={185} />
          <section className="paragraphs">
            {pageConfig.paragraphs.map((obj, index) => (
              <p
                itemID={index}
                key={index}
                className="text-lg text-gray-700"
              >{`${obj}`}</p>
            ))}
          </section>
        </section>
        <section className="carousal">
          <SkillCarousel skills={pageConfig.skills} />
        </section>
      </section>
    </InView>
  );
};

export default About;
