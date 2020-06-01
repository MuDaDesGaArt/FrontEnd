import React, { Component } from 'react';
import { CTLayout } from 'layout';
import { CTFormExampleUsage } from 'layout/CTForm/ExampleUsage';
import { api } from 'utils';

export class NewCourse extends Component {
  componentDidMount() {
    api.contentLoaded();
  }

  render() {
    const layoutProps = CTLayout.createProps({
      transition: true,
      responsive: true,
      footer: true,
      headingProps: {
        heading: 'Create a New Course',
        icon: 'add',
        sticky: true,
        gradient: true,
        offsetTop: 30
      }
    });

    return (
      <CTLayout {...layoutProps}>
        <CTFormExampleUsage />
      </CTLayout>
    )
  }
}