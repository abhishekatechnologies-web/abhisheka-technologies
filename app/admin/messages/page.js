'use client';

import { useState, useEffect } from 'react';

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (e) {
    return iso;
  }
}

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    try {
      setMessages(JSON.parse(localStorage.getItem('at_messages') || '[]'));
    } catch (e) {}
  }, []);

  const save = (updated) => {
    setMessages(updated);
    localStorage.setItem('at_messages', JSON.stringify(updated));
  };

  const markRead = (id) => {
    save(messages.map((m) => (m.id === id ? { ...m, read: true } : m)));
  };

  const deleteMsg = (id) => {
    save(messages.filter((m) => m.id !== id));
    if (expanded === id) setExpanded(null);
  };

  const unread = messages.filter((m) => !m.read).length;

  if (messages.length === 0) {
    return (
      <div className="px-8 py-10">
        <h1 className="font-medium mb-1" style={{ fontSize: '22px', color: '#171A20' }}>
          Messages
        </h1>
        <p className="text-sm mb-10" style={{ color: '#5C5E62' }}>
          Contact form submissions
        </p>
        <div
          className="flex items-center justify-center py-24 rounded-xl"
          style={{ border: '1px solid #EEEEEE' }}
        >
          <p className="text-sm" style={{ color: '#9E9E9E' }}>
            No messages yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 py-10">
      <h1 className="font-medium mb-1" style={{ fontSize: '22px', color: '#171A20' }}>
        Messages
      </h1>
      <p className="text-sm mb-8" style={{ color: '#5C5E62' }}>
        {messages.length} total &mdash; {unread} unread
      </p>

      <div className="space-y-3">
        {[...messages].reverse().map((msg) => (
          <div
            key={msg.id}
            className="bg-white rounded-xl overflow-hidden"
            style={{
              border: `1px solid ${!msg.read ? '#3E6AE1' : '#EEEEEE'}`,
            }}
          >
            {/* Header row */}
            <button
              className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 transition-colors hover:bg-ash"
              onClick={() => {
                setExpanded(expanded === msg.id ? null : msg.id);
                if (!msg.read) markRead(msg.id);
              }}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {!msg.read && (
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: '#3E6AE1' }}
                  />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-sm font-medium" style={{ color: '#171A20' }}>
                      {msg.name}
                    </span>
                    <span className="text-xs" style={{ color: '#9E9E9E' }}>
                      {msg.email}
                    </span>
                    {msg.budget && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: '#F4F4F4', color: '#5C5E62' }}
                      >
                        {msg.budget}
                      </span>
                    )}
                  </div>
                  <p className="text-xs truncate mt-0.5" style={{ color: '#9E9E9E' }}>
                    {msg.message}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <span className="text-xs" style={{ color: '#CCCCCC' }}>
                  {formatDate(msg.timestamp)}
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  style={{
                    transform: expanded === msg.id ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.33s',
                    color: '#9E9E9E',
                  }}
                >
                  <path d="M1 3l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>

            {/* Expanded */}
            {expanded === msg.id && (
              <div
                className="px-6 pb-5"
                style={{ borderTop: '1px solid #EEEEEE' }}
              >
                <p
                  className="text-sm leading-relaxed mt-4 mb-5"
                  style={{ color: '#393C41' }}
                >
                  {msg.message}
                </p>
                <div className="flex gap-4">
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-sm transition-opacity hover:opacity-70"
                    style={{ color: '#3E6AE1' }}
                  >
                    Reply by email →
                  </a>
                  <button
                    onClick={() => deleteMsg(msg.id)}
                    className="text-sm transition-opacity hover:opacity-70"
                    style={{ color: '#EF4444' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
