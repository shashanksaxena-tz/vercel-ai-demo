import React from 'react';
import { Table as AntTable } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

interface TableColumn {
    header: string;
    accessorKey: string;
}

export const Table = ({ element }: ComponentRenderProps) => {
    const { columns = [], data = [], caption, style } = element.props;
    const captionText = caption as string | undefined;

    const tableColumns = (columns as TableColumn[]).map((col) => ({
        title: col.header,
        dataIndex: col.accessorKey,
        key: col.accessorKey,
    }));

    const tableData = (data as Record<string, unknown>[]).map((row, index) => ({
        ...row,
        key: row.id || index,
    }));

    return (
        <div style={style as React.CSSProperties}>
            {captionText && <div style={{ marginBottom: 8, fontWeight: 500 }}>{captionText}</div>}
            <AntTable
                columns={tableColumns}
                dataSource={tableData}
                pagination={false}
                size="middle"
            />
        </div>
    );
};
