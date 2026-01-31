'use client';
// @ts-nocheck

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const PostDetail = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    id,
    author,
    avatar,
    content,
    images,
    timestamp,
    likes,
    comments,
    shares,
    isLiked,
    isBookmarked,
    style
  } = element.props;

  const imageList = images as string[];

  return (
    <div
      className={cn('space-y-4')}
      style={style as React.CSSProperties}
    >
      <div className="flex items-start gap-3">
        {avatar ? (
          <img src={avatar as string} alt={author as string} className="w-12 h-12 rounded-full" />
        ) : (
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-lg font-medium">
            {(author as string)?.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex-1">
          <p className="font-semibold text-lg">{author as string}</p>
          {timestamp && <p className="text-sm text-muted-foreground">{timestamp as string}</p>}
        </div>
        <button
          onClick={() => onAction?.({ name: 'follow', payload: { author } } as never)}
          className="px-4 py-1 text-sm bg-primary text-primary-foreground rounded-full hover:bg-primary/90"
        >
          Follow
        </button>
      </div>

      {content && <p className="text-lg whitespace-pre-wrap">{content as string}</p>}

      {imageList && imageList.length > 0 && (
        <div className={cn(
          'grid gap-2',
          imageList.length === 1 ? 'grid-cols-1' :
          imageList.length === 2 ? 'grid-cols-2' :
          imageList.length === 3 ? 'grid-cols-2' : 'grid-cols-2'
        )}>
          {imageList.map((img, i) => (
            <img
              key={i}
              src={img}
              alt=""
              className={cn(
                'rounded-lg object-cover w-full',
                imageList.length === 3 && i === 0 ? 'row-span-2' : ''
              )}
              onClick={() => onAction?.({ name: 'viewImage', payload: { image: img, index: i } } as never)}
            />
          ))}
        </div>
      )}

      <div className="flex items-center gap-6 py-3 border-y">
        <span className="text-sm text-muted-foreground">{likes} likes</span>
        <span className="text-sm text-muted-foreground">{comments} comments</span>
        <span className="text-sm text-muted-foreground">{shares} shares</span>
      </div>

      <div className="flex items-center justify-around">
        <button
          onClick={() => onAction?.({ name: 'like', payload: { id } } as never)}
          className={cn('flex items-center gap-2 px-4 py-2 hover:bg-muted rounded', isLiked && 'text-primary')}
        >
          <svg className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Like
        </button>
        <button
          onClick={() => onAction?.({ name: 'comment', payload: { id } } as never)}
          className="flex items-center gap-2 px-4 py-2 hover:bg-muted rounded"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Comment
        </button>
        <button
          onClick={() => onAction?.({ name: 'share', payload: { id } } as never)}
          className="flex items-center gap-2 px-4 py-2 hover:bg-muted rounded"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share
        </button>
        <button
          onClick={() => onAction?.({ name: 'bookmark', payload: { id } } as never)}
          className={cn('flex items-center gap-2 px-4 py-2 hover:bg-muted rounded', isBookmarked && 'text-primary')}
        >
          <svg className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          Save
        </button>
      </div>

      {children}
    </div>
  );
};
