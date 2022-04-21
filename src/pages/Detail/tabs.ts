import { Dimensions } from 'react-native';

import About from './About';
import BaseStats from './BaseStats';
import Evolution from './Evolution';

const tabs = [
  { name: 'About', slide: About },
  { name: 'Base Stats', slide: BaseStats },
  { name: 'Evolution', slide: Evolution }
];

const { width } = Dimensions.get('window');
const TAB_BUTTON_WIDTH = (width - 48) / 4;

export { tabs, TAB_BUTTON_WIDTH };
