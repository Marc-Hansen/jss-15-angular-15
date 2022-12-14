import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import StyleguideSection, { StyleguideSectionProps as Props } from './Styleguide-Section';
import { StorybookArgs, withFields, withSitecoreContext } from 'storybook-utils/utils';
import { SingleLine, MultiLine } from '../fields/Styleguide-FieldUsage-Text.stories';
import StyleguideFieldUsageText from './../fields/Styleguide-FieldUsage-Text';

export default {
  title: 'Components/styleguide/Styleguide-Section',
  component: StyleguideSection,
} as ComponentMeta<typeof StyleguideSection>;

type Args = StorybookArgs<Props>;

const components = new Map();
components.set('Styleguide-FieldUsage-Text', StyleguideFieldUsageText);
// eslint-disable-next-line react/display-name
const componentFactory = (name: string) => components.get(name);

const Template: ComponentStory<typeof StyleguideSection> = (args) => (
  <StyleguideSection {...args} />
);

export const Default = Template.bind({});
Default.args = withFields<Args, Props>({
  params: {
    name: 'Styleguide-ComponentParams',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'Styleguide-Section',
    dataSource: '{00000000-0000-0000-0000-000000000000}',
    placeholders: {
      '<%- helper.getAppPrefix(appPrefix, appName) %>jss-styleguide-section': [
        {
          uid: '1846c499-afa7-56c4-bade-e3880eac0134',
          componentName: 'Styleguide-FieldUsage-Text',
          dataSource: '{6E81D12B-6E44-5CD9-919A-6707B6723FEC}',
          fields: SingleLine.args?.fields,
        },
        {
          uid: '1846c499-afa7-56c4-bade-e3880eac0134',
          componentName: 'Styleguide-FieldUsage-Text',
          dataSource: '{6E81D12B-6E44-5CD9-919A-6707B6723FEC}',
          fields: MultiLine.args?.fields,
        },
      ],
    },
  },
  fields: {
    heading: 'Content Data',
  },
});

Default.decorators = [withSitecoreContext({ componentFactory })];