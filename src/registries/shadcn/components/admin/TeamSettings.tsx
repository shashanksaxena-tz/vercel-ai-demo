'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const TeamSettings = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    teamName,
    memberCount,
    maxMembers,
    members,
    style
  } = element.props;

  const memberList = members as Array<{ name: string; email: string; role: string; avatar?: string }>;

  return (
    <div
      className={cn('space-y-4')}
      style={style as React.CSSProperties}
    >
      <div className="flex items-center justify-between">
        <div>
          {teamName && <h3 className="font-semibold">{teamName as string}</h3>}
          <p className="text-sm text-muted-foreground">
            {memberCount} of {maxMembers} members
          </p>
        </div>
        <button
          onClick={() => onAction?.({ name: 'inviteMember' })}
          className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90"
        >
          Invite Member
        </button>
      </div>

      {memberList && memberList.length > 0 && (
        <div className="border rounded-lg divide-y">
          {memberList.map((member, i) => (
            <div key={i} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                {member.avatar ? (
                  <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-medium">
                    {member.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-muted text-xs rounded">{member.role}</span>
                <button
                  onClick={() => onAction?.({ name: 'editMember', payload: { email: member.email } })}
                  className="p-1 hover:bg-muted rounded"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {children}
    </div>
  );
};
