import React from 'react';
import whyDidYouRender from '@welldone-software/why-did-you-render';
import { hijackEffects } from 'stop-runaway-react-effects';

whyDidYouRender(React);
hijackEffects();
