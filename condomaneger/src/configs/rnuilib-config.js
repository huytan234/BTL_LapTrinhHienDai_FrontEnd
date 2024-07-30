// rnuilib-config.js
import {Colors, Typography, Spacings} from 'react-native-ui-lib';

// Define colors
Colors.loadColors({
  primary: '#6200EE',
  secondary: '#03DAC6',
  background: '#FFFFFF',
  surface: '#FFFFFF',
  error: '#B00020',
  text: '#000000',
  disabled: '#E0E0E0',
  placeholder: '#A0A0A0',
});

// Define typography
Typography.loadTypographies({
  heading: {fontSize: 24, fontWeight: '600'},
  subheading: {fontSize: 20, fontWeight: '500'},
  body: {fontSize: 16, fontWeight: '400'},
});

// Define spacings
Spacings.loadSpacings({
  page: 20,
  card: 15,
  gridGutter: 16,
});
