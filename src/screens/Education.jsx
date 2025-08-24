import { InView } from "react-intersection-observer";
import contentConfig from "../assets/content.json";
import { useState } from "react";

const Education = ({ setActiveSection }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalIndex, setModalIndex] = useState(null);
  const Card = ({ config, index }) => {
    return (
      <section
        onClick={() => {
          setIsModalVisible(true);
          setModalIndex(index);
        }}
        className="w-[140px] h-[150px] flex flex-col items-center justify-center bg-white p-4 rounded-lg gap-2 shadow-sm hover:shadow-xl transition transform hover:scale-110 transition duration-300"
      >
        <img
          src={`/${config.image}.svg`}
          width={72}
          height={72}
          alt={config.text}
          className="rounded-md"
        />
        <p className="text-center font-medium">{config.text}</p>
      </section>
    );
  };

  const GetModal = () => {
    const config = pageConfig.arr[modalIndex];
    return (
      isModalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
              onClick={() => {
                setIsModalVisible(null);
                setModalIndex(null);
              }}
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-2">{config.title}</h2>
            <p className="mb-4 text-sm text-gray-700">{config?.desc}</p>
            <div className="flex grid-cols-2 gap-2 align-center justify-center">
              {config?.images.map((obj, index) => (
                <img
                  src={obj}
                  key={index}
                  className="rounded-lg transition-transform duration-300 hover:scale-105 object-contain max-w-[150px] max-h-[150px]"
                  width={150}
                  height={150}
                />
              ))}
            </div>
          </div>
        </div>
      )
    );
  };

  const pageConfig = contentConfig.education;

  return (
    <InView
      as={"section"}
      onChange={(inView) => {
        if (inView) setActiveSection("education");
      }}
      threshold={0.4}
    >
      <section
        id="education"
        className="flex flex-col justify-space-between min-h-screen shadow-md bg-[#e7ece8] gap-4 education"
      >
        <section className="flex flex-col justify-center text-center px-4 animate-fade-in-up gap-2">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">{`${pageConfig.title}`}</h2>
          <p className="text-sm contactpara">{pageConfig.subTitle}</p>
        </section>
        <section className="w-full max-w-[720px] flex flex-col gap-6">
          {pageConfig.education.map((obj, index) => (
            <section key={index} className="flex flex-row gap-8">
              <img
                src={`/${obj?.image}.svg`}
                width={48}
                height={48}
                className="educationLogo"
              />
              <section className="w-full bg-white  px-4 py-2 rounded-xl border-[#D3CFC4] flex flex-col justify-between gap-1 shadow-sm hover:shadow-md transition">
                <section className="w-full flex flex-row justify-between">
                  <span
                    className="text-xl md:text-xl font-bold text-[#4b5563] relative group"
                    // href={`/pdfs/${obj?.pdf}.pdf`}
                    // target="_blank"
                    // rel="noopener noreferrer"
                  >
                    {obj?.name}
                    {/* <span className="absolute bottom-full left-1/2 -translate-x-1/2 w-max px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition duration-200 z-10">
                      Click to view marksheet
                    </span> */}
                  </span>
                  <p className="text-xl md:text-xl font-bold text-[#4b5563]">
                    {obj?.year}
                  </p>
                </section>
                <section className="w-full flex flex-row justify-between">
                  <p className="text-xs font-light  text-[#4b5563]">
                    {obj?.type}
                  </p>
                  <p className="text-xs font-light text-[#4b5563]">
                    {obj?.gpa}
                  </p>
                </section>
                <section className="w-full flex flex-row justify-between">
                  <p className="text-s font-regular text-[#4b5563]">
                    {obj?.stream}
                  </p>
                </section>
              </section>
            </section>
          ))}
        </section>
        <section className="flex flex-col justify-center text-center px-4 animate-fade-in-up gap-4 align-center educationCarousal">
          <p className="text-2xl text-4xl md:text-xl font-bold text-gray-900 text-text-secondary">
            {pageConfig.nextTitle}
          </p>
          <section className="">
            <div className="relative overflow-hidden group">
              <div className="flex gap-6 w-full h-auto flex-wrap justify-center">
                {pageConfig.curriculars.map((obj, index) => (
                  <Card config={obj} key={index} index={index} />
                ))}
              </div>
            </div>
          </section>
        </section>
        <GetModal />
      </section>
    </InView>
  );
};

export default Education;
