const SkillCarousel = ({ skills }) => {
  return (
    <div className="relative overflow-hidden group">
      <div className="flex gap-6 animate-scroll group-hover:[animation-play-state:paused] w-max">
        {skills.map((obj, index) => (
          <Card config={obj} key={index} />
        ))}
        {skills.map((obj, index) => (
          <Card config={obj} key={"clone-" + index} />
        ))}
      </div>
    </div>
  );
};

const Card = ({ config }) => {
  return (
    <div className="flex-shrink-0 w-[120px] h-[150px] flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow gap-2">
      <img
        src={`/${config.image}.svg`}
        width={64}
        height={64}
        alt={config.text}
      />
      <p className="text-center font-medium">{config.text}</p>
    </div>
  );
};

export default SkillCarousel;
