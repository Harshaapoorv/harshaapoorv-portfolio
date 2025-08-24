import { InView } from "react-intersection-observer";
import { useState, useRef } from "react";
import contentConfig from "../assets/content.json";
import emailjs from "@emailjs/browser";

const Contact = ({ setActiveSection }) => {
  const pageConfig = contentConfig.contact;
  const form = useRef();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // serviceID: service_6yxdt0f

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm("service_6yxdt0f", "template_f3mp3si", form.current, {
        publicKey: "zsD33nd2_sjVO1I1K",
      })
      .then(
        () => {
          setSent(true);
          setLoading(false);
          form.current.reset();
        },
        (error) => {
          console.log(error);
          setLoading(false);
        }
      );
  };

  return (
    <InView
      as={"section"}
      onChange={(inView) => {
        if (inView) setActiveSection("contact");
      }}
      threshold={0.4}
    >
      <section
        id="contact"
        className="flex flex-col justify-space-between min-h-screen shadow-md contact"
      >
        <section className="flex flex-col justify-center text-center px-4 animate-fade-in-up aboutInner">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">{`${pageConfig.title}`}</h2>
          <section className="flex flex-col gap-1">
            <section className="connect">
              <h4 className="text-xl md:text-xl font-bold text-gray-900 subheading">
                {pageConfig.subTitle}
              </h4>
              <img src="/connect.svg" />
            </section>
            <p className="text-sm contactpara">{pageConfig.text}</p>
          </section>
        </section>
        <section className="w-2/3">
          <form
            ref={form}
            onSubmit={sendEmail}
            className="w-full flex flex-col gap-4"
            autoComplete="on"
          >
            <section className="inputs flex flex-col gap-y-4 gap-x-4">
              <section className="input">
                <label htmlFor="name" className="mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  className="w-full h-12 px-4 py-2 bg-[#f6f7f5] border border-[#c8d1cb] rounded-lg text-[#2e352f] placeholder-[#8e9a91] focus:outline-none focus:border-[#748c76] transition duration-200"
                />
              </section>
              <section className="input">
                <label htmlFor="email" className="mb-1">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  className="w-full h-12 px-4 py-2 bg-[#f6f7f5] border border-[#c8d1cb] rounded-lg text-[#2e352f] placeholder-[#8e9a91] focus:outline-none focus:border-[#748c76] transition duration-200"
                />
              </section>
            </section>
            <section className="input">
              <label htmlFor="message" className="mb-1">
                Message
              </label>
              <textarea
                rows={5}
                cols={72}
                id="message"
                name="message"
                required
                className="w-full h-48 px-4 py-2 bg-[#f6f7f5] border border-[#c8d1cb] rounded-lg text-[#2e352f] placeholder-[#8e9a91] focus:outline-none focus:border-[#748c76] transition duration-200"
              />
            </section>
            <section className="w-full flex flex-row-reverse justify-space-between message">
              <button
                type="submit"
                disabled={loading}
                className="text-white font-medium button hover:bg-[#617460] transition-all duration-200"
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <p className="flex flex-row gap-2">
                    Send Message <img src="/send.svg" />
                  </p>
                )}
              </button>
              {sent && (
                <p className="text-m text-text-secondary">
                  ✅ Message sent successfully!
                </p>
              )}
            </section>
          </form>
        </section>
        <section className="flex flex-row gap-8 align-center justify-center">
          {pageConfig.socials.map((obj, index) => (
            <a
              key={index}
              href={obj.link}
              target="_blank"
              className="flex justify-center transform hover:scale-150 transition duration-300"
            >
              <img src={`/${obj.image}.svg`} width={48} height={48} />
            </a>
          ))}
        </section>
        <section className="flex flex-row">
          <p className="font-bold text-text-secondary">Made with </p>{" "}
          <img src="/love.svg" width={24} height={24} />
          <p className="font-bold text-text-secondary">
            {" "}
            using React + Tailwind
          </p>
        </section>
      </section>
      <section className="flex footer px-4 py-5 justify-center">
        <p className="font-bold text-text-secondary">{pageConfig.footer}</p>
      </section>
    </InView>
  );
};

export default Contact;
