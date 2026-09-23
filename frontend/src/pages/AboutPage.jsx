import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { PageHero, Breadcrumbs, LoadingSpinner } from '../components/common/UI';
import API from '../services/api';
import { motion } from 'framer-motion';

const pageMap = {
  '': { slug: 'about-club', title: 'About Club', subtitle: 'Who We Are' },
  'presidents-message': { slug: 'presidents-message', title: "President's Message", subtitle: 'Leadership' },
  'secretarys-message': { slug: 'secretarys-message', title: "Secretary's Message", subtitle: 'Leadership' },
  'vice-presidents-message': { slug: 'vice-presidents-message', title: "Vice President's Message", subtitle: 'Leadership' },
};

export default function AboutPage() {
  const { subpage = '' } = useParams();
  const info = pageMap[subpage] || pageMap[''];
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    API.get(`/pages/${info.slug}`)
      .then(res => setPage(res.data.data))
      .catch(() => setPage(null))
      .finally(() => setLoading(false));
  }, [info.slug]);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'About Club', href: '/about' },
    ...(subpage ? [{ label: info.title }] : []),
  ];

  return (
    <MainLayout>
      <Helmet>
        <title>{page?.meta_title || `${info.title} | Nandini Layout Club`}</title>
        <meta name="description" content={page?.meta_description || `${info.title} - Nandini Layout Club`} />
      </Helmet>
      <div className="pt-24 lg:pt-[190px]">
        <PageHero title={info.title} subtitle={info.subtitle} />
        <Breadcrumbs items={breadcrumbs} />
        <div className="container-custom py-16">
          {loading ? (
            <LoadingSpinner />
          ) : page ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed
                [&_p]:mb-4 [&_h2]:font-serif [&_h2]:text-primary [&_h2]:text-2xl [&_strong]:text-primary"
                dangerouslySetInnerHTML={{ __html: page.content }} />
            </motion.div>
          ) : (
            <div className="text-center py-10">
              {/* Default content when page not in DB */}
              <DefaultAboutContent subpage={subpage} />
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

function DefaultAboutContent({ subpage }) {
  if (subpage === 'presidents-message') {
    return (
      <div className="max-w-3xl mx-auto text-left">
        <h2 className="font-serif text-2xl text-primary mb-6">A Message from Our President</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Dear Members and Guests, It is with great pride and honor that I welcome you to Nandini Layout Club. 
          Our club has been a cornerstone of the West Bangalore community since 1986, providing a space where 
          families and friends can come together to enjoy the finest amenities and social experiences.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          We remain committed to excellence in all that we do, continually enhancing our facilities and 
          services to meet the evolving needs of our valued members.
        </p>
        <p className="text-gray-700 font-semibold mt-8">Warm regards,<br/>President, Nandini Layout Club</p>
      </div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto text-left">
      <h2 className="font-serif text-2xl text-primary mb-6">Welcome to Nandini Layout Club</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Nandini Layout Club is the perfect place to enjoy life in a classy and friendly atmosphere! 
        The Club houses a unique combination of the traditions of an exclusive club and the best of 
        today's sporting, leisure, entertaining and hotel facilities, in one of the most convenient 
        locations in West Bangalore.
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        From its humble beginning as "Chord Road Club" in 1986, the club has grown steadily with 
        a total membership of close to 1000. Our dedicated team works tirelessly to ensure that your 
        experience at the club is always exceptional.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {[
          { title: 'Vision', text: 'To be the most preferred social club in Bangalore, offering world-class facilities and unmatched member experiences.' },
          { title: 'Mission', text: 'To provide our members a perfect blend of sports, leisure, and social activities in a warm and welcoming environment.' },
          { title: 'Values', text: 'Excellence, integrity, community, and a commitment to the well-being of all our members and their families.' },
        ].map(item => (
          <div key={item.title} className="bg-cream p-6 border-t-4 border-primary">
            <h3 className="font-serif text-lg text-primary font-bold mb-3">{item.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
