import React, { useState, useEffect } from "react";
import "./Slider.css";

interface SliderProps {
    items: React.ReactNode[];
    itemsPerPage?: number;
    autoPlay?: boolean;
    autoPlayInterval?: number;
}

const Slider: React.FC<SliderProps> = ({
    items,
    itemsPerPage: defaultItemsPerPage = 5,
    autoPlay = true,
    autoPlayInterval = 3000,
}) => {
    const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
    const [currentPage, setCurrentPage] = useState(0);

    // Handle responsive behavior
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setItemsPerPage(2);
            } else if (width < 768) {
                setItemsPerPage(3);
            } else if (width < 1024) {
                setItemsPerPage(4);
            } else {
                setItemsPerPage(defaultItemsPerPage);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [defaultItemsPerPage]);

    // Create pages from items
    const pages = [];
    for (let i = 0; i < items.length; i += itemsPerPage) {
        pages.push(items.slice(i, i + itemsPerPage));
    }
    const totalPages = pages.length;

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
                    <div
                        key={pageIndex}
                        className="slider-page"
                        style={{
                            width: `${100 / totalPages}%`,
                            display: 'grid',
                            gridTemplateColumns: `repeat(${itemsPerPage}, 1fr)`,
                            gap: '1rem',
                            padding: '1rem'
                        }}
                    >
                        {page.map((item, index) => (
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
            
            {/* Page indicators */}
            <div className="slider-indicators">
                {pages.map((_, index) => (
                    <button
                        key={index}
                        className={`indicator ${currentPage === index ? 'active' : ''}`}
                        onClick={() => setCurrentPage(index)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Slider;
