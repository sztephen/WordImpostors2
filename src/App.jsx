// App.js
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [gameState, setGameState] = useState('menu');
  const [players, setPlayers] = useState([]);
  const [impostorCount, setImpostorCount] = useState(1);
  const [revealRoles, setRevealRoles] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [gameData, setGameData] = useState(null);
  const [showWord, setShowWord] = useState(false);

  // Word categories with Chinese translations
  const wordCategories = {
    animals: [
      { en: 'Cat', zh: '猫' },
      { en: 'Dog', zh: '狗' },
      { en: 'Elephant', zh: '大象' },
      { en: 'Lion', zh: '狮子' },
      { en: 'Tiger', zh: '老虎' },
      { en: 'Rabbit', zh: '兔子' },
      { en: 'Bear', zh: '熊' },
      { en: 'Monkey', zh: '猴子' }
    ],
    food: [
      { en: 'Pizza', zh: '披萨' },
      { en: 'Burger', zh: '汉堡' },
      { en: 'Sushi', zh: '寿司' },
      { en: 'Pasta', zh: '意大利面' },
      { en: 'Rice', zh: '米饭' },
      { en: 'Bread', zh: '面包' },
      { en: 'Salad', zh: '沙拉' },
      { en: 'Soup', zh: '汤' }
    ],
    sports: [
      { en: 'Football', zh: '足球' },
      { en: 'Basketball', zh: '篮球' },
      { en: 'Tennis', zh: '网球' },
      { en: 'Swimming', zh: '游泳' },
      { en: 'Running', zh: '跑步' },
      { en: 'Baseball', zh: '棒球' },
      { en: 'Golf', zh: '高尔夫' },
      { en: 'Boxing', zh: '拳击' }
    ],
    technology: [
      { en: 'Computer', zh: '电脑' },
      { en: 'Phone', zh: '手机' },
      { en: 'Robot', zh: '机器人' },
      { en: 'Internet', zh: '互联网' },
      { en: 'Software', zh: '软件' },
      { en: 'Camera', zh: '相机' },
      { en: 'Laptop', zh: '笔记本电脑' },
      { en: 'Tablet', zh: '平板电脑' }
    ],
    professions: [
      { en: 'Doctor', zh: '医生' },
      { en: 'Teacher', zh: '老师' },
      { en: 'Engineer', zh: '工程师' },
      { en: 'Artist', zh: '艺术家' },
      { en: 'Chef', zh: '厨师' },
      { en: 'Pilot', zh: '飞行员' },
      { en: 'Police', zh: '警察' },
      { en: 'Firefighter', zh: '消防员' }
    ],
    clothing: [
      { en: 'Shirt', zh: '衬衫' },
      { en: 'Pants', zh: '裤子' },
      { en: 'Jacket', zh: '夹克' },
      { en: 'Hat', zh: '帽子' },
      { en: 'Shoes', zh: '鞋子' },
      { en: 'Socks', zh: '袜子' },
      { en: 'Dress', zh: '连衣裙' },
      { en: 'Gloves', zh: '手套' }
    ],
    countries: [
      { en: 'USA', zh: '美国' },
      { en: 'China', zh: '中国' },
      { en: 'Japan', zh: '日本' },
      { en: 'Germany', zh: '德国' },
      { en: 'France', zh: '法国' },
      { en: 'Canada', zh: '加拿大' },
      { en: 'Brazil', zh: '巴西' },
      { en: 'India', zh: '印度' }
    ],
    household: [
      { en: 'Table', zh: '桌子' },
      { en: 'Chair', zh: '椅子' },
      { en: 'Bed', zh: '床' },
      { en: 'Lamp', zh: '灯' },
      { en: 'Sofa', zh: '沙发' },
      { en: 'Clock', zh: '时钟' },
      { en: 'Mirror', zh: '镜子' },
      { en: 'Towel', zh: '毛巾' }
    ],
    instruments: [
      { en: 'Piano', zh: '钢琴' },
      { en: 'Guitar', zh: '吉他' },
      { en: 'Violin', zh: '小提琴' },
      { en: 'Drums', zh: '鼓' },
      { en: 'Flute', zh: '长笛' },
      { en: 'Trumpet', zh: '小号' },
      { en: 'Saxophone', zh: '萨克斯管' },
      { en: 'Harp', zh: '竖琴' }
    ],
    vehicles: [
      { en: 'Car', zh: '汽车' },
      { en: 'Bus', zh: '公共汽车' },
      { en: 'Train', zh: '火车' },
      { en: 'Bicycle', zh: '自行车' },
      { en: 'Motorcycle', zh: '摩托车' },
      { en: 'Airplane', zh: '飞机' },
      { en: 'Boat', zh: '船' },
      { en: 'Subway', zh: '地铁' }
    ],
    fruits: [
      { en: 'Apple', zh: '苹果' },
      { en: 'Banana', zh: '香蕉' },
      { en: 'Orange', zh: '橙子' },
      { en: 'Grape', zh: '葡萄' },
      { en: 'Strawberry', zh: '草莓' },
      { en: 'Watermelon', zh: '西瓜' },
      { en: 'Pineapple', zh: '菠萝' },
      { en: 'Mango', zh: '芒果' }
    ],
    vegetables: [
      { en: 'Carrot', zh: '胡萝卜' },
      { en: 'Broccoli', zh: '西兰花' },
      { en: 'Tomato', zh: '西红柿' },
      { en: 'Potato', zh: '土豆' },
      { en: 'Onion', zh: '洋葱' },
      { en: 'Cabbage', zh: '卷心菜' },
      { en: 'Spinach', zh: '菠菜' },
      { en: 'Mushroom', zh: '蘑菇' }
    ],
    nature: [
      { en: 'River', zh: '河流' },
      { en: 'Mountain', zh: '山' },
      { en: 'Forest', zh: '森林' },
      { en: 'Ocean', zh: '海洋' },
      { en: 'Desert', zh: '沙漠' },
      { en: 'Volcano', zh: '火山' },
      { en: 'Rain', zh: '雨' },
      { en: 'Snow', zh: '雪' }
    ],
    movies: [
      { en: 'Action', zh: '动作片' },
      { en: 'Comedy', zh: '喜剧片' },
      { en: 'Horror', zh: '恐怖片' },
      { en: 'Sci-Fi', zh: '科幻片' },
      { en: 'Drama', zh: '剧情片' },
      { en: 'Fantasy', zh: '奇幻片' },
      { en: 'Animation', zh: '动画片' },
      { en: 'Documentary', zh: '纪录片' }
    ],
    bodyParts: [
      { en: 'Head', zh: '头' },
      { en: 'Arm', zh: '手臂' },
      { en: 'Leg', zh: '腿' },
      { en: 'Hand', zh: '手' },
      { en: 'Foot', zh: '脚' },
      { en: 'Eye', zh: '眼睛' },
      { en: 'Nose', zh: '鼻子' },
      { en: 'Mouth', zh: '嘴巴' }
    ],
    school: [
      { en: 'Book', zh: '书' },
      { en: 'Desk', zh: '桌子' },
      { en: 'Pencil', zh: '铅笔' },
      { en: 'Paper', zh: '纸' },
      { en: 'Backpack', zh: '背包' },
      { en: 'Chalkboard', zh: '黑板' },
      { en: 'Scissors', zh: '剪刀' },
      { en: 'Glue', zh: '胶水' }
    ],
    weather: [
      { en: 'Sun', zh: '太阳' },
      { en: 'Cloud', zh: '云' },
      { en: 'Wind', zh: '风' },
      { en: 'Storm', zh: '暴风雨' },
      { en: 'Fog', zh: '雾' },
      { en: 'Hail', zh: '冰雹' },
      { en: 'Tornado', zh: '龙卷风' },
      { en: 'Hurricane', zh: '飓风' }
    ],
    shapes: [
      { en: 'Circle', zh: '圆形' },
      { en: 'Square', zh: '正方形' },
      { en: 'Triangle', zh: '三角形' },
      { en: 'Star', zh: '星星' },
      { en: 'Heart', zh: '心形' },
      { en: 'Oval', zh: '椭圆形' },
      { en: 'Diamond', zh: '菱形' },
      { en: 'Rectangle', zh: '长方形' }
    ],
    colors: [
      { en: 'Red', zh: '红色' },
      { en: 'Blue', zh: '蓝色' },
      { en: 'Green', zh: '绿色' },
      { en: 'Yellow', zh: '黄色' },
      { en: 'Purple', zh: '紫色' },
      { en: 'Orange', zh: '橙色' },
      { en: 'Black', zh: '黑色' },
      { en: 'White', zh: '白色' }
    ]
  };

  const calculateMaxImpostors = (playerCount) => {
    return Math.max(1, Math.floor((playerCount + 1) / 2) - 1);
  };

  const startNewGame = () => {
    const categories = Object.keys(wordCategories);
    let innocentCategory, impostorCategory;
    
    if (difficulty === 'easy') {
      innocentCategory = categories[Math.floor(Math.random() * categories.length)];
      impostorCategory = innocentCategory;
    } else {
      innocentCategory = categories[Math.floor(Math.random() * categories.length)];
      do {
        impostorCategory = categories[Math.floor(Math.random() * categories.length)];
      } while (impostorCategory === innocentCategory);
    }

    const innocentWords = wordCategories[innocentCategory];
    const impostorWords = wordCategories[impostorCategory];
    
    const innocentWord = innocentWords[Math.floor(Math.random() * innocentWords.length)];
    const impostorWord = impostorWords[Math.floor(Math.random() * impostorWords.length)];

    // Assign roles
    const shuffledIndices = [...Array(players.length).keys()].sort(() => Math.random() - 0.5);
    const impostorIndices = shuffledIndices.slice(0, impostorCount);
    
    const playerData = players.map((player, index) => ({
      name: player,
      isImpostor: impostorIndices.includes(index),
      word: impostorIndices.includes(index) ? impostorWord : innocentWord
    }));

    setGameData({
      players: playerData,
      impostorIndices,
      innocentWord,
      impostorWord
    });
    
    setCurrentPlayerIndex(0);
    setGameState('playing');
  };

  const MainMenu = () => (
    <div className="menu-container">
      <h1 className="game-title">Word Impostors 2</h1>
      <div className="menu-buttons">
        <button className="menu-button" onClick={() => setGameState('settings')}>
          Start Game
        </button>
        <button className="menu-button" onClick={() => setGameState('howToPlay')}>
          How to Play
        </button>
      </div>
    </div>
  );

  const HowToPlay = () => (
    <div className="how-to-play">
      <h2>How to Play</h2>
      <div className="instructions">
        <p>1. Set up players (3 or more) and choose impostor count</p>
        <p>2. Each player will see a word - innocents share the same word, impostors have a different word</p>
        <p>3. Take turns describing your word without saying it directly</p>
        <p>4. Vote out who you think the impostor is</p>
        <p>5. Impostors win if they survive, innocents win if they find all impostors</p>
      </div>
      <button className="back-button" onClick={() => setGameState('menu')}>
        Back to Menu
      </button>
    </div>
  );

  const Settings = () => {
    const [playerName, setPlayerName] = useState('');
    const maxImpostors = calculateMaxImpostors(players.length);

    const addPlayer = () => {
      if (playerName.trim() && !players.includes(playerName.trim())) {
        setPlayers([...players, playerName.trim()]);
        setPlayerName('');
      }
    };

    const removePlayer = (index) => {
      const newPlayers = players.filter((_, i) => i !== index);
      setPlayers(newPlayers);
      if (impostorCount > calculateMaxImpostors(newPlayers.length)) {
        setImpostorCount(calculateMaxImpostors(newPlayers.length));
      }
    };

    return (
      <div className="settings-container">
        <h2>Game Settings</h2>
        
        <div className="setting-section">
          <h3>Players ({players.length})</h3>
          <div className="player-input">
            <input
              type="text"
              placeholder="Enter player name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
            />
            <button onClick={addPlayer}>Add</button>
          </div>
          
          <div className="player-list">
            {players.map((player, index) => (
              <div key={index} className="player-item">
                <span>{player}</span>
                <button onClick={() => removePlayer(index)}>×</button>
              </div>
            ))}
          </div>
        </div>

        {players.length >= 3 && (
          <>
            <div className="setting-section">
              <div className="impostor-reveal-container">
                <div className="impostor-count-setting">
                  <h3>Impostor Count</h3>
                  <div className="impostor-selector">
                    {[...Array(maxImpostors)].map((_, i) => (
                      <button
                        key={i + 1}
                        className={`count-button ${impostorCount === i + 1 ? 'active' : ''}`}
                        onClick={() => setImpostorCount(i + 1)}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="reveal-roles-setting">
                  <h3>Reveal Roles</h3>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={revealRoles}
                      onChange={(e) => setRevealRoles(e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
              {impostorCount > 1 && revealRoles && (
                <p className="info-text" style={{ marginTop: '0.75rem', textAlign: 'center' }}>
                  Multiple impostors will see each other
                </p>
              )}
            </div>

            <div className="setting-section">
              <h3>Difficulty</h3>
              <div className="difficulty-selector">
                <button
                  className={`difficulty-button ${difficulty === 'easy' ? 'active' : ''}`}
                  onClick={() => setDifficulty('easy')}
                >
                  Easy (Same Category)
                </button>
                <button
                  className={`difficulty-button ${difficulty === 'hard' ? 'active' : ''}`}
                  onClick={() => setDifficulty('hard')}
                >
                  Hard (Different Categories)
                </button>
              </div>
            </div>

            <button className="start-button" onClick={startNewGame}>
              Start Game
            </button>
          </>
        )}
        
        <button className="back-button" onClick={() => setGameState('menu')}>
          Back
        </button>
      </div>
    );
  };

  const GamePlay = () => {
    const currentPlayer = gameData.players[currentPlayerIndex];
    const otherImpostors = gameData.players.filter(
      (p, i) => p.isImpostor && i !== currentPlayerIndex
    );

    const handleNext = () => {
      setShowWord(false);
      if (currentPlayerIndex < players.length - 1) {
        setCurrentPlayerIndex(currentPlayerIndex + 1);
      } else {
        setGameState('finished');
      }
    };

    const handleCardTap = () => {
      setShowWord(!showWord);
    };

    return (
      <div className="gameplay-container">
        <h2 className="player-name">{currentPlayer.name}</h2>
        
        <div className="card-container">
          <div 
            className={`card ${showWord ? 'revealed' : ''}`}
            onClick={handleCardTap}
          >
            <div className="card-front">
              <p>Tap to reveal your word</p>
              <div className="slide-indicator">
                <span>👆</span>
                <p>Tap Here</p>
              </div>
            </div>
            <div className="card-content">
              {revealRoles && currentPlayer.isImpostor && (
                <div className="role-reveal impostor">
                  <p>You are an IMPOSTOR!</p>
                  {otherImpostors.length > 0 && (
                    <p className="other-impostors">
                      Other impostors: {otherImpostors.map(p => p.name).join(', ')}
                    </p>
                  )}
                </div>
              )}
              {revealRoles && !currentPlayer.isImpostor && (
                <div className="role-reveal innocent">
                  <p>You are INNOCENT</p>
                </div>
              )}
              <div className="word-display">
                <h3>{currentPlayer.word.en}</h3>
                <p className="chinese">{currentPlayer.word.zh}</p>
              </div>
            </div>
          </div>
        </div>

        {showWord && (
          <button className="remember-button" onClick={handleNext}>
            Got it! Next Player
          </button>
        )}
      </div>
    );
  };

  const GameFinished = () => {
    const [revealedPlayers, setRevealedPlayers] = useState([]);

    const toggleReveal = (index) => {
      if (revealedPlayers.includes(index)) {
        setRevealedPlayers(revealedPlayers.filter(i => i !== index));
      } else {
        setRevealedPlayers([...revealedPlayers, index]);
      }
    };

    return (
      <div className="finished-container">
        <h2>Game Finished!</h2>
        
        <div className="players-reveal">
          {gameData.players.map((player, index) => (
            <div key={index} className="player-reveal-item">
              <span className="player-name">{player.name}</span>
              <button 
                className="reveal-button"
                onClick={() => toggleReveal(index)}
              >
                {revealedPlayers.includes(index) ? 'Hide' : 'Reveal'} Role
              </button>
              {revealedPlayers.includes(index) && (
                <span className={`role ${player.isImpostor ? 'impostor' : 'innocent'}`}>
                  {player.isImpostor ? 'IMPOSTOR' : 'INNOCENT'}
                </span>
              )}
            </div>
          ))}
        </div>

        <button className="new-game-button" onClick={() => setGameState('menu')}>
          New Game
        </button>
      </div>
    );
  };

  return (
    <div className="app">
      {gameState === 'menu' && <MainMenu />}
      {gameState === 'howToPlay' && <HowToPlay />}
      {gameState === 'settings' && <Settings />}
      {gameState === 'playing' && <GamePlay />}
      {gameState === 'finished' && <GameFinished />}
    </div>
  );
};

export default App;