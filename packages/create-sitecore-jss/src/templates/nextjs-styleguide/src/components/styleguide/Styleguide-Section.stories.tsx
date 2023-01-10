import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import StyleguideSection, { StyleguideSectionProps as Props } from './Styleguide-Section';
import { StorybookArgs, StorybookEditingArgs, withFields, withSitecoreContext } from 'storybook-utils/utils';
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
      'NextjsApp-jss-styleguide-section': [
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

type EditingArgs = StorybookEditingArgs<Props>;

export const Editing = Template.bind({});
Editing.args = withFields<EditingArgs, Props>({
  params: {
    name: 'Styleguide-ComponentParams Editing',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'Styleguide-Section',
    dataSource: '{00000000-0000-0000-0000-000000000000}',
    placeholders: {
      'NextjsApp-jss-styleguide-section': [
        {
          uid: '1846c499-afa7-56c4-bade-e3880eac0134',
          componentName: 'Styleguide-FieldUsage-Text',
          dataSource: '{6E81D12B-6E44-5CD9-919A-6707B6723FEC}',
          fields: {
            heading: {
              value: '',
              editable: 
              '<span class="jss-border">Single-Line Text Editing</span>'
            },
            description: {
              value: '',
              editable:
              '<span class="jss-border">Description Editing</span>'
            },
            sample: {
              value: '',
              editable:
              '<span class="jss-border">This is a sample EDITABLE text field. <mark>HTML is encoded.</mark> In Sitecore, editors will see the following Single-Line Text field: <input type="text"></span>'
            },
            sample2: {
              value:
                'This is another sample text field using rendering options. <mark>HTML supported with encode=false.</mark> Cannot edit because editable=false.',
              editable:
                '<span class="jss-border">This is another sample text field using rendering options. <mark>HTML supported with encode=false.</mark> Cannot edit because editable=false.</span>',
            },
          },
        },
        {
          uid: '1846c499-afa7-56c4-bade-e3880eac0134',
          componentName: 'Styleguide-FieldUsage-Text',
          dataSource: '{6E81D12B-6E44-5CD9-919A-6707B6723FEC}',
          fields: {
            heading: {
              value: '',
              editable: '<span class="jss-border">Multi-Line Text Editing</span>'
            },
            description: {
              value: '',
              editable: '<span class="jss-border">Description Editing</span>'
            },
            sample: {
              value: '',
              editable: '<span class="jss-border">This is a sample EDITABLE multi-line text field. <mark>HTML is encoded.</mark> In Sitecore, editors will see a textarea.</span>'
            },
            sample2: {
              value:
                'This is another sample multi-line text field using rendering options. <mark>HTML supported with encode=false.</mark>',
              editable:
                '<span class="jss-border">This is another sample multi-line text field using rendering options. <mark>HTML supported with encode=false.</mark></span>',
            },
          },
        },
      ],
    },
  },
  fields: {
    heading:  '<span class="jss-border">Content Data Editing</span>'
  },
}, true
);

Editing.decorators = [withSitecoreContext({ componentFactory })];