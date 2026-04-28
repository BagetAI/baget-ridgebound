'use client';

import { useState } from 'react';

const routes = [
  "Brooks Range Traverse (AK)",
  "Hayduke Trail (UT/AZ)",
  "Great Himalaya Trail (Nepal)",
  "Wind River High Route (WY)",
  "Sierra High Route (CA)",
  "Grand Enchantment Trail (AZ/NM)",
  "Northern Loop (Glacier NP, MT)",
  "Kings Canyon High Basin (CA)",
  "Pacific Northwest Trail (MT/ID/WA)",
  "Greater Yellowstone Traverse (WY)",
  "Other / Custom Expedition"
];

export default function InquiryForm({ databaseId }: { databaseId: string }) {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience_level: 'Intermediate (Multi-day loops)',
    desired_route_id: '',
    timeframe_2026_2027: '',
    notes: ''
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const res = await fetch(`https://stg-app.baget.ai/api/public/databases/${databaseId}/rows`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: formData }),
      });
      
      if (!res.ok) throw new Error('Submission failed');
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="p-8 text-center border-2 border-[#4A3728] rounded-[4px] bg-white/50">
        <h3 className="text-2xl font-serif mb-4">Transmission Received</h3>
        <p className="font-body text-lg">Our logistics team will review your profile and contact you within 48 hours to discuss route availability and permit windows for the 2026 season.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto border-2 border-[#4A3728] rounded-[4px] bg-white/30 backdrop-blur-sm shadow-xl p-8">
      <div className="flex justify-between mb-8">
        {[1, 2, 3].map(i => (
          <div key={i} className={`flex items-center ${step >= i ? 'text-[#6B2D3E]' : 'text-[#4A3728]/30'}`}>
            <span className={`w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-bold mr-2 ${step === i ? 'bg-[#6B2D3E] text-white' : ''}`}>
              {i}
            </span>
            <span className="hidden sm:inline font-bold uppercase tracking-wider text-xs">
              {i === 1 ? 'Profile' : i === 2 ? 'Route' : 'Details'}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in duration-500">
            <div>
              <label className="block text-xs font-bold uppercase mb-1">Full Name</label>
              <input
                required
                type="text"
                className="w-full bg-white border border-[#4A3728] p-3 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#6B2D3E]"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase mb-1">Email Address</label>
              <input
                required
                type="email"
                className="w-full bg-white border border-[#4A3728] p-3 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#6B2D3E]"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase mb-1">Hiking Experience</label>
              <select
                className="w-full bg-white border border-[#4A3728] p-3 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#6B2D3E]"
                value={formData.experience_level}
                onChange={e => setFormData({ ...formData, experience_level: e.target.value })}
              >
                <option>Novice (Day hikes only)</option>
                <option>Intermediate (Multi-day loops)</option>
                <option>Advanced (Long-distance trails)</option>
                <option>Elite (Off-trail, remote expeditions)</option>
              </select>
            </div>
            <button type="button" onClick={nextStep} className="btn-primary w-full mt-4">Continue to Logistics</button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-in fade-in duration-500">
            <div>
              <label className="block text-xs font-bold uppercase mb-1">Target Route</label>
              <select
                required
                className="w-full bg-white border border-[#4A3728] p-3 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#6B2D3E]"
                value={formData.desired_route_id}
                onChange={e => setFormData({ ...formData, desired_route_id: e.target.value })}
              >
                <option value="">Select a route...</option>
                {routes.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase mb-1">Preferred Timeframe (2026-2027)</label>
              <input
                required
                type="text"
                placeholder="e.g. July 2026, or Early Spring 2027"
                className="w-full bg-white border border-[#4A3728] p-3 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#6B2D3E]"
                value={formData.timeframe_2026_2027}
                onChange={e => setFormData({ ...formData, timeframe_2026_2027: e.target.value })}
              />
            </div>
            <div className="flex gap-4 mt-4">
              <button type="button" onClick={prevStep} className="btn-outline flex-1">Back</button>
              <button type="button" onClick={nextStep} className="btn-primary flex-1">Final Details</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-in fade-in duration-500">
            <div>
              <label className="block text-xs font-bold uppercase mb-1">Specific Logistics Concerns</label>
              <textarea
                placeholder="Permit lotteries, bush plane coordination, water caching needs..."
                className="w-full bg-white border border-[#4A3728] p-3 rounded-[4px] h-32 focus:outline-none focus:ring-2 focus:ring-[#6B2D3E]"
                value={formData.notes}
                onChange={e => setFormData({ ...formData, notes: e.target.value })}
              ></textarea>
            </div>
            {status === 'error' && (
              <p className="text-red-700 text-sm">Communication error. Please check your connection and try again.</p>
            )}
            <div className="flex gap-4 mt-4">
              <button type="button" onClick={prevStep} className="btn-outline flex-1">Back</button>
              <button type="submit" disabled={status === 'submitting'} className="btn-primary flex-1">
                {status === 'submitting' ? 'Transmitting...' : 'Submit Inquiry'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
