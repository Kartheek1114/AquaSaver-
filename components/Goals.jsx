
import React, { useState } from 'react';
import { Target, Calendar, CheckCircle2, Trophy, Plus, X } from 'lucide-react';

const MOCK_GOALS = [
  { id: 'g1', title: 'Daily Limit', target: 150, current: 85, period: 'Daily' },
  { id: 'g2', title: 'Garden Watering', target: 500, current: 480, period: 'Weekly' },
  { id: 'g3', title: 'Total Savings', target: 5000, current: 3200, period: 'Monthly' },
];

const Goals = () => {
  const [goals, setGoals] = useState(MOCK_GOALS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    target: '',
    period: 'Daily'
  });

  const handleCreateGoal = () => {
    if (newGoal.title && newGoal.target) {
      const goal = {
        id: `g${Date.now()}`,
        title: newGoal.title,
        target: parseInt(newGoal.target),
        current: 0,
        period: newGoal.period
      };
      setGoals([...goals, goal]);
      setNewGoal({ title: '', target: '', period: 'Daily' });
      setShowCreateModal(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Conservation Goals</h1>
          <p className="text-slate-500">Set targets and earn rewards for saving water</p>
        </div>
        <div className="flex items-center gap-3 bg-white/80 backdrop-blur p-2 rounded-2xl border border-white/60 shadow-sm">
          <div className="bg-amber-100 text-amber-600 p-2 rounded-lg">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Rank</div>
            <div className="text-sm font-bold text-slate-800">Top 15%</div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {goals.map((goal) => (
            <div key={goal.id} className="bg-white/80 backdrop-blur p-6 rounded-2xl border border-white/60 shadow-sm hover:shadow-xl transition-all duration-300 transform-gpu hover:-translate-y-0.5">
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#4E977A]/15 text-[#418B7E] rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{goal.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <Calendar className="w-3 h-3" />
                      {goal.period} Progress
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-slate-800">
                    {Math.round((goal.current / goal.target) * 100)}%
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Complete</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Progress: <span className="text-slate-800 font-bold">{goal.current}L</span></span>
                  <span className="text-slate-500 font-medium">Target: <span className="text-slate-800 font-bold">{goal.target}L</span></span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-700 ${(goal.current / goal.target) > 0.9 ? 'bg-[#7AB37C]' : 'bg-[#418B7E]'
                      }`}
                    style={{ width: `${(goal.current / goal.target) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}

          <button 
            onClick={() => setShowCreateModal(true)}
            className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 font-bold hover:bg-white/70 hover:shadow-sm transition-all flex items-center justify-center gap-2 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#4E977A]/60"
          >
            <Plus className="w-5 h-5" />
            Create Custom Goal
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Trophy className="w-24 h-24" />
            </div>
            <h3 className="text-xl font-bold mb-2">Aqua-Hero Badge</h3>
            <p className="text-slate-400 text-sm mb-6">You're only 50L away from your monthly efficiency badge!</p>

            <div className="bg-slate-800 p-4 rounded-2xl mb-6">
              <div className="flex justify-between mb-2 text-xs font-bold text-slate-400 tracking-wider">
                <span>NEXT REWARD</span>
                <span>75%</span>
              </div>
              <div className="w-full h-2 bg-slate-700 rounded-full">
                <div className="bg-[#4E977A] h-full w-[75%] rounded-full shadow-[0_0_10px_rgba(77,151,122,0.5)]"></div>
              </div>
            </div>

          <button className="w-full bg-gradient-to-r from-[#418B7E] to-[#4E977A] py-3 rounded-xl font-bold text-sm hover:opacity-95 transition-colors focus:outline-none focus:ring-2 focus:ring-[#4E977A]/60">
              View Achievements
            </button>
          </div>

          <div className="bg-white/80 backdrop-blur p-6 rounded-2xl border border-white/60 shadow-sm hover:shadow-xl transition-all duration-300">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Completed Tasks
            </h4>
            <div className="space-y-4">
              <div className="flex gap-3 opacity-60">
                <div className="mt-1 flex-shrink-0 w-4 h-4 rounded-full border border-slate-300 bg-green-50 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                </div>
                <p className="text-sm line-through decoration-slate-400">Reduce shower time to 5m</p>
              </div>
              <div className="flex gap-3 opacity-60">
                <div className="mt-1 flex-shrink-0 w-4 h-4 rounded-full border border-slate-300 bg-green-50 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                </div>
                <p className="text-sm line-through decoration-slate-400">Register flow meter</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Goal Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800">Create Custom Goal</h3>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-700 transition-colors hover:scale-110 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#4E977A]/60 rounded p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Goal Title</label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                  placeholder="e.g., Reduce bathroom usage"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Target Amount (Liters)</label>
                <input
                  type="number"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
                  placeholder="e.g., 200"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Period</label>
                <select
                  value={newGoal.period}
                  onChange={(e) => setNewGoal({...newGoal, period: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 py-2 px-4 border border-slate-200 rounded-lg text-slate-600 font-medium hover:bg-slate-50 transition-colors hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4E977A]/60"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateGoal}
                className="flex-1 py-2 px-4 bg-gradient-to-r from-[#418B7E] to-[#4E977A] text-white rounded-lg font-medium hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#4E977A]/60"
              >
                Create Goal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Goals;
