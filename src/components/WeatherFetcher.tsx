import React, { useState } from 'react';
import { BASE_URL } from '../config';

interface WeatherApiResponse {
  name: string;
  weather: { description: string }[];
  main: {
    temp: number;
    humidity: number;
  };
  // 必要に応じて他のプロパティも追加
}

const WeatherFetcher: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<WeatherApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      // バックエンドのエンドポイントを /weather&city=都市名 で呼び出し
      const res = await fetch(`${BASE_URL}/api/weather?city=${encodeURIComponent(city)}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      // そのまま OpenWeatherMap の JSON を返す想定
      const data: WeatherApiResponse = await res.json();
      setWeather(data);
    } catch (err: any) {
      console.error('天気取得エラー:', err);
      setError('天気情報の取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 p-6 bg-white rounded shadow-sm">
      <h2 className="text-xl font-semibold mb-4">天気取得</h2>

      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="都市名を入力"
          className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring"
        />
        <button
          onClick={fetchWeather}
          disabled={loading}
          className={`
            px-4 py-2 rounded text-white font-medium
            ${loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600'}
            transition-colors
          `}
        >
          {loading ? '取得中…' : '取得'}
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {weather && (
        <div className="space-y-2">
          <p>
            <strong>都市名：</strong>
            {weather.name}
          </p>
          <p>
            <strong>天気：</strong>
            {weather.weather[0].description}
          </p>
          <p>
            <strong>気温：</strong>
            {weather.main.temp}°C
          </p>
          <p>
            <strong>湿度：</strong>
            {weather.main.humidity}%
          </p>
        </div>
      )}
    </div>
  );
};

export default WeatherFetcher;
