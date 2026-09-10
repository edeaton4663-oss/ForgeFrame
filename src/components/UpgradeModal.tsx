import React from 'react';
import { ShieldCheck, Zap, Coins, Flame, X } from 'lucide-react';

interface UpgradeModalProps {
  onClose: () => void;
}

export default function UpgradeModal({ onClose }: UpgradeModalProps) {
  const tiers = [
    {
      name: 'Starter Reload',
      price: '$2',
      perks: ['20 Core AI Generations', 'Standard Prompt Priority', 'Saves to Private History'],
      icon: <Coins className="text-amber-400" size={20} />,
      cta: 'Buy Credits',
      popular: false
    },
    {
      name: 'Arcade Dev Pack',
      price: '$5',
      perks: ['100 Core AI Generations', 'Fast Processing Speeds', 'Access Dev Sliders Console', 'Export Raw Code Files'],
      icon: <Zap className="text-indigo-400" size={20} />,
      cta: 'Get Dev Pack',
      popular: true
    },
    {
      name: 'Unlimited Engine Pass',
      price: '$10',
      perks: ['Infinite Code Generations', 'Instant Ultra High Speed', 'Publish To Global Feed', 'Dedicated Priority Engine'],
      icon: <Flame className="text-rose-500" size={20} />,
      cta: 'Go Unlimited',
      popular: false
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl p-6 md:p-8">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-200 transition-colors">
          <X size={20} />
        </button>

        {/* Branding header */}
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-zinc-100 via-indigo-200 to-zinc-400 bg-clip-text text-transparent tracking-tight">
            Fuel Your Engine Framework
          </h2>
          <p className="text-sm text-zinc-400 max-w-md mx-auto">
            Your credit ledger is low. Secure an engineering tier below to deploy your custom mechanics directly into the database arcade canvas.
          </p>
        </div>

        {/* Pricing Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tiers.map((tier, index) => (
            <div 
              key={index}
              className={`relative flex flex-col justify-between p-5 bg-zinc-900/60 rounded-xl border ${tier.popular ? 'border-indigo-500 bg-zinc-900/90 shadow-indigo-950/30 shadow-lg' : 'border-zinc-800'} transition-all hover:border-zinc-700`}
            >
              {tier.popular && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 text-[10px] tracking-widest font-bold uppercase rounded-full bg-indigo-600 text-indigo-50">
                  RECOMMENDED
                </span>
              )}

              <div>
                <div className="flex items-center gap-2 mb-3">
                  {tier.icon}
                  <h3 className="text-sm font-semibold font-mono text-zinc-200">{tier.name}</h3>
                </div>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-extrabold text-white tracking-tight">{tier.price}</span>
                  <span className="text-xs text-zinc-500 font-mono">/one-time</span>
                </div>
                <ul className="space-y-2.5 mb-6 text-xs text-zinc-400">
                  {tier.perks.map((perk, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ShieldCheck size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className={`w-full py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${tier.popular ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20' : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'}`}>
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}