// @flow

import React from 'react';
import { TextInput } from '@/components/fragments';
import StepperForm from '@/components/StepperForm';

class CreateGoal extends React.PureComponent {

  render() {
    return (
      <StepperForm>
        <TextInput
          placeholder='eg. Petit con!'
          errorText='write something'
          validator={t => t.length > 3}
        />
        <TextInput
          placeholder='eg. Petit con2!'
          errorText='write something'
          validator={t => t.length > 1}
        />
        <TextInput
          placeholder='eg. Petit con3!'
          errorText='write something'
          validator={t => t.length > 6}
        />
        <TextInput
          placeholder='eg. Petit con4!'
          errorText='write something'
          validator={t => t.length > 4}
        />
      </StepperForm>
    );
  }

}

export default CreateGoal;
