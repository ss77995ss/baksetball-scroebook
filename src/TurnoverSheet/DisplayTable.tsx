/* eslint-disable react/jsx-key */
import React from 'react';
import { useTable, Cell } from 'react-table';
import { StyledTable } from '../styles';
import { columns } from './constants';
import { TurnoverCategoriesType } from './types';
import TurnoverCategoriesHeader from './TurnoverCategoriesHeader';
import TurnoverCell from './TurnoverCell';

const renderCell: (cell: Cell<TurnoverCategoriesType>) => {} | null | undefined = cell => {
  switch (cell.column.Header) {
    case '#':
    case '其他失誤':
    case '總和':
      return cell.render('Cell');
    default:
      return <TurnoverCell value={cell.value} />;
  }
};

interface Props {
  turnoverData: TurnoverCategoriesType[];
}

const DisplayTable: React.FC<Props> = ({ turnoverData }: Props) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: turnoverData,
  });

  return (
    <StyledTable>
      <table style={{ width: 1000 }} {...getTableProps()}>
        <thead>
          {// Loop over the header rows
          headerGroups.map(headerGroup => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {// Loop over the headers in each row
              headerGroup.headers.map(column => {
                const isTurnoverCategoriesHeader =
                  column.Header === 'Drop' ||
                  column.Header === '橫傳球' ||
                  column.Header === '直傳球' ||
                  column.Header === '其他傳球';

                return (
                  // Apply the header cell props
                  <th
                    {...column.getHeaderProps()}
                    style={{
                      padding: !isTurnoverCategoriesHeader ? '1rem' : 0,
                    }}
                  >
                    {// Render the header
                    isTurnoverCategoriesHeader ? (
                      <TurnoverCategoriesHeader passType={column.Header} />
                    ) : (
                      column.render('Header')
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {// Loop over the table rows
          rows.map(row => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // Apply the row props
              <tr {...row.getRowProps()}>
                {// Loop over the rows cells
                row.cells.map(cell => {
                  // Apply the cell props
                  return <td {...cell.getCellProps()}>{renderCell(cell)}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </StyledTable>
  );
};

export default DisplayTable;
