import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } }
};

export default function SubscriptionPage() {
  const [accountType, setAccountType] = useState('commercial');

  useEffect(() => {
    try {
      const userStr = localStorage.getItem('glimpse_user');
      if (userStr) {
        const user = JSON.parse(userStr);
        if (user.user_metadata?.account_type) {
          setAccountType(user.user_metadata.account_type);
        }
      }
    } catch (e) {
      console.error('Failed to parse user from local storage');
    }
  }, []);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-12 max-w-7xl mx-auto relative z-10"
    >
      <motion.div variants={itemVariants} className="text-center pb-6 border-b border-white/5">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#D7E2EA] uppercase drop-shadow-lg">
          Subscription <span className="text-white">Plans</span>
        </h1>
        <p className="text-[#D7E2EA]/50 mt-4 text-sm font-bold uppercase tracking-widest max-w-2xl mx-auto">
          Choose the right plan to expand your collections and photo limits.
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        
        {/* Personal Plans */}
        {accountType === 'personal' && (
          <>
            {/* Personal Free */}
            <div className="bg-[#1A1A1A] border border-white/10 p-8 rounded-3xl relative overflow-hidden flex flex-col group transition-all hover:border-white/20">
          <div className="text-[#D7E2EA]/50 font-black uppercase tracking-widest text-xs mb-2">Personal</div>
          <div className="text-2xl font-black uppercase text-white mb-4">Free</div>
          <div className="text-3xl font-black text-white mb-6">$0<span className="text-sm text-[#D7E2EA]/50 font-bold uppercase">/mo</span></div>
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-start gap-3 text-sm font-bold text-[#D7E2EA]/80">
              <Check className="w-4 h-4 text-white shrink-0 mt-0.5" /> 100 Photos
            </li>
            <li className="flex items-start gap-3 text-sm font-bold text-[#D7E2EA]/80">
              <Check className="w-4 h-4 text-white shrink-0 mt-0.5" /> 3 Collections
            </li>
          </ul>
          <button className="w-full h-12 bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-widest rounded-xl transition-all border border-white/10">
            Current Plan
          </button>
        </div>

        {/* Personal Premium */}
        <div className="bg-[#1A1A1A] border border-white/10 p-8 rounded-3xl relative overflow-hidden flex flex-col group transition-all hover:border-white/20">
          <div className="text-[#D7E2EA]/50 font-black uppercase tracking-widest text-xs mb-2">Personal</div>
          <div className="text-2xl font-black uppercase text-white mb-4">Premium</div>
          <div className="text-3xl font-black text-white mb-6">$5<span className="text-sm text-[#D7E2EA]/50 font-bold uppercase">/mo</span></div>
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-start gap-3 text-sm font-bold text-[#D7E2EA]/80">
              <Check className="w-4 h-4 text-white shrink-0 mt-0.5" /> 1,000 Photos
            </li>
            <li className="flex items-start gap-3 text-sm font-bold text-[#D7E2EA]/80">
              <Check className="w-4 h-4 text-white shrink-0 mt-0.5" /> 20 Collections
            </li>
          </ul>
          <button className="w-full h-12 bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-widest rounded-xl transition-all border border-white/10">
            Upgrade
          </button>
        </div>
          </>
        )}

        {/* Commercial Plans */}
        {accountType === 'commercial' && (
          <>
            {/* Commercial Starter */}
            <div className="bg-[#1A1A1A] border border-[#7C6EF6]/50 p-8 rounded-3xl relative overflow-hidden flex flex-col group shadow-[0_0_30px_rgba(124,110,246,0.15)] transition-all">
          <div className="absolute top-0 inset-x-0 h-1 bg-[#7C6EF6]"></div>
          <div className="text-[#7C6EF6] font-black uppercase tracking-widest text-xs mb-2 flex justify-between">
            <span>Commercial</span>
            <span className="text-[10px] bg-[#7C6EF6]/10 px-2 py-0.5 rounded-full">Popular</span>
          </div>
          <div className="text-2xl font-black uppercase text-white mb-4">Starter</div>
          <div className="text-3xl font-black text-white mb-6">$19<span className="text-sm text-[#D7E2EA]/50 font-bold uppercase">/mo</span></div>
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-start gap-3 text-sm font-bold text-[#D7E2EA]/80">
              <Check className="w-4 h-4 text-[#7C6EF6] shrink-0 mt-0.5" /> 10,000 Photos
            </li>
            <li className="flex items-start gap-3 text-sm font-bold text-[#D7E2EA]/80">
              <Check className="w-4 h-4 text-[#7C6EF6] shrink-0 mt-0.5" /> 100 Event Collections
            </li>
            <li className="flex items-start gap-3 text-sm font-bold text-[#D7E2EA]/80">
              <Check className="w-4 h-4 text-[#7C6EF6] shrink-0 mt-0.5" /> Advanced Event Sharing
            </li>
          </ul>
          <button className="w-full h-12 bg-[#7C6EF6] hover:bg-[#7C6EF6]/90 text-white font-black uppercase tracking-widest rounded-xl transition-all">
            Upgrade
          </button>
        </div>

        {/* Commercial Pro */}
        <div className="bg-[#1A1A1A] border border-white/10 p-8 rounded-3xl relative overflow-hidden flex flex-col group transition-all hover:border-white/20">
          <div className="text-[#D7E2EA]/50 font-black uppercase tracking-widest text-xs mb-2">Commercial</div>
          <div className="text-2xl font-black uppercase text-white mb-4">Pro</div>
          <div className="text-3xl font-black text-white mb-6">$49<span className="text-sm text-[#D7E2EA]/50 font-bold uppercase">/mo</span></div>
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-start gap-3 text-sm font-bold text-[#D7E2EA]/80">
              <Check className="w-4 h-4 text-white shrink-0 mt-0.5" /> Unlimited Photos
            </li>
            <li className="flex items-start gap-3 text-sm font-bold text-[#D7E2EA]/80">
              <Check className="w-4 h-4 text-white shrink-0 mt-0.5" /> Unlimited Events
            </li>
            <li className="flex items-start gap-3 text-sm font-bold text-[#D7E2EA]/80">
              <Check className="w-4 h-4 text-white shrink-0 mt-0.5" /> Advanced Event Sharing
            </li>
            <li className="flex items-start gap-3 text-sm font-bold text-[#D7E2EA]/80">
              <Check className="w-4 h-4 text-white shrink-0 mt-0.5" /> Priority Support
            </li>
          </ul>
          <button className="w-full h-12 bg-white hover:bg-[#D7E2EA] text-[#0C0C0C] font-black uppercase tracking-widest rounded-xl transition-all">
            Contact Sales
          </button>
        </div>
          </>
        )}

      </motion.div>
    </motion.div>
  );
}
