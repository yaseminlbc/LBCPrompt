// src/shared-theme/SitemarkIcon.jsx
import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import { useTheme } from '@mui/material/styles';

/**
 * Sitemark icon
 */
export default function Sitemark(props) {
  const theme = useTheme();
  return (
    <SvgIcon
      {...props}
      viewBox="0 0 24 24"
      sx={{
        fontSize: '2.5rem',
        color: theme.palette.primary.main,
      }}
    >
      <path d="M5 3v18l7-5 7 5V3z" />
    </SvgIcon>
  );
}
