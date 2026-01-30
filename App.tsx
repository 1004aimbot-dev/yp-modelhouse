
import React, { useState, useCallback, useRef } from 'react';
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
import SideMenu from './components/SideMenu';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Home);
  const [history, setHistory] = useState<Screen[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const screenSequence = [
    Screen.Home,
    Screen.Story,
    Screen.Types,
    Screen.Location,
    Screen.Benefits,
    Screen.Contact
  ];

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

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isMenuOpen || currentScreen === Screen.VirtualTour || currentScreen === Screen.Admin || currentScreen === Screen.Chat) return;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isMenuOpen || currentScreen === Screen.VirtualTour || currentScreen === Screen.Admin || currentScreen === Screen.Chat) return;
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (isMenuOpen || currentScreen === Screen.VirtualTour || currentScreen === Screen.Admin || currentScreen === Screen.Chat || !touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 70;
    const isRightSwipe = distance < -70;

    const currentIndex = screenSequence.indexOf(currentScreen);

    if (isLeftSwipe && currentIndex !== -1 && currentIndex < screenSequence.length - 1) {
      navigateTo(screenSequence[currentIndex + 1]);
    } else if (isRightSwipe) {
      if (currentIndex > 0) {
        navigateTo(screenSequence[currentIndex - 1]);
      } else {
        goBack();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const renderScreen = () => {
    const props = { navigateTo, goBack };
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
      case Screen.Chat:
        return <ChatBot {...props} />;
      default:
        return <Home navigateTo={navigateTo} toggleMenu={toggleMenu} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center bg-gray-100 font-sans overflow-x-hidden">
      <div 
        className="w-full max-w-[480px] min-h-screen bg-white shadow-2xl relative overflow-hidden flex flex-col touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {renderScreen()}
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
