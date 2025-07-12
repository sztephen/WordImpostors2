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
      { en: 'Monkey', zh: '猴子' },
      { en: 'Horse', zh: '马' },
      { en: 'Cow', zh: '牛' },
      { en: 'Pig', zh: '猪' },
      { en: 'Chicken', zh: '鸡' },
      { en: 'Duck', zh: '鸭子' },
      { en: 'Fish', zh: '鱼' },
      { en: 'Bird', zh: '鸟' },
      { en: 'Snake', zh: '蛇' },
      { en: 'Frog', zh: '青蛙' },
      { en: 'Turtle', zh: '乌龟' },
      { en: 'Penguin', zh: '企鹅' },
      { en: 'Giraffe', zh: '长颈鹿' }
    ],
    countries: [
      { en: 'China', zh: '中国' },
      { en: 'United States', zh: '美国' },
      { en: 'Japan', zh: '日本' },
      { en: 'Germany', zh: '德国' },
      { en: 'France', zh: '法国' },
      { en: 'Italy', zh: '意大利' },
      { en: 'Spain', zh: '西班牙' },
      { en: 'Canada', zh: '加拿大' },
      { en: 'Australia', zh: '澳大利亚' },
      { en: 'Brazil', zh: '巴西' },
      { en: 'India', zh: '印度' },
      { en: 'Russia', zh: '俄罗斯' },
      { en: 'South Korea', zh: '韩国' },
      { en: 'United Kingdom', zh: '英国' },
      { en: 'Mexico', zh: '墨西哥' }
    ],
    foods: [
      { en: 'Pizza', zh: '比萨' },
      { en: 'Burger', zh: '汉堡' },
      { en: 'Sushi', zh: '寿司' },
      { en: 'Pasta', zh: '意大利面' },
      { en: 'Rice', zh: '米饭' },
      { en: 'Noodles', zh: '面条' },
      { en: 'Chicken', zh: '鸡肉' },
      { en: 'Beef', zh: '牛肉' },
      { en: 'Pork', zh: '猪肉' },
      { en: 'Fish', zh: '鱼' },
      { en: 'Bread', zh: '面包' },
      { en: 'Cheese', zh: '奶酪' },
      { en: 'Egg', zh: '鸡蛋' },
      { en: 'Soup', zh: '汤' },
      { en: 'Salad', zh: '沙拉' },
      { en: 'Cake', zh: '蛋糕' },
      { en: 'Ice cream', zh: '冰淇淋' },
      { en: 'Chocolate', zh: '巧克力' },
      { en: 'Coffee', zh: '咖啡' },
      { en: 'Tea', zh: '茶' }
    ],
    companies: [
      { en: 'Apple', zh: '苹果' },
      { en: 'Google', zh: '谷歌' },
      { en: 'Microsoft', zh: '微软' },
      { en: 'Amazon', zh: '亚马逊' },
      { en: 'Facebook', zh: '脸书' },
      { en: 'Tesla', zh: '特斯拉' },
      { en: 'Netflix', zh: '网飞' },
      { en: 'Disney', zh: '迪士尼' },
      { en: 'McDonald\'s', zh: '麦当劳' },
      { en: 'Coca-Cola', zh: '可口可乐' },
      { en: 'Nike', zh: '耐克' },
      { en: 'Samsung', zh: '三星' },
      { en: 'Toyota', zh: '丰田' },
      { en: 'Sony', zh: '索尼' },
    ],
    technology: [
      { en: 'Computer', zh: '电脑' },
      { en: 'Phone', zh: '手机' },
      { en: 'Internet', zh: '互联网' },
      { en: 'Laptop', zh: '笔记本电脑' },
      { en: 'Tablet', zh: '平板电脑' },
      { en: 'Camera', zh: '相机' },
      { en: 'Television', zh: '电视' },
      { en: 'Robot', zh: '机器人' },
      { en: 'Artificial Intelligence', zh: '人工智能' },
      { en: 'Blockchain', zh: '区块链' },
      { en: 'Virtual Reality', zh: '虚拟现实' },
      { en: 'Drone', zh: '无人机' },
      { en: 'Smart Watch', zh: '智能手表' },
      { en: 'Electric Car', zh: '电动汽车' },
      { en: 'Solar Panel', zh: '太阳能板' }
    ],
    homeItems: [
      { en: 'Sofa', zh: '沙发' },
      { en: 'Table', zh: '桌子' },
      { en: 'Chair', zh: '椅子' },
      { en: 'Bed', zh: '床' },
      { en: 'Lamp', zh: '灯' },
      { en: 'Mirror', zh: '镜子' },
      { en: 'Refrigerator', zh: '冰箱' },
      { en: 'Microwave', zh: '微波炉' },
      { en: 'Washing Machine', zh: '洗衣机' },
      { en: 'Air Conditioner', zh: '空调' }
    ],
    jobs: [
      { en: 'Doctor', zh: '医生' },
      { en: 'Teacher', zh: '老师' },
      { en: 'Engineer', zh: '工程师' },
      { en: 'Nurse', zh: '护士' },
      { en: 'Police Officer', zh: '警察' },
      { en: 'Chef', zh: '厨师' },
      { en: 'Lawyer', zh: '律师' },
      { en: 'Pilot', zh: '飞行员' },
      { en: 'Driver', zh: '司机' },
      { en: 'Artist', zh: '艺术家' }
    ],
    clothing: [
      { en: 'Shirt', zh: '衬衫' },
      { en: 'Pants', zh: '裤子' },
      { en: 'Dress', zh: '连衣裙' },
      { en: 'Shoes', zh: '鞋子' },
      { en: 'Hat', zh: '帽子' },
      { en: 'Jacket', zh: '夹克' },
      { en: 'Socks', zh: '袜子' },
      { en: 'Gloves', zh: '手套' },
      { en: 'Scarf', zh: '围巾' },
      { en: 'Sunglasses', zh: '太阳镜' }
    ],
    dangerousItems: [
      { en: 'Knife', zh: '刀' },
      { en: 'Gun', zh: '枪' },
      { en: 'Poison', zh: '毒药' },
      { en: 'Bomb', zh: '炸弹' },
      { en: 'Fire', zh: '火' },
      { en: 'Acid', zh: '酸' },
      { en: 'Lightning', zh: '闪电' },
      { en: 'Razor', zh: '剃刀' },
      { en: 'Explosive', zh: '爆炸物' },
      { en: 'Toxic Gas', zh: '毒气' }
    ],
    weather: [
      { en: 'Sunny', zh: '晴天' },
      { en: 'Rainy', zh: '雨天' },
      { en: 'Cloudy', zh: '多云' },
      { en: 'Snowy', zh: '雪天' },
      { en: 'Windy', zh: '有风' },
      { en: 'Stormy', zh: '暴风雨' },
      { en: 'Foggy', zh: '有雾' },
      { en: 'Hot', zh: '炎热' },
      { en: 'Cold', zh: '寒冷' },
      { en: 'Hurricane', zh: '飓风' }
    ],
    vehicles: [
      { en: 'Car', zh: '汽车' },
      { en: 'Bus', zh: '公交车' },
      { en: 'Train', zh: '火车' },
      { en: 'Airplane', zh: '飞机' },
      { en: 'Bicycle', zh: '自行车' },
      { en: 'Motorcycle', zh: '摩托车' },
      { en: 'Ship', zh: '船' },
      { en: 'Truck', zh: '卡车' },
      { en: 'Submarine', zh: '潜艇' },
      { en: 'Helicopter', zh: '直升机' }
    ],
    sports: [
      { en: 'Soccer', zh: '足球' },
      { en: 'Basketball', zh: '篮球' },
      { en: 'Tennis', zh: '网球' },
      { en: 'Swimming', zh: '游泳' },
      { en: 'Running', zh: '跑步' },
      { en: 'Boxing', zh: '拳击' },
      { en: 'Golf', zh: '高尔夫' },
      { en: 'Baseball', zh: '棒球' },
      { en: 'Volleyball', zh: '排球' },
      { en: 'Skiing', zh: '滑雪' }
    ],
    apps: [
      { en: 'WhatsApp', zh: '微信' },
      { en: 'Instagram', zh: '照片墙' },
      { en: 'TikTok', zh: '抖音' },
      { en: 'YouTube', zh: '优酷' },
      { en: 'Spotify', zh: '声田' },
      { en: 'Uber', zh: '优步' },
      { en: 'Netflix', zh: '网飞' },
      { en: 'Zoom', zh: '缩放' },
      { en: 'Gmail', zh: '谷歌邮箱' },
      { en: 'Maps', zh: '地图' }
    ],
    fruitsVeggies: [
      { en: 'Apple', zh: '苹果' },
      { en: 'Banana', zh: '香蕉' },
      { en: 'Orange', zh: '橙子' },
      { en: 'Grape', zh: '葡萄' },
      { en: 'Strawberry', zh: '草莓' },
      { en: 'Carrot', zh: '胡萝卜' },
      { en: 'Tomato', zh: '西红柿' },
      { en: 'Potato', zh: '土豆' },
      { en: 'Onion', zh: '洋葱' },
      { en: 'Broccoli', zh: '西兰花' }
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