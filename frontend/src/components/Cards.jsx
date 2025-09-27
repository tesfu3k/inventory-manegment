const Cards = ({ title, icons, value }) => {
  const Icon = icons;
  return (
    <div className=" border-gray-700 bg-white flex items-center h-25 gap-4 text-cyan-800 rounded-2xl pl-6 py-4">
      <div className="bg-cyan-800/10 rounded-full p-2">
        <Icon className="size-7 p-2 box-content" />
      </div>
      <div className="">
        <h6 className="font-semibold">{title}</h6>
        <h1 className="text-4xl font-bold">{value}</h1>
      </div>
    </div>
  );
};

export default Cards;
