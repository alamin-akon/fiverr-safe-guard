import { RESTRICTED_KEYWORDS } from '../constants';

export interface SafeguardResult {
  safeMessage: string;
  changesMade: string[];
}

export const applySafeguard = (text: string): SafeguardResult => {
  if (!text) return { safeMessage: '', changesMade: [] };

  let processed = text;
  const changesDetected: Set<string> = new Set();

  // 1. Handle specific symbols
  // Replace @ with (at)
  if (processed.includes('@')) {
    processed = processed.replace(/@/g, '**(at)**');
    changesDetected.add('@ Symbol');
  }
  // Replace $ with do-llar or similar
  if (processed.includes('$')) {
    processed = processed.replace(/\$/g, '**do-llar**');
    changesDetected.add('$ Symbol');
  }

  // ---------------------------------------------------------
  // ❌ এই অংশটি বাদ দেওয়া হয়েছে যাতে নাম্বারে হাইফেন না আসে
  // ---------------------------------------------------------
  /*
  processed = processed.replace(/\d+/g, (match) => {
    changesDetected.add(`Number Pattern: ${match}`);
    return `**${match.split('').join('-')}**`;
  });
  */
  // ---------------------------------------------------------


  // 2. Handle Restricted Keywords & Phrases
  // Sort keywords by length descending to match phrases like "5 star" before "star"
  const sortedKeywords = [...RESTRICTED_KEYWORDS].sort((a, b) => b.length - a.length);

  sortedKeywords.forEach(keyword => {
    // Escape keyword for regex if it contains spaces
    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escapedKeyword}\\b`, 'gi');
    
    processed = processed.replace(regex, (match) => {
      // Avoid double processing if already wrapped in markers
      if (match.length <= 1) return match;
      
      changesDetected.add(match);
      
      // Obfuscate with hyphen
      // If it has a space (phrase), obfuscate the main parts
      if (match.includes(' ')) {
        return `**${match.split(' ').map(part => {
          if (part.length <= 2) return part;
          const mid = Math.floor(part.length / 2);
          return part.slice(0, mid) + '-' + part.slice(mid);
        }).join(' ')}**`;
      }

      // Single word obfuscation
      const mid = Math.floor(match.length / 2);
      const obfuscated = match.slice(0, mid) + '-' + match.slice(mid);
      return `**${obfuscated}**`;
    });
  });

  // 3. Handle email-like patterns specifically if missed
  processed = processed.replace(/([a-zA-Z0-9._-]+)@([a-zA-Z0-9._-]+)\.([a-zA-Z]{2,5})/gi, (match, p1, p2, p3) => {
    changesDetected.add(`Email Pattern: ${match}`);
    return `**${p1.split('').join('-')}(at)${p2.split('').join('-')}(dot)${p3}**`;
  });

  return {
    safeMessage: processed,
    changesMade: Array.from(changesDetected)
  };
};