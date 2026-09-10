import React, { useState } from 'react';
import { Play, ShieldAlert, Sparkles } from 'lucide-react';
import { supabase, getCurrentUser, deductGameCredit } from '../lib/supabase';
import DevConsole from './DevConsole';
import UpgradeModal from './UpgradeModal';

export default function GameBuilderWorkspace() {
  // Modal visibility and loading engine states
  const [showUpgradeModal, setShowUpgradeModal] = useState<boolean>(false);
  const [isCompiling, setIsCompiling] = useState<boolean>(false);
  const [userPrompt, setUserPrompt] = useState<string>('');
  const [activeGenre, setActiveGenre] = useState<string>('Space Shooter');
  const [engineLogs, setEngineLogs] = useState<string>('Ready to compile execution framework...');

  /**
   * Core Generation & Compilation Trigger Function
   * Executes the credit verification RPC routine before calling the AI generation layer.
   */
  const handleTriggerGeneration = async () => {
    if (!userPrompt.trim()) return;

    setIsCompiling(true);
    setEngineLogs('Initiating authorization check...');

    try {
      // Fetch the active session user from Supabase Auth
      setEngineLogs('Authenticating user credentials...');
      const user = await getCurrentUser();

      setEngineLogs('Checking account credits ledger...');

      // Execute Remote Procedure Call (RPC) to evaluate and deduct credit atomic state
      await deductGameCredit(user.id);

      setEngineLogs('Credit authorized. Initializing AI neural pipeline compilation...');
      
      // Simulate game generation/compilation process
      // TODO: Replace this with actual AI generation layer (Edge Function or external API)
      await new Promise((resolve) => setTimeout(resolve, 3000));
      
      setEngineLogs(`Success! Game [${activeGenre}] deployed to sandbox environment.`);
      
    } catch (error: any) {
      console.error('Generation Pipeline Failure:', error.message);
      
      if (error.message === 'INSUFFICIENT_CREDITS') {
        setEngineLogs('Compilation aborted: 0 engine tokens remaining.');
        // Programmatically trigger the upgrade modal when credits depleted
        setShowUpgradeModal(true);
      } else if (error.message.includes('Authentication required')) {
        setEngineLogs('Error: User authentication failed. Please log in.');
      } else {
        setEngineLogs(`System Exception: ${error.message}`);
      }
    } finally {
      setIsCompiling(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      {/* Upper Navigation HUD */}
      <header className="flex items-center justify-between px-6 py-4 bg-zinc-900/40 border-b border-zinc-900 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="text-lg font-black tracking-widest text-white">FORGEFRAME // AI</span>
          <span className="px-2.5 py-0.5 text-[10px] font-mono rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
            v1.0.4-beta
          </span>
        </div>
        
        {/* Upgrade Anchor Link displays current pricing table status */}
        <button 
          onClick={() => setShowUpgradeModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors text-xs font-mono text-indigo-400"
        >
          <Sparkles size={12} />
          Upgrade $2
        </button>
      </header>

      {/* Main Grid Workspace Layout */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 overflow-hidden">
        {/* Control Interface Sidebar */}
        <section className="p-6 bg-zinc-900/20 border-r border-zinc-900 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <label className="block text-xs font-bold font-mono tracking-wider text-zinc-400 uppercase">
              Engine Directives
            </label>
            <textarea
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              placeholder="Describe a game logic framework (e.g., A side-scrolling platformer where gravity flips every 5 seconds when gathering gems)..."
              className="w-full h-32 p-3 bg-zinc-950 border border-zinc-800 rounded-xl focus:border-indigo-500 focus:outline-none text-sm text-zinc-300 transition-colors placeholder:text-zinc-600 resize-none font-mono"
            />
            
            {/* Action Execution Button */}
            <button
              onClick={handleTriggerGeneration}
              disabled={isCompiling || !userPrompt.trim()}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed font-semibold text-xs tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-950/20"
            >
              <Play size={14} fill="currentColor" />
              {isCompiling ? 'COMPILING_ASSETS...' : 'GENERATE_SANDBOX_STAGE'}
            </button>
          </div>

          {/* Engine Debug Terminal Logs */}
          <div className="bg-black/40 border border-zinc-900 p-4 rounded-xl font-mono text-[11px] text-zinc-500 min-h-[120px] flex flex-col justify-end">
            <div className="flex items-center gap-1.5 text-zinc-400 border-b border-zinc-900 pb-2 mb-2">
              <ShieldAlert size={12} />
              <span>TERMINAL_STDOUT_STREAM</span>
            </div>
            <p className="whitespace-pre-line text-indigo-300/80">{engineLogs}</p>
          </div>
        </section>

        {/* Primary Interactive Sandbox Stage Wrap */}
        <section className="col-span-2 bg-zinc-950 flex items-center justify-center p-6 relative">
          <div className="w-full h-full max-w-4xl aspect-video bg-zinc-900/40 border border-zinc-900 rounded-2xl flex flex-col items-center justify-center text-center p-8 shadow-inner">
            <span className="text-zinc-700 font-mono text-xs uppercase tracking-widest border border-zinc-900/60 px-4 py-2 rounded-xl bg-zinc-950/20">
              [ HTML5 Canvas Render Output Wrapper Container ]
            </span>
          </div>

          {/* Mount the Floating Dev Controls Panel overlay component */}
          <DevConsole />
        </section>
      </main>

      {/* Render the Monetization paywall layer conditionally if active state is flagged */}
      {showUpgradeModal && <UpgradeModal onClose={() => setShowUpgradeModal(false)} />}
    </div>
  );
}
