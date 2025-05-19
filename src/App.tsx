// src/App.tsx
import React from 'react';
import HelloMessage from './components/HelloMessage';
import WeatherFetcher from './components/WeatherFetcher';

const App: React.FC = () => (
  <div className="p-8 font-sans bg-gray-50 min-h-screen">
    <h1 className="text-2xl font-bold mb-6">FastAPI × React 連携サンプル</h1>
    <HelloMessage />
    <WeatherFetcher />
  </div>
);

export default App;
