import React from 'react';
import { Row } from 'react-table';
import { StatType } from './types';
import { getTotalWithCount } from './utils';
import { StyledCell } from './styles';

interface Props {
  row: Row<StatType>;
}

type StatWithCountType = {
  count: number;
  points: number;
};

const TotalCellWithCount: React.FC<Props> = ({ row }: Props) => {
  return (
    <StyledCell>
      <div>{getTotalWithCount(row.values)}</div>
    </StyledCell>
  );
};

export default TotalCellWithCount;
