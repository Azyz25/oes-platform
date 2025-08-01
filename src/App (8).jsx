import React, { useState, useEffect, useRef } from 'react';
import {
  Users,
  Target,
  Award,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Linkedin,
  Menu,
  X,
  Home,
  Settings,
  BarChart,
  PhoneCall,
} from 'lucide-react';
// Note: the original code imported Star but never used it.
import ParticlesSystem from './components/ParticlesSystem';
import './App.css';

/*
 * This component implements the landing page for the Organization Excellence Society
 * using React and Tailwind CSS.  Several adjustments were made based on the
 * provided requirements:
 *  - The navigation bar now always has a solid white background.  The
 *    `isScrolled` state and the conditional classes have been removed.  This
 *    ensures the navbar does not become transparent when scrolled past the
 *    hero section.
 *  - All buttons have been updated to use a consistent rectangular shape with
 *    small rounded corners, inspired by the provided design.  Gradient and
 *    border styles were tweaked to more closely match the reference.
 *  - The hero section layout was changed to a two‑column grid on large
 *    screens.  The descriptive text and call‑to‑action buttons are aligned to
 *    the right (RTL), while a decorative pattern occupies the left column.
 *    On smaller viewports the pattern is hidden and the content stacks.
 *  - A placeholder for the provided SVG pattern file has been added.  When
 *    deploying this code, place your uploaded pattern file in the public
 *    folder and update the `src` attribute below if necessary.
 */

// Counter component remains unchanged.
const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setIsVisible(true);
          setHasStarted(true);
        }
      },
      {
        threshold: 0.8,
        rootMargin: '-50px 0px -50px 0px',
      },
    );
    if (counterRef.current) {
      observer.observe(counterRef.current);
    }
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!isVisible || hasStarted === false) return;
    let startTime;
    let animationFrame;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    animationFrame = requestAnimationFrame(animate);
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isVisible, hasStarted, end, duration]);
  return (
    <span ref={counterRef} className="counter-number count-up">
      {count}
      {suffix}
    </span>
  );
};

const ScrollIndicator = () => {
  const scrollToNext = () => {
    const nextSection = document.getElementById('features');
    if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className="scroll-indicator" onClick={scrollToNext}>
      <div className="scroll-text">اعرف أكثر</div>
      <div className="mouse-icon">
        <div className="mouse-wheel" />
      </div>
    </div>
  );
};

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.525 3.488" />
  </svg>
);

