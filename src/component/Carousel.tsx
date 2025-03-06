import React, { useEffect, useState } from "react";
import "./Carousel.css"; // ไฟล์ CSS สำหรับตกแต่ง

interface CarouselProps {
  items: React.ReactNode[]; // รองรับ string, JSX.Element หรือ Component ใดๆ
  autoPlayInterval?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  autoPlayInterval = 3000,
}) => {
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
      <button className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none carousel-button-left" onClick={prevSlide} data-carousel-prev>
        <span className="inline-flex items-center justify-center w-10 h-10">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span className="sr-only">Previous</span>
        </span>
    </button>
    <div className="carousel-content">{items[currentIndex]}</div>
    
    <button className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none carousel-button-right" onClick={nextSlide} data-carousel-next>
        <span className="inline-flex items-center justify-center w-10 h-10 ">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span className="sr-only">Next</span>
        </span>
    </button>
    </div>
  );
};

export default Carousel;
