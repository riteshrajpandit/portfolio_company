import { useEffect } from 'react';

export const useHideChatbot = () => {
  useEffect(() => {
    // Create a style element to hide the chatbot widget
    const style = document.createElement('style');
    style.id = 'hide-amigaa-chatbot';
    style.innerHTML = `
      #amigaa-chat-widget, .amigaa-chat-widget {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      // Remove the style element when unmounting
      const existingStyle = document.getElementById('hide-amigaa-chatbot');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);
};
