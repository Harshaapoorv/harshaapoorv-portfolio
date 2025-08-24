import { InView } from "react-intersection-observer";
import contentConfig from "../assets/content.json";

const Projects = ({ setActiveSection }) => {
  const pageConfig = contentConfig.projects;

  return (
    <InView
      as={"section"}
      onChange={(inView) => {
        if (inView) setActiveSection("projects");
      }}
      threshold={0.4}
    >
      <section
        id="projects"
        className="max-w-screen min-h-screen bg-[#f5f5f4] flex flex-col justify-space-between shadow-md gap-6 items-center projects"
      >
        <section className="flex flex-col justify-center text-center px-4 animate-fade-in-up gap-2">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">{`${pageConfig.title}`}</h2>
        </section>
        <section className="max-w-[90%] flex gap-4 items-center relative flex-wrap justify-center cards">
          {pageConfig.projects.map((obj, index) =>
            index !== 5 ? (
              <section
                key={index}
                className="max-w-[325px] min-h-[292px] flex flex-col p-4 bg-white gap-2 rounded-md justify-space-between card shadow-md"
              >
                <img
                  src={`${obj.image}`}
                  height={48}
                  className="w-full h-[120px] rounded-md z-10"
                />
                <section className={"flex flex-col gap-2"}>
                  <h4 className="text-m md:text-m font-bold text-left text-wrap">
                    {obj.title}
                  </h4>
                  <p className="text-xs md:text-xs text-left">{obj.summary}</p>
                </section>
                <section className="flex gap-[8px]">
                  {obj?.tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-sm font-medium bg-[#e7ece8] text-gray-800 rounded-full shadow-sm hover:scale-105 hover:shadow-m transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </section>
                <section className="flex gap-[8px]">
                  {obj?.links?.map((link, idx) => (
                    <span key={idx} className="flex gap-[8px]">
                      <a
                        href={link.link}
                        target="_blank"
                        className="hover:underline"
                      >
                        {link.text}
                      </a>
                      {idx !== obj.links.length - 1 && (
                        <p className="seperator">|</p>
                      )}
                    </span>
                  ))}
                </section>
              </section>
            ) : (
              <a
                href={obj.link}
                target="_blank"
                rel="noopener noreferrer"
                className="viewMore group"
              >
                <section
                  key={index}
                  className="max-w-[325px] min-h-[292px] flex flex-col bg-white gap-2 rounded-md items-center shadow-md"
                >
                  <img
                    src={`${obj.image}`}
                    className="w-full h-[150px] rounded-t-md z-10 border-2 border-gray-300"
                  />
                  <section className="flex flex-col gap-2">
                    <h4 className="text-m md:text-m font-bold text-center text-wrap">
                      {obj.title}
                    </h4>
                    <p className="text-xs md:text-xs text-center">
                      {obj.summary}
                    </p>
                  </section>
                  <img
                    src="/arrow.svg"
                    className="transform group-hover:animate-spinOnce arrowIcon"
                  />
                </section>
              </a>
            )
          )}
        </section>
      </section>
    </InView>
  );
};

export default Projects;
