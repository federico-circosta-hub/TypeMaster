import ControlPanel from "./(components)/SentenceButtons/ControlPanel";
import Statistics from "./(components)/Statistics";
import UserInput from "./(components)/UserInput";

const Home = () => {
  return (
    <div className="w-full h-full flex flex-col gap-6 items-center">
      <Statistics />

      <UserInput />

      <ControlPanel />
    </div>
  );
};

export default Home;
