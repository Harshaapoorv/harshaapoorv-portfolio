import { InView } from "react-intersection-observer";
import contentConfig from "../assets/content.json";

const Experience = ({ setActiveSection }) => {
  const pageConfig = contentConfig.experience;
  return (
    <InView
      as={"section"}
      onChange={(inView) => {
        if (inView) setActiveSection("experience");
      }}
      threshold={0.4}
    >
      <section
        id="experience"
        className="max-w-screen min-h-screen bg-[#f5f5f4] flex flex-col justify-space-between shadow-md gap-4 items-center experience"
      >
        <section className="flex flex-col justify-center text-center px-4 animate-fade-in-up gap-2">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">{`${pageConfig.title}`}</h2>
        </section>
        <section className="max-w-[90%] flex flex-col gap-4 items-center relative">
          {pageConfig.jobs.map((obj, index) => (
            <section
              key={index}
              className="flex gap-4 items-start w-full relative"
            >
              {/* Icon + Dotted Line */}
              <img
                src={`${obj.logo}.svg`}
                width={72}
                height={72}
                className="rounded-full z-10 bg-white border-2 border-gray-300"
              />

              {/* Job Card */}
              <section className="max-w-full flex flex-col p-4 bg-[#e7ece8] left-curve text-left w-full shadow-sm hover:shadow-xl transition transform transition duration-300">
                <h4 className="text-xl md:text-xl font-bold">{obj.title}</h4>
                <a
                  href={obj.companyLinkedIn}
                  target="_blank"
                  className="w-fit hover:underline"
                >
                  {`${obj.name} | ${obj.time}`}
                </a>
                <section className="p-2">
                  <ul className="list-disc px-2">
                    {obj.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                </section>
                <section className="flex gap-4 items-center">
                  <section className="flex gap-4 flex-wrap">
                    {obj.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded-full shadow-sm hover:bg-gray-200 transition-colors duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </section>
                </section>
              </section>
            </section>
          ))}
        </section>
      </section>
    </InView>
  );
};

export default Experience;
