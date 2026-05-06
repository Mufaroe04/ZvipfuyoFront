import { createTheme } from '@mui/material/styles';

export const zvipfuyoTheme = createTheme({
       typography: {
          fontFamily: [
            "Quicksand",
            "sans-serif", // Fallback font family
          ].join(","),
          fontWeightLight: 300, // Map Material-UI's light weight to Quicksand Light
          fontWeightRegular: 400,
          fontWeightMedium: 500,
          fontWeightBold: 700,
          // Optionally, set default font weight for specific Material-UI typography variants
          body1: {
            fontWeight: 500, // Default body text to Quicksand Light
          },
          body2: {
            fontWeight: 500, // Default body text (smaller) to Quicksand Light
          },
          h1: { fontWeight: 500 }, // Example: make all headings light
          h2: { fontWeight: 500 },
          h3: { fontWeight: 500 },
          h4: { fontWeight: 500 },
          h5: { fontWeight: 500 },
          h6: { fontWeight: 500 },
          button: {
            fontWeight: 500, // Buttons often look good slightly bolder than light
            textTransform: 'none',
          },
        },
  palette: {
    primary: {
      main: '#18774c',
    },
  },
});

