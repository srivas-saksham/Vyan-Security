import React, { useState, useEffect, useRef } from "react";
import {
  ShieldCheck,
  Users,
  MapPin,
  Clock,
  Award,
  TrendingUp,
  Shield,
  CheckCircle2,
  Star,
  Building2
} from "lucide-react";

// Custom CountUp component
const CountUp = ({ from, to, duration, onEnd, suffix = "" }) => {
  const [count, setCount] = useState(from);
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    let startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      setCount(Math.floor(from + (to - from) * easeOut));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsComplete(true);
        onEnd && onEnd();
      }
    };
    requestAnimationFrame(animate);
  }, [from, to, duration, onEnd]);
  
  return (
    <span className="relative">
      <span className={`transition-all duration-300 ${isComplete ? 'text-amber-500' : ''}`}>
        {count}
      </span>
      {isComplete && suffix && (
        <span className="ml-1 text-amber-500 font-semibold">{suffix}</span>
      )}
    </span>
  );
};

// Professional card component with subtle animations
const ProfessionalCard = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => observer.disconnect();
  }, [delay]);
  
  return (
    <div
      ref={cardRef}
      className={`transform transition-all duration-700 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      } ${className}`}
    >
      <div className="bg-slate-800 rounded-2xl shadow-xl border border-slate-700 hover:shadow-2xl transition-all duration-300 group dark:bg-[#dce1ff] dark:border-slate-200">
        {children}
      </div>
    </div>
  );
};

// Enhanced feature item with professional styling
const FeatureItem = ({ icon, title, description, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-700/50 transition-all duration-300 group cursor-pointer dark:hover:bg-slate-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Professional icon container */}
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
        isHovered 
          ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg scale-110' 
          : 'bg-gradient-to-br from-slate-700 to-slate-600 dark:from-blue-50 dark:to-blue-100'
      }`}>
        <div className={`transition-colors duration-300 ${
          isHovered ? 'text-white' : 'text-blue-400 dark:text-blue-600'
        }`}>
          {icon}
        </div>
      </div>
      
      <div className="flex-1">
        <h4 className={`font-semibold text-slate-200 mb-1 transition-colors duration-300 dark:text-slate-800 ${
          isHovered ? 'text-blue-400 dark:text-blue-600' : ''
        }`}>
          {title}
        </h4>
        <p className="text-sm text-slate-400 leading-relaxed dark:text-slate-600">
          {description}
        </p>
      </div>
      
      {/* Subtle check indicator */}
      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
        isHovered 
          ? 'border-green-500 bg-green-900/30 dark:bg-green-50' 
          : 'border-slate-600 dark:border-slate-300'
      }`}>
        <CheckCircle2 className={`w-4 h-4 transition-all duration-300 ${
          isHovered ? 'text-green-500 scale-100' : 'text-transparent scale-75'
        }`} />
      </div>
    </div>
  );
};

// Professional stat component
const StatCard = ({ label, value, suffix, icon, delay = 0 }) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const statRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
          }, delay);
        }
      },
      { threshold: 0.5 }
    );
    
    if (statRef.current) {
      observer.observe(statRef.current);
    }
    
    return () => observer.disconnect();
  }, [delay, hasAnimated]);
  
  return (
    <div 
      ref={statRef}
      className="text-center group hover:scale-105 transition-transform duration-300"
    >
      {/* Icon background */}
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-amber-900/20 to-orange-900/20 flex items-center justify-center group-hover:shadow-lg transition-all duration-300 dark:from-amber-50 dark:to-orange-100">
        <div className="text-amber-400 dark:text-amber-600 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </div>
      
      {/* Stat value */}
      <div className="text-4xl font-bold text-slate-200 mb-2 dark:text-slate-800">
        {isVisible ? (
          <CountUp 
            from={0} 
            to={value} 
            duration={2} 
            suffix={suffix}
            onEnd={() => {}}
          />
        ) : (
          <span>0{suffix}</span>
        )}
      </div>
      
      {/* Label */}
      <div className="text-slate-400 font-medium dark:text-slate-600">
        {label}
      </div>
      
      {/* Subtle progress indicator */}
      <div className="mt-3 h-1 bg-slate-700 rounded-full overflow-hidden dark:bg-slate-100">
        <div 
          className={`h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-1000 ease-out ${
            isVisible ? 'w-full' : 'w-0'
          }`}
          style={{ transitionDelay: `${delay + 500}ms` }}
        />
      </div>
    </div>
  );
};

// Trust badge component
const TrustBadge = ({ text, delay = 0 }) => {
  return (
    <div 
      className="flex items-center gap-2 px-4 py-2 bg-green-900/20 rounded-full text-green-400 text-sm font-medium shadow-sm dark:bg-green-50 dark:text-green-700"
      style={{ animationDelay: `${delay}ms` }}
    >
      <Star className="w-4 h-4 fill-current" />
      {text}
    </div>
  );
};

