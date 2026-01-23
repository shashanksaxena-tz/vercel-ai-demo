export interface ComponentSchema {
  category: string;
  keywords: string[];
  description: string;
  props: Record<string, string>;
}

export const chatSchemas: Record<string, ComponentSchema> = {
  Chat: {
    category: "chat",
    keywords: ["chat", "messenger", "conversation", "messaging", "im"],
    description: "Main chat container component that wraps the entire chat interface",
    props: {
      id: "string - Unique identifier for the chat",
      participants: "Participant[] - Array of chat participants",
      messages: "Message[] - Array of messages in the chat",
      onSendMessage: "(message: Message) => void - Callback when a message is sent",
      onTyping: "(isTyping: boolean) => void - Callback when typing status changes",
      theme: "'light' | 'dark' | 'auto' - Chat theme",
      disabled: "boolean - Whether the chat is disabled",
      loading: "boolean - Whether the chat is loading",
    },
  },

  ChatWindow: {
    category: "chat",
    keywords: ["window", "container", "frame", "panel"],
    description: "Windowed container for chat with header, body, and footer sections",
    props: {
      title: "string - Window title",
      isOpen: "boolean - Whether the window is open",
      onClose: "() => void - Callback when window is closed",
      onMinimize: "() => void - Callback when window is minimized",
      position: "'bottom-right' | 'bottom-left' | 'center' - Window position",
      width: "number | string - Window width",
      height: "number | string - Window height",
      draggable: "boolean - Whether window is draggable",
      resizable: "boolean - Whether window is resizable",
    },
  },

  ChatHeader: {
    category: "chat",
    keywords: ["header", "title", "top", "bar"],
    description: "Header section of the chat displaying title, status, and actions",
    props: {
      title: "string - Chat title or participant name",
      subtitle: "string - Subtitle or status text",
      avatar: "string - Avatar URL",
      status: "'online' | 'offline' | 'away' | 'busy' - Online status",
      actions: "ReactNode - Action buttons or menu",
      onBack: "() => void - Callback for back navigation",
      showBackButton: "boolean - Whether to show back button",
    },
  },

  ChatBody: {
    category: "chat",
    keywords: ["body", "content", "messages", "area"],
    description: "Scrollable body section containing chat messages",
    props: {
      messages: "Message[] - Array of messages to display",
      loading: "boolean - Whether messages are loading",
      loadingMore: "boolean - Whether loading more messages",
      onLoadMore: "() => void - Callback to load more messages",
      hasMore: "boolean - Whether there are more messages to load",
      emptyState: "ReactNode - Content to show when no messages",
      scrollBehavior: "'smooth' | 'auto' - Scroll behavior",
    },
  },

  ChatFooter: {
    category: "chat",
    keywords: ["footer", "bottom", "input", "compose"],
    description: "Footer section of the chat containing input and action buttons",
    props: {
      onSend: "(message: string) => void - Callback when message is sent",
      placeholder: "string - Input placeholder text",
      disabled: "boolean - Whether input is disabled",
      showAttachButton: "boolean - Whether to show attachment button",
      showEmojiButton: "boolean - Whether to show emoji button",
      showVoiceButton: "boolean - Whether to show voice note button",
      maxLength: "number - Maximum message length",
    },
  },

  ChatInput: {
    category: "chat",
    keywords: ["input", "text", "compose", "message", "send"],
    description: "Text input field for composing chat messages",
    props: {
      value: "string - Current input value",
      onChange: "(value: string) => void - Callback when value changes",
      onSend: "() => void - Callback when message is sent",
      onKeyDown: "(e: KeyboardEvent) => void - Keyboard event handler",
      placeholder: "string - Placeholder text",
      disabled: "boolean - Whether input is disabled",
      autoFocus: "boolean - Whether to auto focus",
      multiline: "boolean - Whether to allow multiple lines",
      maxRows: "number - Maximum number of rows for multiline",
      showSendButton: "boolean - Whether to show send button",
    },
  },

  ChatMessage: {
    category: "chat",
    keywords: ["message", "text", "bubble", "content"],
    description: "Individual chat message component with sender info and content",
    props: {
      id: "string - Message ID",
      content: "string | ReactNode - Message content",
      sender: "User - Message sender",
      timestamp: "Date | string - Message timestamp",
      status: "'sending' | 'sent' | 'delivered' | 'read' | 'failed' - Delivery status",
      isOwn: "boolean - Whether message is from current user",
      reactions: "Reaction[] - Message reactions",
      attachments: "Attachment[] - Message attachments",
      replyTo: "Message - Message being replied to",
      onReply: "() => void - Callback to reply",
      onReact: "(emoji: string) => void - Callback to add reaction",
      onDelete: "() => void - Callback to delete message",
      onEdit: "() => void - Callback to edit message",
    },
  },

  ChatBubble: {
    category: "chat",
    keywords: ["bubble", "balloon", "message", "container"],
    description: "Styled bubble container for message content",
    props: {
      variant: "'primary' | 'secondary' | 'outline' - Bubble style variant",
      position: "'left' | 'right' - Bubble position",
      showTail: "boolean - Whether to show bubble tail",
      color: "string - Background color",
      maxWidth: "string | number - Maximum bubble width",
      children: "ReactNode - Bubble content",
    },
  },

  ChatAvatar: {
    category: "chat",
    keywords: ["avatar", "profile", "picture", "image", "user"],
    description: "Avatar component for displaying user profile pictures in chat",
    props: {
      src: "string - Image source URL",
      alt: "string - Alt text",
      name: "string - User name for fallback initials",
      size: "'xs' | 'sm' | 'md' | 'lg' | 'xl' - Avatar size",
      status: "'online' | 'offline' | 'away' | 'busy' - Online status indicator",
      showStatus: "boolean - Whether to show status indicator",
      shape: "'circle' | 'square' - Avatar shape",
    },
  },

  ChatTimestamp: {
    category: "chat",
    keywords: ["timestamp", "time", "date", "when"],
    description: "Timestamp display for messages showing when they were sent",
    props: {
      date: "Date | string | number - Timestamp value",
      format: "'relative' | 'absolute' | 'time' | 'date' - Display format",
      locale: "string - Locale for formatting",
      showTooltip: "boolean - Whether to show full date on hover",
      className: "string - Additional CSS classes",
    },
  },

  ChatTyping: {
    category: "chat",
    keywords: ["typing", "indicator", "dots", "animation"],
    description: "Typing indicator showing when someone is composing a message",
    props: {
      users: "User[] - Users currently typing",
      showNames: "boolean - Whether to show user names",
      animation: "'dots' | 'pulse' | 'wave' - Animation style",
      text: "string - Custom typing text",
    },
  },

  ChatStatus: {
    category: "chat",
    keywords: ["status", "connection", "state", "indicator"],
    description: "Chat connection status indicator",
    props: {
      status: "'connected' | 'connecting' | 'disconnected' | 'error' - Connection status",
      message: "string - Status message",
      showReconnect: "boolean - Whether to show reconnect button",
      onReconnect: "() => void - Callback to reconnect",
    },
  },

  MessageList: {
    category: "chat",
    keywords: ["messages", "list", "conversation", "history"],
    description: "Virtualized list of messages with scroll handling",
    props: {
      messages: "Message[] - Array of messages",
      renderMessage: "(message: Message) => ReactNode - Custom message renderer",
      groupByDate: "boolean - Whether to group messages by date",
      showDateSeparators: "boolean - Whether to show date separators",
      onScroll: "(e: ScrollEvent) => void - Scroll event handler",
      scrollToBottom: "boolean - Whether to auto-scroll to bottom",
      virtualized: "boolean - Whether to use virtualization",
    },
  },

  MessageItem: {
    category: "chat",
    keywords: ["message", "item", "single", "entry"],
    description: "Single message item in a message list",
    props: {
      message: "Message - Message data",
      isFirst: "boolean - Whether first in group",
      isLast: "boolean - Whether last in group",
      showAvatar: "boolean - Whether to show avatar",
      showTimestamp: "boolean - Whether to show timestamp",
      showStatus: "boolean - Whether to show delivery status",
      onContextMenu: "(e: MouseEvent) => void - Context menu handler",
    },
  },

  MessageGroup: {
    category: "chat",
    keywords: ["group", "cluster", "batch", "consecutive"],
    description: "Group of consecutive messages from the same sender",
    props: {
      messages: "Message[] - Messages in the group",
      sender: "User - Group sender",
      showAvatar: "boolean - Whether to show sender avatar",
      showName: "boolean - Whether to show sender name",
      timestamp: "Date - Group timestamp",
      position: "'left' | 'right' - Group position",
    },
  },

  ThreadView: {
    category: "chat",
    keywords: ["thread", "replies", "conversation", "nested"],
    description: "Thread view showing a parent message and its replies",
    props: {
      parentMessage: "Message - Parent message",
      replies: "Message[] - Reply messages",
      onReply: "(content: string) => void - Callback to add reply",
      onClose: "() => void - Callback to close thread",
      title: "string - Thread title",
      participantCount: "number - Number of participants",
    },
  },

  Thread: {
    category: "chat",
    keywords: ["thread", "conversation", "topic", "discussion"],
    description: "A threaded conversation component",
    props: {
      id: "string - Thread ID",
      title: "string - Thread title",
      messages: "Message[] - Messages in thread",
      participants: "User[] - Thread participants",
      unreadCount: "number - Number of unread messages",
      lastActivity: "Date - Last activity timestamp",
      isPinned: "boolean - Whether thread is pinned",
      isMuted: "boolean - Whether thread is muted",
    },
  },

  Reply: {
    category: "chat",
    keywords: ["reply", "response", "quote", "reference"],
    description: "Reply component showing quoted message being replied to",
    props: {
      originalMessage: "Message - Original message being replied to",
      content: "string - Reply content",
      sender: "User - Reply sender",
      onClickOriginal: "() => void - Callback to scroll to original",
      showPreview: "boolean - Whether to show original preview",
      maxPreviewLength: "number - Max length of preview text",
    },
  },

  Reaction: {
    category: "chat",
    keywords: ["reaction", "emoji", "like", "response"],
    description: "Single reaction on a message",
    props: {
      emoji: "string - Emoji character",
      count: "number - Number of reactions",
      users: "User[] - Users who reacted",
      isSelected: "boolean - Whether current user reacted",
      onClick: "() => void - Callback when clicked",
      showTooltip: "boolean - Whether to show users tooltip",
    },
  },

  ReactionPicker: {
    category: "chat",
    keywords: ["reaction", "picker", "emoji", "selector"],
    description: "Picker component for selecting message reactions",
    props: {
      onSelect: "(emoji: string) => void - Callback when emoji selected",
      recentEmojis: "string[] - Recently used emojis",
      customEmojis: "Emoji[] - Custom emojis",
      quickReactions: "string[] - Quick reaction emojis",
      isOpen: "boolean - Whether picker is open",
      onClose: "() => void - Callback when picker closes",
    },
  },

  Emoji: {
    category: "chat",
    keywords: ["emoji", "emoticon", "icon", "symbol"],
    description: "Single emoji display component",
    props: {
      emoji: "string - Emoji character or code",
      size: "'xs' | 'sm' | 'md' | 'lg' | 'xl' - Emoji size",
      native: "boolean - Whether to use native emoji",
      fallback: "string - Fallback text",
      title: "string - Tooltip title",
    },
  },

  EmojiSelector: {
    category: "chat",
    keywords: ["emoji", "selector", "picker", "keyboard"],
    description: "Full emoji selector with categories and search",
    props: {
      onSelect: "(emoji: string) => void - Callback when emoji selected",
      categories: "string[] - Emoji categories to show",
      recentCount: "number - Number of recent emojis to show",
      searchPlaceholder: "string - Search placeholder text",
      skinTone: "1 | 2 | 3 | 4 | 5 | 6 - Default skin tone",
      showSkinTones: "boolean - Whether to show skin tone selector",
      perLine: "number - Emojis per line",
    },
  },

  Attachment: {
    category: "chat",
    keywords: ["attachment", "file", "upload", "media"],
    description: "Attachment component for files, images, and media",
    props: {
      id: "string - Attachment ID",
      type: "'file' | 'image' | 'video' | 'audio' | 'document' - Attachment type",
      name: "string - File name",
      url: "string - File URL",
      size: "number - File size in bytes",
      mimeType: "string - MIME type",
      thumbnail: "string - Thumbnail URL",
      onDownload: "() => void - Download callback",
      onPreview: "() => void - Preview callback",
      onRemove: "() => void - Remove callback",
      uploadProgress: "number - Upload progress percentage",
    },
  },

  AttachmentPreview: {
    category: "chat",
    keywords: ["preview", "attachment", "viewer", "modal"],
    description: "Preview modal for viewing attachments",
    props: {
      attachment: "Attachment - Attachment to preview",
      isOpen: "boolean - Whether preview is open",
      onClose: "() => void - Close callback",
      onDownload: "() => void - Download callback",
      onShare: "() => void - Share callback",
      showNavigation: "boolean - Whether to show prev/next navigation",
      onNext: "() => void - Next attachment callback",
      onPrevious: "() => void - Previous attachment callback",
    },
  },

  FileMessage: {
    category: "chat",
    keywords: ["file", "document", "attachment", "download"],
    description: "Message component for file attachments",
    props: {
      fileName: "string - File name",
      fileSize: "number - File size in bytes",
      fileType: "string - File type or extension",
      fileUrl: "string - Download URL",
      icon: "ReactNode - File type icon",
      onDownload: "() => void - Download callback",
      downloadProgress: "number - Download progress",
      isDownloading: "boolean - Whether currently downloading",
    },
  },

  ImageMessage: {
    category: "chat",
    keywords: ["image", "photo", "picture", "media"],
    description: "Message component for image attachments",
    props: {
      src: "string - Image source URL",
      alt: "string - Alt text",
      width: "number - Image width",
      height: "number - Image height",
      thumbnail: "string - Thumbnail URL",
      onClick: "() => void - Click handler for preview",
      loading: "'lazy' | 'eager' - Loading strategy",
      caption: "string - Image caption",
    },
  },

  VideoMessage: {
    category: "chat",
    keywords: ["video", "media", "player", "clip"],
    description: "Message component for video attachments",
    props: {
      src: "string - Video source URL",
      poster: "string - Poster image URL",
      duration: "number - Video duration in seconds",
      width: "number - Video width",
      height: "number - Video height",
      autoPlay: "boolean - Whether to auto play",
      muted: "boolean - Whether video is muted",
      controls: "boolean - Whether to show controls",
      onPlay: "() => void - Play callback",
      onPause: "() => void - Pause callback",
    },
  },

  AudioMessage: {
    category: "chat",
    keywords: ["audio", "sound", "player", "music"],
    description: "Message component for audio attachments",
    props: {
      src: "string - Audio source URL",
      duration: "number - Audio duration in seconds",
      title: "string - Audio title",
      artist: "string - Artist name",
      waveform: "number[] - Waveform data for visualization",
      onPlay: "() => void - Play callback",
      onPause: "() => void - Pause callback",
      currentTime: "number - Current playback time",
    },
  },

  VoiceNote: {
    category: "chat",
    keywords: ["voice", "audio", "recording", "note"],
    description: "Voice note message with waveform visualization",
    props: {
      src: "string - Audio source URL",
      duration: "number - Duration in seconds",
      waveform: "number[] - Waveform data",
      isPlaying: "boolean - Whether currently playing",
      currentTime: "number - Current playback position",
      onPlay: "() => void - Play callback",
      onPause: "() => void - Pause callback",
      onSeek: "(time: number) => void - Seek callback",
      playbackRate: "number - Playback speed",
    },
  },

  ReadReceipt: {
    category: "chat",
    keywords: ["read", "receipt", "seen", "viewed"],
    description: "Read receipt indicator showing who has read a message",
    props: {
      readers: "User[] - Users who have read the message",
      readAt: "Date - When message was read",
      showAvatars: "boolean - Whether to show reader avatars",
      maxAvatars: "number - Maximum avatars to show",
      showTooltip: "boolean - Whether to show tooltip with names",
    },
  },

  DeliveryStatus: {
    category: "chat",
    keywords: ["delivery", "status", "sent", "received"],
    description: "Message delivery status indicator",
    props: {
      status: "'pending' | 'sent' | 'delivered' | 'read' | 'failed' - Delivery status",
      timestamp: "Date - Status timestamp",
      showLabel: "boolean - Whether to show status label",
      size: "'sm' | 'md' | 'lg' - Icon size",
      onRetry: "() => void - Retry callback for failed messages",
    },
  },

  OnlineIndicator: {
    category: "chat",
    keywords: ["online", "status", "presence", "indicator"],
    description: "Online status indicator dot",
    props: {
      status: "'online' | 'offline' | 'away' | 'busy' | 'invisible' - Online status",
      size: "'xs' | 'sm' | 'md' | 'lg' - Indicator size",
      showPulse: "boolean - Whether to show pulse animation",
      position: "'top-right' | 'bottom-right' | 'top-left' | 'bottom-left' - Position on avatar",
    },
  },

  PresenceIndicator: {
    category: "chat",
    keywords: ["presence", "status", "availability", "indicator"],
    description: "User presence indicator with status and custom message",
    props: {
      status: "'online' | 'offline' | 'away' | 'busy' | 'dnd' - Presence status",
      statusMessage: "string - Custom status message",
      lastSeen: "Date - Last seen timestamp",
      showLastSeen: "boolean - Whether to show last seen time",
      variant: "'dot' | 'badge' | 'text' - Display variant",
    },
  },

  TypingIndicator: {
    category: "chat",
    keywords: ["typing", "indicator", "composing", "writing"],
    description: "Animated typing indicator with user info",
    props: {
      users: "User[] - Users currently typing",
      maxUsers: "number - Max users to display",
      animation: "'dots' | 'bounce' | 'pulse' - Animation type",
      showAvatar: "boolean - Whether to show typing user avatar",
      text: "string - Custom text template",
    },
  },

  Mention: {
    category: "chat",
    keywords: ["mention", "tag", "at", "user", "reference"],
    description: "User mention component in messages",
    props: {
      user: "User - Mentioned user",
      onClick: "() => void - Click handler",
      highlighted: "boolean - Whether mention is highlighted",
      variant: "'link' | 'badge' | 'text' - Display variant",
      showAvatar: "boolean - Whether to show user avatar",
      prefix: "string - Mention prefix character",
    },
  },
};
