'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Smile, Search } from 'lucide-react';

export const EmojiPicker = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    name,
    value,
    placeholder = 'Select an emoji',
    disabled = false,
    required = false,
    showSearch = true,
    showCategories = true,
    error,
    helperText,
    style
  } = element.props;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState((value as string) || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('smileys');

  const emojiCategories = {
    smileys: {
      label: 'Smileys',
      icon: '😀',
      emojis: ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨'],
    },
    gestures: {
      label: 'Gestures',
      icon: '👋',
      emojis: ['👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝'],
    },
    hearts: {
      label: 'Hearts',
      icon: '❤️',
      emojis: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥️'],
    },
    objects: {
      label: 'Objects',
      icon: '💡',
      emojis: ['⌚', '📱', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '💽', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥', '📽️', '🎞️', '📞', '☎️', '📟', '📠', '📺', '📻', '🎙️', '🎚️', '🎛️', '⏱️', '⏲️'],
    },
    nature: {
      label: 'Nature',
      icon: '🌸',
      emojis: ['🌵', '🎄', '🌲', '🌳', '🌴', '🪵', '🌱', '🌿', '☘️', '🍀', '🎍', '🪴', '🎋', '🍃', '🍂', '🍁', '🍄', '🌾', '💐', '🌷', '🌹', '🥀', '🌺', '🌸', '🌼', '🌻', '🌞', '🌝', '🌛', '🌜'],
    },
    food: {
      label: 'Food',
      icon: '🍔',
      emojis: ['🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶️', '🫑', '🌽', '🥕', '🫒', '🧄', '🧅'],
    },
  };

  const allEmojis = Object.values(emojiCategories).flatMap((cat) => cat.emojis);

  const filteredEmojis = searchTerm
    ? allEmojis.filter((emoji) => emoji.includes(searchTerm))
    : emojiCategories[activeCategory as keyof typeof emojiCategories]?.emojis || [];

  const handleSelectEmoji = (emoji: string) => {
    setSelectedEmoji(emoji);
    setIsOpen(false);
    onAction?.({
      name: 'change',
      params: { name, value: emoji },
    });
  };

  return (
    <div className="relative w-full" style={style as React.CSSProperties}>
      {label ? (
        <label className="block text-sm font-medium mb-2">
          {label as string}
          {(required as boolean) && <span className="text-destructive ml-1">*</span>}
        </label>
      ) : null}

      <button
        type="button"
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          !selectedEmoji && 'text-muted-foreground',
          !!(error) && 'border-destructive focus:ring-destructive'
        )}
        disabled={disabled as boolean}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center gap-2">
          {selectedEmoji ? (
            <span className="text-xl">{selectedEmoji}</span>
          ) : (
            <>
              <Smile className="h-4 w-4" />
              {placeholder as string}
            </>
          )}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 z-50 w-80 bg-popover border rounded-lg shadow-lg">
          {showSearch && (
            <div className="p-2 border-b border-input">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search emojis..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-8 pl-8 pr-3 text-sm bg-background border border-input rounded focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
            </div>
          )}

          {showCategories && !searchTerm && (
            <div className="flex border-b border-input overflow-x-auto">
              {Object.entries(emojiCategories).map(([key, category]) => (
                <button
                  key={key}
                  type="button"
                  className={cn(
                    'p-2 text-lg hover:bg-muted transition-colors',
                    activeCategory === key && 'bg-muted'
                  )}
                  onClick={() => setActiveCategory(key)}
                  title={category.label}
                >
                  {category.icon}
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-8 gap-1 p-2 max-h-60 overflow-y-auto">
            {filteredEmojis.map((emoji, index) => (
              <button
                key={`${emoji}-${index}`}
                type="button"
                className="p-1 text-xl hover:bg-muted rounded transition-colors"
                onClick={() => handleSelectEmoji(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {(error || helperText) ? (
        <p className={cn('mt-1 text-sm', error ? 'text-destructive' : 'text-muted-foreground')}>
          {(error || helperText) as string}
        </p>
      ) : null}
    </div>
  );
};
