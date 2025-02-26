import React, { useEffect, useState } from "react";
import "./Carousel.css"; // ไฟล์ CSS สำหรับตกแต่ง

interface CarouselProps {
    items: React.ReactNode[]; // รองรับ string, JSX.Element หรือ Component ใดๆ
    autoPlayInterval?: number;
  }
  

  const Carousel: React.FC<CarouselProps> = ({ items, autoPlayInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
      );
    }, autoPlayInterval);
    // ล้าง timer เมื่อ component ถูก unmounted
    return () => clearInterval(timer);
  }, [items.length, autoPlayInterval]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel">
      <button className="carousel-button" onClick={prevSlide}>
        &lt;
      </button>
      <div className="carousel-content">{items[currentIndex]}</div>
      <button className="carousel-button" onClick={nextSlide}>
        &gt;
      </button>
    </div>
  );
}

export default Carousel;
