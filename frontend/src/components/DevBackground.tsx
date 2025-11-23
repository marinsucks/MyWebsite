import React, { useEffect, useRef } from 'react';

interface Character {
  char: string;
  x: number;
  y: number;
  opacity: number;
  fadeDirection: number;
  changeTimer: number;
}

const DevBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const charactersRef = useRef<Character[]>([]);

  // Caractères ASCII pour le style dev (sans espaces)
  const devChars = [
    // Symboles de programmation
    '{', '}', '[', ']', '(', ')', '<', '>', 
    '/', '\\', '|', '-', '_', '=', '+', '*',
    '&', '%', '$', '#', '@', '!', '?', '^',
    '~', '`', ':', ';', '.', ',', '"', "'",
    // Chiffres et lettres
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
    'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
    'y', 'z'
  ];

  const getRandomChar = () => {
    return devChars[Math.floor(Math.random() * devChars.length)];
  };

  const initializeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateCanvasSize = () => {
      // Adapter à la taille de tout l'écran pour couvrir jusqu'au footer
      canvas.width = window.innerWidth;
      canvas.height = Math.max(document.documentElement.scrollHeight, window.innerHeight);
      
      // Réinitialiser les caractères en grille
      charactersRef.current = [];
      
      // Taille de la grille (comme un terminal)
      const cellWidth = 20; // Largeur de chaque cellule
      const cellHeight = 24; // Hauteur de chaque cellule
      
      const cols = Math.floor(canvas.width / cellWidth);
      const rows = Math.floor(canvas.height / cellHeight);
      
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          // Position centrée dans chaque cellule de grille
          const x = (col * cellWidth) + (cellWidth / 2);
          const y = (row * cellHeight) + (cellHeight / 2);
          
          charactersRef.current.push({
            char: getRandomChar(),
            x: x,
            y: y,
            opacity: Math.random() * 0.3 + 0.7, // Opacité aléatoire fixe (70-100%)
            fadeDirection: Math.random() > 0.5 ? 1 : -1,
            changeTimer: Math.random() * 80 + 30 // Changement beaucoup plus fréquent (30-110 frames)
          });
        }
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    // Observer pour détecter les changements de taille du contenu
    const resizeObserver = new ResizeObserver(updateCanvasSize);
    const parent = canvas.parentElement;
    if (parent) {
      resizeObserver.observe(parent);
    }
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      resizeObserver.disconnect();
    };
  };

  const animate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Configuration du texte
    ctx.font = '14px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Animer chaque caractère
    charactersRef.current.forEach(character => {
      // Timer pour changer le caractère
      character.changeTimer--;
      if (character.changeTimer <= 0) {
        character.char = getRandomChar();
        character.opacity = Math.random() * 0.3 + 0.7; // Nouvelle opacité aléatoire lors du changement (70-100%)
        character.changeTimer = Math.random() * 80 + 30; // Changement plus fréquent
        
        // Légère variation de position dans la cellule de grille (pour un peu de vie)
        if (Math.random() > 0.95) {
          character.x += (Math.random() - 0.5) * 4; // Très petit mouvement
          character.y += (Math.random() - 0.5) * 4;
        }
      }

      // Dessiner le caractère avec couleur background-dark et son opacité fixe
      const backgroundDarkColor = getComputedStyle(document.documentElement).getPropertyValue('--background-dark').trim();
      ctx.fillStyle = `${backgroundDarkColor}${Math.floor(character.opacity * 255).toString(16).padStart(2, '0')}`;
      ctx.fillText(character.char, character.x, character.y);
    });

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const cleanup = initializeCanvas();
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      cleanup?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ 
        background: 'transparent',
        mixBlendMode: 'normal',
        zIndex: 0
      }}
    />
  );
};

export default DevBackground;