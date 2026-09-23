import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import { PageHero, Breadcrumbs, LoadingSpinner } from '../components/common/UI';
import API, { getImageUrl } from '../services/api';

const defaultFacilities = [
  { id: 1, name: 'Basement', description: 'The basement has a wooden shuttle court. Club has Table Tennis, Chess, & Carom Facilities in the same floor. Billiards Lounge is being planned in the same floor.' },
  { id: 2, name: 'Ground Floor', description: 'Ground Floor has a front office and a beautiful & compact library. The collection of books in Kannada & English is about 2000 and the collection of DVDs is about 200. Some of the Members have donated good books to the library. The library has subscribed to many news papers and periodicals.'},
  { id: 3, name: 'Mezzanine Floor', description: 'This floor has an air Conditioned mini party hall, which can accommodate about 30 people. The party hall has a serving room and a toilet. The tariff for this room is Rs. 1,000/-. Food and Liquor are served as per the order booked in advance.'},
  { id: 4, name: 'First Floor', description: 'First floor has an office, a Board Room and Air Conditioned Cards room. Cards room is open on all days during Evening and on Sundays, second Saturdays and public Holidays, it is opened in the afternoon also. Rummy Jackpot Tournament is conducted every year and card players from all over the State take part in the Event.'},
  { id: 5, name: 'Second Floor', description: 'Second Floor is considered to be a jewel in the crown with an air conditioned Family Restaurant, Non Air Conditioned Family Restaurant, Air Conditioned Men’s Bar and Air Conditioned Ultra-Mini Party hall for small get-togethers of about 10 people. Tariff for this AC ultra-mini Party Hall is Rs.250/-. Second floor houses a state of the Art Kitchen with separate Veg and Non Veg Sections.' },
  { id: 6, name: 'Third Floor', description: 'Third Floor has a Beautiful Party hall, which can accommodate about 250 people. It has a Dias and Public Address System. This hall is generally overbooked due to its low tariff of Rs.2,200/- and members book this hall for birthday functions, Get-togethers, engagement parties, Installation and Charternite programmes of lions Clubs and Rotary Clubs, Election Campaign Parties etc. This hall has a serving area and food & liquor can be served from this area. <br> This floor also has a non AC small party hall, which can accommodate about 15 people. Tariff for this room is Rs.250/-. <br> An Ultra Modern gym with treadmills, multi gym, elliptical cross trainer, recumbent bike, spin bike, dumbbells, bars and weight plates, abdominal bench, incline & flat bench, Dip Station, Aerobic Stepper, Squat Rack etc. There is a separate batch for ladies between 11AM 12 Noon. Members and their guests (in presence of members) enjoy this facility by paying a nominal fee of Rs.200/- per month (for guests). The Gym is open from 6 AM to 12 noon in the morning hours and 5 PM to 9 PM in the evening Hours. <br> The Club has an Ayurvedic Massage Centre and a steam Bath. Masseurs (separately for ladies and gents) can be booked with prior appointment.'},
];

export default function AmenitiesPage() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    API.get('/facilities')
      .then(res => { 
        if (res.data?.data?.length) {
          setFacilities(res.data.data);
        } else {
          setFacilities(defaultFacilities);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch facilities:', err);
        setError('Unable to load facilities. Showing default facilities.');
        setFacilities(defaultFacilities);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <MainLayout>
      <Helmet>
        <title>Amenities & Facilities | Nandini Layout Club</title>
        <meta name="description" content="Explore world-class amenities at Nandini Layout Club - sports, dining, wellness, accommodation and more." />
      </Helmet>
      <div className="pt-24 lg:pt-[190px]">
        <PageHero title="Amenities & Facilities" subtitle="World-Class Offerings" />
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Amenities' }]} />

        <section className="py-16">
          <div className="container-custom">
            <div className="text-center mb-12">
              <p className="section-subtitle">What We Offer</p>
              <h2 className="section-title">Club Facilities</h2>
              <div className="section-divider mx-auto"></div>
              <p className="text-gray-600 max-w-2xl mx-auto mt-4">
                Nandini Layout Club offers an unparalleled range of facilities spread across multiple floors, 
                catering to every aspect of leisure, sport, health and social engagement.
              </p>
              {error && (
                <p className="text-sm text-yellow-600 mt-4 bg-yellow-50 p-3 rounded">{error}</p>
              )}
            </div>

            {loading ? <LoadingSpinner /> : (
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
                {facilities.map((fac, i) => (
                  <motion.div key={fac.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="card group overflow-hidden h-full flex flex-col">
                    {/* <div className="h-52 overflow-hidden">
                      <img src={getImageUrl(fac.image_url)}
                        alt={fac.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy" />
                    </div> */}
                    <div className="p-6 flex flex-col flex-grow">
                      
                      <h3 className="font-serif text-xl text-primary font-bold mt-1 mb-3">{fac.name}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed flex-grow">{fac.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
