import { useState, useEffect } from 'react';

export const usePerformanceMode = () => {
  const [highPerformance, setHighPerformance] = useState(true);

  useEffect(() => {
    // Détecter les appareils moins performants
    const checkPerformance = () => {
      // Vérifier la mémoire disponible
      const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
      const hardwareConcurrency = navigator.hardwareConcurrency || 1;
      
      // Si moins de 4GB RAM ou moins de 4 cœurs
      if ((memory && memory < 4) || hardwareConcurrency < 4) {
        setHighPerformance(false);
        return;
      }

      // Test de performance rapide
      const start = performance.now();
      for (let i = 0; i < 100000; i++) {
        Math.random() * Math.random();
      }
      const end = performance.now();
      
      // Si le test prend plus de 10ms, mode faible performance
      if (end - start > 10) {
        setHighPerformance(false);
      }
    };

    checkPerformance();
  }, []);

  return highPerformance;
};