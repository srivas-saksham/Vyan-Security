import { useState, useEffect } from "react";
import { PhoneCall, Phone, User, Clock, Calendar, CheckCircle, ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";

export default function RequestCallback() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    timeSlot: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const toggleForm = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setFormData({ name: "", phone: "", timeSlot: "" });
      setFocusedField("");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, timeSlot } = formData;

    if (name && phone && timeSlot) {
      setIsSending(true);

      const templateParams = {
        name,
        phone,
        timeSlot
      };

      emailjs
        .send(
          "service_m7kt3zc",
          "template_4h8yn3r",
          templateParams,
          "Hi72EIqa0ftMFDS_e"
        )
        .then(() => {
          toast.success("Callback request submitted successfully! We'll contact you soon.");
          setIsSubmitSuccess(true);
          setFormData({ name: "", phone: "", timeSlot: "" });
          setIsOpen(false);
          console.log("Callback Request sent to Admin.");
          
          // Reset success state after 4 seconds
          setTimeout(() => {
            setIsSubmitSuccess(false);
          }, 5000);
        })
        .catch((error) => {
          console.error("❌ Failed to send callback request:", error);
          toast.error("Failed to submit callback request \n There might be some server issue.");
        })
        .finally(() => setIsSending(false));
    }
  };

  const timeSlots = [
    { value: "Morning", label: "Morning (9:00 AM - 12:00 PM)", icon: "" },
    { value: "Afternoon", label: "Afternoon (12:00 PM - 5:00 PM)", icon: "" },
    { value: "Evening", label: "Evening (5:00 PM - 8:00 PM)", icon: "" }
  ];

  if (isSubmitSuccess) {
    return (
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-green-400/30 via-emerald-500/30 to-teal-400/30 rounded-2xl blur opacity-60 animate-pulse"></div>
        
        <div className="relative p-8 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-emerald-500/10 to-green-400/5 border border-emerald-200/20 shadow-2xl dark:bg-[#fafbff] dark:shadow-[0_0_20px_#7B7A72] transition-colors duration-500">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/20 rounded-full mb-4 animate-bounce">
              <CheckCircle className="w-10 h-10 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-emerald-400 dark:text-[#030b47] mb-2 transition-colors duration-300">Callback Requested!</h3>
            <p className="text-gray-300 dark:text-[#030b47] mb-4 transition-colors duration-300">Our team will contact you within 24 hours during your preferred time slot.</p>
            <div className="flex items-center justify-center gap-2 text-sm text-emerald-300 dark:text-[#030b47] transition-colors duration-300">
              <Phone className="w-4 h-4 animate-pulse" />
              <span>We'll call you soon</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      {/* Background decorative elements */}
      <div className="absolute -inset-1 bg-gradient-to-r from-green-400/20 via-blue-500/20 to-teal-600/20 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-500 "></div>
      
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative p-8 rounded-2xl backdrop-blur-xl bg-slate-900/90 border border-slate-700/50 shadow-2xl hover:shadow-green-500/10 transition-all duration-500 dark:bg-[#fafbff] dark:shadow-[0_0_20px_#7B7A72] dark:border-[#9fb3ff]/30"
      >
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`relative transition-all duration-500 ${isHovered ? 'rotate-12 scale-110' : ''}`}>
              <div className="absolute inset-0 bg-green-400/20 rounded-full blur-md animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-green-400 to-emerald-500 p-3 rounded-full">
                <PhoneCall className={`w-6 h-6 text-white transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`} />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent dark:text-[#030b47] dark:bg-none transition-colors duration-300">
                Request Callback
              </h2>
              <p className="text-gray-400 dark:text-[#030b47] text-sm mt-1 transition-colors duration-300">Quick and convenient consultation</p>
            </div>
          </div>
          
          <div className="relative">
            <Sparkles className={`w-5 h-5 text-green-400/60 transition-all duration-700 ${isHovered ? 'opacity-100 rotate-180' : 'opacity-40'}`} />
          </div>
        </div>

        {/* Info Section */}
        <div className="mb-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/5 rounded-xl border border-green-500/20 dark:bg-gradient-to-r dark:from-[#a8b9ff]/20 dark:to-[#9fb3ff]/10 dark:border-[#7B7A72]/30 transition-colors duration-300">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-green-400 dark:text-[#030b47] transition-colors duration-300" />
            <div>
              <p className="text-sm text-gray-300 dark:text-[#030b47] font-medium transition-colors duration-300">Response Time</p>
              <p className="text-xs text-green-400 dark:text-[#030b47] transition-colors duration-300">Within 24 hours during business days</p>
            </div>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggleForm}
          className={`group/btn w-full relative overflow-hidden py-4 bg-gradient-to-r transition-all duration-300 font-semibold rounded-xl shadow-lg transform hover:scale-[1.02] active:scale-[0.98] ${
            isOpen 
              ? 'from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white' 
              : 'from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
          
          <div className="relative flex items-center justify-center gap-3">
            {isOpen ? (
              <>
                <span>Cancel Request</span>
                <div className="w-5 h-5 border-2 border-white rounded border-t-transparent animate-spin opacity-60"></div>
              </>
            ) : (
              <>
                <Phone className="w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-200" />
                <span>Request a Callback</span>
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-200" />
              </>
            )}
          </div>
        </button>

        {/* Animated Form */}
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0'
        }`}>
          <div className="space-y-6 pt-2">
            
            {/* Name Field */}
            <div className="relative group/field">
              <label className={`absolute -top-4 left-3 px-2 text-xs font-medium transition-all duration-200 bg-slate-900/90 dark:bg-[#fafbff] rounded ${
                focusedField === 'name' || formData.name.length > 0 ? 'text-green-400 dark:text-[#030b47] scale-100 opacity-100' : 'text-gray-500 dark:text-[#030b47]/60 scale-95 opacity-0'
              }`}>
                Full Name
              </label>
              
              <div className="relative">
                <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-200 ${
                  focusedField === 'name' ? 'text-green-400 dark:text-[#030b47] scale-110' : 'text-gray-400 dark:text-[#030b47]/70'
                }`}>
                  <User className="w-5 h-5" />
                </div>
                
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField("")}
                  placeholder="Enter your full name"
                  required
                  className={`w-full pl-12 pr-4 py-4 bg-slate-800/50 dark:bg-[#b8c8ff]/30 border rounded-xl text-white dark:text-[#030b47] placeholder-gray-500 dark:placeholder-[#030b47]/50 transition-all duration-300 focus:outline-none focus:scale-[1.02] ${
                    focusedField === 'name'
                      ? 'border-green-400 dark:border-[#030b47] shadow-lg shadow-green-400/20 dark:shadow-[#7B7A72]/30 bg-slate-800/80 dark:bg-[#a8b9ff]/40' 
                      : 'border-slate-600/50 dark:border-[#9fb3ff]/40 hover:border-slate-500 dark:hover:border-[#7B7A72]/60'
                  }`}
                />
                
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-green-400/10 to-emerald-400/10 opacity-0 transition-opacity duration-300 pointer-events-none ${
                  focusedField === 'name' ? 'opacity-100' : ''
                }`}></div>
              </div>
            </div>

            {/* Phone Field */}
            <div className="relative group/field">
              <label className={`absolute -top-4 left-3 px-2 text-xs font-medium transition-all duration-200 bg-slate-900/90 dark:bg-[#fafbff] rounded ${
                focusedField === 'phone' || formData.phone.length > 0 ? 'text-green-400 dark:text-[#030b47] scale-100 opacity-100' : 'text-gray-500 dark:text-[#030b47]/60 scale-95 opacity-0'
              }`}>
                Phone Number
              </label>
              
              <div className="relative">
                <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-200 ${
                  focusedField === 'phone' ? 'text-green-400 dark:text-[#030b47] scale-110' : 'text-gray-400 dark:text-[#030b47]/70'
                }`}>
                  <Phone className="w-5 h-5" />
                </div>
                
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  title="Enter a valid 10-digit phone number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField("")}
                  placeholder="Enter your mobile number"
                  required
                  className={`w-full pl-12 pr-4 py-4 bg-slate-800/50 dark:bg-[#b8c8ff]/30 border rounded-xl text-white dark:text-[#030b47] placeholder-gray-500 dark:placeholder-[#030b47]/50 transition-all duration-300 focus:outline-none focus:scale-[1.02] ${
                    focusedField === 'phone'
                      ? 'border-green-400 dark:border-[#030b47] shadow-lg shadow-green-400/20 dark:shadow-[#7B7A72]/30 bg-slate-800/80 dark:bg-[#a8b9ff]/40' 
                      : 'border-slate-600/50 dark:border-[#9fb3ff]/40 hover:border-slate-500 dark:hover:border-[#7B7A72]/60'
                  }`}
                />
                
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-green-400/10 to-emerald-400/10 opacity-0 transition-opacity duration-300 pointer-events-none ${
                  focusedField === 'phone' ? 'opacity-100' : ''
                }`}></div>
              </div>
            </div>

            {/* Time Slot Field */}
            <div className="relative group/field">
              <label className={`absolute -top-4 left-3 px-2 text-xs font-medium transition-all duration-200 bg-slate-900/90 dark:bg-[#fafbff] rounded ${
                focusedField === 'timeSlot' || formData.timeSlot.length > 0 ? 'text-green-400 dark:text-[#030b47] scale-100 opacity-100' : 'text-gray-500 dark:text-[#030b47]/60 scale-95 opacity-0'
              }`}>
                Preferred Time
              </label>
              
              <div className="relative">
                <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-200 z-10 ${
                  focusedField === 'timeSlot' ? 'text-green-400 dark:text-[#030b47] scale-110' : 'text-gray-400 dark:text-[#030b47]/70'
                }`}>
                  <Clock className="w-5 h-5" />
                </div>
                
                <div className={`absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-200 z-10 pointer-events-none ${
                  focusedField === 'timeSlot' ? 'text-green-400 dark:text-[#030b47]' : 'text-gray-400 dark:text-[#030b47]/70'
                }`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
                
                <select
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("timeSlot")}
                  onBlur={() => setFocusedField("")}
                  required
                  className={`w-full pl-12 pr-12 py-4 bg-slate-800/50 dark:bg-[#b8c8ff]/30 border rounded-xl text-white dark:text-[#030b47] transition-all duration-300 focus:outline-none focus:scale-[1.02] appearance-none cursor-pointer ${
                    focusedField === 'timeSlot'
                      ? 'border-green-400 dark:border-[#030b47] shadow-lg shadow-green-400/20 dark:shadow-[#7B7A72]/30 bg-slate-800/80 dark:bg-[#a8b9ff]/40' 
                      : 'border-slate-600/50 dark:border-[#9fb3ff]/40 hover:border-slate-500 dark:hover:border-[#7B7A72]/60'
                  }`}
                >
                  <option value="" disabled className="bg-slate-800 dark:bg-[#b8c8ff] text-gray-400 dark:text-[#030b47]/70">
                    Select your preferred time slot
                  </option>
                  {timeSlots.map((slot) => (
                    <option key={slot.value} value={slot.value} className="bg-slate-800 dark:bg-[#b8c8ff] text-white dark:text-[#030b47] py-2">
                      {slot.icon} {slot.label}
                    </option>
                  ))}
                </select>
                
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-green-400/10 to-emerald-400/10 opacity-0 transition-opacity duration-300 pointer-events-none ${
                  focusedField === 'timeSlot' ? 'opacity-100' : ''
                }`}></div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSending || !formData.name || !formData.phone || !formData.timeSlot}
              className="group/submit w-full relative overflow-hidden py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-green-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-white/20 to-green-400/0 -translate-x-full group-hover/submit:translate-x-full transition-transform duration-700"></div>
              
              <div className="relative flex items-center justify-center gap-3">
                {isSending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Scheduling Callback...</span>
                  </>
                ) : (
                  <>
                    <PhoneCall className="w-5 h-5 group-hover/submit:rotate-12 transition-transform duration-200" />
                    <span>Schedule Callback</span>
                  </>
                )}
              </div>
            </button>

            {/* Footer Info */}
            <div className="flex items-center justify-center gap-2 pt-2 text-sm text-gray-400 dark:text-[#030b47]/70 transition-colors duration-300">
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                <span>Callback within 24 hours</span>
              </div>
              <span className="text-gray-600 dark:text-[#030b47]/50">•</span>
              <div className="flex items-center gap-1">
                <span>Free consultation</span>
                <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-green-400/10 to-transparent rounded-full blur-xl"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-tr from-emerald-400/10 to-transparent rounded-full blur-lg"></div>
      </div>
    </div>
  );
}