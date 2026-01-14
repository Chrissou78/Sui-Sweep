import { useState, useCallback } from 'react';
import type { TokenItem, Classification } from '../types';
import { classifyToken } from '../lib/tokenClassifier';

export function useTokenClassification() {
  const [classifications, setClassifications] = useState<Record<string, Classification>>({});
  const [isClassifying, setIsClassifying] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  const classifyAll = useCallback(async (tokens: TokenItem[]) => {
    if (tokens.length === 0) return;
    
    setIsClassifying(true);
    setProgress({ current: 0, total: tokens.length });
    
    const results: Record<string, Classification> = {};

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      
      // Classify token (synchronous for now, could be async for API calls)
      const classification = classifyToken(token);
      results[token.coinType] = classification;
      
      setProgress({ current: i + 1, total: tokens.length });
      
      // Small delay for UI feedback
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    setClassifications(results);
    setIsClassifying(false);
  }, []);

  const classifySingle = useCallback((token: TokenItem) => {
    const classification = classifyToken(token);
    setClassifications(prev => ({
      ...prev,
      [token.coinType]: classification,
    }));
    return classification;
  }, []);

  return {
    classifications,
    isClassifying,
    progress,
    classifyAll,
    classifySingle,
  };
}
