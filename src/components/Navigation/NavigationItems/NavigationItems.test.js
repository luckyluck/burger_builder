import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({
    adapter: new Adapter()
});

describe('NavigationItems', () => {
    let wrapper;
    
    beforeEach(() => {
        wrapper = shallow(<NavigationItems/>);
    });
    
    it('should render two NavigationItem elements if user is not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    
    it('should render three NavigationItem elements if user is authenticated', () => {
        wrapper.setProps({ isAuthenticated: true });
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    
    it('should contain Logout NavigationItem element if user is authenticated', () => {
        wrapper.setProps({ isAuthenticated: true });
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
});
