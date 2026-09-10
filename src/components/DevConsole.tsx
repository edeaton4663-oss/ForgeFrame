import React, { useState } from 'react';
import { Sliders, Zap, RefreshCw, Eye, EyeOff } from 'lucide-react';

interface GameConfig {
  gravity: number;
  playerSpeed: number;
  spawnRate: number;
  enemyHealth: number;
}

export default function DevConsole() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [config, setConfig] = useState<GameConfig>({
    gravity: 0.5,
    playerSpeed: 8,
    spawnRate: 1.2,
    enemyHealth: 100,
  });

  const handleSliderChange = (key: keyof GameConfig, value: number) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
    // Developer Hook: Dispatch custom event to notify target HTML5/Phaser window canvas
    const event = new CustomEvent('forgeframe-config-update', { detail: { key, value } });
    window.dispatchEvent(event);
  };

  return (
    <div className={`fixed bottom-4 right-4 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl transition-all duration-300 w-80 overflow-hidden ${isOpen ? 'max-h-[500px]' : 'max-h-12'}`}>
      {/* Header */}
      <div 
        className="flex items-center justify-between p-3 bg-zinc-900 border-b border-zinc-800 cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 text-indigo-400 font-mono text-sm tracking-wider">
          <Sliders size={16} className="animate-pulse" />
          <span>DEV_ENGINE_CONSOLE</span>
        </div>
        <button className="text-zinc-400 hover:text-white transition-colors">
          {isOpen ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      {/* Control Body */}
      {isOpen && (
        <div className="p-4 space-y-5 font-mono text-xs text-zinc-300">
          {/* Gravity Control */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-zinc-400">
              <span>ENGINE.PHYSICS.GRAVITY</span>
              <span className="text-indigo-400">{config.gravity.toFixed(2)}G</span>
            </div>
            <input 
              type="range" min="0" max="2" step="0.1"
              value={config.gravity}
              onChange={(e) => handleSliderChange('gravity', parseFloat(e.target.value))}
              className="w-full h-1 bg-zinc-800 accent-indigo-500 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Speed Control */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-zinc-400">
              <span>PLAYER.ACCEL.SPEED</span>
              <span className="text-indigo-400">{config.playerSpeed}px</span>
            </div>
            <input 
              type="range" min="1" max="20" step="1"
              value={config.playerSpeed}
              onChange={(e) => handleSliderChange('playerSpeed', parseInt(e.target.value))}
              className="w-full h-1 bg-zinc-800 accent-indigo-500 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Spawn Control */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-zinc-400">
              <span>ENTITY.SPAWN.RATE</span>
              <span className="text-indigo-400">{config.spawnRate.toFixed(1)}s</span>
            </div>
            <input 
              type="range" min="0.1" max="5" step="0.1"
              value={config.spawnRate}
              onChange={(e) => handleSliderChange('spawnRate', parseFloat(e.target.value))}
              className="w-full h-1 bg-zinc-800 accent-indigo-500 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Live Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-900">
            <button className="flex items-center justify-center gap-1.5 p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-md border border-zinc-800 transition-colors">
              <RefreshCw size={12} />
              Reset Stage
            </button>
            <button className="flex items-center justify-center gap-1.5 p-2 bg-indigo-950/40 hover:bg-indigo-900/60 text-indigo-400 rounded-md border border-indigo-900/50 transition-all">
              <Zap size={12} />
              Apply Live
            </button>
          </div>
        </div>
      )}
    </div>
  );
}