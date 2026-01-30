
import React, { useState, useCallback } from 'react';
import { Screen } from './types';
import Home from './screens/Home';
import LocationScreen from './screens/Location';
import Benefits from './screens/Benefits';
import Story from './screens/Story';
import Types from './screens/Types';
import VirtualTour from './screens/VirtualTour';
import Contact from './screens/Contact';
import Admin from './screens/Admin';
import ChatBot from './screens/ChatBot';
import SalesGuide from './screens/SalesGuide';
import SideMenu from './components/SideMenu';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Home);
  const [history, setHistory] = useState<Screen[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigateTo = useCallback((screen: Screen) => {
    if (screen === currentScreen) return;
    setHistory(prev => [...prev, currentScreen]);
    setCurrentScreen(screen);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  const goBack = useCallback(() => {
    if (history.length > 0) {
      const newHistory = [...history];
      const prevScreen = newHistory.pop();
      setHistory(newHistory);
      if (prevScreen) {
        setCurrentScreen(prevScreen);
      }
    } else {
      setCurrentScreen(Screen.Home);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [history]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const renderScreen = () => {
    const props = { navigateTo, goBack, toggleMenu };
    switch (currentScreen) {
      case Screen.Home:
        return <Home navigateTo={navigateTo} toggleMenu={toggleMenu} />;
      case Screen.Location:
        return <LocationScreen {...props} />;
      case Screen.Benefits:
        return <Benefits {...props} />;
      case Screen.Story:
        return <Story {...props} />;
      case Screen.Types:
        return <Types {...props} />;
      case Screen.VirtualTour:
        return <VirtualTour {...props} />;
      case Screen.Contact:
        return <Contact {...props} />;
      case Screen.Admin:
        return <Admin {...props} />;
      case Screen.ChatBot:
        return <ChatBot {...props} />;
      case Screen.SalesGuide:
        return <SalesGuide {...props} />;
      default:
        return <Home navigateTo={navigateTo} toggleMenu={toggleMenu} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center bg-gray-100 font-sans overflow-x-hidden">
      <div 
        className="w-full max-w-[480px] min-h-screen bg-white shadow-2xl relative overflow-hidden flex flex-col"
      >
        {/* 애니메이션 컨테이너: key가 바뀔 때마다 애니메이션이 재실행됨 */}
        <main key={currentScreen} className="page-transition flex-1 flex flex-col">
          {renderScreen()}
        </main>
        
        {/* Floating AI Chatbot Button */}
        {currentScreen !== Screen.ChatBot && currentScreen !== Screen.Admin && (
          <button
            onClick={() => navigateTo(Screen.ChatBot)}
            className="fixed bottom-24 right-[calc(50%-220px)] max-[480px]:right-6 z-[80] size-14 bg-primary text-white rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center animate-bounce hover:scale-110 active:scale-95 transition-all border-2 border-white"
            aria-label="AI 컨시어지 상담"
          >
            <span className="material-symbols-outlined text-[28px] font-bold">smart_toy</span>
            <div className="absolute -top-1 -right-1 size-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
          </button>
        )}

        <SideMenu 
          isOpen={isMenuOpen} 
          onClose={() => setIsMenuOpen(false)} 
          currentScreen={currentScreen} 
          onNavigate={navigateTo} 
        />
      </div>
    </div>
  );
};

export default App;
