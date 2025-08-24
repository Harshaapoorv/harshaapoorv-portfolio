const Header = ({ activeSection }) => {
  const linkClasses = (section) =>
    `transition-colors ${
      activeSection === section
        ? "text-[#748c76] font-semibold"
        : "text-gray-700"
    }`;
  return (
    <header className="header z-50 fixed">
      <a href="#hero" className="hover:text-button-bg">
        Harsha Apoorv
      </a>
      <section className="hidden md:flex navBar">
        <a href="#about" className={linkClasses("about")}>
          About
        </a>
        <a href="#experience" className={linkClasses("experience")}>
          Experience
        </a>
        <a href="#education" className={linkClasses("education")}>
          Education
        </a>
        <a href="#projects" className={linkClasses("projects")}>
          Projects
        </a>
        <a href="#contact" className={linkClasses("contact")}>
          Contact
        </a>
      </section>
      <button className="md:hidden">
        <img src="/menu.svg" alt="menu" className="w-6 h-6" />
      </button>
    </header>
  );
};

export default Header;
