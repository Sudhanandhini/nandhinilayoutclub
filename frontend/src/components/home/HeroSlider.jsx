import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import API, { getImageUrl } from '../../services/api';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import banner1 from '/assets/images/home/banner/slider-01.jpg';
import banner2 from '/assets/images/home/banner/slider-02.jpg';
import banner3 from '/assets/images/home/banner/slider-03.jpg';
import banner4 from '/assets/images/home/banner/slider-04.jpg';

const defaultSlides = [
  {
    id: 1,
    image_url: banner1,
  },
  {
    id: 2,
   
    image_url: banner2,
  },
  {
    id: 3,
   
    image_url: banner3,
  },
  {
    id: 4,
  
    image_url: banner4,
  }
];

export default function HeroSlider() {
  const [slides, setSlides] = useState(defaultSlides);

  useEffect(() => {
    API.get('/banners')
      .then(res => { if (res.data.data?.length) setSlides(res.data.data); })
      .catch(() => {});
  }, []);

  return (
    <div className="relative w-full h-screen min-h-[500px]">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        loop
        className="w-full h-full">
        {slides.map(slide => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <img
                src={getImageUrl(slide.image_url)}
                alt={slide.title || 'Club banner'}
                className="w-full h-screen object-cover"
                loading={slide.id === 1 ? 'eager' : 'lazy'}
              />
              {/* Overlay */}
              
             
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Scroll down indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-white/70 gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}>
        <span className="text-xs uppercase tracking-widest font-sans">Scroll</span>
        <div className="w-px h-10 bg-white/40"></div>
      </motion.div>
    </div>
  );
}
