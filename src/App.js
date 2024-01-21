import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useEffect, useState } from "react";
import "./App.css";

dayjs.extend(duration);

function App() {
  const DayStart = dayjs("2024-01-13");
  const [day, setDay] = useState();
  const [hour, setHour] = useState();
  const [minute, setMinute] = useState();
  const [second, setSecond] = useState();

  const twoDP = (n) => (n > 9 ? n : "0" + n);

  useEffect(() => {
    const now = dayjs();
    const diffTime = now.unix() - DayStart.unix();

    let duration = dayjs.duration(diffTime * 1000, "milliseconds");
    console.log(duration);
    const interval = setInterval(function () {
      duration = dayjs.duration(
        duration.asMilliseconds() - 1000,
        "milliseconds"
      );
      setDay(duration.days());
      setHour(duration.hours());
      setMinute(twoDP(duration.minutes()));
      setSecond(twoDP(duration.seconds()));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [DayStart]);

  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div className="bg-bottom" />
      <div className="cover">
        <p>
          <span className="style-time">{day}</span>ngày{" "}
          <span className="style-time">{hour}</span>giờ{" "}
          <span className="style-time">{minute}</span>phút{" "}
          <span className="style-time">{second}</span>giây
        </p>
      </div>
    </div>
  );
}

export default App;
