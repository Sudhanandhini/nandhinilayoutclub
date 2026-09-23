import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { PageHero, Breadcrumbs } from '../components/common/UI';
import API, { getImageUrl } from '../services/api';
import toast from 'react-hot-toast';

const membershipTypes = [
  { value: 'individual', label: 'Individual', price: 'Contact Club', benefits: ['Access to all club facilities', 'Voting rights', 'Member discounts', 'Guest passes (2/month)'] },
  { value: 'family', label: 'Family', price: 'Contact Club', benefits: ['All Individual benefits', 'Spouse & children included', 'Family events access', 'Additional guest passes'] },
  { value: 'corporate', label: 'Corporate', price: 'Contact Club', benefits: ['Multiple member cards', 'Conference room priority', 'Corporate event facilities', 'Dedicated relationship manager'] },
  { value: 'senior', label: 'Senior Citizen', price: 'Contact Club', benefits: ['Special discounted rates', 'Senior-friendly facilities', 'Health programs access', 'Priority service'] },
];

export default function MembershipPage() {
  const { subpage } = useParams();
  const isApply = subpage === 'apply';

  if (isApply) return <MembershipApplyForm />;
  if (subpage === 'managing-committee') return <ManagingCommittee />;
  if (subpage === 'sub-committees') return <SubCommittees />;

  return (
    <MainLayout>
      <Helmet>
        <title>Membership | Nandini Layout Club</title>
        <meta name="description" content="Join Nandini Layout Club - explore membership plans and benefits." />
      </Helmet>
      <div className="pt-24 lg:pt-[190px]">
        <PageHero title="Membership" subtitle="Join Our Community" />
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Membership' }]} />
        <section className="py-16">
          <div className="container-custom">
       
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
     <p>Membership is offered to the selected, educated and respectable people after through scrutiny followed by interview. Today,with a glorious history of 25 years,the club has grown steadily with a total membership of close to 1000.</p>

<p>Many of the great personalities in the locality have been the members and occupied coveted seats in Peenya Industries Association, Peenya Gymkhana, KASSIA, FKCCI, ASSOCHAM, Lions Club,Rotary Club,Bangalore Mahanagara Palike just to name a few.</p>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

function MembershipApplyForm() {
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', address: '', membership_type: 'individual', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.full_name || !form.email || !form.phone) {
      toast.error('Please fill all required fields.'); return;
    }
    setLoading(true);
    try {
      await API.post('/membership/apply', form);
      setSubmitted(true);
      toast.success('Application submitted successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <Helmet><title>Apply for Membership | Nandini Layout Club</title></Helmet>
      <div className="pt-24 lg:pt-[190px]">
        <PageHero title="Apply for Membership" subtitle="Join Our Family" />
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Membership', href: '/membership' }, { label: 'Apply' }]} />
        <section className="py-16">
          <div className="container-custom max-w-2xl mx-auto">
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16">
                <div className="text-6xl mb-4">✅</div>
                <h2 className="font-serif text-2xl text-primary font-bold mb-3">Application Submitted!</h2>
                <p className="text-gray-600">Thank you for your interest. Our team will contact you within 3–5 business days.</p>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 shadow-lg border-t-4 border-primary">
                <h3 className="font-serif text-xl text-primary font-bold mb-6">Membership Application Form</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Full Name *</label>
                      <input name="full_name" value={form.full_name} onChange={handleChange} required className="input-field" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Email *</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} required className="input-field" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Phone *</label>
                      <input name="phone" value={form.phone} onChange={handleChange} required className="input-field" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Membership Type</label>
                      <select name="membership_type" value={form.membership_type} onChange={handleChange} className="input-field">
                        {membershipTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Address</label>
                    <textarea name="address" value={form.address} onChange={handleChange} rows={3} className="input-field resize-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Additional Message</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={3} className="input-field resize-none" />
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
                    {loading ? 'Submitting...' : 'Submit Application'}
                  </button>
                </form>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

function ManagingCommittee() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/committee')
      .then(res => setMembers(res.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <MainLayout>
      <Helmet><title>Managing Committee | Nandini Layout Club</title></Helmet>
      <div className="pt-24 lg:pt-[190px]">
        <PageHero title="Managing Committee" subtitle="Club Leadership" />
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Membership', href: '/membership' }, { label: 'Managing Committee' }]} />
        <section className="py-16">
          <div className="container-custom">
            {loading ? (
              <div className="text-center py-10 text-gray-400">Loading...</div>
            ) : members.length === 0 ? (
              <p className="text-center text-gray-500">Committee details will be updated shortly.</p>
            ) : (
              <div className="flex flex-col gap-8">
                {members.map((m, i) => (
                  <motion.div key={m.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                    <img src={getImageUrl(m.photo_url)} alt="Managing Committee"
                      className="w-full object-contain rounded-lg shadow-md" loading="lazy" />
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

function SubCommittees() {
  const subCommittees = [
    {
      id: 1,
      name: 'ಕಾರ್ಡ್ಸ್',
      nameEn: 'Cards',
      chairman: 'ಶ್ರೀ. ನಾರಾಯಣ ಆರ್ - ಛೇರ್ಮನ್',
      viceChairman: 'ಶ್ರೀ. ಕೆ.ಸಿ.ಎನ್.ಎಸ್ ಚಂದು - ಉಪಾಧ್ಯಕ್ಷರು',
      members: [],
    },
    {
      id: 2,
      name: 'ಬಾರ್',
      nameEn: 'Bar',
      chairman: 'ಶ್ರೀ. ಅನಂದನ್ ಎಂ - ಛೇರ್ಮನ್',
      viceChairman: 'ಶ್ರೀ. ಶ್ರೀನಿವಾಸ್ ಹೆಚ್ - ಉಪಾಧ್ಯಕ್ಷರು',
      members: [
        'ಶ್ರೀ. ಕನ್ನಯ್ಯ - ಸದಸ್ಯರು',
        'ಶ್ರೀ. ತಿಮ್ಮೇಗೌಡ - ಸದಸ್ಯರು',
        'ಶ್ರೀ. ಶ್ರೀನಿವಾಸ್ ಹೆಚ್.ಎ - ಸದಸ್ಯರು',
      ],
    },
    {
      id: 3,
      name: 'ಕ್ಯಾಂಟೀನ್',
      nameEn: 'Canteen',
      chairman: 'ಶ್ರೀ. ಕೃಷ್ಣಮೂರ್ತಿ ನಾಯಕ್ - ಛೇರ್ಮನ್',
      viceChairman: 'ಶ್ರಿ. ಸಂಪತ್ ಎನ್ - ಉಪಾಧ್ಯಕ್ಷರು',
      members: [
        'ಶ್ರಿ. ಎಸ್ ರವಿ - ಸದಸ್ಯರು',
        'ಶ್ರೀ. ಕಣ್ಣನ್ ಜಿ.ಎಸ್ - ಸದಸ್ಯರು',
      ],
    },
    {
      id: 4,
      name: 'ಮೂಲಭೂತ ಸೌಕರ್ಯ ಮತ್ತು ನಿರ್ವಹಣೆ',
      nameEn: 'Infrastructure & Maintenance',
      chairman: 'ಶ್ರಿ. ಕಿರಣ್ ಕುಮಾರ್ ಕೆ.ಎನ್ - ಛೇರ್ಮನ್',
      viceChairman: 'ಶ್ರೀ. ರಮೇಶ್ ಜೆ - ಉಪಾಧ್ಯಕ್ಷರು',
      members: [
        'ಶ್ರಿ. ರಮೇಶ್ ಸಿ.ಬಿ - ಸದಸ್ಯರು',
        'ಶ್ರೀ. ವೆಂಕಟೇಶ್ ಜಿ - ಸದಸ್ಯರು',
        'ಶ್ರಿ. ಶ್ರೀನಿವಾಸ್ ಹೆಚ್ ಎ - ಸದಸ್ಯರು',
      ],
    },
    {
      id: 5,
      name: 'ಕ್ಲಬ್ ಸಂಯೋಜನೆ',
      nameEn: 'Club Coordination',
      chairman: 'ಪ್ರೋ. ಸಂಜಯ್ ಜೇಗರ್ಕಲ್ - ಛೇರ್ಮನ್',
      viceChairman: 'ಶ್ರೀ. ಸಿದ್ದಲಿಂಗೇಶ್ವರ - ಉಪಾಧ್ಯಕ್ಷರು',
      members: [
        'ಶ್ರೀ. ವೆಂಕಟೇಶ್ ವಿ - ಸದಸ್ಯರು',
        'ಶ್ರಿ. ತೇಜ್ ಕುಮಾರ್ ಎನ್ ವಿ - ಸದಸ್ಯರು',
        'ಶ್ರೀ. ಶ್ರೀನಿವಾಸ್ ಹೆಚ್ - ಸದಸ್ಯರು',
        'ಶ್ರೀ. ಪ್ರಕಾಶ್ ಹೆಚ್.ಕೆ - ಸದಸ್ಯರು',
      ],
    },
    {
      id: 6,
      name: 'ನಿವೇಶನ ಖರೀದಿ',
      nameEn: 'Site Purchase',
      chairman: 'ಶ್ರಿ. ವಿಜಯಕುಮಾರ್ ಹೆಚ್ - ಛೇರ್ಮನ್',
      viceChairman: 'ಶ್ರೀ. ಆನಂದ ಮೂರ್ತಿ ಸಿ - ಉಪಾಧ್ಯಕ್ಷರು',
      members: [
        'ಡಾ. ಶ್ರೀನಿವಾಸ್ ಎಂ.ಎಸ್ - ಸಲಹೆಗಾರರು',
        'ಶ್ರೀ. ಶಿವಣ್ಣ - ಸದಸ್ಯರು',
        'ಶ್ರೀ. ಪ್ರೇಮಕುಮಾರ್ ಹೆಚ್.ವಿ - ಸದಸ್ಯರು',
        'ಶ್ರೀ. ದಯಾನಂದ ರೇವಣಕರ್ - ಸದಸ್ಯರು',
      ],
    },
    {
      id: 7,
      name: 'ಸಾಂಸ್ಕೃತಿಕ',
      nameEn: 'Cultural',
      chairman: 'ಶ್ರೀ. ಭೈರೇಗೌಡ - ಛೇರ್ಮನ್',
      viceChairman: 'ಶ್ರೀ. ರಮೇಶ್ ಕೆ - ಉಪಾಧ್ಯಕ್ಷರು',
      members: [
        'ಶ್ರೀ. ನವೀನ್ ಸುವರ್ಣ - ಸದಸ್ಯರು',
        'ಶ್ರೀ. ಪ್ರಸನ್ನ ಕುಮಾರ್ - ಸದಸ್ಯರು',
        'ಶ್ರೀ. ಗಜೇಂದ್ರ ನಾಯ್ಡು - ಸದಸ್ಯರು',
        'ಶ್ರೀ. ಸ್ವಾಮಿ ಎಂ.ಹೆಚ್ - ಸದಸ್ಯರು',
        'ಶ್ರೀ. ಪ್ರೇಮ್ ಕುಮಾರ್ ಹೆಚ್.ವಿ - ಸದಸ್ಯರು',
        'ಶ್ರೀ. ಪ್ರಕಾಶ್ ಡಿ - ಸದಸ್ಯರು',
        'ಶ್ರೀ. ಲೋಕೇಶ್ ಕೆ.ಬಿ - ಸದಸ್ಯರು',
      ],
    },
    {
      id: 8,
      name: 'ಕ್ರೀಡಾ',
      nameEn: 'Sports',
      chairman: 'ಶ್ರೀ. ಕೆ.ಸಿ.ಎನ್.ಎಸ್ ಚಂದು - ಛೇರ್ಮನ್',
      viceChairman: 'ಶ್ರೀ. ಮುರಳಿ - ಉಪಾಧ್ಯಕ್ಷರು',
      members: [
        'ಶ್ರೀ. ಚೌಡಪ್ಪ - ಸದಸ್ಯರು',
        'ಶ್ರೀ. ಕೆಂಪೇಗೌಡ ಕೆ - ಸದಸ್ಯರು',
        'ಶ್ರೀ. ರಾಜೇಶ್ ಜೆ - ಸದಸ್ಯರು',
      ],
    },
    {
      id: 9,
      name: 'ಗ್ರಂಥಾಲಯ',
      nameEn: 'Library',
      chairman: 'ಶ್ರೀ. ರವಿಕುಮಾರ್ ವಿ - ಛೇರ್ಮನ್',
      viceChairman: 'ಪ್ರೋ. ಸಂಜಯ್ ಜೇಗರ್ಕಲ್ - ಉಪಾಧ್ಯಕ್ಷರು',
      members: [
        'ಶ್ರೀ. ಶ್ರೀಧರ್ ಕೆ.ಎನ್ - ಸದಸ್ಯರು',
        'ಶ್ರೀ. ಹರೀಶ್ ಹೆಚ್ - ಸದಸ್ಯರು',
      ],
    },
    {
      id: 10,
      name: 'ಸದಸ್ಯತ್ವ ಅಭಿವೃದ್ಧಿ',
      nameEn: 'Membership Development',
      chairman: 'ಶ್ರೀ. ಸಿದ್ದಲಿಂಗೇಶ್ವರ - ಛೇರ್ಮನ್',
      viceChairman: '',
      members: [
        'ಶ್ರೀ. ಲಕ್ಷ್ಮೀ ಕಾಂತ್ ರಾಜು - ಸದಸ್ಯರು',
        'ಶ್ರೀ. ಬಸವರಾಜು ಸಿ.ಎಸ್ - ಸದಸ್ಯರು',
      ],
    },
    {
      id: 11,
      name: 'ಸ್ವಚ್ಛತಾ ನಿರ್ವಹಣೆ',
      nameEn: 'Cleanliness & Maintenance',
      chairman: 'ಶ್ರೀ. ವಿಜಯಕುಮಾರ್ ಹೆಚ್ - ಛೇರ್ಮನ್',
      viceChairman: 'ಶ್ರೀ. ಮುರಳಿ - ಉಪಾಧ್ಯಕ್ಷರು',
      members: [
        'ಶ್ರೀ. ರಮೇಶ್ ಜೆ - ಸದಸ್ಯರು',
        'ಶ್ರೀ. ಸಂಪತ್ ಎನ್ - ಸದಸ್ಯರು',
      ],
    },
    {
      id: 12,
      name: 'ಗಣಕೀಕರಣ',
      nameEn: 'Computerisation',
      chairman: 'ಶ್ರೀ. ಕೃಷ್ಣಮೂರ್ತಿ ನಾಯಕ್ - ಛೇರ್ಮನ್',
      viceChairman: '',
      members: [
        'ಶ್ರೀ. ಉಮಾಶಂಕರ್ - ಸದಸ್ಯರು',
        'ಶ್ರೀ. ದಯಾನಂದ ರೇವಣಕರ್ - ಸದಸ್ಯರು',
        'ಶ್ರೀ. ರಮೇಶ್ ಸಿ.ಬಿ - ಸದಸ್ಯರು',
      ],
    },
    {
      id: 13,
      name: 'ಮೈತ್ರಿ',
      nameEn: 'Maitri (Newsletter)',
      chairman: 'ಶ್ರೀ. ಮಂಜುನಾಥನ್ ಎಂ - ಸಂಪಾದಕರು',
      viceChairman: '',
      members: [
        'ಶ್ರೀ. ಸ್ವಾಮಿ ಎಂ.ಹೆಚ್ - ಸದಸ್ಯರು',
      ],
    },
    {
      id: 14,
      name: 'ಖರೀದಿ',
      nameEn: 'Purchase',
      chairman: 'ಪದಾಧಿಕಾರಿಗಳು',
      viceChairman: '',
      members: [],
    },
    {
      id: 15,
      name: 'ಆಂತರಿಕ ಲೆಕ್ಕಪರಿಶೋಧನೆ',
      nameEn: 'Internal Audit',
      chairman: 'ಶ್ರೀ. ಕೃಷ್ಣ ಪಿ.ಹೆಚ್ - ಛೇರ್ಮನ್',
      viceChairman: '',
      members: [
        'ಶ್ರೀ. ಶ್ರೀನಿವಾಸ್ ವೈ - ಸದಸ್ಯರು',
      ],
    },
    {
      id: 16,
      name: 'ನಿಯಮ ತಿದ್ದುಪಡಿ',
      nameEn: 'Rules Amendment',
      chairman: 'ಶ್ರೀ. ಪ್ರಕಾಶ್ ಎನ್ ರಾಯ್ಕರ್ - ಛೇರ್ಮನ್',
      viceChairman: 'ಶ್ರೀ. ಮಲ್ಲಿನಾಥ್ ಜಿ.ಡಿ - ಉಪಾಧ್ಯಕ್ಷರು',
      members: [
        'ಶ್ರೀ. ಮೋಹನ್ ಶೆಟ್ಟಿ ಬಿ.ಎನ್ - ಸದಸ್ಯರು',
        'ಶ್ರೀ. ಗಿರೀಶ್ ಎಂ - ಸದಸ್ಯರು',
        'ಶ್ರೀ. ಭಾಸ್ಕರ್ ಜಿ. ನಾಯ್ಡು - ಸದಸ್ಯರು',
      ],
    },
    {
      id: 17,
      name: 'ಶಿಸ್ತು ಸಮಿತಿ',
      nameEn: 'Discipline Committee',
      chairman: 'ಡಾ ಜೆ. ಕ್ರಾಸ್ಟಾ - ಛೇರ್ಮನ್',
      viceChairman: 'ಶ್ರೀ. ಪ್ರಕಾಶ್ ಎನ್ ರಾಯ್ಕರ್ - ಉಪಾಧ್ಯಕ್ಷರು',
      members: [
        'ಶ್ರೀ. ಅರವಿಂದ ಎನ್. ಬುರ್ಜಿ - ಸದಸ್ಯರು',
        'ಶ್ರೀ. ಸುರೇಶ್ ಪಿ - ಸದಸ್ಯರು',
        'ಶ್ರೀ. ಶ್ರೀರಾಮಯ್ಯ - ಸದಸ್ಯರು',
      ],
    },
    {
      id: 18,
      name: 'ಸಲಹಾ ಸಮಿತಿ',
      nameEn: 'Advisory Committee',
      chairman: 'ಶ್ರೀ. ಅರವಿಂದ ಎನ್ ಬುರ್ಜಿ - ಛೇರ್ಮನ್',
      viceChairman: 'ಡಾ ಜೆ. ಕ್ರಾಸ್ಟಾ - ಉಪಾಧ್ಯಕ್ಷರು',
      members: [
        'ಶ್ರೀ. ಪ್ರಕಾಶ್ ಎನ್ ರಾಯ್ಕರ್ - ಸದಸ್ಯರು',
        'ಶ್ರೀ. ಮೋಹನ್ ಶೆಟ್ಟಿ ಬಿ.ಎನ್ - ಸದಸ್ಯರು',
        'ಶ್ರೀ. ರಾಜೇಂದ್ರ ಕುಮಾರ್ ಕೆ.ವಿ - ಸದಸ್ಯರು',
        'ಶ್ರೀ. ಮಲ್ಲಿನಾಥ್ ಜಿ.ಡಿ - ಸದಸ್ಯರು',
        'ಶ್ರೀ. ಗಿರೀಶ್ ಎಂ - ಸದಸ್ಯರು',
        'ಶ್ರೀ. ಭಾಸ್ಕರ್ ಜಿ. ನಾಯ್ಡು - ಸದಸ್ಯರು',
        'ಡಾ. ಜಯರಾಮು - ಸದಸ್ಯರು',
      ],
    },
  ];

  return (
    <MainLayout>
      <Helmet>
        <title>Sub Committees | Nandini Layout Club</title>
        <meta name="description" content="Sub Committees of Nandini Layout Club - complete list of all sub-committee chairpersons, vice-chairpersons and members." />
      </Helmet>
      <div className="pt-24 lg:pt-[190px]">
        <PageHero title="Sub Committees" subtitle="Club Organization" />
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'Membership', href: '/membership' },
          { label: 'Sub Committees' },
        ]} />

        <section className="py-12">
          <div className="container-custom">

            <div className="overflow-x-auto shadow-sm border border-gray-200">
              <table className="w-full border-collapse text-sm">
                {/* Header */}
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="border border-primary/40 px-4 py-3 text-center font-sans font-semibold text-xs uppercase tracking-wide w-14">
                      ಕ್ರ.ಸಂ
                    </th>
                    <th className="border border-primary/40 px-4 py-3 text-left font-sans font-semibold text-xs uppercase tracking-wide w-56">
                      ಉಪ ಸಮಿತಿಗಳು
                    </th>
                    <th className="border border-primary/40 px-4 py-3 text-left font-sans font-semibold text-xs uppercase tracking-wide">
                      ಉಪ ಸಮಿತಿ ಛೇರ್ಮನ್, ಉಪಾಧ್ಯಕ್ಷರು ಮತ್ತು ಸದಸ್ಯರುಗಳು
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {subCommittees.map((sc, idx) => {
                    // Build all rows for this committee
                    const allRows = [];
                    // Chairman
                    allRows.push({ role: 'ಛೇರ್ಮನ್', name: sc.chairman, type: 'chairman' });
                    // Vice Chairman (if any)
                    if (sc.viceChairman) {
                      allRows.push({ role: 'ಉಪಾಧ್ಯಕ್ಷರು', name: sc.viceChairman, type: 'vice' });
                    }
                    // Members
                    sc.members.forEach(m => {
                      allRows.push({ role: 'ಸದಸ್ಯರು', name: m, type: 'member' });
                    });

                    return (
                      <motion.tr
                        key={sc.id}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.04 }}
                        className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/70'}
                        style={{ verticalAlign: 'top' }}>

                        {/* Sl. No. */}
                        <td className="border border-gray-200 px-3 py-3 text-center align-top">
                          <span className="font-bold text-primary text-sm">{sc.id}.</span>
                        </td>

                        {/* Committee Name */}
                        <td className="border border-gray-200 px-4 py-3 align-top">
                          <p className="font-serif font-bold text-primary leading-snug">{sc.name}</p>
                          <p className="text-gray-400 text-xs italic mt-0.5">{sc.nameEn}</p>
                        </td>

                        {/* Members column — each person on its own sub-row */}
                        <td className="border border-gray-200 px-0 py-0 align-top">
                          {allRows.map((row, ri) => (
                            <div
                              key={ri}
                              className={`flex items-start gap-3 px-4 py-2.5 ${ri < allRows.length - 1 ? 'border-b border-gray-100' : ''}`}>
                              {/* Role badge */}
                              {/* <span className={`
                                inline-flex items-center justify-center flex-shrink-0 mt-0.5
                                text-[10px] font-sans font-semibold px-2 py-0.5 min-w-[72px] text-center leading-tight
                                ${row.type === 'chairman'
                                  ? 'bg-primary text-white'
                                  : row.type === 'vice'
                                  ? 'bg-gold text-white'
                                  : 'bg-gray-100 text-gray-600 border border-gray-200'}
                              `}>
                                {row.type === 'chairman' ? 'ಛೇರ್ಮನ್' : row.type === 'vice' ? 'ಉಪಾಧ್ಯಕ್ಷರು' : 'ಸದಸ್ಯರು'}
                              </span> */}
                              {/* Name */}
                              <span className={`text-sm leading-snug ${row.type === 'chairman' ? 'font-semibold text-gray-900' : row.type === 'vice' ? 'font-medium text-gray-800' : 'text-gray-700'}`}>
                                {row.name}
                              </span>
                            </div>
                          ))}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Legend */}
            {/* <div className="mt-5 flex flex-wrap items-center gap-5 text-xs text-gray-500">
              <span className="font-semibold text-gray-600">Legend:</span>
              <div className="flex items-center gap-1.5">
                <span className="inline-block bg-primary text-white px-2 py-0.5 font-sans font-semibold text-[10px]">ಛೇರ್ಮನ್</span>
                <span>= Chairman</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block bg-gold text-white px-2 py-0.5 font-sans font-semibold text-[10px]">ಉಪಾಧ್ಯಕ್ಷರು</span>
                <span>= Vice Chairman</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block bg-gray-100 text-gray-600 border border-gray-200 px-2 py-0.5 font-sans font-semibold text-[10px]">ಸದಸ್ಯರು</span>
                <span>= Member</span>
              </div>
            </div> */}

          </div>
        </section>
      </div>
    </MainLayout>
  );
}
