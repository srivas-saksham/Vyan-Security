import { useState } from "react";
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
  Sparkles
} from "lucide-react";

export default function InstantQuote() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  
  const { theme } = useTheme()
  const [formData, setFormData] = useState({
    securityNeeds: [], // Changed to array for multiple selections
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

  const clientLogos = [
    "/assets/client-logo-1.png",
    "/assets/client-logo-2.png",
    "/assets/client-logo-3.png",
    "/assets/client-logo-4.png"
  ];


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (value) => {
    const currentNeeds = formData.securityNeeds;
    if (currentNeeds.includes(value)) {
      // Remove if already selected
      setFormData({ 
        ...formData, 
        securityNeeds: currentNeeds.filter(need => need !== value)
      });
    } else {
      // Add if not selected
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

    setIsSubmitting(true);

    // Get readable labels for display
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
      // Send email to admin
      await emailjs.send(
        "service_m7kt3zc",
        "template_xvd0nc9",
        templateParams,
        "Hi72EIqa0ftMFDS_e"
      );

      // Send confirmation email to client
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

  return (
    <section className="relative overflow-hidden transition-colors bg-transparent dark:bg-[#f2f4ff] text-white dark:text-[#000a47] min-h-screen py-16 px-8 lg:px-24">
      <Toaster position="top-center" />
      
      {/* Dotted Grid Background */}
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
            className="space-y-8 lg:sticky lg:top-24"
          >
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-2">Trusted by Industry Leaders</h3>
              <p className="text-gray-400 dark:text-[#030b47]/70 text-sm">
                We've secured over 100+ corporate and residential clients across India.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 dark:bg-white/50 border border-slate-700/50 dark:border-slate-400/30 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-4">
                {clientLogos.map((logo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="aspect-video bg-slate-800/50 dark:bg-white/80 rounded-xl flex items-center justify-center border border-slate-700/30 dark:border-slate-300/50 hover:border-green-400 dark:hover:border-green-600 transition-all duration-300"
                  >
                    <span className="text-xs text-gray-500 dark:text-[#030b47]/60">Client Logo {index + 1}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
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