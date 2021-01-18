//src/components/InboxScreen.stories.tsx

import React from 'react';
import { Provider } from 'react-redux';
import { InboxScreenArgs, InboxScreen } from './InboxScreen';
import { Story } from '@storybook/react/types-6-0';
import store from '../lib/redux'

export default {
  component: InboxScreen,
  decorators: [(story: () => React.ReactNode) => <Provider store={store}>{story()}</Provider>],
  title: 'InboxScreen',
};

const Template:Story<InboxScreenArgs> = args => <InboxScreen {...args} />;

export const Default = Template.bind({});

export const Error = Template.bind({});
Error.args = {
  error: 'Something',
};