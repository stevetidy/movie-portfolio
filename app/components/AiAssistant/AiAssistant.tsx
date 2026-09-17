'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './AiAssistant.module.scss';

export default function AiAssistant() {
  const { messages, sendMessage, status } = useChat();
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const isLoading = status === 'submitted' || status === 'streaming';

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    // Pass the text directly to sendMessage
    sendMessage({ text: input });
    
    setInput('');
  };

  return (
    <div className={styles.wrapper}>
      <button 
        type="button" 
        onClick={() => setIsOpen(!isOpen)} 
        className={styles.trigger}
        aria-label="Toggle AI Movie Concierge"
      >
        ✨ AI Concierge
      </button>

      {isOpen && (
        <div className={styles.drawer}>
          <div className={styles.header}>
            <h3>Film Concierge</h3>
            <button 
              type="button" 
              onClick={() => setIsOpen(false)}
              className={styles.closeBtn}
            >
              ✕
            </button>
          </div>

          <div className={styles.messages}>
            {messages.length === 0 && (
              <p className={styles.empty}>
                Try asking: &quot;Gritty 90s revenge thriller with zero plot holes&quot;
              </p>
            )}
            {messages.map((m) => (
              <div 
                key={m.id} 
                className={`${styles.message} ${styles[`message--${m.role}`]}`}
              >
                <strong>{m.role === 'user' ? 'You' : 'AI'}:</strong>{' '}
                <div className={styles.messageBody}>
                  {m.parts?.map((part, index) => {
                    if (part.type === 'text') {
                      return (
                        <ReactMarkdown key={index}>
                          {part.text}
                        </ReactMarkdown>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            ))}
            {isLoading && <div className={styles.status}>Consulting the archives...</div>}
          </div>

          <form onSubmit={handleFormSubmit} className={styles.form}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for a vibe..."
              className={styles.input}
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !input.trim()} className={styles.submit}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
