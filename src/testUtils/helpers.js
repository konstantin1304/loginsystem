import Adapter from 'enzyme-adapter-react-16';
import mochaSnapshots from 'mocha-snapshots';
import { shallow, configure } from 'enzyme';
import { expect, assert } from 'chai';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import React from 'react';
import 'styled-components-test-utils/lib/chai';

configure({ adapter: new Adapter() });

global.sinon = sinon;
global.React = React;
global.assert = assert;
global.shallow = shallow;
global.expect = expect;
global.mochaSnapshots = mochaSnapshots;

global.snapshotCreator = ReactComponent => expect(ReactComponent).matchSnapshot();
global.shallowRender = StyledComponent => renderer.create(StyledComponent).toJSON();
global.WebSocket = () => {};