import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import emailjs from "@emailjs/browser";
import { useTheme } from "../ThemeContext.jsx"
import { 
  Shield, 
  Users, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Building2,
  Mail,
  Phone,
  User,
  Clock,
  Star,
  Sparkles,
  TrendingUp,
  Zap,
  Award,
  Activity
} from "lucide-react";

export default function InstantQuote() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [quoteCounter, setQuoteCounter] = useState(156);
  const [randomTime, setRandomTime] = useState(Math.floor(Math.random() * 19) + 2);
  const [recentActivity, setRecentActivity] = useState(0);
  
  const { theme } = useTheme()
  const [formData, setFormData] = useState({
    securityNeeds: [],
    numberOfPeople: "",
    urgency: "",
    fullName: "",
    email: "",
    organisation: "",
    mobile: ""
  });

  const securityOptions = [
    { value: "security-guards", label: "Security Guards", icon: Shield },
    { value: "bouncers", label: "Bouncers", icon: Users },
    { value: "armed-pso", label: "Armed PSO", icon: Shield },
    { value: "housekeeping", label: "House Keeping Staffs", icon: Users },
    { value: "facility-management", label: "Facility Management Solutions", icon: Building2 },
    { value: "others", label: "Others", icon: Sparkles }
  ];

  const urgencyOptions = [
    { value: "asap", label: "ASAP" },
    { value: "1-2-months", label: "Within 1–2 Months" },
    { value: "not-sure", label: "Not Sure Yet" }
  ];

  const recentRequests = [
    { city: "Mumbai", service: "Security Guards", count: 5 },
    { city: "Delhi", service: "Armed PSO", count: 3 },
    { city: "Bangalore", service: "Facility Management", count: 8 },
    { city: "Pune", service: "Security Guards + Housekeeping", count: 6 },
    { city: "Chennai", service: "Bouncers", count: 4 }
  ];

  const recommendations = {
    "security-guards": ["housekeeping", "facility-management"],
    "bouncers": ["security-guards"],
    "armed-pso": ["security-guards"],
    "housekeeping": ["security-guards", "facility-management"],
    "facility-management": ["housekeeping", "security-guards"]
  };

  // Simulate live counter updates
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteCounter(prev => prev + 1);
    }, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Rotate recent activity
  useEffect(() => {
    const interval = setInterval(() => {
      setRecentActivity(prev => (prev + 1) % recentRequests.length);
      setRandomTime(Math.floor(Math.random() * 19) + 2); // Generate new random time
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getSmartRecommendations = () => {
    const selectedServices = formData.securityNeeds;
    if (selectedServices.length === 0) return [];
    
    const allRecommendations = selectedServices.flatMap(
      service => recommendations[service] || []
    );
    
    // Remove duplicates and already selected services
    return [...new Set(allRecommendations)].filter(
      rec => !selectedServices.includes(rec)
    );
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (value) => {
    const currentNeeds = formData.securityNeeds;
    if (currentNeeds.includes(value)) {
      setFormData({ 
        ...formData, 
        securityNeeds: currentNeeds.filter(need => need !== value)
      });
    } else {
      setFormData({ 
        ...formData, 
        securityNeeds: [...currentNeeds, value]
      });
    }
  };

  const handleRadioChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const nextStep = () => {
    if (currentStep === 1 && formData.securityNeeds.length === 0) {
      toast.error("Please select at least one security need");
      return;
    }
    if (currentStep === 2 && (!formData.numberOfPeople || !formData.urgency)) {
      toast.error("Please fill all required fields");
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (!formData.fullName || !formData.email || !formData.mobile) {
      toast.error("Please fill all required fields");
      return;
    }

    setQuoteCounter(prev => prev + 1);
    setIsSubmitting(true);

    const securityNeedLabels = formData.securityNeeds
      .map(value => securityOptions.find(opt => opt.value === value)?.label || value)
      .join(", ");
    const urgencyLabel = urgencyOptions.find(opt => opt.value === formData.urgency)?.label || formData.urgency;

    const templateParams = {
      security_needs: securityNeedLabels,
      number_of_people: formData.numberOfPeople,
      urgency: urgencyLabel,
      full_name: formData.fullName,
      email: formData.email,
      organisation: formData.organisation || "Not provided",
      mobile: formData.mobile
    };

    try {
      await emailjs.send(
        "service_m7kt3zc",
        "template_xvd0nc9",
        templateParams,
        "Hi72EIqa0ftMFDS_e"
      );

      await emailjs.send(
        "service_dfr2c4y",
        "template_pozzswx",
        templateParams,
        "onhk5CSIvz1ufoC8P"
      );

      toast.success("Quote request submitted successfully!");
      setIsSubmitted(true);
      
      setTimeout(() => {
        setIsSubmitted(false);
        setCurrentStep(1);
        setFormData({
          securityNeeds: [],
          numberOfPeople: "",
          urgency: "",
          fullName: "",
          email: "",
          organisation: "",
          mobile: ""
        });
      }, 5000);
    } catch (error) {
      console.error("EmailJS error:", error);
      toast.error("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  const smartRecs = getSmartRecommendations();

  return (
    <section className="relative overflow-hidden transition-colors bg-transparent dark:bg-[#f2f4ff] text-white dark:text-[#000a47] min-h-screen py-16 px-8 lg:px-24">
      <Toaster position="top-center" />
      
      <div 
        className="absolute inset-0 opacity-20 dark:opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle, ${theme === "light" ? "white" : "#000a47"} 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
          backgroundPosition: "0 0"
        }}
      ></div>

      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-400/20 via-blue-500/20 to-purple-600/20 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
              
              <div className="relative p-8 rounded-2xl backdrop-blur-xl bg-slate-900/90 dark:bg-[#fafbff] border border-slate-700/50 dark:border-slate-400/30 shadow-lg dark:shadow-[0_0_20px_#7B7A72]">
                
                <div className="mb-6">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-1">Get Instant Quote</h2>
                  <p className="text-sm text-gray-400 dark:text-[#030b47]/70">Tell us your requirements in 3 simple steps</p>
                  
                  <div className="flex items-center gap-2 mt-4">
                    {[1, 2, 3].map((step) => (
                      <div
                        key={step}
                        className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${
                          step <= currentStep
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700'
                            : 'bg-slate-700/50 dark:bg-slate-300'
                        }`}
                      ></div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-1.5 text-[10px] text-gray-500 dark:text-[#030b47]/60">
                    <span>Security Needs</span>
                    <span>Requirements</span>
                    <span>Contact Info</span>
                  </div>
                </div>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/20 rounded-full mb-4">
                      <CheckCircle className="w-10 h-10 text-emerald-400 dark:text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-emerald-400 dark:text-emerald-600 mb-1">Request Submitted!</h3>
                    <p className="text-sm text-gray-300 dark:text-[#030b47]">Thank you! We'll send you a detailed quote within 24 hours.</p>
                  </motion.div>
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                    >
                      
                      {currentStep === 1 && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold mb-3">Choose Your Security Needs* (Select multiple)</h3>
                          <div className="grid grid-cols-2 gap-2">
                            {securityOptions.map((option) => {
                              const Icon = option.icon;
                              const isSelected = formData.securityNeeds.includes(option.value);
                              return (
                                <div
                                  key={option.value}
                                  onClick={() => handleCheckboxChange(option.value)}
                                  className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                                    isSelected
                                      ? 'border-green-400 dark:border-green-600 bg-green-400/10 dark:bg-green-600/10'
                                      : 'border-slate-700/50 dark:border-slate-400/30 hover:border-slate-500 dark:hover:border-slate-400/50 bg-slate-800/50 dark:bg-white/50'
                                  }`}
                                >
                                  <div className="relative flex items-center justify-center">
                                    <input
                                      type="checkbox"
                                      name="securityNeeds"
                                      value={option.value}
                                      checked={isSelected}
                                      onChange={() => handleCheckboxChange(option.value)}
                                      className="w-4 h-4 appearance-none border-2 border-gray-400 dark:border-[#030b47]/40 rounded checked:bg-green-500 checked:border-green-500 dark:checked:bg-green-600 dark:checked:border-green-600 cursor-pointer transition-all"
                                    />
                                    {isSelected && (
                                      <svg
                                        className="absolute w-3 h-3 text-white pointer-events-none"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={3}
                                          d="M5 13l4 4L19 7"
                                        />
                                      </svg>
                                    )}
                                  </div>
                                  <Icon className="w-4 h-4 text-gray-400 dark:text-[#030b47]/60" />
                                  <span className="flex-1 font-medium text-sm">{option.label}</span>
                                </div>
                              );
                            })}
                          </div>

                          {smartRecs.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-4 p-3 rounded-lg bg-blue-500/10 dark:bg-blue-600/10 border border-blue-400/30 dark:border-blue-600/30"
                            >
                              <div className="flex items-start gap-2">
                                <Sparkles className="w-4 h-4 text-blue-400 dark:text-blue-600 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-xs font-medium text-blue-400 dark:text-blue-600 mb-1">Smart Recommendation</p>
                                  <p className="text-xs text-gray-300 dark:text-[#030b47]/80">
                                    Clients also added: {smartRecs.map(rec => 
                                      securityOptions.find(opt => opt.value === rec)?.label
                                    ).join(", ")}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          )}

                          <button
                            onClick={nextStep}
                            className="w-full mt-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400 dark:from-[#f6a100] dark:to-yellow-600 dark:hover:from-[#f6a100] dark:hover:to-yellow-500 text-white text-sm font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                          >
                            <span>NEXT</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}

                      {currentStep === 2 && (
                        <div className="space-y-4">
                          <div>
                            <span className="block text-xs font-medium mb-2">Number of People Needed*</span>
                            <input
                              type="number"
                              name="numberOfPeople"
                              value={formData.numberOfPeople}
                              onChange={handleInputChange}
                              onFocus={() => setFocusedField("numberOfPeople")}
                              onBlur={() => setFocusedField("")}
                              placeholder="e.g., 5"
                              className={`w-full px-4 py-3 text-sm bg-slate-800/50 dark:bg-white/50 border rounded-xl text-white dark:text-[#030b47] placeholder-gray-500 dark:placeholder-[#030b47]/50 transition-all duration-300 focus:outline-none ${
                                focusedField === "numberOfPeople"
                                  ? 'border-green-400 dark:border-green-600 shadow-lg shadow-green-400/20 dark:shadow-green-600/20'
                                  : 'border-slate-600/50 dark:border-[#030b47]/20'
                              }`}
                            />
                          </div>

                          {formData.numberOfPeople && parseInt(formData.numberOfPeople) >= 10 && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="p-3 rounded-lg bg-green-500/10 dark:bg-green-600/10 border border-green-400/30 dark:border-green-600/30"
                            >
                              <div className="flex items-start gap-2">
                                <Award className="w-4 h-4 text-green-400 dark:text-green-600 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-xs font-medium text-green-400 dark:text-green-600 mb-1">Bulk Discount Available!</p>
                                  <p className="text-xs text-gray-300 dark:text-[#030b47]/80">
                                    For 10+ people, you're eligible for special pricing
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          )}

                          <div>
                            <span className="block text-xs font-medium mb-2">How Urgently Required*</span>
                            <div className="grid grid-cols-1 gap-2">
                              {urgencyOptions.map((option) => (
                                <div
                                  key={option.value}
                                  onClick={() => handleRadioChange('urgency', option.value)}
                                  className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                                    formData.urgency === option.value
                                      ? 'border-green-400 dark:border-green-600 bg-green-400/10 dark:bg-green-600/10'
                                      : 'border-slate-700/50 dark:border-slate-400/30 hover:border-slate-500 dark:hover:border-slate-400/50 bg-slate-800/50 dark:bg-white/50'
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name="urgency"
                                    value={option.value}
                                    checked={formData.urgency === option.value}
                                    onChange={(e) => handleRadioChange('urgency', e.target.value)}
                                    className="w-4 h-4 text-green-500 focus:ring-green-400"
                                  />
                                  <Clock className="w-4 h-4 text-gray-400 dark:text-[#030b47]/60" />
                                  <span className="flex-1 font-medium text-sm">{option.label}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex gap-3 mt-6">
                            <button
                              onClick={prevStep}
                              className="flex-1 py-3 text-sm bg-slate-700/50 dark:bg-slate-300 hover:bg-slate-600 dark:hover:bg-slate-400 text-white dark:text-[#030b47] font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                            >
                              <ArrowLeft className="w-4 h-4" />
                              <span>BACK</span>
                            </button>
                            <button
                              onClick={nextStep}
                              className="flex-1 py-3 text-sm bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400 dark:from-[#f6a100] dark:to-yellow-600 dark:hover:from-[#f6a100] dark:hover:to-yellow-500 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                            >
                              <span>NEXT</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}

                      {currentStep === 3 && (
                        <div className="space-y-4">
                          <div className="relative">
                            <span className="block text-xs font-medium mb-2">Full Name*</span>
                            <div className="relative">
                              <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                                focusedField === "fullName" ? 'text-green-400 dark:text-green-600' : 'text-gray-400 dark:text-[#030b47]/60'
                              }`} />
                              <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                onFocus={() => setFocusedField("fullName")}
                                onBlur={() => setFocusedField("")}
                                placeholder="Your full name"
                                className={`w-full pl-10 pr-4 py-3 text-sm bg-slate-800/50 dark:bg-white/50 border rounded-xl text-white dark:text-[#030b47] placeholder-gray-500 dark:placeholder-[#030b47]/50 transition-all duration-300 focus:outline-none ${
                                  focusedField === "fullName"
                                    ? 'border-green-400 dark:border-green-600 shadow-lg shadow-green-400/20 dark:shadow-green-600/20'
                                    : 'border-slate-600/50 dark:border-[#030b47]/20'
                                }`}
                              />
                            </div>
                          </div>

                          <div className="relative">
                            <span className="block text-xs font-medium mb-2">Work Email*</span>
                            <div className="relative">
                              <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                                focusedField === "email" ? 'text-green-400 dark:text-green-600' : 'text-gray-400 dark:text-[#030b47]/60'
                              }`} />
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                onFocus={() => setFocusedField("email")}
                                onBlur={() => setFocusedField("")}
                                placeholder="your.email@company.com"
                                className={`w-full pl-10 pr-4 py-3 text-sm bg-slate-800/50 dark:bg-white/50 border rounded-xl text-white dark:text-[#030b47] placeholder-gray-500 dark:placeholder-[#030b47]/50 transition-all duration-300 focus:outline-none ${
                                  focusedField === "email"
                                    ? 'border-green-400 dark:border-green-600 shadow-lg shadow-green-400/20 dark:shadow-green-600/20'
                                    : 'border-slate-600/50 dark:border-[#030b47]/20'
                                }`}
                              />
                            </div>
                          </div>

                          <div className="relative">
                            <span className="block text-xs font-medium mb-2">Organisation Name</span>
                            <div className="relative">
                              <Building2 className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                                focusedField === "organisation" ? 'text-green-400 dark:text-green-600' : 'text-gray-400 dark:text-[#030b47]/60'
                              }`} />
                              <input
                                type="text"
                                name="organisation"
                                value={formData.organisation}
                                onChange={handleInputChange}
                                onFocus={() => setFocusedField("organisation")}
                                onBlur={() => setFocusedField("")}
                                placeholder="Your company name"
                                className={`w-full pl-10 pr-4 py-3 text-sm bg-slate-800/50 dark:bg-white/50 border rounded-xl text-white dark:text-[#030b47] placeholder-gray-500 dark:placeholder-[#030b47]/50 transition-all duration-300 focus:outline-none ${
                                  focusedField === "organisation"
                                    ? 'border-green-400 dark:border-green-600 shadow-lg shadow-green-400/20 dark:shadow-green-600/20'
                                    : 'border-slate-600/50 dark:border-[#030b47]/20'
                                }`}
                              />
                            </div>
                          </div>

                          <div className="relative">
                            <span className="block text-xs font-medium mb-2">Mobile Number*</span>
                            <div className="relative">
                              <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                                focusedField === "mobile" ? 'text-green-400 dark:text-green-600' : 'text-gray-400 dark:text-[#030b47]/60'
                              }`} />
                              <input
                                type="tel"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleInputChange}
                                onFocus={() => setFocusedField("mobile")}
                                onBlur={() => setFocusedField("")}
                                placeholder="+91 (01234-56789)"
                                className={`w-full pl-10 pr-4 py-3 text-sm bg-slate-800/50 dark:bg-white/50 border rounded-xl text-white dark:text-[#030b47] placeholder-gray-500 dark:placeholder-[#030b47]/50 transition-all duration-300 focus:outline-none ${
                                  focusedField === "mobile"
                                    ? 'border-green-400 dark:border-green-600 shadow-lg shadow-green-400/20 dark:shadow-green-600/20'
                                    : 'border-slate-600/50 dark:border-[#030b47]/20'
                                }`}
                              />
                            </div>
                          </div>

                          <div className="flex gap-3 mt-6">
                            <button
                              onClick={prevStep}
                              className="flex-1 py-3 text-sm bg-slate-700/50 dark:bg-slate-300 hover:bg-slate-600 dark:hover:bg-slate-400 text-white dark:text-[#030b47] font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                            >
                              <ArrowLeft className="w-4 h-4" />
                              <span>BACK</span>
                            </button>
                            <button
                              onClick={handleSubmit}
                              disabled={isSubmitting}
                              className="flex-1 py-3 text-sm bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 dark:from-green-600 dark:to-emerald-700 dark:hover:from-green-500 dark:hover:to-emerald-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                              {isSubmitting ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                  <span>Submitting...</span>
                                </>
                              ) : (
                                <>
                                  <span>SUBMIT</span>
                                  <CheckCircle className="w-4 h-4" />
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 lg:sticky lg:top-24"
          >
            {/* Quote Submitted Counter */}
            <div className="p-6 rounded-2xl bg-slate-900/50 dark:bg-white/50 border border-slate-700/50 dark:border-slate-400/30 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-green-500/20 dark:bg-green-600/20">
                  <TrendingUp className="w-5 h-5 text-green-400 dark:text-green-600" />
                </div>
                <h3 className="text-lg font-bold">Join Our Growing Community</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-bold text-green-400 dark:text-green-600">{quoteCounter.toLocaleString()}</span>
                    <span className="text-sm text-gray-400 dark:text-[#030b47]/70">businesses</span>
                  </div>
                  <p className="text-xs text-gray-400 dark:text-[#030b47]/70">received quotes this month</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-slate-800/50 dark:bg-white/80 border border-slate-700/30 dark:border-slate-300/50">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-3 h-3 text-yellow-400 dark:text-yellow-600" />
                      <span className="text-lg font-bold">4.9</span>
                    </div>
                    <p className="text-[10px] text-gray-400 dark:text-[#030b47]/70">Avg. Rating</p>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-slate-800/50 dark:bg-white/80 border border-slate-700/30 dark:border-slate-300/50">
                    <div className="flex items-center gap-1 mb-1">
                      <Zap className="w-3 h-3 text-orange-400 dark:text-orange-600" />
                      <span className="text-lg font-bold">24h</span>
                    </div>
                    <p className="text-[10px] text-gray-400 dark:text-[#030b47]/70">Response Time</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-600/10 dark:from-green-600/10 dark:to-emerald-700/10 border border-green-400/30 dark:border-green-600/30">
                  <p className="text-xs text-gray-300 dark:text-[#030b47]/80">
                    <span className="font-semibold text-green-400 dark:text-green-600">96% satisfaction rate</span> from businesses like yours
                  </p>
                </div>
              </div>
            </div>

            {/* Recently Requested Services */}
            <div className="p-6 rounded-2xl bg-slate-900/50 dark:bg-white/50 border border-slate-700/50 dark:border-slate-400/30 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-blue-500/20 dark:bg-blue-600/20">
                  <Activity className="w-5 h-5 text-blue-400 dark:text-blue-600" />
                </div>
                <h3 className="text-lg font-bold">Live Activity</h3>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={recentActivity}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="p-4 rounded-lg bg-slate-800/50 dark:bg-white/80 border border-slate-700/30 dark:border-slate-300/50"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 dark:bg-green-600 rounded-full mt-2 animate-pulse"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium mb-1">
                        Someone in <span className="text-green-400 dark:text-green-600">{recentRequests[recentActivity].city}</span> just requested
                      </p>
                      <p className="text-xs text-gray-400 dark:text-[#030b47]/70">
                        {recentRequests[recentActivity].count} × {recentRequests[recentActivity].service}
                      </p>
                      <p className="text-[10px] text-gray-500 dark:text-[#030b47]/60 mt-1">{randomTime} minutes ago</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 dark:text-[#030b47]/70">Popular Combination</span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-orange-400 dark:text-orange-600" />
                    <span className="text-orange-400 dark:text-orange-600 font-medium">Trending</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500/10 to-yellow-500/10 dark:from-orange-600/10 dark:to-yellow-600/10 border border-orange-400/30 dark:border-orange-600/30">
                  <p className="text-xs font-medium">Security Guards + Housekeeping</p>
                  <p className="text-[10px] text-gray-400 dark:text-[#030b47]/70 mt-1">Most clients bundle these services together</p>
                </div>
              </div>
            </div>

            {/* Smart Recommendations - Shows when services are selected */}
            {formData.securityNeeds.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl bg-slate-900/50 dark:bg-white/50 border border-slate-700/50 dark:border-slate-400/30 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-purple-500/20 dark:bg-purple-600/20">
                    <Sparkles className="w-5 h-5 text-purple-400 dark:text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold">Smart Recommendations</h3>
                </div>

                <div className="space-y-3">
                  <p className="text-sm text-gray-300 dark:text-[#030b47]/80">
                    Based on your selection of <span className="font-semibold text-green-400 dark:text-green-600">
                      {formData.securityNeeds.map(need => 
                        securityOptions.find(opt => opt.value === need)?.label
                      ).join(", ")}
                    </span>
                  </p>

                  {smartRecs.length > 0 ? (
                    <div className="space-y-2">
                      <p className="text-xs text-gray-400 dark:text-[#030b47]/70">Clients also added:</p>
                      {smartRecs.slice(0, 2).map((rec) => {
                        const option = securityOptions.find(opt => opt.value === rec);
                        const Icon = option?.icon;
                        return (
                          <div
                            key={rec}
                            onClick={() => handleCheckboxChange(rec)}
                            className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 dark:bg-white/80 border border-slate-700/30 dark:border-slate-300/50 hover:border-purple-400 dark:hover:border-purple-600 cursor-pointer transition-all duration-300"
                          >
                            {Icon && <Icon className="w-4 h-4 text-purple-400 dark:text-purple-600" />}
                            <span className="text-sm font-medium flex-1">{option?.label}</span>
                            <ArrowRight className="w-4 h-4 text-gray-400 dark:text-[#030b47]/60" />
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-3 rounded-lg bg-green-500/10 dark:bg-green-600/10 border border-green-400/30 dark:border-green-600/30">
                      <p className="text-xs text-gray-300 dark:text-[#030b47]/80">
                        Great choice! These services work perfectly together.
                      </p>
                    </div>
                  )}

                  {parseInt(formData.numberOfPeople) >= 10 && (
                    <div className="p-3 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-600/10 dark:from-green-600/10 dark:to-emerald-700/10 border border-green-400/30 dark:border-green-600/30">
                      <div className="flex items-start gap-2">
                        <Award className="w-4 h-4 text-green-400 dark:text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-medium text-green-400 dark:text-green-600">Volume Discount Eligible</p>
                          <p className="text-[10px] text-gray-300 dark:text-[#030b47]/80 mt-1">
                            Save up to 15% on bulk orders
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Trust Indicators */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 dark:bg-green-600 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-400 dark:text-[#030b47]/70">100% Verified Staff</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 dark:bg-blue-600 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-400 dark:text-[#030b47]/70">24/7 Support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}