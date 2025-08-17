
# TOKEN PEDIA - Mental Health Assessment Platform for Santri

## 📱 App Description

TOKEN PEDIA is a modern, mobile-first mental health assessment application specifically designed for santri (Islamic boarding school students). The app provides comprehensive mental health screening tools, educational resources, and support materials with an Islamic-friendly aesthetic and culturally sensitive approach.

## 🎯 Core Features

### 1. Mental Health Assessments
- **DASS-42** (Depression, Anxiety, Stress Scales) - 42 items, 4-point Likert scale
- **GSE** (General Self-Efficacy Scale) - 10 items, 4-point scale
- **MHKQ** (Mental Health Knowledge Questionnaire) - True/False format
- **MSCS** (Multidimensional Scale of Perceived Social Support) - 12 items, 7-point scale
- **PDD** (Perceived Devaluation-Discrimination Scale) - 12-15 items, 5-point scale

### 2. Assessment Features
- ✅ Progress saving during assessments
- ✅ Exit confirmation with save options
- ✅ Local SQLite database storage with sync capability
- ✅ Comprehensive result interpretation
- ✅ Assessment history tracking

### 3. Educational Resources
- 📚 Mental health materials and PDF downloads
- 🎥 Curated YouTube video playlist
- 📖 Islamic-friendly educational content
- 💡 Interactive learning modules

### 4. User Experience
- 🌙 Dark/Light mode support
- 📱 Mobile-first responsive design
- ♿ WCAG 2.1 Level AA accessibility
- 🎨 Modern glassmorphism UI with calming colors
- 🔄 Smooth animations and micro-interactions

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **Wouter** for routing
- **React Query** for state management

### Backend
- **Express.js** with TypeScript
- **SQLite** database with Drizzle ORM
- **RESTful API** architecture

### Development
- **Vite** for build tooling
- **Hot Module Replacement** for development
- **ESLint** and **Prettier** for code quality

## 📋 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- Modern web browser

### Quick Start
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Access the app
Open http://localhost:5000 in your browser
```

### Database Setup
The app uses SQLite for local storage with automatic table creation. No additional database setup required.

## 🚀 Current Implementation Status

### ✅ Completed Features
- [x] Modern UI/UX with glassmorphism design
- [x] Responsive mobile-first layout
- [x] Bottom navigation system
- [x] Assessment card components
- [x] Video modal with YouTube integration
- [x] Educational materials system
- [x] Profile management
- [x] Theme switching (dark/light mode)
- [x] Database schema and API endpoints
- [x] Progress tracking system

### 🔧 In Progress
- [ ] Assessment form implementation (needs saveResultsMutation fix)
- [ ] Database result storage
- [ ] Assessment result interpretation
- [ ] History page functionality

## 📈 Next Development Plan

### Phase 1: Core Assessment Implementation (Week 1-2)
1. **Fix Assessment Forms**
   - Resolve `saveResultsMutation` error
   - Implement all 5 assessment forms (DASS-42, GSE, MHKQ, MSCS, PDD)
   - Add progress saving and exit functionality
   - Test form validation and submission

2. **Database Integration**
   - Complete assessment result storage
   - Implement progress tracking
   - Add user session management
   - Test data persistence

### Phase 2: Enhanced User Experience (Week 3-4)
1. **Education Module Enhancement**
   - Implement dropdown menu for videos/materials
   - Add PDF download functionality
   - Create video playlist with modal viewing
   - Add educational content categorization

2. **Results & Analytics**
   - Build result interpretation system
   - Create assessment history view
   - Add progress visualization charts
   - Implement result sharing features

### Phase 3: Advanced Features (Week 5-6)
1. **Performance & Accessibility**
   - Optimize for mobile performance
   - Complete WCAG 2.1 AA compliance
   - Add offline capability
   - Implement progressive web app features

2. **Islamic Integration**
   - Add Islamic mental health resources
   - Implement prayer time reminders
   - Create culturally sensitive content
   - Add Arabic/Indonesian language support

### Phase 4: Production & Deployment (Week 7-8)
1. **Data Synchronization**
   - Implement MySQL/PostgreSQL sync
   - Add cloud backup functionality
   - Create admin dashboard
   - Implement user authentication

2. **Testing & Launch**
   - Comprehensive testing across devices
   - Performance optimization
   - Security audit
   - Deployment on Replit

## 🎨 Design System

### Color Palette
- **Primary**: Calming teals and soft blues
- **Secondary**: Warm greens with professional accents
- **Neutral**: Modern grays for text and backgrounds

### Typography
- **Primary**: System fonts optimized for mobile
- **Hierarchy**: Clear heading structure with proper contrast
- **Accessibility**: Minimum 4.5:1 contrast ratio

### Components
- **Cards**: Modern with subtle shadows and rounded corners
- **Buttons**: Expressive with clear call-to-action styling
- **Forms**: Clean, intuitive with proper validation feedback
- **Navigation**: Mobile-first with touch-optimized targets

## 📊 Assessment Details

### DASS-42 Scale
- **Purpose**: Measure depression, anxiety, and stress
- **Items**: 42 questions (14 per dimension)
- **Scale**: 0-3 (Never - Very Often)
- **Categories**: Normal, Mild, Moderate, Severe, Extremely Severe

### GSE Scale
- **Purpose**: Measure general self-efficacy
- **Items**: 10 questions
- **Scale**: 1-4 (Not at all true - Exactly true)
- **Interpretation**: Higher scores indicate stronger self-belief

### MHKQ
- **Purpose**: Assess mental health knowledge
- **Format**: True/False questions
- **Topics**: Stigma, symptoms, treatment, prevention
- **Scoring**: Percentage of correct answers

### MSCS
- **Purpose**: Measure perceived social support
- **Items**: 12 questions
- **Scale**: 1-7 (Very Strongly Disagree - Very Strongly Agree)
- **Domains**: Family, Friends, Significant Others

### PDD Scale
- **Purpose**: Measure perceived stigma and discrimination
- **Items**: 12-15 questions
- **Scale**: 1-5 (Strongly Disagree - Strongly Agree)
- **Focus**: Social barriers to seeking help

## 🤝 Contributing

This project is designed specifically for santri mental health support. All contributions should maintain cultural sensitivity and Islamic values while providing evidence-based mental health resources.

## 📞 Support

For technical support or mental health resources, please contact the development team or refer to the in-app educational materials.

---

**TOKEN PEDIA** - Supporting santri mental health with modern technology and Islamic values.
