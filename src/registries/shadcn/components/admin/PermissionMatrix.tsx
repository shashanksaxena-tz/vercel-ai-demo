'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const PermissionMatrix = ({ element, onAction }: ComponentRenderProps) => {
  const {
    roles,
    permissions,
    matrix,
    style
  } = element.props;

  const roleList = roles as string[];
  const permissionList = permissions as Array<{ id: string; label: string; category?: string }>;
  const permissionMatrix = matrix as Record<string, Record<string, boolean>>;

  return (
    <div
      className={cn('overflow-x-auto')}
      style={style as React.CSSProperties}
    >
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-muted/50">
            <th className="text-left px-4 py-3 font-medium border">Permission</th>
            {roleList?.map((role) => (
              <th key={role} className="text-center px-4 py-3 font-medium border min-w-[100px]">
                {role}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {permissionList?.map((permission) => (
            <tr key={permission.id} className="hover:bg-muted/30">
              <td className="px-4 py-3 border">
                <div>
                  <p className="font-medium text-sm">{permission.label}</p>
                  {permission.category && (
                    <p className="text-xs text-muted-foreground">{permission.category}</p>
                  )}
                </div>
              </td>
              {roleList?.map((role) => (
                <td key={role} className="text-center px-4 py-3 border">
                  <input
                    type="checkbox"
                    checked={permissionMatrix?.[role]?.[permission.id] || false}
                    onChange={() => onAction?.({
                      name: 'togglePermission',
                      payload: { role, permission: permission.id }
                    } as never)}
                    className="w-4 h-4"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
