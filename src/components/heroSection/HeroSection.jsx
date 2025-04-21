import React, { useState, useEffect } from "react";

function HeroSection() {
  const images = [
    "https://static.vecteezy.com/system/resources/previews/004/299/835/original/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg",

    "https://static.vecteezy.com/system/resources/previews/001/213/384/large_2x/online-shopping-mobile-app-with-truck-and-delivery-man-vector.jpg",

    "https://static.vecteezy.com/system/resources/previews/001/370/039/non_2x/online-shopping-concept-with-mobile-phone-free-vector.jpg",

    "https://static.vecteezy.com/system/resources/previews/001/177/137/non_2x/online-shopping-concept-for-mobile-application-vector.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full h-[250px] md:h-[400px] overflow-hidden relative rounded-lg shadow-lg">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className="w-full h-[250px] md:h-[400px] object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* indicators */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default HeroSection;