export default function VyanSecurityComponent() {
  const [activeFeature, setActiveFeature] = useState(null);
  
  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Trained Security Personnel",
      description: "Professional guards with comprehensive training in security protocols, emergency response, and customer service for reliable protection."
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Customized Security Solutions",
      description: "Tailored security plans designed to meet your specific requirements, from corporate offices to residential complexes."
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Pan-Delhi Operations",
      description: "Extensive network across Delhi NCR ensuring consistent service quality wherever your security needs may be."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "24/7 Professional Support",
      description: "Round-the-clock operational support with quick response times and dedicated account management for peace of mind."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Industry Experience",
      description: "Over a decade of proven expertise in security services with established protocols and best practices."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "High Retention Rate",
      description: "Consistent client satisfaction with long-term partnerships built on trust, reliability, and professional service delivery."
    },
  ];

  const stats = [
    { 
      label: "Security Guards", 
      value: 50, 
      suffix: "+", 
      icon: <Users className="w-8 h-8" />,
      delay: 0 
    },
    { 
      label: "Protected Sites", 
      value: 20, 
      suffix: "+", 
      icon: <Building2 className="w-8 h-8" />,
      delay: 200 
    },
    { 
      label: "Client Retention", 
      value: 97, 
      suffix: "%", 
      icon: <TrendingUp className="w-8 h-8" />,
      delay: 400 
    },
    { 
      label: "Service Cities", 
      value: 2, 
      suffix: "", 
      icon: <MapPin className="w-8 h-8" />,
      delay: 600 
    },
  ];

  const trustBadges = [
  "ISO Certified Guards",
    "Licensed & Insured",
    "Background Verified",
    "Professional Training"
  ];

  return (
    <section className="w-full min-h-screen py-20 px-6 lg:px-12 dark:from-slate-50 dark:to-slate-100">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-slate-800 rounded-full shadow-lg dark:bg-[#dce1ff]">
          <Shield className="w-6 h-6 text-blue-400 dark:text-blue-600" />
          <span className="font-semibold text-slate-200 dark:text-slate-800"
            style={{userSelect: 'none'}}>Professional Security Services</span>
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-bold text-slate-200 mb-4 dark:text-slate-800"
            style={{userSelect: 'none'}}>
          Why Choose <span className="text-blue-400 dark:text-blue-600">Vyan Security</span>?
        </h1>
        
        <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed dark:text-slate-600">
          Trusted security partner providing professional guard services with a commitment to excellence, 
          reliability, and client satisfaction across India.
        </p>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-3 mt-8"
            style={{userSelect: 'none'}}>
          {trustBadges.map((badge, index) => (
            <TrustBadge key={index} text={badge} delay={index * 100} />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
        
        {/* Left - Features */}
        <ProfessionalCard delay={200}>
          <div className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-200 dark:text-slate-800">Our Commitment</h2>
                <p className="text-slate-400 text-sm dark:text-slate-600">Professional security you can trust</p>
              </div>
            </div>

            <div className="space-y-2">
              {features.map((feature, index) => (
                <FeatureItem
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  index={index}
                />
              ))}
            </div>

            {/* Company credentials */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-900/20 to-indigo-900/20 rounded-xl border border-blue-800/30 dark:from-blue-50 dark:to-indigo-50 dark:border-blue-100">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-200 mb-1 dark:text-slate-800">Professional Credentials</h4>
                  <p className="text-sm text-slate-400 leading-relaxed dark:text-slate-600">
                    All our security personnel undergo rigorous background verification, professional training, 
                    and regular performance evaluations to ensure the highest standards of service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ProfessionalCard>

        {/* Right - Stats */}
        <ProfessionalCard delay={400}>
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-200 mb-2 dark:text-slate-800">Our Track Record</h2>
              <p className="text-slate-400 dark:text-slate-600">Numbers that speak for our reliability</p>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              {stats.map((stat, index) => (
                <StatCard
                  key={index}
                  label={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  icon={stat.icon}
                  delay={stat.delay}
                />
              ))}
            </div>

            {/* Client testimonial preview */}
            <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-xl p-6 border border-green-800/30 dark:from-green-50 dark:to-emerald-50 dark:border-green-100">
              <div className="flex items-start gap-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-300 italic leading-relaxed dark:text-slate-700">
                    "Vyan Security has been our trusted partner for over 3 years. Their professional approach 
                    and reliable service gives us complete peace of mind."
                  </p>
                  <div className="mt-3 text-xs text-slate-400 font-medium dark:text-slate-600">
                    — Corporate Client, New Delhi
                  </div>
                </div>
              </div>
            </div>

            {/* Contact encouragement */}
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 text-sm text-slate-400 dark:text-slate-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Ready to secure your premises with professional guards
              </div>
            </div>
          </div>
        </ProfessionalCard>
      </div>

      {/* Bottom section with additional credibility */}
      <div className="max-w-7xl mx-auto mt-16">
        <div className="bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-700 dark:bg-[#dce1ff] dark:border-slate-200">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-900/30 flex items-center justify-center dark:bg-blue-100">
                <Shield className="w-8 h-8 text-blue-400 dark:text-blue-600" />
              </div>
              <h4 className="font-semibold text-slate-200 mb-2 dark:text-slate-800">Licensed & Insured</h4>
              <p className="text-sm text-slate-400 dark:text-slate-600">Fully compliant with all regulatory requirements</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-900/30 flex items-center justify-center dark:bg-green-100">
                <CheckCircle2 className="w-8 h-8 text-green-400 dark:text-green-600" />
              </div>
              <h4 className="font-semibold text-slate-200 mb-2 dark:text-slate-800">Quality Assured</h4>
              <p className="text-sm text-slate-400 dark:text-slate-600">Regular training and performance monitoring</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-900/30 flex items-center justify-center dark:bg-amber-100">
                <Clock className="w-8 h-8 text-amber-400 dark:text-amber-600" />
              </div>
              <h4 className="font-semibold text-slate-200 mb-2 dark:text-slate-800">Always Available</h4>
              <p className="text-sm text-slate-400 dark:text-slate-600">24/7 support and emergency response</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}