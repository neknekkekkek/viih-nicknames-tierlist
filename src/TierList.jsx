import { useState } from 'react';

const initialTiers = {
  'S-Tier ❤️ (Absolutely love it!)': [],
  'A-Tier 😍 (Really like it)': [],
  'B-Tier 🤔 (Hmm… maybe)': [],
  'C-Tier 😐 (Too basic or boring)': [],
  'D-Tier 💀 (CRINGE)': []
};

const allNicknames = [
  "My Strawberry", "Sweet Pea", "Sunshine", "Bunny", "Princess", "Meu docinho",
  "Naughty Girl", "My Little Brat", "Tease Queen", "Hot Stuff", "Bossy Baby", "Photo Addict", "Right-Wing Cutie",
  "Boobie Queen", "Peanut Baby", "Sleepy Burrito", "Procrastination Princess", "Pillow Fighter", "Monkey Mood",
  "Curly Trouble", "Viih‑tamin", "Curly from Ceará", "Snack Doctor", "Cutie", "Coraçãozinho",
  "Dear", "Amore", "Faz-o-L Queen"
];

export default function TierList() {
  const [tiers, setTiers] = useState(initialTiers);
  const [unassigned, setUnassigned] = useState(allNicknames);

  const moveToTier = (nickname, tierName) => {
    setTiers(prev => {
      const newTiers = { ...prev };
      for (let t in newTiers) {
        newTiers[t] = newTiers[t].filter(n => n !== nickname);
      }
      newTiers[tierName].push(nickname);
      return newTiers;
    });
    setUnassigned(prev => prev.filter(n => n !== nickname));
  };

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-center">💬 Viih Nickname Tier List</h1>

      {unassigned.length > 0 && (
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-2">Unsorted Nicknames</h2>
          <div className="flex flex-wrap gap-2">
            {unassigned.map(nick => (
              <div key={nick} className="bg-gray-100 px-3 py-1 rounded-xl text-sm">
                {nick}
                <select
                  className="ml-2 text-sm border rounded"
                  onChange={e => moveToTier(nick, e.target.value)}
                  defaultValue=""
                >
                  <option value="" disabled>Sort into...</option>
                  {Object.keys(tiers).map(tier => (
                    <option key={tier} value={tier}>{tier}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      )}

      {Object.entries(tiers).map(([tierName, nicknames]) => (
        <div key={tierName} className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-2">{tierName}</h2>
          <div className="flex flex-wrap gap-2">
            {nicknames.map(nick => (
              <div key={nick} className="bg-blue-100 px-3 py-1 rounded-xl text-sm">
                {nick}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
