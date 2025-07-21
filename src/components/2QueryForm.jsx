import { useState } from "react";
import { toast } from "react-hot-toast";
import emailjs from "@emailjs/browser";
import { HelpCircle, Send, User, Mail, Phone, MessageSquare, Sparkles, CheckCircle } from "lucide-react";

export default function QueryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [isHovered, setIsHovered] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message
    };

    // Send main email
    emailjs.send("service_x3e64p1", "template_05ja1ug", templateParams, "y-A9giT-xgqX91XUf")
      .then(() => {
        toast.success("Query submitted successfully! We'll contact you soon.");
        setIsSubmitted(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
        setIsSending(false);
        
        // Reset success state after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        toast.error("Failed to submit query \n There might be some server issue.");
        setIsSending(false);
      });

    // Send confirmation email to client
    emailjs.send("service_x3e64p1", "template_18009xi", templateParams, "y-A9giT-xgqX91XUf")
      .then(() => {
        console.log("Confirmation email sent to client");
      })
      .catch((error) => {
        console.error("Client email error:", error);
      });
  };

  const formFields = [
    { name: "name", type: "text", placeholder: "Your Full Name", icon: User, label: "Name" },
    { name: "email", type: "email", placeholder: "your.email@example.com", icon: Mail, label: "Email" },
    { name: "phone", type: "tel", placeholder: "+91 (01234-56789)", icon: Phone, label: "Phone" },
  ];

  if (isSubmitted) {
    return (
      <div className="p-8 rounded-2xl backdrop-blur-xl bg-slate-900/90 dark:bg-[#dce1ff] border border-emerald-200/20 shadow-lg dark:shadow-[0_0_20px_#7B7A72] transition-shadow duration-500 dark:text-[#030b47] transition-colors">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/20 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-400 dark:text-emerald-600" />
          </div>
          <h3 className="text-2xl font-bold text-emerald-400 dark:text-emerald-600 mb-2">Message Sent!</h3>
          <p className="text-gray-300 dark:text-[#030b47]">Thank you for reaching out. We'll get back to you within 24 hours.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      {/* Background decorative elements */}
      <div className="absolute -inset-1 bg-gradient-to-r from-green-400/20 via-blue-500/20 to-purple-600/20 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
      
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative p-8 rounded-2xl backdrop-blur-xl bg-slate-900/90 dark:bg-[#dce1ff] border border-slate-700/50 dark:border-slate-400/30 shadow-lg dark:shadow-[0_0_20px_#7B7A72] hover:shadow-green-500/10 transition-all duration-500 dark:text-[#030b47] transition-colors"
      >
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className={`relative transition-transform duration-300 ${isHovered ? 'rotate-12 scale-110' : ''}`}>
              <div className="absolute inset-0 bg-green-400/20 rounded-full blur-md"></div>
              <div className="relative bg-gradient-to-br from-green-400 to-emerald-500 p-3 rounded-full">
                <HelpCircle className="w-6 h-6 text-white dark:text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white dark:text-[#030b47] transition-colors">
                Get In Touch
              </h2>
              <p className="text-gray-400 dark:text-[#030b47]/70 text-sm mt-1 transition-colors">We'd love to hear from you</p>
            </div>
          </div>
          
          {/* Floating sparkles */}
          <div className="relative">
            <Sparkles className={`w-5 h-5 text-green-400/60 dark:text-green-600/80 transition-all duration-700 ${isHovered ? 'opacity-100 rotate-180' : 'opacity-40'}`} />
            <div className={`absolute -top-2 -right-2 w-2 h-2 bg-green-400 dark:bg-green-600 rounded-full transition-all duration-500 ${isHovered ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form Fields */}
          {formFields.map((field, index) => {
            const Icon = field.icon;
            const isFocused = focusedField === field.name;
            const hasValue = formData[field.name].length > 0;
            
            return (
              <div key={field.name} className="relative group/field">
                <label className={`absolute -top-4 left-3 px-2 text-xs font-medium transition-all duration-200 bg-slate-900/90 dark:bg-[#dce1ff] rounded ${
                  isFocused || hasValue ? 'text-green-400 dark:text-green-600 scale-100 opacity-100' : 'text-gray-500 dark:text-[#030b47]/50 scale-95 opacity-0'
                }`}>
                  {field.label}
                </label>
                
                <div className="relative">
                  <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-200 z-10 ${
                    isFocused ? 'text-green-400 dark:text-green-600 scale-110' : 'text-gray-400 dark:text-[#030b47]/60'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    onFocus={() => setFocusedField(field.name)}
                    onBlur={() => setFocusedField("")}
                    placeholder={field.placeholder}
                    required
                    className={`w-full pl-12 pr-4 py-4 bg-slate-800/50 dark:bg-white/50 border rounded-xl text-white dark:text-[#030b47] placeholder-gray-500 dark:placeholder-[#030b47]/50 transition-all duration-300 focus:outline-none focus:scale-[1.02] ${
                      isFocused 
                        ? 'border-green-400 dark:border-green-600 shadow-lg shadow-green-400/20 dark:shadow-green-600/20 bg-slate-800/80 dark:bg-white/80' 
                        : 'border-slate-600/50 dark:border-[#030b47]/20 hover:border-slate-500 dark:hover:border-[#030b47]/30'
                    }`}
                  />
                  
                  {/* Input highlight effect */}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-green-400/10 to-emerald-400/10 dark:from-green-600/10 dark:to-emerald-600/10 opacity-0 transition-opacity duration-300 pointer-events-none ${
                    isFocused ? 'opacity-100' : ''
                  }`}></div>
                </div>
              </div>
            );
          })}

          {/* Message Field */}
          <div className="relative group/field">
            <label className={`absolute -top-4 left-3 px-2 text-xs font-medium transition-all duration-200 bg-slate-900/90 dark:bg-[#dce1ff] rounded ${
              focusedField === 'message' || formData.message.length > 0 ? 'text-green-400 dark:text-green-600 scale-100 opacity-100' : 'text-gray-500 dark:text-[#030b47]/50 scale-95 opacity-0'
            }`}>
              Message
            </label>
            
            <div className="relative">
              <div className={`absolute left-4 top-4 transition-all duration-200 z-10 ${
                focusedField === 'message' ? 'text-green-400 dark:text-green-600 scale-110' : 'text-gray-400 dark:text-[#030b47]/60'
              }`}>
                <MessageSquare className="w-5 h-5" />
              </div>
              
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField("")}
                placeholder="Tell us about your project, questions, or how we can help you..."
                required
                rows={4}
                className={`w-full pl-12 pr-4 py-4 bg-slate-800/50 dark:bg-white/50 border rounded-xl text-white dark:text-[#030b47] placeholder-gray-500 dark:placeholder-[#030b47]/50 transition-all duration-300 focus:outline-none focus:scale-[1.02] resize-none ${
                  focusedField === 'message'
                    ? 'border-green-400 dark:border-green-600 shadow-lg shadow-green-400/20 dark:shadow-green-600/20 bg-slate-800/80 dark:bg-white/80' 
                    : 'border-slate-600/50 dark:border-[#030b47]/20 hover:border-slate-500 dark:hover:border-[#030b47]/30'
                }`}
              />
              
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-green-400/10 to-emerald-400/10 dark:from-green-600/10 dark:to-emerald-600/10 opacity-0 transition-opacity duration-300 pointer-events-none ${
                focusedField === 'message' ? 'opacity-100' : ''
              }`}></div>
            </div>
          </div>

          {/* Character count for message */}
          <div className="text-right">
            <span className={`text-xs transition-colors duration-200 ${
              formData.message.length > 500 ? 'text-amber-400 dark:text-amber-600' : 'text-gray-500 dark:text-[#030b47]/60'
            }`}>
              {formData.message.length}/1000
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSending}
            className="group/btn w-full relative overflow-hidden py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 dark:from-green-600 dark:to-emerald-700 dark:hover:from-green-500 dark:hover:to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-green-500/25 dark:shadow-green-600/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {/* Button background animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-white/20 to-green-400/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
            
            <div className="relative flex items-center justify-center gap-3">
              {isSending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  <span>Send Message</span>
                </>
              )}
            </div>
          </button>

          {/* Additional Info */}
          <div className="flex items-center justify-center gap-2 pt-4 text-sm text-gray-400 dark:text-[#030b47]/70 transition-colors">
            <div className="w-1 h-1 bg-green-400 dark:bg-green-600 rounded-full animate-pulse"></div>
            <span>We typically respond within 24 hours</span>
            <div className="w-1 h-1 bg-green-400 dark:bg-green-600 rounded-full animate-pulse"></div>
          </div>
        </form>

        {/* Decorative corner elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-green-400/10 to-transparent rounded-full blur-xl"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-tr from-emerald-400/10 to-transparent rounded-full blur-lg"></div>
      </div>
    </div>
  );
}