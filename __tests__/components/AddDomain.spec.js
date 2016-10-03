import React from 'react';
import renderer from 'react-test-renderer';
import AddDomain from '../../client/components/AddDomain';

test('Matches with the snapshot', () => {
  const props = { config: { defaultTitle: 'PokeDOMTest' } };
  const component = renderer.create(<AddDomain {...props} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
