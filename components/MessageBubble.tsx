import React from 'react';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const SourceLink: React.FC<{uri: string, title: string}> = ({ uri, title }) => (
    <a 
        href={uri} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-sm text-brand-primary hover:text-teal-400 hover:underline transition-colors"
    >
        {title || uri}
    </a>
);

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const bubbleClasses = isUser
    ? 'bg-brand-primary text-white self-end rounded-br-none'
    : 'bg-base-200 dark:bg-dark-card text-base-content dark:text-dark-text-primary self-start rounded-bl-none';
  const wrapperClasses = isUser ? 'justify-end' : 'justify-start';

  return (
    <div className={`flex ${wrapperClasses}`}>
      <div className={`max-w-xl lg:max-w-2xl rounded-2xl p-4 shadow-md ${bubbleClasses}`}>
        {typeof message.content === 'string' ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          message.content
        )}
        {message.sources && message.sources.length > 0 && (
          <div className="mt-4 pt-3 border-t border-base-300 dark:border-dark-border">
            <h4 className="text-xs font-semibold text-gray-500 dark:text-dark-text-secondary mb-2">Sources:</h4>
            <ul className="list-disc list-inside space-y-1">
              {message.sources.map((source, index) => (
                // FIX: Check for source.web.uri as it can be optional, and provide a fallback for title.
                source.web && source.web.uri && <li key={index}><SourceLink uri={source.web.uri} title={source.web.title || ''} /></li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;