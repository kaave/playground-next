import React from 'react';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';

import { Example } from '.';

export default {
  title: 'Example',
};

export const Hello = () => <Example message={text('message', 'Hello')} onClick={action('Test')} />;
