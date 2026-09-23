import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import API from '../../services/api';
import 'swiper/css';
import 'swiper/css/pagination';

const defaultTestimonials = [
  { id: 1, name: 'Rajesh Kumar', designation: 'Member since 2010', message: 'Nandini Layout Club has been our second home for over a decade. The facilities are world-class and the staff is always warm and welcoming.', rating: 5 },
  { id: 2, name: 'Priya Sharma', designation: 'Family Member', message: 'The club offers excellent facilities for the whole family. My children love the sports courts and we all enjoy the restaurant.', rating: 5 },
  { id: 3, name: 'Dr. Arun Patel', designation: 'Corporate Member', message: 'Excellent venue for corporate events. The banquet facilities are top-notch and the catering is superb.', rating: 5 },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(defaultTestimonials);

  useEffect(() => {
    API.get('/testimonials')
      .then(res => { if (res.data.data?.length) setTestimonials(res.data.data); })
      .catch(() => {});
  }, []);

  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 41px)' }} />
      <div className="container-custom relative">
        <div className="text-center mb-12">
          <p className="text-gold uppercase tracking-widest text-sm font-sans mb-3">Testimonials</p>
          <h2 className="font-serif text-3xl md:text-4xl text-white font-bold">What Our Members Say</h2>
          <div className="w-16 h-1 bg-gold mx-auto mt-4"></div>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          className="pb-10">
          {testimonials.map(t => (
            <SwiperSlide key={t.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm p-8 text-white border border-white/20">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <span key={i} className="text-gold text-lg">★</span>
                  ))}
                </div>
                <p className="text-white/85 text-sm leading-relaxed mb-6 italic">"{t.message}"</p>
                <div className="flex items-center gap-3 border-t border-white/20 pt-5">
                  <div className="w-11 h-11 bg-gold/20 rounded-full flex items-center justify-center font-serif font-bold text-gold text-xl">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-serif font-semibold text-white">{t.name}</p>
                    <p className="text-white/60 text-xs font-sans">{t.designation}</p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
