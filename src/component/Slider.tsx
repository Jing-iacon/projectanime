import React, { useState, useEffect } from "react";
import "./Slider.css";

interface SliderProps {
    items: React.ReactNode[];
    itemsPerPage?: number;
    autoPlay?: boolean;
    autoPlayInterval?: number;
}

const Slider = ({
    items,
    itemsPerPage: defaultItemsPerPage = 5,
    autoPlay = true,
    autoPlayInterval = 3000,
}: SliderProps) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [currentItemsPerPage, setCurrentItemsPerPage] = useState(defaultItemsPerPage);

    // Add responsive handling
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setCurrentItemsPerPage(2);
            } else if (width < 768) {
                setCurrentItemsPerPage(3);
            } else if (width < 1024) {
                setCurrentItemsPerPage(4);
            } else if (width < 1450) {  // Add new breakpoint
                setCurrentItemsPerPage(4);
            } else {
                setCurrentItemsPerPage(defaultItemsPerPage);
            }
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize); 
        //Cleanup เมื่อ component ถูก unmount หรือ defaultItemsPerPage เปลี่ยน
    }, [defaultItemsPerPage]);

    // Update pages creation to use currentItemsPerPage
    const pages = []; // ใช้แบ่ง items เป็นหน้าๆ
    for (let i = 0; i < items.length; i += currentItemsPerPage) {
        pages.push(items.slice(i, i + currentItemsPerPage));
    } 
    // ใช้ loop ในการ push เพราะว่าควบคุมง่าย ยืดหยุ่นกว่า สามารถมองเห็นการทำงานเเต่ละ loop ได้
    // ทำไมไม่ใช้การหารแบ่งเพราะไม่ยืดหยุ่นพอในการทำ responsive กับ pagination เพราะในอนาคตเพื่อจะเพิ่มเงื่อนไขได้
    // "ไม่ใช้หารแบ่ง เพราะในโค้ดมีการเปลี่ยน currentItemsPerPage 
    // ตาม responsive → จำนวนหน้าไม่แน่นอน → ต้องใช้ for loop คุมเองให้ยืดหยุ่นและแม่นยำ"
    // จำนวน items per page เปลี่ยนตลอด
    // ไม่มี numberOfPages ชัดเจน

    
    const totalPages = pages.length; // เพื่อการควบคุมหน้าไม่ให้เกินจำนวน

    // Navigation functions
    const nextSlide = () => {
        setCurrentPage(prev => (prev === totalPages - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentPage(prev => (prev === 0 ? totalPages - 1 : prev - 1));
    };

    // Auto-play functionality
    useEffect(() => {
        if (!autoPlay) return;
        const timer = setInterval(() => {
            nextSlide();
        }, autoPlayInterval);
        return () => clearInterval(timer);
    }, [autoPlay, autoPlayInterval, totalPages]);

    // If no items or pages, don't render anything
    if (pages.length === 0) return null;

    return (
        <div className="slider">
            <div
                className="slider-wrapper"
                style={{
                    width: `${totalPages * 100}%`,
                    transform: `translateX(-${currentPage * (100 / totalPages)}%)`,
                }}
            >
                {pages.map((page, pageIndex) => ( 
                    // เช่น pages = [[1,2,3,4,5],[6,7,8,9,10]] จำนวนหน้ามี 2 หน้า 

                    <div
                        key={pageIndex}
                        className="slider-page"
                        style={{
                            width: `${100 / totalPages}%`,
                        }}
                    >
                        {page.map((item, index) => ( //ในเเต่ละหน้ามี item 1-5, 6-10
                            <div 
                                key={index} 
                                className="slide-item"
                                style={{
                                    aspectRatio: '2/3',
                                    width: '100%'
                                }}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <button onClick={prevSlide} className="slider-button prev">
                &#10094;
            </button>
            <button onClick={nextSlide} className="slider-button next">
                &#10095;
            </button>
            
            {/* Removed the page indicators section */}
        </div>
    );
}

export default Slider;
