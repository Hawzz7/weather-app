import UilReact from "@iconscout/react-unicons/icons/uil-react";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemaperatureAndDetails from "./components/TemaperatureAndDetails";
import Forecast from "./components/Forecast";
import getWeatherData from "./services/weatherService";
import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [query, setQuery] = useState({ q: "bilaspur" });
  const [units, setUnits] = useState({ q: "metric" });
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : 'current location.'

      toast.info("Fetching info for weather " + message)

      await getFormattedWeatherData({ ...query, units }).then((data) => {

        toast.success(`successfully fetched weather for ${data.name}, ${data.country}.`);

        setWeather(data);
      });
    };
    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-800 to-blue-800";
    const threshsold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshsold) return "from-cyan-400 to-blue-800";

    return "from-yellow-400 to-orange-700";
  };

  return (
    <div
      className={`max-w-screen-md px-32 py-5 mx-auto mt-4 mb-4 shadow-xl bg-gradient-to-br h-fit shadow-gray-400 rounded-md ${formatBackground()}`}
    >
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TemaperatureAndDetails weather={weather} />

          <Forecast title={"Hourly forecast"} items={weather.hourly} />
          <Forecast title={"Daily forecast"} items={weather.daily} />
        </div>
      )}

      <ToastContainer autoClose={3000} theme="colored" newestOnTop={true}/>
    </div>
  );
}

export default App;
