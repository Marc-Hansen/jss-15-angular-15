import React from 'react';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ValueFields, withFields } from 'storybook-utils/utils';

import StyleguideFieldUsageFile, {
  StyleguideFieldUsageFileProps as Props,
} from './Styleguide-FieldUsage-File';

export default {
  title: 'Components/fields/Styleguide-FieldUsage-File',
  component: StyleguideFieldUsageFile,
} as ComponentMeta<typeof StyleguideFieldUsageFile>;

const layoutData = {
  sitecore: {
    context: {
      pageEditing: false,
      site: {
        name: '<%- appName %>',
      },
      language: 'en',
      itemPath: '/',
    },
    route: {
      name: 'home',
      displayName: 'home',
      fields: {
        pageTitle: {
          value: 'Welcome to Sitecore JSS',
        },
      },
      databaseName: 'master',
      deviceId: 'fe5d7fdf-89c0-4d99-9aa3-b5fbd009c9f3',
      itemId: '45be1451-fa83-5f80-9f0d-d7457b480b58',
      itemLanguage: 'en',
      itemVersion: 1,
      layoutId: '1db67245-f673-5e7f-9726-e7c5e76350f1',
      templateId: '787584c0-a057-5876-9836-f8b3708f0caf',
      templateName: 'App Route',
      placeholders: {},
    },
  },
};

// eslint-disable-next-line react/display-name
const componentFactory = () => () => <div>Test</div>;

const Template: ComponentStory<typeof StyleguideFieldUsageFile> = (args) => (
  <StyleguideFieldUsageFile {...args} />
);

type Args = Omit<Props, 'fields'> & {
  fields: ValueFields<Props['fields']>;
};

export const Default = Template.bind({});
Default.args = withFields<Args, Props>({
  params: {
    name: 'Styleguide-FieldUsage-File',
  },
  rendering: {
    uid: '{00000000-0000-0000-0000-000000000000}',
    componentName: 'Styleguide-FieldUsage-File',
    dataSource: '{00000000-0000-0000-0000-000000000000}',
  },
  fields: {
    heading: 'File',
    description:
        '<small>Note: Sitecore does not support inline editing of File fields. The value must be edited in Experience Editor by using the edit rendering fields button (looks like a pencil) with the whole component selected.</small>',
    file: {
        src: '/data/media/files/jss.pdf',
        title: 'Example File',
        description: 'This data will be added to the Sitecore Media Library on import',
      },
    },
});
Default.decorators = [
  (Story) => (
    <SitecoreContext componentFactory={componentFactory} layoutData={layoutData}>
      <Story />
    </SitecoreContext>
  ),
];
