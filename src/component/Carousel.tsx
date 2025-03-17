import React, { useEffect, useState } from "react";
import "./Carousel.css"; // ไฟล์ CSS สำหรับตกแต่ง

interface CarouselProps {
  items: React.ReactNode[]; // ประเภทของข้อมูล typescript ที่ครอบคลุมทุกประเภทเช่น string, number, boolean, object, array, หรือ null, หรือ undefined.
  autoPlayInterval?: number;
}

const Carousel = ({
  items,
  autoPlayInterval = 3000,
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => { //ใช้ setInterval เพื่อเรียกฟังก์ชันที่อยู่ข้างในซ้ำ ๆ ตามเวลาที่กำหนด (autoPlayInterval)
      setCurrentIndex((prevIndex) =>
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
        // item.length มีไว้เพื่อเช็คว่า index ของ item ใน array มีการลบหรือเพิ่มเข้าไปใหม่
        
      );
    }, autoPlayInterval);
    // ล้าง timer เมื่อ component ถูก unmounted
    return () => clearInterval(timer);
  }, [items.length, autoPlayInterval]); 
  // ใส่ dependencies เพื่อให้ useEffect ตรวจจับการเปลี่ยนแปลงของ items.length และ autoPlayInterval แล้วรีเซ็ต setInterval ใหม่ เพื่อให้ Carousel ทำงานได้ถูกต้อง
  // ถ้าไม่ใส่ items.length หรือ autoPlayInterval ใน dependencies
  // React จะไม่รู้ว่าเมื่อไหร่ต้อง re-run useEffect และทำให้การตั้งค่าใหม่ไม่เกิดขึ้น เช่น 
  // ถ้าเปลี่ยนแปลง items หรือ autoPlayInterval แต่ useEffect ไม่ได้รับการเรียกใหม่ก็อาจจะเห็นว่า Carousel เลื่อนสไลด์ไม่ถูกต้องหรือใช้เวลาผิด.

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
