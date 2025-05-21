import React, { useState } from 'react';
import { BASE_URL } from '../config.js';

interface HelloResponse {
  message: string;
}

const HelloMessage: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMessage = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/api/hello`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data: HelloResponse = await res.json();
      setMessage(data.message);
    } catch (err) {
      console.error('API 呼び出しエラー:', err);
      setMessage('Error calling API');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={fetchMessage}
        disabled={loading}
        className={`
          px-4 py-2 text-base font-medium rounded
          ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}
          text-white transition-colors
        `}
      >
        {loading ? '呼び出し中…' : 'APIを呼ぶ'}
      </button>

      {message && (
        <div className="mt-4 p-4 bg-white border rounded shadow-sm">
          <strong className="block mb-2">バックエンドからのメッセージ：</strong>
          <pre className="whitespace-pre-wrap">{message}</pre>
        </div>
      )}
    </div>
  );
};

export default HelloMessage;
