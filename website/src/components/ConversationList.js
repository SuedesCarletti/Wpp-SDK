import React from 'react';

function ConversationList({ conversations, onSelectConversation }) {
  return (
    <div className="conversation-list">
      <h2>Conversas</h2>
      <ul>
        {conversations.map((conversation, index) => (
          <li key={index} onClick={() => onSelectConversation(conversation)}>
            <strong>{conversation.name}</strong>:
            {conversation.messages.length > 0 && (
              <>
                {conversation.messages[conversation.messages.length - 1].type === "text"
                  ? conversation.messages[conversation.messages.length - 1].message
                  : conversation.messages[conversation.messages.length - 1].type}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ConversationList;
