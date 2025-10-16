import { TableRow, TableCell, TableHead as MuiTableHead } from '@mui/material';
// Removed theme dependency
import { useTheme } from '@mui/material/styles';

interface HeadDataItem {
  id: string;
  label: string;
  align?: 'left' | 'center' | 'right';
}

interface TableHeadMainProps {
  headData: HeadDataItem[];
}

export default function TableHeadMain({ headData }: TableHeadMainProps): React.JSX.Element {
  const theme = useTheme();

  return (
    <MuiTableHead>
      <TableRow
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`
        }}
      >
        {headData.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align ?? 'left'}
            sx={{
              color: 'common.white',
              bgcolor: 'transparent',
              fontSize: 16,
              py: 2,
              textTransform: 'capitalize'
            }}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  );
}
