// @flow

import React from 'react';

const withContext = ContextConsumer => Component => props => (
  <ContextConsumer>{
    context => <Component {...props} context={context}/>
  }</ContextConsumer>
);

export default withContext;
