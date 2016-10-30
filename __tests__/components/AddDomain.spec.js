import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';
import AddDomain from '../../client/components/AddDomain';

jest.mock('react-router');

describe('<AddDomain />', () => {
  const defaultConfig = { config: { defaultTitle: 'PokeDOMTest' } };
  const addDomain = sinon.spy();
  const props = Object.assign(defaultConfig, { addDomain });

  describe('render', () => {
    const component = shallow(<AddDomain {...props} />);

    it('match snapshot', () => {
      const tree = shallowToJson(component);
      jestExpect(tree).toMatchSnapshot();
    });

    it('contains a form', () => {
      expect(component.find('form')).to.have.length(1);
    });

    it('contains an input for the uri', () => {
      expect(component.find('input[type="text"]')).to.have.length(1);
    });

    it('contains an input for the submit', () => {
      expect(component.find('input[type="submit"]')).to.have.length(1);
    });
  });

  describe('componentDidMount', () => {
    sinon.spy(AddDomain.prototype, 'componentDidMount');
    mount(<AddDomain {...props} />);

    it('should called once', () => {
      expect(AddDomain.prototype.componentDidMount.calledOnce).to.be.true();
    });
  });

  describe('onChange', () => {
    const component = shallow(<AddDomain {...props} />);
    const target = { value: 'http://www.google.com' };
    const changeEvent = { preventDefault: sinon.spy(), target };

    component.find('input[type="text"]').simulate('change', changeEvent);

    it('should call preventDefault', () => {
      expect(changeEvent.preventDefault.calledOnce).to.be.true();
    });

    it('should add uri value to the state', () => {
      expect(component.state('uri')).to.equal(target.value);
    });
  });

  describe('onSubmit', () => {
    const component = shallow(<AddDomain {...props} />);
    const submitEvent = { preventDefault: sinon.spy() };

    component.setState({ uri: 'https://www.google.com' });
    component.simulate('submit', submitEvent);

    it('should call preventDefault', () => {
      expect(submitEvent.preventDefault.calledOnce).to.be.true();
    });

    it('should call addDomain', () => {
      expect(addDomain.calledOnce).to.be.true();
    });
  });
});
