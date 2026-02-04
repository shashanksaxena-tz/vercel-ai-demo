import React from 'react';
import { Table as ChakraTable } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

interface TableColumn {
    header: string;
    accessorKey: string;
}

export const Table = ({ element }: ComponentRenderProps) => {
    const { columns = [], data = [], caption, style } = element.props;
    const captionText = caption as string | undefined;

    const tableColumns = columns as TableColumn[];
    const tableData = data as Record<string, unknown>[];

    return (
        <ChakraTable.Root variant="line" style={style as React.CSSProperties}>
            {captionText && <ChakraTable.Caption>{captionText}</ChakraTable.Caption>}
            <ChakraTable.Header>
                <ChakraTable.Row>
                    {tableColumns.map((column) => (
                        <ChakraTable.ColumnHeader key={column.accessorKey}>
                            {column.header}
                        </ChakraTable.ColumnHeader>
                    ))}
                </ChakraTable.Row>
            </ChakraTable.Header>
            <ChakraTable.Body>
                {tableData.map((row, rowIndex) => (
                    <ChakraTable.Row key={rowIndex}>
                        {tableColumns.map((column) => (
                            <ChakraTable.Cell key={column.accessorKey}>
                                {row[column.accessorKey] as React.ReactNode}
                            </ChakraTable.Cell>
                        ))}
                    </ChakraTable.Row>
                ))}
            </ChakraTable.Body>
        </ChakraTable.Root>
    );
};
