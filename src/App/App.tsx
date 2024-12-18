import React from 'react';
import VersionsEditor from '../modules/VersionsEditor/VersionsEditor';
import './App.css';

function App() {
  return (
    <div className='w-full h-screen flex flex-col items-center font-sans bg-gray-300 space-y-6'>
      <header className='App-header w-full'>
        Versions Editor Feature
      </header>
      <main className="w-full max-w-4xl px-6">
        <VersionsEditor />
      </main>
    </div>
  );
}

export default App;
