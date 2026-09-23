import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Public pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import AmenitiesPage from './pages/AmenitiesPage';
import MembershipPage from './pages/MembershipPage';
import AffiliatedClubPage from './pages/AffiliatedClub';
import { FindUsPage, NewsEventsPage, RoomsPage } from './pages/OtherPages';

// Admin pages
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminBanners from './admin/AdminBanners';
import AdminGallery from './admin/AdminGallery';
import AdminFacilities from './admin/AdminFacilities';
import AdminTestimonials from './admin/AdminTestimonials';
import AdminCommittee from './admin/AdminCommittee';
import AdminAffiliatedClubs from './admin/AdminAffiliatedClubs';
import { AdminContacts, AdminMemberships } from './admin/AdminForms';
import { AdminNews, AdminPages } from './admin/AdminContent';

// 404
function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="font-serif text-8xl text-primary font-bold opacity-20 mb-4">404</div>
      <h1 className="font-serif text-3xl text-primary font-bold mb-3">Page Not Found</h1>
      <p className="text-gray-500 mb-6">The page you're looking for doesn't exist.</p>
      <a href="/" className="btn-primary">Go Home</a>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        {/* ── Public ── */}
        <Route path="/" element={<HomePage />} />

        {/* About */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/about/:subpage" element={<AboutPage />} />

        {/* Membership */}
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/membership/:subpage" element={<MembershipPage />} />

        {/* Other public */}
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/amenities" element={<AmenitiesPage />} />
        <Route path="/affiliated-club" element={<AffiliatedClubPage />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/news-events" element={<NewsEventsPage />} />
        <Route path="/find-us" element={<FindUsPage />} />

        {/* ── Admin ── */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin" element={
          <ProtectedRoute><AdminDashboard /></ProtectedRoute>
        } />
        <Route path="/admin/banners" element={
          <ProtectedRoute><AdminBanners /></ProtectedRoute>
        } />
        <Route path="/admin/gallery" element={
          <ProtectedRoute><AdminGallery /></ProtectedRoute>
        } />
        <Route path="/admin/facilities" element={
          <ProtectedRoute><AdminFacilities /></ProtectedRoute>
        } />
        <Route path="/admin/testimonials" element={
          <ProtectedRoute><AdminTestimonials /></ProtectedRoute>
        } />
        <Route path="/admin/committee" element={
          <ProtectedRoute><AdminCommittee /></ProtectedRoute>
        } />
        <Route path="/admin/affiliated-clubs" element={
          <ProtectedRoute><AdminAffiliatedClubs /></ProtectedRoute>
        } />
        <Route path="/admin/contacts" element={
          <ProtectedRoute><AdminContacts /></ProtectedRoute>
        } />
        <Route path="/admin/memberships" element={
          <ProtectedRoute><AdminMemberships /></ProtectedRoute>
        } />
        <Route path="/admin/news" element={
          <ProtectedRoute><AdminNews /></ProtectedRoute>
        } />
        <Route path="/admin/pages" element={
          <ProtectedRoute><AdminPages /></ProtectedRoute>
        } />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}
