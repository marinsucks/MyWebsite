import React from 'react';

const DevBackgroundCSS: React.FC = () => {
  // Générer des caractères en grille pour la version CSS
  const generateGridChars = () => {
    const chars = ['{', '}', '[', ']', '<', '>', '/', '\\', '|', '-', '=', '+', '*', '&', '%', '$', '#', '@'];
    const elements = [];
    
    // Calculer la grille basée sur la taille d'écran approximative
    const cellWidth = 20; // px
    const cellHeight = 24; // px
    const estimatedCols = Math.floor(window.innerWidth / cellWidth);
    const estimatedRows = Math.floor(window.innerHeight / cellHeight);
    
    let key = 0;
    for (let row = 0; row < estimatedRows; row++) {
      for (let col = 0; col < estimatedCols; col++) {
        // Pas tous les caractères pour performance CSS
        if (Math.random() > 0.7) continue;
        
        const char = chars[Math.floor(Math.random() * chars.length)];
        const animationClass = `animate-pulse`;
        const opacities = ['opacity-2', 'opacity-3'];
        const opacityClass = opacities[Math.floor(Math.random() * opacities.length)];
        const colorClass = Math.random() > 0.7 ? 'text-accent' : 'text-primary';
        
        const leftPercent = (col * cellWidth / window.innerWidth) * 100;
        const topPercent = (row * cellHeight / window.innerHeight) * 100;
        
        elements.push(
          <span
            key={key++}
            className={`absolute ${colorClass} font-mono select-none pointer-events-none text-sm ${animationClass} ${opacityClass}`}
            style={{
              left: `${leftPercent}%`,
              top: `${topPercent}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1 + Math.random() * 2}s`
            }}
          >
            {char}
          </span>
        );
      }
    }
    return elements;
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {generateGridChars()}
    </div>
  );
};

export default DevBackgroundCSS;