'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const NotificationSettings = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    notifications,
    style
  } = element.props;

  const notificationList = notifications as Array<{
    id: string;
    label: string;
    description?: string;
    email?: boolean;
    push?: boolean;
    sms?: boolean;
  }>;

  return (
    <div
      className={cn('space-y-4')}
      style={style as React.CSSProperties}
    >
      {notificationList && notificationList.length > 0 && (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium">Notification</th>
                <th className="text-center px-4 py-3 text-sm font-medium w-20">Email</th>
                <th className="text-center px-4 py-3 text-sm font-medium w-20">Push</th>
                <th className="text-center px-4 py-3 text-sm font-medium w-20">SMS</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {notificationList.map((notif) => (
                <tr key={notif.id}>
                  <td className="px-4 py-3">
                    <p className="font-medium text-sm">{notif.label}</p>
                    {notif.description && (
                      <p className="text-xs text-muted-foreground">{notif.description}</p>
                    )}
                  </td>
                  <td className="text-center px-4 py-3">
                    <input
                      type="checkbox"
                      checked={notif.email}
                      onChange={() => onAction?.({ name: 'toggleNotification', payload: { id: notif.id, channel: 'email' } })}
                      className="w-4 h-4"
                    />
                  </td>
                  <td className="text-center px-4 py-3">
                    <input
                      type="checkbox"
                      checked={notif.push}
                      onChange={() => onAction?.({ name: 'toggleNotification', payload: { id: notif.id, channel: 'push' } })}
                      className="w-4 h-4"
                    />
                  </td>
                  <td className="text-center px-4 py-3">
                    <input
                      type="checkbox"
                      checked={notif.sms}
                      onChange={() => onAction?.({ name: 'toggleNotification', payload: { id: notif.id, channel: 'sms' } })}
                      className="w-4 h-4"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {children}
    </div>
  );
};
