import ControlPanel from "./(components)/SentenceButtons/ControlPanel";
import Statistics from "./(components)/Statistics";
import UserInput from "./(components)/UserInput";

const Home = () => {
  return (
    <>
      <div className="w-4/5">
        <Statistics />
      </div>
      <div className="w-4/5 h-64 relative">
        <UserInput />
      </div>
      <div>
        <ControlPanel />
      </div>
    </>
  );
};

export default Home;
