import React, { useState } from 'react';
import { Sparkles, Phone, User, GraduationCap, Building, Calendar, Target, AlertCircle } from 'lucide-react';
import { CAREER_INTEREST_OPTIONS, YEAR_OF_STUDY_OPTIONS } from '../data/personas';
import { Persona } from '../types';
import { sounds } from '../utils/audio';

interface LeadCaptureScreenProps {
  persona: Persona;
  onSubmitLead: (data: {
    fullName: string;
    whatsappNumber: string;
    college: string;
    department: string;
    yearOfStudy: string;
    careerInterest: string;
  }) => void;
  onBack: () => void;
}

export const LeadCaptureScreen: React.FC<LeadCaptureScreenProps> = ({
  persona,
  onSubmitLead
}) => {
  const [fullName, setFullName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [college, setCollege] = useState('');
  const [department, setDepartment] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('');
  const [careerInterest, setCareerInterest] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) {
      errs.fullName = 'Please enter your full name';
    }
    const cleanPhone = whatsappNumber.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.whatsappNumber = 'Please enter a valid 10-digit WhatsApp number';
    }
    if (!college.trim()) {
      errs.college = 'Please enter your college / institute';
    }
    if (!department.trim()) {
      errs.department = 'Please enter your department / degree';
    }
    if (!yearOfStudy) {
      errs.yearOfStudy = 'Please select your current year of study';
    }
    if (!careerInterest) {
      errs.careerInterest = 'Please select your primary career interest';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      sounds.playClick();
      return;
    }

    setIsSubmitting(true);
    sounds.playSelect();

    setTimeout(() => {
      onSubmitLead({
        fullName: fullName.trim(),
        whatsappNumber: whatsappNumber.trim(),
        college: college.trim(),
        department: department.trim(),
        yearOfStudy,
        careerInterest
      });
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 sm:py-12">
      {/* Top Tag & Heading (Page 5/6) */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Final Step to Reveal</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display mb-2">
          Unlock Your Personal AI Career Roadmap
        </h1>
        <p className="text-sm text-neutral-400">
          Personalized for <span className="text-emerald-400 font-semibold">{persona.name}</span>
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* FULL NAME */}
          <div>
            <label className="block text-xs font-mono font-semibold tracking-wider text-neutral-300 uppercase mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-400" />
              FULL NAME
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (errors.fullName) setErrors({ ...errors, fullName: '' });
              }}
              placeholder="e.g. Alex Morgan"
              className={`w-full px-4 py-3 rounded-lg bg-neutral-950 border ${
                errors.fullName ? 'border-rose-500 focus:border-rose-500' : 'border-neutral-800 focus:border-emerald-500'
              } text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-colors text-sm sm:text-base`}
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.fullName}
              </p>
            )}
          </div>

          {/* WHATSAPP NUMBER */}
          <div>
            <label className="block text-xs font-mono font-semibold tracking-wider text-neutral-300 uppercase mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              WHATSAPP NUMBER
            </label>
            <input
              type="tel"
              value={whatsappNumber}
              onChange={(e) => {
                setWhatsappNumber(e.target.value);
                if (errors.whatsappNumber) setErrors({ ...errors, whatsappNumber: '' });
              }}
              placeholder="e.g. +91 98765 43210"
              className={`w-full px-4 py-3 rounded-lg bg-neutral-950 border ${
                errors.whatsappNumber ? 'border-rose-500 focus:border-rose-500' : 'border-neutral-800 focus:border-emerald-500'
              } text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-colors text-sm sm:text-base`}
            />
            {errors.whatsappNumber && (
              <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.whatsappNumber}
              </p>
            )}
          </div>

          {/* COLLEGE & DEPARTMENT in 2 columns on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* COLLEGE */}
            <div>
              <label className="block text-xs font-mono font-semibold tracking-wider text-neutral-300 uppercase mb-1.5 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-emerald-400" />
                COLLEGE
              </label>
              <input
                type="text"
                value={college}
                onChange={(e) => {
                  setCollege(e.target.value);
                  if (errors.college) setErrors({ ...errors, college: '' });
                }}
                placeholder="e.g. Tech Institute of Science"
                className={`w-full px-4 py-3 rounded-lg bg-neutral-950 border ${
                  errors.college ? 'border-rose-500 focus:border-rose-500' : 'border-neutral-800 focus:border-emerald-500'
                } text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-colors text-sm`}
              />
              {errors.college && (
                <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.college}
                </p>
              )}
            </div>

            {/* DEPARTMENT */}
            <div>
              <label className="block text-xs font-mono font-semibold tracking-wider text-neutral-300 uppercase mb-1.5 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                DEPARTMENT
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                  if (errors.department) setErrors({ ...errors, department: '' });
                }}
                placeholder="e.g. CS, IT, ECE, Mech, BBA"
                className={`w-full px-4 py-3 rounded-lg bg-neutral-950 border ${
                  errors.department ? 'border-rose-500 focus:border-rose-500' : 'border-neutral-800 focus:border-emerald-500'
                } text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-colors text-sm`}
              />
              {errors.department && (
                <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.department}
                </p>
              )}
            </div>
          </div>

          {/* YEAR OF STUDY */}
          <div>
            <label className="block text-xs font-mono font-semibold tracking-wider text-neutral-300 uppercase mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              YEAR OF STUDY
            </label>
            <div className="relative">
              <select
                value={yearOfStudy}
                onChange={(e) => {
                  setYearOfStudy(e.target.value);
                  if (errors.yearOfStudy) setErrors({ ...errors, yearOfStudy: '' });
                }}
                className={`w-full px-4 py-3 rounded-lg bg-neutral-950 border ${
                  errors.yearOfStudy ? 'border-rose-500' : 'border-neutral-800'
                } text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 appearance-none text-sm cursor-pointer`}
              >
                <option value="" disabled className="text-neutral-500">
                  Select Year ▼
                </option>
                {YEAR_OF_STUDY_OPTIONS.map((yr) => (
                  <option key={yr} value={yr} className="bg-neutral-900 text-white">
                    {yr}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-400">
                ▼
              </div>
            </div>
            {errors.yearOfStudy && (
              <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.yearOfStudy}
              </p>
            )}
          </div>

          {/* CAREER INTEREST */}
          <div>
            <label className="block text-xs font-mono font-semibold tracking-wider text-neutral-300 uppercase mb-1.5 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-emerald-400" />
              CAREER INTEREST
            </label>
            <div className="relative">
              <select
                value={careerInterest}
                onChange={(e) => {
                  setCareerInterest(e.target.value);
                  if (errors.careerInterest) setErrors({ ...errors, careerInterest: '' });
                }}
                className={`w-full px-4 py-3 rounded-lg bg-neutral-950 border ${
                  errors.careerInterest ? 'border-rose-500' : 'border-neutral-800'
                } text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 appearance-none text-sm cursor-pointer`}
              >
                <option value="" disabled className="text-neutral-500">
                  Select Interest ▼
                </option>
                {CAREER_INTEREST_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-neutral-900 text-white">
                    {opt}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-400">
                ▼
              </div>
            </div>
            {errors.careerInterest && (
              <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.careerInterest}
              </p>
            )}
          </div>

          {/* CTA: 🚀 UNLOCK MY ROADMAP (Page 6) */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-xl font-bold text-base sm:text-lg text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'GENERATING YOUR ROADMAP...' : '🚀 UNLOCK MY ROADMAP'}
            </button>
          </div>

          {/* Small consent text (verbatim from page 6) */}
          <p className="text-xs text-neutral-400 text-center leading-relaxed pt-1">
            By submitting, you agree to receive your AI career roadmap and relevant updates on WhatsApp.
          </p>
        </form>
      </div>
    </div>
  );
};