// Custom X logo for the rebranded Twitter ("X")
// Lucide does not yet include the official X (Twitter) logo, so we embed
// the SVG path directly.  The viewBox matches the SVG downloaded from the
// official brand guidelines.  The path uses `currentColor` so it inherits
// text colour in CSS.
const XLogo = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 1200 1227"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
  </svg>
);

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Always solid navbar – no scroll tracking needed.

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      {/* The navbar sits in normal document flow so it doesn't overlay the hero. */}
      <nav className="navbar-solid sticky top-0 w-full z-50 transition-all duration-500">
        <div className="px-6 py-4 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <img
                src="/OES-logo1.svg"
                alt="شعار الجمعية"
                className="h-12 w-auto transition-all duration-500"
              />
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 space-x-reverse">
              <button
                onClick={() => scrollToSection('home')}
                className="hover:opacity-80 transition-opacity font-medium text-blue-600"
              >
                الرئيسية
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="hover:opacity-80 transition-opacity font-medium text-blue-600"
              >
                من نحن
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="hover:opacity-80 transition-opacity font-medium text-blue-600"
              >
                خدماتنا
              </button>
              <button
                onClick={() => scrollToSection('statistics')}
                className="hover:opacity-80 transition-opacity font-medium text-blue-600"
              >
                البرامج
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="hover:opacity-80 transition-opacity font-medium text-blue-600"
              >
                تواصل معنا
              </button>
            </div>
            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4 space-x-reverse">
              <button className="px-6 py-2 font-semibold border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
                تسجيل الدخول
              </button>
              <button className="px-6 py-2 font-semibold text-white bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 transition-all">
                انضم إلينا
              </button>
            </div>
            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-blue-600" />
              ) : (
                <Menu className="w-6 h-6 text-blue-600" />
              )}
            </button>
          </div>
        </div>
      </nav>
      {/* Mobile Menu - Outside of navbar */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden mobile-menu-backdrop"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {/* Mobile Menu Panel */}
          <div className="fixed top-0 right-0 h-full w-3/4 bg-white/95 backdrop-blur-xl shadow-2xl z-50 md:hidden mobile-menu-panel">
            {/* Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
              <div className="flex items-center space-x-3 space-x-reverse">
                {/* Use only the text name of the association in the mobile menu header */}
                <div className="text-sm">
                  <div className="font-bold text-gray-800">الجمعية التعاونية</div>
                  <div className="text-gray-600">للتميز المؤسسي</div>
                </div>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-full hover:bg-gray-100 transition-colors mobile-close-btn">
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            {/* Menu Items */}
            <div className="p-6 space-y-2">
              {[
                { label: 'الرئيسية', section: 'home', icon: <Home className="w-5 h-5 text-teal-500" /> },
                { label: 'من نحن', section: 'about', icon: <Users className="w-5 h-5 text-teal-500" /> },
                { label: 'خدماتنا', section: 'services', icon: <Settings className="w-5 h-5 text-teal-500" /> },
                { label: 'البرامج', section: 'statistics', icon: <BarChart className="w-5 h-5 text-teal-500" /> },
                { label: 'تواصل معنا', section: 'contact', icon: <PhoneCall className="w-5 h-5 text-teal-500" /> },
              ].map((item) => (
                <button
                  key={item.section}
                  onClick={() => {
                    scrollToSection(item.section);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-4 space-x-reverse p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-teal-50 transition-all duration-300 group mobile-menu-item"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                  <span className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {item.label}
                  </span>
                  <div className="mr-auto">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full" />
                  </div>
                </button>
              ))}
            </div>
            {/* Menu Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200/50">
              <div className="space-y-3">
                <button
                  className="w-full text-white py-3 font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                  style={{ background: 'linear-gradient(to right, #4960b2, #212856)' }}
                >
                  انضم إلينا
                </button>
                <button className="w-full border-2 border-blue-600 text-blue-600 py-3 font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300">
                  تسجيل الدخول
                </button>
              </div>
              {/* Social Icons */}
              <div className="flex justify-center space-x-4 space-x-reverse mt-6">
                {[
                  { icon: <WhatsAppIcon />, color: 'hover:bg-green-500' },
                  // Use the custom X logo instead of the deprecated Twitter icon
                  { icon: <XLogo className="w-4 h-4" />, color: 'hover:bg-blue-400' },
                  { icon: <Instagram className="w-4 h-4" />, color: 'hover:bg-pink-500' },
                  { icon: <Linkedin className="w-4 h-4" />, color: 'hover:bg-blue-600' },
                ].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 transform hover:scale-110 ${social.color}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {/* Hero Section */}
      <section id="home" className="hero-gradient relative overflow-hidden">
        {/* Particle background covering the entire hero */}
        <ParticlesSystem />
        {/* Pattern overlay for small screens – occupies the left portion of the hero */}
        <div className="absolute top-0 left-0 h-full w-2/5 md:hidden opacity-20 pointer-events-none">
          <img
            src="/pattern1.svg"
            alt="نمط زخرفي للجوال"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto flex flex-col md:flex-row items-center min-h-screen py-12">
          {/* Pattern column – only shown on medium screens and larger */}
          <div className="hidden md:block md:w-5/12 lg:w-5/12">
            <img src="/pattern1.svg" alt="نمط زخرفي" className="w-full h-full object-cover" />
          </div>
          {/* Hero content column */}
          <div className="w-full md:w-7/12 flex flex-col items-center md:items-end text-right md:pr-12 lg:pr-10">
            <img
              src="/OES-logo3.svg"
              alt="شعار الجمعية التعاونية للتميز المؤسسي"
              className="hero-logo mb-6"
            />
            <p className="hero-subtitle text-white/90 mb-6 max-w-xl">
              نسعى لتطوير وتعزيز ثقافة التميز المؤسسي في المجتمع من خلال تقديم الخدمات والبرامج التدريبية المتخصصة
              التي تساهم في رفع مستوى الأداء والجودة في المؤسسات المختلفة
            </p>
            <p className="text-white/80 mb-8 text-lg">اكتشف التميز</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-end w-full sm:w-auto">
              <button onClick={() => scrollToSection('services')} className="btn-primary rounded-none">
                اكتشف خدماتنا
              </button>
              <button onClick={() => scrollToSection('contact')} className="btn-secondary rounded-none">
                تواصل معنا
              </button>
            </div>
          </div>
        </div>
        <ScrollIndicator />
      </section>
      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">لماذا نحن مميزون؟</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نجمع بين الخبرة العملية والمعرفة النظرية لتقديم حلول متكاملة للتميز المؤسسي
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature card 1 */}
            <div className="relative interactive-card bg-white p-8 text-center border border-gray-200 overflow-visible">
              {/* Teal badge positioned halfway outside the card.  It is horizontally centered using left-1/2 and translateX(-50%). */}
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-teal-500 flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 mt-6">رؤية واضحة</h3>
              <p className="text-gray-600">نسعى لتحقيق التميز المؤسسي في جميع القطاعات</p>
            </div>
            {/* Feature card 2 */}
            <div className="relative interactive-card bg-white p-8 text-center border border-gray-200 overflow-visible">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-teal-500 flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 mt-6">فريق متخصص</h3>
              <p className="text-gray-600">خبراء في مجال التطوير المؤسسي والجودة</p>
            </div>
            {/* Feature card 3 */}
            <div className="relative interactive-card bg-white p-8 text-center border border-gray-200 overflow-visible">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-teal-500 flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 mt-6">معايير عالمية</h3>
              <p className="text-gray-600">نطبق أفضل الممارسات والمعايير الدولية</p>
            </div>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section
        id="about"
        className="py-20"
        style={{ backgroundColor: 'var(--oes-dark)' }}
      >
        <div className="container mx-auto px-6 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Colored block with the section title */}
            <div
              className="flex items-center justify-center"
              style={{ backgroundColor: 'var(--oes-blue)' }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white">من نحن؟</h2>
            </div>
            {/* About content */}
            <div className="flex flex-col justify-center">
              {/* Heading for small screens */}
              <h2 className="text-4xl font-bold mb-6 md:hidden text-white">من نحن</h2>
              <p className="text-lg leading-relaxed">
                الجمعية التعاونية للتميز المؤسسي هي منظمة غير ربحية تهدف إلى نشر ثقافة التميز والجودة في المؤسسات
                والمنظمات المختلفة من خلال تقديم الخدمات الاستشارية والتدريبية المتخصصة. نسعى لبناء مجتمع من
                المؤسسات المتميزة التي تساهم في التنمية المستدامة والازدهار الاقتصادي.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Statistics Section */}
      <section id="statistics" className="py-20 stats-section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">إحصائياتنا</h2>
            <p className="text-xl">أرقام تعكس تميزنا وإنجازاتنا</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <AnimatedCounter end={150} suffix="+" />
              <p className="text-lg mt-2">عدد الدورات التدريبية</p>
            </div>
            <div className="text-center">
              <AnimatedCounter end={2500} suffix="+" />
              <p className="text-lg mt-2">عدد المستفيدين من خدمات الجمعية</p>
            </div>
            <div className="text-center">
              <AnimatedCounter end={75} suffix="+" />
              <p className="text-lg mt-2">عدد الورش</p>
            </div>
            <div className="text-center">
              <AnimatedCounter end={50} suffix="+" />
              <p className="text-lg mt-2">شركاء النجاح</p>
            </div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">خدماتنا</h2>
            <p className="text-xl text-gray-600">نقدم مجموعة شاملة من الخدمات المتخصصة</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="interactive-card bg-white p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-3">الاستشارات الإدارية</h3>
              <p className="text-gray-600">تقديم الاستشارات المتخصصة في مجال الإدارة والتطوير المؤسسي</p>
            </div>
            <div className="interactive-card bg-white p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-3">البرامج التدريبية</h3>
              <p className="text-gray-600">برامج تدريبية متنوعة لتطوير المهارات والقدرات</p>
            </div>
            <div className="interactive-card bg-white p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-3">تقييم الأداء</h3>
              <p className="text-gray-600">خدمات تقييم وقياس الأداء المؤسسي</p>
            </div>
            <div className="interactive-card bg-white p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-3">إدارة الجودة</h3>
              <p className="text-gray-600">تطبيق أنظمة إدارة الجودة والتميز</p>
            </div>
            <div className="interactive-card bg-white p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-3">التخطيط الاستراتيجي</h3>
              <p className="text-gray-600">وضع الخطط الاستراتيجية طويلة المدى</p>
            </div>
            <div className="interactive-card bg-white p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-3">تطوير القيادات</h3>
              <p className="text-gray-600">برامج تطوير القيادات والمهارات الإدارية</p>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">تواصل معنا</h2>
            <p className="text-xl text-gray-600">نحن هنا للإجابة على استفساراتكم</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="contact-form p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">أرسل رسالة</h3>
              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="الاسم"
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="البريد الإلكتروني"
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="رقم الهاتف"
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent text-right"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="الرسالة"
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <button type="submit" className="w-full bg-teal-500 text-white py-3 font-semibold hover:bg-teal-600 transition-colors">
                  إرسال الرسالة
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">ابدأ رحلتك نحو التميز المؤسسي اليوم</h2>
            <p className="text-xl text-gray-600 mb-8">انضم إلى مجتمع المؤسسات المتميزة واستفد من خبراتنا وبرامجنا المتخصصة لتحقيق أهدافك</p>
            <button
              style={{ background: 'linear-gradient(to right, #4960b2, #212856)' }}
              className="text-white px-8 py-4 font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              سجل معنا الآن
            </button>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="footer-gradient text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <img
                src="/OES-logo3.svg"
                alt="شعار الجمعية"
                className="h-16 w-auto mb-4"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <p className="text-white/80">الجمعية التعاونية للتميز المؤسسي - نحو مستقبل أفضل للمؤسسات</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">روابط سريعة</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => scrollToSection('home')} className="text-white/80 hover:text-white transition-colors text-right">
                    الرئيسية
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('about')} className="text-white/80 hover:text-white transition-colors text-right">
                    من نحن
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('services')} className="text-white/80 hover:text-white transition-colors text-right">
                    خدماتنا
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('contact')} className="text-white/80 hover:text-white transition-colors text-right">
                    تواصل معنا
                  </button>
                </li>
                {/* Legal links moved into quick links */}
                <li>
                  <a href="#" className="block text-white/80 hover:text-white">سياسة الخصوصية</a>
                </li>
                <li>
                  <a href="#" className="block text-white/80 hover:text-white">شروط الاستخدام</a>
                </li>
                <li>
                  <a href="#" className="block text-white/80 hover:text-white">حقوق النشر</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">خدماتنا</h4>
              <ul className="space-y-2">
                <li>
                  <span className="text-white/80">الاستشارات الإدارية</span>
                </li>
                <li>
                  <span className="text-white/80">البرامج التدريبية</span>
                </li>
                <li>
                  <span className="text-white/80">تقييم الأداء</span>
                </li>
                <li>
                  <span className="text-white/80">إدارة الجودة</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">تابعنا</h4>
              {/* Add larger spacing between icons to prevent them from touching, especially in RTL mode. */}
              <div className="flex flex-row space-x-5 space-x-reverse mb-6">
                {/* WhatsApp icon */}
                <a
                  href="#"
                  className="w-10 h-10 bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors social-icon"
                >
                  <WhatsAppIcon />
                </a>
                {/* New X (formerly Twitter) logo */}
                <a
                  href="#"
                  className="w-10 h-10 bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors social-icon"
                >
                  <XLogo className="w-5 h-5" />
                </a>
                {/* Instagram icon */}
                <a
                  href="#"
                  className="w-10 h-10 bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors social-icon"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                {/* LinkedIn icon. We keep the same lucide icon; if a brand update occurs, update here accordingly. */}
                <a
                  href="#"
                  className="w-10 h-10 bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors social-icon"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
              {/* Contact Information */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Phone className="w-4 h-4 text-white/60" />
                  <span className="text-white/80 text-sm">+966 11 234 5678</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Mail className="w-4 h-4 text-white/60" />
                  <span className="text-white/80 text-sm">info@oes.org.sa</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <MapPin className="w-4 h-4 text-white/60" />
                  <span className="text-white/80 text-sm">الرياض، المملكة العربية السعودية</span>
                </div>
              </div>
              {/* Legal links have been relocated to the quick links column above. */}
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-white/80">© 2024 الجمعية التعاونية للتميز المؤسسي. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;