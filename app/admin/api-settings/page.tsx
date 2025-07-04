
'use client';

import { useState } from 'react';

export default function ApiSettingsPage() {
  const [liqpayPublic, setLiqpayPublic] = useState('');
  const [liqpayPrivate, setLiqpayPrivate] = useState('');
  const [novaPoshtaKey, setNovaPoshtaKey] = useState('');
  const [ukrPoshtaKey, setUkrPoshtaKey] = useState('');
  const [mistKey, setMistKey] = useState('');

  const handleSave = () => {
    const config = {
      liqpayPublic,
      liqpayPrivate,
      novaPoshtaKey,
      ukrPoshtaKey,
      mistKey,
    };
    localStorage.setItem('apiConfig', JSON.stringify(config));
    alert('API Keys saved locally!');
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h1 className="text-2xl font-bold mb-4">API Settings</h1>
      <div className="space-y-4">
        <div>
          <label>LiqPay Public Key</label>
          <input value={liqpayPublic} onChange={e => setLiqpayPublic(e.target.value)} className="w-full border p-2" />
        </div>
        <div>
          <label>LiqPay Private Key</label>
          <input value={liqpayPrivate} onChange={e => setLiqpayPrivate(e.target.value)} className="w-full border p-2" />
        </div>
        <div>
          <label>Nova Poshta API Key</label>
          <input value={novaPoshtaKey} onChange={e => setNovaPoshtaKey(e.target.value)} className="w-full border p-2" />
        </div>
        <div>
          <label>UkrPoshta API Key</label>
          <input value={ukrPoshtaKey} onChange={e => setUkrPoshtaKey(e.target.value)} className="w-full border p-2" />
        </div>
        <div>
          <label>Mist Express API Key</label>
          <input value={mistKey} onChange={e => setMistKey(e.target.value)} className="w-full border p-2" />
        </div>
        <button onClick={handleSave} className="mt-4 bg-black text-white px-4 py-2 rounded">
          Save API Keys
        </button>
      </div>
    </div>
  );
}
