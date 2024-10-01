import { useRef, useState } from "react";
import TestimonialStyle from "./Testimonial.module.css";
import { useEffect } from "react";

const url = "";

function Testimonial() {
  const [testimonialData, setTestimonialData] = useState(null);
  const [slider, setSlider] = useState(0);
  const sliderContainerRef = useRef(null);
  async function getTestimonialData() {
    try {
      const response = await fetch(url, {
        headers: {},
      });
      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const data = await response.json();

      setTestimonialData(data.record.testimonial);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getTestimonialData();
  }, []);

  useEffect(() => {
    if (!testimonialData) return;
    const sliderInterval = setInterval(() => {
      sliderContainerRef.current.classList.add(
        TestimonialStyle.slide_animation
      );
      setSlider((prevSlider) =>
        prevSlider === testimonialData.testimonials.length - 1
          ? 0
          : prevSlider + 1
      );

      setTimeout(() => {
        sliderContainerRef.current.classList.remove(
          TestimonialStyle.slide_animation
        );
      }, 1000);
    }, 10000);

    return () => clearInterval(sliderInterval);
  }, [testimonialData, testimonialData?.testimonials.length]);

  return (
    <>
      {testimonialData && (
        <section id="testimonial" className={TestimonialStyle.parent}>
          <video autoPlay muted loop>
            <source src={testimonialData.section_video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <header>
            <h2>{testimonialData.section_title}</h2>
          </header>
          <div ref={sliderContainerRef} className={TestimonialStyle.slider}>
            <img
              src={testimonialData.testimonials[slider].person_image}
              alt=""
            />
            <div className={TestimonialStyle.nameAndOverview}>
              <span>{testimonialData.testimonials[slider].person_name}</span>
              <p>{testimonialData.testimonials[slider].person_overview}</p>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Testimonial;
