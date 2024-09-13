import Hero from "../hero/Hero";
import Navbar from "../navbar/Navbar";
import Testimonial from "../testimonial/Testimonial";
import MainStyle from "./Main.module.css";
function Main() {
  return (
    <div className={MainStyle.main}>
      <Navbar />
      <Hero />
      <Testimonial />
    </div>
  );
}

export default Main;
