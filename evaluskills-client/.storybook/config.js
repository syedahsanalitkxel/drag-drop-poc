import React from 'react'
import { configure, addParameters, addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withA11y } from '@storybook/addon-a11y'
import { withKnobs } from '@storybook/addon-knobs'
import StoryRouter from 'storybook-react-router'

addDecorator(withA11y)
addDecorator(withKnobs)
addDecorator(withInfo)
addDecorator(StoryRouter())

const Container = storyFn => (
  <div id="wrapper">
    <div style={{ background: 'white', padding: '40px' }}>{storyFn()}</div>
  </div>
)
addDecorator(Container)

// automatically import all files ending in *.stories.tsx
const req = require.context('../src', true, /.stories.tsx$/)

function loadStories() {
  req.keys().forEach(req)
}

addParameters({
  options: {
    brandTitle: 'Peregrine EvaluSkills Kitchen Sink',
  },
})

configure(loadStories, module)
