import React, { useState } from 'react';
import { AppScreen, Lesson } from './types';
import { LESSONS, SONGS } from './constants';
import { Mascot } from './components/Mascot';
import { useGeminiLive } from './hooks/useGeminiLive';
import { ParentGate } from './components/ParentGate';

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.HOME);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showParentGate, setShowParentGate] = useState(false);
  
  // Standard API Key retrieval
  const apiKey = process.env.API_KEY as string;
  
  // AI Hook
  const { connect, disconnect, isConnected, isSpeaking, error } = useGeminiLive({ apiKey });

  const handleScreenChange = (screen: AppScreen) => {
    if (screen === AppScreen.PARENTS) {
      setShowParentGate(true);
    } else {
      setCurrentScreen(screen);
      // Disconnect AI if leaving buddy screen
      if (currentScreen === AppScreen.AI_BUDDY && screen !== AppScreen.AI_BUDDY) {
        disconnect();
      }
    }
  };

  const renderHome = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8 bg-gradient-to-b from-blue-50 to-white">
        <header className="w-full flex justify-between items-center p-4 absolute top-0">
             <div className="text-2xl font-extrabold text-kid-blue tracking-wider">LittleLinguist</div>
             <button onClick={() => handleScreenChange(AppScreen.PARENTS)} className="text-gray-400 hover:text-gray-600">
                <span className="text-3xl">⚙️</span>
             </button>
        </header>

        <div className="mt-12 mb-4 animate-wiggle">
            <Mascot state="idle" size="lg" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center mb-8">
            Bonjour ! On joue ?
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl px-4">
            <button 
                onClick={() => handleScreenChange(AppScreen.LESSONS)}
                className="bg-kid-yellow border-b-8 border-yellow-500 rounded-3xl p-6 flex items-center justify-center gap-4 transform active:scale-95 transition-all shadow-xl"
            >
                <span className="text-5xl">📚</span>
                <span className="text-3xl font-bold text-white drop-shadow-md">Apprendre les Mots</span>
            </button>

            <button 
                onClick={() => handleScreenChange(AppScreen.AI_BUDDY)}
                className="bg-kid-pink border-b-8 border-pink-600 rounded-3xl p-6 flex items-center justify-center gap-4 transform active:scale-95 transition-all shadow-xl"
            >
                <span className="text-5xl">🎙️</span>
                <span className="text-3xl font-bold text-white drop-shadow-md">Parler avec Bumble</span>
            </button>

            <button 
                onClick={() => handleScreenChange(AppScreen.SONGS)}
                className="bg-kid-blue border-b-8 border-blue-500 rounded-3xl p-6 flex items-center justify-center gap-4 transform active:scale-95 transition-all shadow-xl col-span-1 md:col-span-2"
            >
                <span className="text-5xl">🎵</span>
                <span className="text-3xl font-bold text-white drop-shadow-md">Chanter</span>
            </button>
        </div>
    </div>
  );

  const renderLessons = () => (
    <div className="min-h-screen bg-white p-4">
        <button onClick={() => setCurrentScreen(AppScreen.HOME)} className="mb-6 bg-gray-100 p-3 rounded-full text-2xl shadow-sm">
            🏠 Retour
        </button>
        
        <h2 className="text-3xl font-bold text-center mb-8 text-kid-purple">Choisis un thème !</h2>
        
        {!selectedLesson ? (
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                {LESSONS.map(lesson => (
                    <button 
                        key={lesson.id}
                        onClick={() => setSelectedLesson(lesson)}
                        className={`${lesson.color} aspect-square rounded-3xl flex flex-col items-center justify-center gap-2 shadow-lg hover:opacity-90 transition-transform active:scale-95`}
                    >
                        <span className="text-6xl">{lesson.icon}</span>
                        <span className="text-2xl font-bold text-white">{lesson.title}</span>
                    </button>
                ))}
            </div>
        ) : (
            <div className="max-w-md mx-auto">
                <button onClick={() => setSelectedLesson(null)} className="mb-4 text-gray-500 font-bold">
                    ⬅ Autre thème
                </button>
                <div className={`${selectedLesson.color} p-6 rounded-t-3xl text-white text-center`}>
                    <h3 className="text-4xl font-bold">{selectedLesson.title} {selectedLesson.icon}</h3>
                </div>
                <div className="bg-white border-2 border-gray-100 shadow-xl rounded-b-3xl p-4 space-y-4">
                    {selectedLesson.vocab.map((item, idx) => (
                         <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200">
                            <span className="text-5xl">{item.emoji}</span>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-gray-800">{item.word}</div>
                                <div className="text-lg text-gray-400 italic">{item.translation}</div>
                            </div>
                            <button 
                              className="w-12 h-12 rounded-full bg-kid-blue text-white flex items-center justify-center shadow-md active:bg-blue-400"
                              onClick={() => {
                                // TTS for vocabulary (Use generic English voice)
                                const u = new SpeechSynthesisUtterance(item.word);
                                u.lang = 'en-US'; 
                                window.speechSynthesis.speak(u);
                              }}
                            >
                                🔊
                            </button>
                         </div>
                    ))}
                </div>
            </div>
        )}
    </div>
  );

  const renderSongs = () => (
      <div className="min-h-screen bg-indigo-50 p-4">
        <button onClick={() => setCurrentScreen(AppScreen.HOME)} className="mb-6 bg-white p-3 rounded-full text-2xl shadow-sm">
            🏠 Retour
        </button>
        <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">On Chante ! 🎤</h2>
        <div className="space-y-4 max-w-md mx-auto">
            {SONGS.map(song => (
                <div key={song.id} className={`${song.color} p-6 rounded-3xl flex items-center justify-between text-white shadow-lg`}>
                    <div className="flex items-center gap-4">
                        <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center">🎵</div>
                        <div>
                            <div className="text-xl font-bold">{song.title}</div>
                            <div className="text-sm opacity-80">{song.duration}</div>
                        </div>
                    </div>
                    <button className="bg-white text-gray-800 rounded-full w-12 h-12 text-xl flex items-center justify-center shadow-md">
                        ▶
                    </button>
                </div>
            ))}
        </div>
      </div>
  );

  const renderAIBuddy = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col p-4">
         <button 
            onClick={() => {
                disconnect();
                setCurrentScreen(AppScreen.HOME);
            }} 
            className="self-start mb-4 bg-white p-3 rounded-full text-2xl shadow-sm z-10"
        >
            ❌ Stop
        </button>

        <div className="flex-1 flex flex-col items-center justify-center space-y-8 relative">
            
            {/* Mascot Area */}
            <div className="relative">
                <Mascot state={isSpeaking ? 'speaking' : isConnected ? 'listening' : 'idle'} size="lg" />
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-100 text-red-600 p-4 rounded-xl text-center max-w-xs mx-auto border border-red-200 shadow-md z-50">
                    <p className="font-bold">Oups !</p>
                    <p className="text-sm">{error}</p>
                </div>
            )}

            {/* Controls */}
            {!isConnected ? (
                <div className="text-center space-y-4">
                    <p className="text-gray-500 text-xl font-medium">Dis "Bonjour" à Bumble !</p>
                    <button 
                        onClick={connect}
                        className="bg-kid-green border-b-8 border-green-600 text-white text-2xl font-bold py-6 px-12 rounded-full shadow-2xl hover:bg-green-400 active:border-b-0 active:translate-y-2 transition-all"
                    >
                        Parler 📞
                    </button>
                </div>
            ) : (
                <div className="text-center w-full max-w-xs bg-white/50 backdrop-blur-sm p-6 rounded-3xl border-2 border-green-200">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="animate-pulse w-3 h-3 bg-red-500 rounded-full"></span>
                        <span className="text-green-800 font-bold uppercase tracking-widest text-sm">En Direct</span>
                    </div>
                    <p className="text-gray-600 font-medium">Bumble écoute...</p>
                    <p className="text-gray-400 text-sm mt-2">(Parle naturellement)</p>
                </div>
            )}
        </div>
    </div>
  );

  const renderParents = () => (
      <div className="min-h-screen bg-gray-100 p-6">
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 shadow-xl">
            <div className="flex justify-between items-center mb-8 border-b pb-4">
                <h2 className="text-3xl font-bold text-gray-800">Espace Parents</h2>
                <button onClick={() => setCurrentScreen(AppScreen.HOME)} className="text-blue-500 font-bold text-lg">
                    Fermer
                </button>
            </div>
            
            <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                    <h3 className="text-xl font-bold text-blue-800 mb-2">Suivi des Progrès</h3>
                    <div className="flex gap-4 text-center">
                        <div className="flex-1 bg-white p-4 rounded-xl shadow-sm">
                            <div className="text-3xl font-bold text-kid-blue">12</div>
                            <div className="text-gray-500 text-sm">Mots Appris</div>
                        </div>
                        <div className="flex-1 bg-white p-4 rounded-xl shadow-sm">
                            <div className="text-3xl font-bold text-kid-green">45m</div>
                            <div className="text-gray-500 text-sm">Temps de Jeu</div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-700">Paramètres</h3>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <span>Musique de fond</span>
                        <div className="w-12 h-6 bg-green-400 rounded-full relative cursor-pointer">
                            <div className="w-6 h-6 bg-white rounded-full absolute right-0 shadow-md"></div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <span>Limite Quotidienne (15 min)</span>
                        <div className="w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer">
                            <div className="w-6 h-6 bg-white rounded-full absolute left-0 shadow-md"></div>
                        </div>
                    </div>
                </div>
                
                 <div className="p-4 bg-yellow-50 rounded-xl text-yellow-800 text-sm border border-yellow-200">
                    <strong>Note :</strong> Cette application utilise l'API Gemini Live de Google.
                </div>
            </div>
          </div>
      </div>
  );

  return (
    <div className="font-sans antialiased text-gray-800 selection:bg-kid-yellow selection:text-black">
      {currentScreen === AppScreen.HOME && renderHome()}
      {currentScreen === AppScreen.LESSONS && renderLessons()}
      {currentScreen === AppScreen.SONGS && renderSongs()}
      {currentScreen === AppScreen.AI_BUDDY && renderAIBuddy()}
      {currentScreen === AppScreen.PARENTS && renderParents()}
      
      {showParentGate && (
          <ParentGate 
            onUnlock={() => {
                setShowParentGate(false);
                setCurrentScreen(AppScreen.PARENTS);
            }}
            onCancel={() => setShowParentGate(false)}
          />
      )}
    </div>
  );
}

export default App;