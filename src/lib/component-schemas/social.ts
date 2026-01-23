export interface ComponentSchema {
  category: string;
  keywords: string[];
  description: string;
  props: Record<string, string>;
}

export const socialSchemas: Record<string, ComponentSchema> = {
  Post: {
    category: "social",
    keywords: ["post", "content", "article", "update", "status", "message"],
    description: "Social media post container component",
    props: {
      id: "string",
      author: "{ id: string; name: string; username?: string; avatar?: string; verified?: boolean }",
      content: "string | ReactNode",
      media: "{ type: 'image' | 'video' | 'gif' | 'link'; url: string; thumbnail?: string; alt?: string; width?: number; height?: number }[]",
      timestamp: "string | Date",
      visibility: "'public' | 'private' | 'followers' | 'friends'",
      location: "{ name: string; coordinates?: { lat: number; lng: number } }",
      tags: "string[]",
      mentions: "{ id: string; name: string; username: string }[]",
      likeCount: "number",
      commentCount: "number",
      shareCount: "number",
      isLiked: "boolean",
      isBookmarked: "boolean",
      isShared: "boolean",
      isPinned: "boolean",
      showActions: "boolean",
      showStats: "boolean",
      showTimestamp: "boolean",
      variant: "'default' | 'compact' | 'detailed' | 'card'",
      onLike: "() => void",
      onComment: "() => void",
      onShare: "() => void",
      onBookmark: "() => void",
      onDelete: "() => void",
      onEdit: "() => void",
      onReport: "() => void",
      onClick: "() => void"
    }
  },

  PostCard: {
    category: "social",
    keywords: ["post", "card", "feed", "item", "content", "social"],
    description: "Card-style post display for feeds",
    props: {
      post: "{ id: string; author: object; content: string; media?: object[]; timestamp: string; likeCount: number; commentCount: number; shareCount: number }",
      showAuthor: "boolean",
      showMedia: "boolean",
      showActions: "boolean",
      showStats: "boolean",
      showTimestamp: "boolean",
      showMenu: "boolean",
      menuItems: "{ id: string; label: string; icon?: ReactNode; onClick: () => void }[]",
      truncateContent: "boolean",
      maxContentLength: "number",
      mediaLayout: "'grid' | 'carousel' | 'stack'",
      maxMedia: "number",
      isLiked: "boolean",
      isBookmarked: "boolean",
      elevation: "number",
      borderRadius: "string | number",
      onClick: "() => void",
      onAuthorClick: "() => void",
      onLike: "() => void",
      onComment: "() => void",
      onShare: "() => void",
      onBookmark: "() => void"
    }
  },

  PostList: {
    category: "social",
    keywords: ["post", "list", "feed", "timeline", "stream", "posts"],
    description: "List of posts with infinite scroll support",
    props: {
      posts: "object[]",
      loading: "boolean",
      loadingMore: "boolean",
      hasMore: "boolean",
      emptyMessage: "string",
      emptyIcon: "ReactNode",
      showLoadMore: "boolean",
      loadMoreText: "string",
      infiniteScroll: "boolean",
      scrollThreshold: "number",
      virtualized: "boolean",
      estimatedItemHeight: "number",
      gap: "number | string",
      variant: "'default' | 'compact' | 'card'",
      columns: "number",
      onLoadMore: "() => void",
      onPostClick: "(postId: string) => void",
      onPostLike: "(postId: string) => void",
      onPostComment: "(postId: string) => void",
      onPostShare: "(postId: string) => void",
      renderPost: "(post: object) => ReactNode"
    }
  },

  PostDetail: {
    category: "social",
    keywords: ["post", "detail", "view", "full", "expanded", "single"],
    description: "Detailed view of a single post with comments",
    props: {
      post: "{ id: string; author: object; content: string; media?: object[]; timestamp: string; likeCount: number; commentCount: number; shareCount: number; visibility: string }",
      comments: "object[]",
      showComments: "boolean",
      commentsLoading: "boolean",
      hasMoreComments: "boolean",
      showRelatedPosts: "boolean",
      relatedPosts: "object[]",
      showShareCount: "boolean",
      showLikeList: "boolean",
      likedBy: "object[]",
      isLiked: "boolean",
      isBookmarked: "boolean",
      isFollowingAuthor: "boolean",
      layout: "'default' | 'modal' | 'fullscreen'",
      onLike: "() => void",
      onComment: "(content: string) => void",
      onShare: "() => void",
      onBookmark: "() => void",
      onFollow: "() => void",
      onLoadMoreComments: "() => void",
      onClose: "() => void"
    }
  },

  PostHeader: {
    category: "social",
    keywords: ["post", "header", "author", "meta", "info", "top"],
    description: "Header section of a post with author info",
    props: {
      author: "{ id: string; name: string; username?: string; avatar?: string; verified?: boolean }",
      timestamp: "string | Date",
      visibility: "'public' | 'private' | 'followers' | 'friends'",
      location: "string",
      edited: "boolean",
      editedAt: "string | Date",
      isPinned: "boolean",
      isSponsored: "boolean",
      showAvatar: "boolean",
      showUsername: "boolean",
      showTimestamp: "boolean",
      showVisibility: "boolean",
      showMenu: "boolean",
      menuItems: "{ id: string; label: string; icon?: ReactNode }[]",
      avatarSize: "'sm' | 'md' | 'lg'",
      onAuthorClick: "() => void",
      onMenuItemClick: "(itemId: string) => void"
    }
  },

  PostBody: {
    category: "social",
    keywords: ["post", "body", "content", "text", "media", "main"],
    description: "Main content body of a post",
    props: {
      content: "string",
      media: "{ type: string; url: string; thumbnail?: string; alt?: string }[]",
      mentions: "{ id: string; name: string; username: string }[]",
      hashtags: "string[]",
      links: "{ url: string; title?: string; description?: string; image?: string }[]",
      truncate: "boolean",
      maxLength: "number",
      showReadMore: "boolean",
      readMoreText: "string",
      expanded: "boolean",
      mediaLayout: "'grid' | 'carousel' | 'masonry' | 'single'",
      maxMediaVisible: "number",
      showMediaCount: "boolean",
      enableLinkPreview: "boolean",
      highlightMentions: "boolean",
      highlightHashtags: "boolean",
      onMentionClick: "(userId: string) => void",
      onHashtagClick: "(hashtag: string) => void",
      onLinkClick: "(url: string) => void",
      onMediaClick: "(mediaIndex: number) => void",
      onReadMoreClick: "() => void"
    }
  },

  PostFooter: {
    category: "social",
    keywords: ["post", "footer", "actions", "stats", "bottom", "engagement"],
    description: "Footer section with actions and stats",
    props: {
      likeCount: "number",
      commentCount: "number",
      shareCount: "number",
      viewCount: "number",
      isLiked: "boolean",
      isBookmarked: "boolean",
      isShared: "boolean",
      showLikes: "boolean",
      showComments: "boolean",
      showShares: "boolean",
      showViews: "boolean",
      showBookmark: "boolean",
      showStats: "boolean",
      showActions: "boolean",
      actionsLayout: "'default' | 'compact' | 'expanded'",
      likeIcon: "ReactNode",
      likedIcon: "ReactNode",
      commentIcon: "ReactNode",
      shareIcon: "ReactNode",
      bookmarkIcon: "ReactNode",
      bookmarkedIcon: "ReactNode",
      onLike: "() => void",
      onComment: "() => void",
      onShare: "() => void",
      onBookmark: "() => void",
      onStatsClick: "(statType: string) => void"
    }
  },

  Comment: {
    category: "social",
    keywords: ["comment", "reply", "response", "feedback", "discussion"],
    description: "Individual comment component",
    props: {
      id: "string",
      author: "{ id: string; name: string; username?: string; avatar?: string; verified?: boolean }",
      content: "string",
      timestamp: "string | Date",
      likeCount: "number",
      replyCount: "number",
      isLiked: "boolean",
      isAuthor: "boolean",
      isPinned: "boolean",
      isEdited: "boolean",
      editedAt: "string | Date",
      parentId: "string",
      depth: "number",
      maxDepth: "number",
      showReplies: "boolean",
      showActions: "boolean",
      showAvatar: "boolean",
      showTimestamp: "boolean",
      showLikeCount: "boolean",
      showReplyCount: "boolean",
      variant: "'default' | 'compact' | 'threaded'",
      onLike: "() => void",
      onReply: "() => void",
      onEdit: "() => void",
      onDelete: "() => void",
      onReport: "() => void",
      onAuthorClick: "() => void"
    }
  },

  CommentList: {
    category: "social",
    keywords: ["comment", "list", "comments", "discussion", "thread"],
    description: "List of comments with threading support",
    props: {
      comments: "object[]",
      totalCount: "number",
      loading: "boolean",
      loadingMore: "boolean",
      hasMore: "boolean",
      sortBy: "'newest' | 'oldest' | 'popular' | 'relevant'",
      showSortOptions: "boolean",
      showTotalCount: "boolean",
      showLoadMore: "boolean",
      loadMoreText: "string",
      emptyMessage: "string",
      maxDepth: "number",
      collapseThreshold: "number",
      highlightAuthorComments: "boolean",
      authorId: "string",
      variant: "'default' | 'flat' | 'threaded'",
      onLoadMore: "() => void",
      onSortChange: "(sortBy: string) => void",
      onCommentLike: "(commentId: string) => void",
      onCommentReply: "(commentId: string) => void",
      onCommentDelete: "(commentId: string) => void"
    }
  },

  CommentThread: {
    category: "social",
    keywords: ["comment", "thread", "replies", "nested", "conversation"],
    description: "Threaded comment conversation view",
    props: {
      rootComment: "object",
      replies: "object[]",
      depth: "number",
      maxDepth: "number",
      collapsed: "boolean",
      collapsedCount: "number",
      showCollapseButton: "boolean",
      collapseButtonText: "string",
      expandButtonText: "string",
      indentSize: "number",
      showConnectorLine: "boolean",
      connectorLineColor: "string",
      highlightNew: "boolean",
      newCommentIds: "string[]",
      onExpand: "() => void",
      onCollapse: "() => void",
      onLoadReplies: "(commentId: string) => void"
    }
  },

  CommentInput: {
    category: "social",
    keywords: ["comment", "input", "compose", "write", "reply", "text"],
    description: "Input field for writing comments",
    props: {
      value: "string",
      placeholder: "string",
      replyTo: "{ id: string; name: string }",
      showAvatar: "boolean",
      avatar: "string",
      showSubmitButton: "boolean",
      submitButtonText: "string",
      showCancelButton: "boolean",
      cancelButtonText: "string",
      showCharacterCount: "boolean",
      maxLength: "number",
      minLength: "number",
      showMentions: "boolean",
      mentionSuggestions: "{ id: string; name: string; username: string; avatar?: string }[]",
      showEmoji: "boolean",
      showAttachment: "boolean",
      allowedAttachments: "string[]",
      autoFocus: "boolean",
      disabled: "boolean",
      loading: "boolean",
      error: "string",
      variant: "'default' | 'minimal' | 'expanded'",
      onChange: "(value: string) => void",
      onSubmit: "(content: string, attachments?: File[]) => void",
      onCancel: "() => void",
      onMention: "(user: object) => void",
      onAttach: "(files: File[]) => void"
    }
  },

  Reply: {
    category: "social",
    keywords: ["reply", "response", "comment", "answer", "nested"],
    description: "Reply to a comment or post",
    props: {
      id: "string",
      author: "{ id: string; name: string; username?: string; avatar?: string }",
      content: "string",
      timestamp: "string | Date",
      likeCount: "number",
      isLiked: "boolean",
      replyingTo: "{ id: string; name: string; username?: string }",
      showReplyingTo: "boolean",
      showAvatar: "boolean",
      showTimestamp: "boolean",
      showActions: "boolean",
      isAuthor: "boolean",
      isEdited: "boolean",
      variant: "'default' | 'compact'",
      onLike: "() => void",
      onReply: "() => void",
      onEdit: "() => void",
      onDelete: "() => void",
      onAuthorClick: "() => void",
      onReplyingToClick: "() => void"
    }
  },

  Like: {
    category: "social",
    keywords: ["like", "heart", "favorite", "love", "reaction"],
    description: "Like indicator with count and animation",
    props: {
      count: "number",
      isLiked: "boolean",
      showCount: "boolean",
      showAnimation: "boolean",
      animationType: "'bounce' | 'scale' | 'burst' | 'none'",
      icon: "ReactNode",
      likedIcon: "ReactNode",
      iconColor: "string",
      likedIconColor: "string",
      size: "'sm' | 'md' | 'lg'",
      disabled: "boolean",
      loading: "boolean",
      formatCount: "(count: number) => string",
      onClick: "() => void",
      onDoubleClick: "() => void"
    }
  },

  LikeButton: {
    category: "social",
    keywords: ["like", "button", "heart", "favorite", "action"],
    description: "Interactive like button with state",
    props: {
      liked: "boolean",
      count: "number",
      showCount: "boolean",
      label: "string",
      likedLabel: "string",
      showLabel: "boolean",
      icon: "ReactNode",
      likedIcon: "ReactNode",
      size: "'sm' | 'md' | 'lg'",
      variant: "'default' | 'outline' | 'ghost' | 'filled'",
      color: "string",
      likedColor: "string",
      disabled: "boolean",
      loading: "boolean",
      showTooltip: "boolean",
      tooltipText: "string",
      likedTooltipText: "string",
      animate: "boolean",
      onClick: "() => void"
    }
  },

  LikeCount: {
    category: "social",
    keywords: ["like", "count", "number", "stats", "total"],
    description: "Display of like count with formatting",
    props: {
      count: "number",
      showIcon: "boolean",
      icon: "ReactNode",
      format: "'short' | 'long' | 'compact'",
      showLabel: "boolean",
      label: "string",
      pluralLabel: "string",
      showZero: "boolean",
      zeroText: "string",
      size: "'sm' | 'md' | 'lg'",
      color: "string",
      clickable: "boolean",
      onClick: "() => void"
    }
  },

  Share: {
    category: "social",
    keywords: ["share", "social", "distribute", "spread", "send"],
    description: "Share functionality container",
    props: {
      url: "string",
      title: "string",
      description: "string",
      image: "string",
      hashtags: "string[]",
      via: "string",
      platforms: "('facebook' | 'twitter' | 'linkedin' | 'pinterest' | 'whatsapp' | 'telegram' | 'email' | 'copy')[]",
      showCount: "boolean",
      shareCount: "number",
      showNativeShare: "boolean",
      variant: "'button' | 'icons' | 'menu' | 'modal'",
      size: "'sm' | 'md' | 'lg'",
      onShare: "(platform: string) => void",
      onCopy: "() => void",
      onNativeShare: "() => void"
    }
  },

  ShareButton: {
    category: "social",
    keywords: ["share", "button", "action", "distribute", "send"],
    description: "Button to trigger share action",
    props: {
      label: "string",
      showLabel: "boolean",
      icon: "ReactNode",
      showCount: "boolean",
      count: "number",
      size: "'sm' | 'md' | 'lg'",
      variant: "'default' | 'outline' | 'ghost' | 'filled'",
      color: "string",
      disabled: "boolean",
      loading: "boolean",
      showTooltip: "boolean",
      tooltipText: "string",
      onClick: "() => void"
    }
  },

  ShareModal: {
    category: "social",
    keywords: ["share", "modal", "dialog", "social", "platforms"],
    description: "Modal with share options and platforms",
    props: {
      open: "boolean",
      url: "string",
      title: "string",
      description: "string",
      image: "string",
      platforms: "{ id: string; name: string; icon: ReactNode; color?: string }[]",
      showCopyLink: "boolean",
      showQRCode: "boolean",
      showEmbed: "boolean",
      embedCode: "string",
      showPreview: "boolean",
      customMessage: "string",
      showCustomMessage: "boolean",
      analytics: "boolean",
      onShare: "(platform: string) => void",
      onCopy: "() => void",
      onClose: "() => void"
    }
  },

  Bookmark: {
    category: "social",
    keywords: ["bookmark", "save", "later", "favorite", "collection"],
    description: "Bookmark indicator and state",
    props: {
      bookmarked: "boolean",
      showAnimation: "boolean",
      animationType: "'scale' | 'fill' | 'none'",
      icon: "ReactNode",
      bookmarkedIcon: "ReactNode",
      iconColor: "string",
      bookmarkedIconColor: "string",
      size: "'sm' | 'md' | 'lg'",
      disabled: "boolean",
      loading: "boolean",
      onClick: "() => void"
    }
  },

  BookmarkButton: {
    category: "social",
    keywords: ["bookmark", "button", "save", "action", "later"],
    description: "Interactive bookmark button",
    props: {
      bookmarked: "boolean",
      label: "string",
      bookmarkedLabel: "string",
      showLabel: "boolean",
      icon: "ReactNode",
      bookmarkedIcon: "ReactNode",
      size: "'sm' | 'md' | 'lg'",
      variant: "'default' | 'outline' | 'ghost' | 'filled'",
      color: "string",
      bookmarkedColor: "string",
      disabled: "boolean",
      loading: "boolean",
      showTooltip: "boolean",
      tooltipText: "string",
      bookmarkedTooltipText: "string",
      showCollection: "boolean",
      collections: "{ id: string; name: string }[]",
      onClick: "() => void",
      onCollectionSelect: "(collectionId: string) => void"
    }
  },

  Follow: {
    category: "social",
    keywords: ["follow", "subscribe", "connect", "friend", "relationship"],
    description: "Follow relationship state indicator",
    props: {
      following: "boolean",
      followsYou: "boolean",
      mutual: "boolean",
      showMutualBadge: "boolean",
      mutualBadgeText: "string",
      showFollowsYou: "boolean",
      followsYouText: "string",
      size: "'sm' | 'md' | 'lg'",
      variant: "'badge' | 'text' | 'icon'",
      onClick: "() => void"
    }
  },

  FollowButton: {
    category: "social",
    keywords: ["follow", "button", "subscribe", "action", "connect"],
    description: "Interactive follow/unfollow button",
    props: {
      following: "boolean",
      followLabel: "string",
      followingLabel: "string",
      unfollowLabel: "string",
      showIcon: "boolean",
      icon: "ReactNode",
      followingIcon: "ReactNode",
      size: "'sm' | 'md' | 'lg'",
      variant: "'default' | 'outline' | 'ghost' | 'filled'",
      color: "string",
      followingColor: "string",
      fullWidth: "boolean",
      disabled: "boolean",
      loading: "boolean",
      showUnfollowOnHover: "boolean",
      confirmUnfollow: "boolean",
      confirmMessage: "string",
      onClick: "() => void"
    }
  },

  FollowerCount: {
    category: "social",
    keywords: ["follower", "count", "subscribers", "fans", "stats"],
    description: "Display of follower count",
    props: {
      count: "number",
      showIcon: "boolean",
      icon: "ReactNode",
      format: "'short' | 'long' | 'compact'",
      showLabel: "boolean",
      label: "string",
      pluralLabel: "string",
      size: "'sm' | 'md' | 'lg'",
      color: "string",
      clickable: "boolean",
      onClick: "() => void"
    }
  },

  Profile: {
    category: "social",
    keywords: ["profile", "user", "account", "page", "bio"],
    description: "Full user profile component",
    props: {
      user: "{ id: string; name: string; username: string; avatar?: string; cover?: string; bio?: string; location?: string; website?: string; joinDate?: string; verified?: boolean }",
      stats: "{ posts: number; followers: number; following: number }",
      isCurrentUser: "boolean",
      isFollowing: "boolean",
      isFollowedBy: "boolean",
      showCover: "boolean",
      showBio: "boolean",
      showStats: "boolean",
      showLocation: "boolean",
      showWebsite: "boolean",
      showJoinDate: "boolean",
      showActions: "boolean",
      showEditButton: "boolean",
      showFollowButton: "boolean",
      showMessageButton: "boolean",
      tabs: "{ id: string; label: string; count?: number }[]",
      activeTab: "string",
      layout: "'default' | 'compact' | 'sidebar'",
      onFollow: "() => void",
      onMessage: "() => void",
      onEdit: "() => void",
      onTabChange: "(tabId: string) => void",
      onStatsClick: "(statType: string) => void"
    }
  },

  ProfileCard: {
    category: "social",
    keywords: ["profile", "card", "user", "preview", "summary", "hover"],
    description: "Compact profile card for previews and hover states",
    props: {
      user: "{ id: string; name: string; username: string; avatar?: string; bio?: string; verified?: boolean }",
      stats: "{ followers: number; following: number }",
      isFollowing: "boolean",
      showBio: "boolean",
      showStats: "boolean",
      showFollowButton: "boolean",
      showMessageButton: "boolean",
      maxBioLength: "number",
      variant: "'default' | 'compact' | 'detailed'",
      elevation: "number",
      onClick: "() => void",
      onFollow: "() => void",
      onMessage: "() => void"
    }
  },

  ProfileHeader: {
    category: "social",
    keywords: ["profile", "header", "cover", "banner", "top"],
    description: "Profile header with cover and avatar",
    props: {
      user: "{ name: string; username: string; avatar?: string; cover?: string; verified?: boolean }",
      showCover: "boolean",
      coverHeight: "number | string",
      avatarSize: "'sm' | 'md' | 'lg' | 'xl'",
      avatarPosition: "'left' | 'center'",
      showVerified: "boolean",
      showUsername: "boolean",
      editable: "boolean",
      showEditCover: "boolean",
      showEditAvatar: "boolean",
      actions: "ReactNode",
      onEditCover: "() => void",
      onEditAvatar: "() => void",
      onAvatarClick: "() => void"
    }
  },

  ProfileStats: {
    category: "social",
    keywords: ["profile", "stats", "count", "followers", "following", "posts"],
    description: "Profile statistics display",
    props: {
      stats: "{ label: string; value: number; key: string }[]",
      layout: "'horizontal' | 'vertical' | 'grid'",
      showLabels: "boolean",
      showDividers: "boolean",
      format: "'short' | 'long' | 'compact'",
      size: "'sm' | 'md' | 'lg'",
      clickable: "boolean",
      activeKey: "string",
      onStatClick: "(key: string) => void"
    }
  },

  Feed: {
    category: "social",
    keywords: ["feed", "timeline", "stream", "posts", "updates"],
    description: "Social media feed container",
    props: {
      items: "object[]",
      loading: "boolean",
      loadingMore: "boolean",
      hasMore: "boolean",
      error: "string",
      emptyMessage: "string",
      emptyIcon: "ReactNode",
      showRefresh: "boolean",
      showNewPostsIndicator: "boolean",
      newPostsCount: "number",
      newPostsText: "string",
      infiniteScroll: "boolean",
      scrollThreshold: "number",
      pullToRefresh: "boolean",
      virtualized: "boolean",
      estimatedItemHeight: "number",
      feedType: "'home' | 'user' | 'explore' | 'bookmarks'",
      filters: "{ type?: string; dateRange?: [Date, Date] }",
      showFilters: "boolean",
      onLoadMore: "() => void",
      onRefresh: "() => void",
      onNewPostsClick: "() => void",
      onItemClick: "(itemId: string) => void",
      renderItem: "(item: object) => ReactNode"
    }
  },

  FeedItem: {
    category: "social",
    keywords: ["feed", "item", "post", "content", "entry"],
    description: "Individual item in a feed",
    props: {
      id: "string",
      type: "'post' | 'repost' | 'story' | 'ad' | 'suggestion'",
      content: "object",
      repostedBy: "{ id: string; name: string; avatar?: string }",
      showRepostedBy: "boolean",
      showType: "boolean",
      highlighted: "boolean",
      highlightColor: "string",
      showTimestamp: "boolean",
      showActions: "boolean",
      variant: "'default' | 'compact' | 'card'",
      onClick: "() => void",
      onRepostClick: "() => void"
    }
  },

  Story: {
    category: "social",
    keywords: ["story", "ephemeral", "status", "temporary", "moment"],
    description: "Ephemeral story content component",
    props: {
      id: "string",
      author: "{ id: string; name: string; avatar?: string }",
      media: "{ type: 'image' | 'video'; url: string; duration?: number }[]",
      currentIndex: "number",
      progress: "number",
      duration: "number",
      timestamp: "string | Date",
      viewed: "boolean",
      showAuthor: "boolean",
      showProgress: "boolean",
      showTimestamp: "boolean",
      showActions: "boolean",
      actions: "ReactNode",
      autoPlay: "boolean",
      muted: "boolean",
      paused: "boolean",
      onNext: "() => void",
      onPrevious: "() => void",
      onClose: "() => void",
      onAuthorClick: "() => void",
      onView: "() => void"
    }
  },

  StoryCircle: {
    category: "social",
    keywords: ["story", "circle", "avatar", "ring", "indicator"],
    description: "Story indicator circle around avatar",
    props: {
      user: "{ id: string; name: string; avatar?: string }",
      hasStory: "boolean",
      viewed: "boolean",
      storyCount: "number",
      showName: "boolean",
      showLive: "boolean",
      isLive: "boolean",
      liveText: "string",
      size: "'sm' | 'md' | 'lg' | 'xl'",
      ringColor: "string",
      viewedRingColor: "string",
      ringWidth: "number",
      showAddButton: "boolean",
      isCurrentUser: "boolean",
      onClick: "() => void",
      onAddClick: "() => void"
    }
  },

  StoryViewer: {
    category: "social",
    keywords: ["story", "viewer", "fullscreen", "slideshow", "carousel"],
    description: "Full-screen story viewer",
    props: {
      stories: "{ id: string; author: object; media: object[]; timestamp: string }[]",
      currentStoryIndex: "number",
      currentMediaIndex: "number",
      showHeader: "boolean",
      showFooter: "boolean",
      showProgress: "boolean",
      showNavigation: "boolean",
      showClose: "boolean",
      showReply: "boolean",
      replyPlaceholder: "string",
      autoAdvance: "boolean",
      duration: "number",
      paused: "boolean",
      muted: "boolean",
      gestures: "boolean",
      keyboardControls: "boolean",
      onNext: "() => void",
      onPrevious: "() => void",
      onStoryChange: "(storyIndex: number) => void",
      onMediaChange: "(mediaIndex: number) => void",
      onClose: "() => void",
      onReply: "(message: string) => void",
      onMuteToggle: "() => void"
    }
  },

  Author: {
    category: "social",
    keywords: ["author", "user", "creator", "writer", "profile"],
    description: "Author information display",
    props: {
      author: "{ id: string; name: string; username?: string; avatar?: string; verified?: boolean; role?: string }",
      showAvatar: "boolean",
      showUsername: "boolean",
      showVerified: "boolean",
      showRole: "boolean",
      avatarSize: "'xs' | 'sm' | 'md' | 'lg'",
      layout: "'horizontal' | 'vertical'",
      nameFirst: "boolean",
      linkToProfile: "boolean",
      variant: "'default' | 'compact' | 'inline'",
      onClick: "() => void"
    }
  },

  AuthorCard: {
    category: "social",
    keywords: ["author", "card", "profile", "creator", "summary"],
    description: "Author information card with bio",
    props: {
      author: "{ id: string; name: string; username?: string; avatar?: string; bio?: string; verified?: boolean; followerCount?: number }",
      showAvatar: "boolean",
      showBio: "boolean",
      showFollowerCount: "boolean",
      showFollowButton: "boolean",
      isFollowing: "boolean",
      maxBioLength: "number",
      avatarSize: "'sm' | 'md' | 'lg'",
      variant: "'default' | 'compact' | 'detailed'",
      elevation: "number",
      onClick: "() => void",
      onFollow: "() => void"
    }
  },

  AuthorBio: {
    category: "social",
    keywords: ["author", "bio", "description", "about", "info"],
    description: "Author biography text display",
    props: {
      bio: "string",
      maxLength: "number",
      showReadMore: "boolean",
      readMoreText: "string",
      readLessText: "string",
      expanded: "boolean",
      highlightMentions: "boolean",
      highlightHashtags: "boolean",
      highlightLinks: "boolean",
      linkTarget: "'_blank' | '_self'",
      size: "'sm' | 'md' | 'lg'",
      color: "string",
      onMentionClick: "(username: string) => void",
      onHashtagClick: "(hashtag: string) => void",
      onLinkClick: "(url: string) => void",
      onReadMoreClick: "() => void"
    }
  }
};
