import { useEffect } from 'react';

declare global {
  interface Window {
    clarity: (...args: any[]) => void;
  }
}

const CLARITY_PROJECT_ID = 'nsa7i9901n';

export const MicrosoftClarity = () => {
  useEffect(() => {
    // Check if already loaded
    if (window.clarity) return;

    // Initialize clarity
    (function(c: any, l: Document, a: string, r: string, i: string, t?: HTMLScriptElement, y?: Element) {
      c[a] = c[a] || function() {
        (c[a].q = c[a].q || []).push(arguments);
      };
      t = l.createElement(r) as HTMLScriptElement;
      t.async = true;
      t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0];
      y?.parentNode?.insertBefore(t, y);
    })(window, document, "clarity", "script", CLARITY_PROJECT_ID);

    console.info(`Microsoft Clarity initialized: ${CLARITY_PROJECT_ID}`);
  }, []);

  return null;
};
