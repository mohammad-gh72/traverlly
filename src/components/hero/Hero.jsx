import { useState } from "react";
import HeroStyle from "./Hero.module.css";
import { useEffect } from "react";
import Button from "../../shared components/button/Button";
import Loading from "../loading/Loading";
const url = "http://localhost:9000/hero";
function Hero() {
  const [heroData, setHeroData] = useState(null);
  const [isLoad, setIsLoad] = useState(false);

  async function getHeroData() {
    setIsLoad(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const data = await response.json();
      setHeroData(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoad(false);
    }
  }

  useEffect(() => {
    getHeroData();
  }, []);

  return (
    <>
      <section>
        {isLoad ? <Loading /> : heroData && <HeroBody data={heroData} />}
      </section>
    </>
  );
}

export default Hero;

function HeroBody({ data }) {
  const backgroundImage = {
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)),url(${data.image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  return (
    <>
      <div className={HeroStyle.parent} style={{ ...backgroundImage }}>
        <h2>{data.title}</h2>
        <h3>{data.content}</h3>
        {data?.buttons.map((btn) => (
          <HeroBtn key={btn.btnid} btn={btn} />
        ))}
      </div>
    </>
  );
}

function HeroBtn({ btn }) {
  return (
    <Button fontSize={1.8} className={HeroStyle.btn}>
      {btn.btntext}
    </Button>
  );
}
