# Vyan Security - Professional Security Solutions Platform

[![Live Site](https://img.shields.io/badge/Live-Website-0ea5e9?style=for-the-badge&logo=vercel)](https://vyan-security.vercel.app)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-181717?style=for-the-badge&logo=github)](https://srivas-saksham.github.io/Vyan-Security)
[![Status](https://img.shields.io/badge/Status-Production-22c55e?style=for-the-badge)](https://vyan-security.vercel.app)
[![React](https://img.shields.io/badge/React-18.x-61dafb?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![AI Powered](https://img.shields.io/badge/AI-Powered-7c3aed?style=for-the-badge&logo=openai&logoColor=white)](https://vyan-security.vercel.app)

## Overview

Vyan Security is a comprehensive web platform designed for a leading physical security services provider specializing in contract-based security personnel, housekeeping services, and facility management solutions. The platform serves as a digital gateway for enterprises, institutions, and residential complexes seeking professional security services across India.

---

## About Vyan Security

### Company Profile

Vyan Security is a professional security services provider committed to delivering unparalleled protection through vigilance, professionalism, and integrity. The company operates on the principle that true security encompasses trust, preparedness, and unwavering dedication to safeguarding what matters most to clients.

### Core Services

**Security Solutions**
- Contract-based security personnel for corporate buildings and offices
- Professional security staff for schools, colleges, hospitals, and institutions
- Armed and unarmed security guard services
- Long-term protection plans with minimum 6-month contracts
- Corporate security solutions and asset protection

**Housekeeping Services**
- Male housekeepers for corporate environments and institutions
- Professional cleaning and maintenance staff
- Long-term contract solutions with reliable, trained personnel
- Facility management services

**Facility Management**
- Comprehensive facility management solutions
- Integrated security and housekeeping packages
- Customized maintenance and operational support

### Mission Statement

To provide unparalleled protection through a steadfast commitment to vigilance, professionalism, and integrity. Vyan Security believes that true security goes beyond physical presence—it encompasses trust, preparedness, and the unwavering dedication to safeguarding what matters most to clients.

### Vision

To become India's most trusted and innovative security solutions provider, setting new benchmarks in safety, technology, and service excellence. The company envisions expanding its presence across every major city in India, integrating AI-powered surveillance, real-time monitoring systems, and smart analytics.

### Core Values

- **Integrity Always**: Acting with uncompromised honesty and upholding the highest moral standards
- **Rapid Response**: Immediate, calm, and strategic reaction to security situations
- **Community First**: Protection with empathy, serving communities with awareness and cultural respect
- **Vigilant Eyes**: Attention to detail in detecting and deterring risks
- **Prepared for Unseen**: Continuous training for unpredictable scenarios
- **Certified Excellence**: All personnel vetted, trained, and certified under industry-best compliance

---

## Contact Information

### Get in Touch

**Inquiry Methods**
- Website contact form for detailed queries
- Callback request system for immediate consultation
- Instant quote request for custom security solutions

**Response Time**
- Email responses within 24 hours on business days
- Callback scheduling available for morning, afternoon, and evening slots
- Free quotes and site assessments provided

**Service Areas**
- Operating across major cities in India
- Specialized solutions for corporate, institutional, and residential sectors

---

## Technical Architecture

### Technology Stack

**Frontend**
- React.js (with Hooks and functional components)
- Framer Motion for animations and transitions
- Tailwind CSS for responsive styling
- Lucide React for iconography
- React Router for navigation
- EmailJS for client-side email integration

**Backend**
- Node.js with Express.js framework
- OpenRouter API integration for AI chatbot functionality
- RESTful API architecture
- CORS middleware for cross-origin requests
- Environment variable management with dotenv

**AI Integration**
- OpenAI GPT-3.5 Turbo via OpenRouter
- Custom-trained chatbot named "Shieldon"
- Context-aware responses for security-specific queries
- Intelligent topic filtering and redirection

---

## Project Structure

### Frontend Components

**Core Pages**
- Home page with hero section and service overview
- About page with mission, vision, and values
- Services showcase with interactive cards
- Contact page with multiple inquiry options
- Instant quote request system

**Interactive Features**

1. **ChatBot Component** (`ChatBot.jsx`)
   - Real-time AI-powered assistance
   - Responsive design for mobile and desktop
   - Typing animation for bot responses
   - Quick action buttons for common queries
   - Keyboard detection for mobile optimization
   - Session storage for user interaction tracking

2. **Instant Quote System** (`InstantQuote.jsx`)
   - Multi-step form with progress tracking
   - Smart recommendations based on user selections
   - Real-time validation and feedback
   - Live activity display showing recent requests
   - Bulk discount notifications
   - EmailJS integration for quote submissions

3. **Service Cards** (`ServicesCard.jsx`)
   - Spotlight card effects with theme adaptation
   - Mobile-responsive accordion design
   - Smooth animations on scroll
   - Dark mode support

4. **Contact Forms**
   - Query form with field validation
   - Callback request system with time slot selection
   - Success state animations
   - Email confirmation to clients

### Backend Implementation

**Server Architecture** (`server.js`)

The backend is built with Express.js and serves as a middleware between the frontend and OpenRouter API.

**Key Features:**
- CORS configuration for multiple deployment environments
- API key security through environment variables
- Intelligent topic filtering to keep conversations focused
- Dynamic referer handling for different hosting platforms
- Error handling and fallback responses

**AI Chatbot Logic:**
- System prompt engineering for context-specific responses
- Keyword recognition for service categorization
- Formatted response templates for consistency
- Topic restrictions (no cybersecurity, IT security, or short-term contracts)
- Natural language variation to avoid repetitive responses

**API Endpoints:**

```
POST /chat
- Request body: { message: string }
- Response: { reply: string }
- Handles AI conversation with OpenRouter
```

---

## Key Features

### User Experience

**Responsive Design**
- Mobile-first approach with adaptive layouts
- Touch-optimized interactions
- Keyboard-aware input handling
- Viewport-based dimension calculations

**Theme Support**
- Light and dark mode toggle
- Theme persistence across sessions
- Smooth transition animations
- Context-based theme provider

**Animations**
- Framer Motion for entrance animations
- Scroll-triggered viewport animations
- Interactive hover effects
- Loading states and transitions

### Chatbot Capabilities

**Shieldon AI Assistant**
- Natural language understanding
- Service-specific information delivery
- Contact information guidance
- Booking and contract request handling
- Housekeeping service inquiries
- Smart topic redirection

**Response Formats:**
- Structured bullet points for clarity
- Bold headings for section organization
- Varied language to avoid repetition
- Professional tone with conversational elements

### Form Management

**EmailJS Integration**
- Dual email sending (admin and client confirmation)
- Template-based email composition
- Real-time submission feedback
- Success state management

**Validation**
- Required field checking
- Input format validation (phone, email)
- Multi-step form progression guards
- Character count tracking for messages

---

## Accessing the Platform

### Live Website

The Vyan Security platform is deployed and accessible at the following URLs:

**Primary Domain**
- Production Site: `https://vyan-security.vercel.app`

**Alternative Access**
- GitHub Pages: `https://srivas-saksham.github.io/Vyan-Security`

### Platform Availability

The platform is hosted on enterprise-grade infrastructure ensuring:
- 99.9% uptime guarantee
- Global CDN distribution for fast loading
- Automatic HTTPS security
- Mobile and desktop optimization
- Real-time chatbot availability

### How to Use

1. Visit the website using any modern web browser
2. Navigate through services, about, and contact sections
3. Use the AI chatbot (Shieldon) for instant assistance
4. Submit quote requests or callback forms for personalized service
5. Receive confirmation emails for all inquiries

---

## API Integration

### OpenRouter Configuration

**Model**: OpenAI GPT-3.5 Turbo  
**Temperature**: 0.2 (consistent, focused responses)  
**Max Tokens**: 300 (concise replies)  
**Top P**: 1.0 (full vocabulary)  
**Frequency Penalty**: 0.5 (reduce repetition)  
**Presence Penalty**: 0.3 (encourage topic diversity)

### EmailJS Configuration

**Services Used**
- Main admin notification service
- Client confirmation service
- Quote request service
- Callback request service

**Template Parameters**
- Dynamic field mapping
- Custom message formatting
- Sender information capture

---

## Security Features

### Data Protection

- No sensitive data stored in localStorage or sessionStorage
- Environment variables for API keys
- CORS restrictions for authorized origins
- Input sanitization and validation

### API Security

- Authorization headers for external API calls
- Rate limiting considerations
- Error handling without exposing internal details
- Secure referer handling

---

## Performance Optimizations

### Frontend

- React.memo for component memoization
- useCallback and useMemo hooks for expensive operations
- Lazy loading for route components
- Optimized image assets
- Debounced resize handlers
- Efficient animation frame usage

### Backend

- Asynchronous request handling
- Connection pooling for external APIs
- Response caching strategies
- Minimal dependency footprint

---

## Browser Compatibility

**Supported Browsers**
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

**Mobile Support**
- iOS Safari (iOS 12+)
- Chrome Mobile (Android 8+)
- Samsung Internet

---

## Accessibility

### Standards Compliance

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus management for modals and forms
- Screen reader compatibility
- Sufficient color contrast ratios

---

## Development Guidelines

### Code Style

**React Components**
- Functional components with hooks
- Props destructuring in parameters
- Proper dependency arrays in useEffect
- Meaningful variable and function names

**Styling**
- Tailwind utility classes
- Custom CSS for complex animations
- Responsive design patterns
- Dark mode color schemes

**State Management**
- React Context for theme
- Local state with useState
- Effect hooks for side effects
- SessionStorage for persistence

---

## Future Enhancements

### Planned Features

- Real-time video consultation booking
- Client portal for contract management
- Mobile application (React Native)
- Advanced analytics dashboard
- Multi-language support
- Payment gateway integration
- GPS-based security personnel tracking
- Automated shift scheduling system

### Technology Upgrades

- Migration to Next.js for SSR
- GraphQL API implementation
- Progressive Web App (PWA) capabilities
- WebSocket for real-time notifications
- AI model fine-tuning for improved responses

---

## Contributing

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Implement changes with appropriate tests
4. Submit pull request with detailed description
5. Code review and approval process

### Code Standards

- ESLint configuration adherence
- Prettier formatting
- Commit message conventions
- Documentation updates for new features

---

## License

This project is proprietary software developed for Vyan Security. All rights reserved.

---

## Support and Maintenance

### Technical Support

For technical issues or questions regarding the platform:
- Submit issues through the repository
- Contact the development team via project channels

### Maintenance Schedule

- Regular dependency updates
- Security patches applied promptly
- Feature releases on quarterly basis
- Performance monitoring and optimization

---

## Acknowledgments

### Technologies and Libraries

- React.js community for excellent documentation
- Tailwind CSS for utility-first CSS framework
- Framer Motion for animation capabilities
- OpenRouter for AI API access
- EmailJS for email integration services
- Lucide for comprehensive icon library

---

## Project Statistics

**Lines of Code**: ~8,000+  
**Components**: 15+ React components  
**API Endpoints**: 1 main chatbot endpoint  
**Supported Languages**: English (primary)  
**Deployment Platforms**: Vercel, Render, GitHub Pages

---

**Version**: 1.0.0  
**Last Updated**: October 2025  
**Status**: Production Ready

---

For more information about Vyan Security services, visit the deployed platform or contact through the available inquiry channels.