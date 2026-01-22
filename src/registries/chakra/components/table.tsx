import React from 'react';
import { Table as ChakraTable, Thead, Tbody, Tr, Th, Td, TableContainer, TableCaption } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Table = ({ element }: ComponentRenderProps) => {
  const { columns, data, caption, style } = element.props;
  const cols = columns as any[] || [];
  const rows = data as any[] || [];

  return (
    <TableContainer style={style as React.CSSProperties}>
      <ChakraTable variant="simple">
        {!!caption && <TableCaption>{caption as string}</TableCaption>}
        <Thead>
          <Tr>
            {cols.map((col) => (
              <Th key={col.accessorKey}>{col.header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row, i) => (
            <Tr key={i}>
              {cols.map((col) => (
                <Td key={col.accessorKey}>{row[col.accessorKey]}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </ChakraTable>
    </TableContainer>
  );
};
