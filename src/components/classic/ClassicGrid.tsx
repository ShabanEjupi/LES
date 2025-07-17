import React from 'react';
import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';

interface ClassicGridProps {
  container?: boolean;
  item?: boolean;
  xs?: number;
  md?: number;
  spacing?: number;
  size?: { xs?: number; md?: number };
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

export const ClassicGrid: React.FC<ClassicGridProps> = ({
  container = false,
  item = false,
  xs,
  md,
  spacing = 0,
  size,
  children,
  sx = {},
  ...props
}) => {
  // Convert old Grid props to modern flexbox styling
  const getStyles = (): SxProps<Theme> => {
    if (container) {
      return {
        display: 'flex',
        flexWrap: 'wrap',
        gap: spacing ? spacing * 8 + 'px' : 0,
        ...sx
      };
    }

    if (item || xs || md || size) {
      const breakpoints = size || { xs, md };
      const xsWidth = breakpoints.xs ? (breakpoints.xs / 12) * 100 + '%' : '100%';
      const mdWidth = breakpoints.md ? (breakpoints.md / 12) * 100 + '%' : xsWidth;

      return {
        width: xsWidth,
        '@media (min-width: 960px)': {
          width: mdWidth,
        },
        flexShrink: 0,
        ...sx
      };
    }

    return sx;
  };

  return (
    <Box sx={getStyles()} {...props}>
      {children}
    </Box>
  );
};

export default ClassicGrid;
