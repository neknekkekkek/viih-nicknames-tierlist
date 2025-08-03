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
  "Curly Trouble", "Viih-tamin", "Curly from Ceará", "Snack Doctor", "Cutie", "Coraçãozinho",
  "Dear", "Amore", "Faz-o-L Queen"
];

export default function TierList() {
  const [tiers, setTiers] = useState(initialTiers);
  const [unassigned, setUnassigned] = useState(allNicknames);
  const [activeNick, setActiveNick] = useState(null); // активное слово (для показа Back)

  const moveToTier = (nickname, tierName) => {
    setTiers(prev => {
      const newTiers = { ...prev };
      for (let t in newTiers) newTiers[t] = newTiers[t].filter(n => n !== nickname);
      newTiers[tierName].push(nickname);
      return newTiers;
    });
    setUnassigned(prev => prev.filter(n => n !== nickname));
    setActiveNick(null);
  };

  const moveBackToUnsorted = (nickname, fromTier) => {
    setTiers(prev => {
      const newTiers = { ...prev };
      newTiers[fromTier] = newTiers[fromTier].filter(n => n !== nickname);
      return newTiers;
    });
    setUnassigned(prev => (prev.includes(nickname) ? prev : [...prev, nickname]));
    setActiveNick(null);
  };

  const clearActive = () => setActiveNick(null);

  return (
    <div className="container" onClick={clearActive}>
      {/* 1) Заголовок */}
      <h1>❤️ Vitória Tier List</h1>

      {/* 3) Подсказка на английском */}
      <div className="card hint" onClick={e => e.stopPropagation()}>
        <p><strong>Tip:</strong> To return a word to the Unsorted list, tap the word and then press <b>Back</b>. The tier list is at the bottom of the page.</p>
      </div>

      {/* Блок с неотсортированными */}
      {unassigned.length > 0 && (
        <div className="card" onClick={e => e.stopPropagation()}>
          {/* 2) Заголовок + счётчик справа */}
          <div className="headerRow">
            <h2>Unsorted Nicknames</h2>
            <span className="countBadge">{unassigned.length}</span>
          </div>

          <div>
            {unassigned.map(nick => (
              <div key={nick} className="pill">
                {nick}
                <select
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

      {/* Тиры */}
      {Object.entries(tiers).map(([tierName, nicknames]) => (
        <div key={tierName} className="card" onClick={e => e.stopPropagation()}>
          <h2 className="sticky">{tierName}</h2>
          <div>
            {nicknames.map(nick => (
              <div
                key={nick}
                className="pill"
                role="button"
                tabIndex={0}
                onClick={e => {
                  e.stopPropagation();
                  setActiveNick(prev => (prev === nick ? null : nick));
                }}
              >
                {nick}
                {activeNick === nick && (
                  <button
                    className="action-back"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveBackToUnsorted(nick, tierName);
                    }}
                    aria-label="Back to Unsorted"
                    title="Back to Unsorted"
                  >
                    Back
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
