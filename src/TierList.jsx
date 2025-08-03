// src/TierList.jsx
import { useState } from 'react';

const initialTiers = {
  'S-Tier ❤️ (Absolutely love it!)': [],
  'A-Tier 😍 (Really like it)': [],
  'B-Tier 🤔 (Hmm… maybe)': [],
  'C-Tier 😐 (Too basic or boring)': [],
  'D-Tier 💀 (CRINGE)': []
};

const allNicknames = [
  "Peanut Baby", "Curly Trouble", "Sunshine", "Right-Wing Cutie", "Amore", "Pillow Fighter", "Princess", "Dear", 
  "Monkey Mood", "Meu docinho", "Boobie Queen", "Coraçãozinho", "Viih-tamin", "pussy", "Hot Stuff", 
  "Curly from Ceará", "Cutie", "Sleepy Burrito", "Naughty Girl", "My Strawberry", "Tease Queen", "Snack Doctor", 
  "Bunny", "Procrastination Princess", "Sweet Pea", "Faz-o-L Queen", "My Little Brat", "Bossy Baby", "Wifey", "Bae" 
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
      {/* Заголовок */}
      <h1>❤️ Vitória Tier List</h1>

      {/* Подсказка на английском */}
      <div className="card hint" onClick={e => e.stopPropagation()}>
        <p><strong>Tip:</strong> To return a word to the Unsorted list, tap the word and then press <b>Back</b>. The tier list is at the bottom of the page.</p>
      </div>

      {/* Неотсортированные: единый заголовок + счётчик в одну строку */}
      {unassigned.length > 0 && (
        <div className="card unsorted" onClick={e => e.stopPropagation()}>
          <h2 className="oneLine">Unsorted Nicknames - {unassigned.length} {unassigned.length === 1 ? 'word' : 'words'}</h2>

          <div>
            {unassigned.map(nick => (
              <div key={nick} className="pill">
                <span className="word">{nick}</span>
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
