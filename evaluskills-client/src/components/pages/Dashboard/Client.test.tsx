import { configure,mount,render,shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16'
import React from 'react';
import Client from './Client';
import ReactDOM from 'react-dom';
import IClientList from "../../../interfaces/Client";

configure({adapter: new Adapter()});
describe ('Client', () => {

    const cols = [
        { header: 'Logo', name: 'logo' },
        { header: 'Client Name', name: 'clientName' },
        { header: 'Contact Number', name: 'contactNumber' },
        { header: 'Email', name: 'email' },
        { header: 'Plan', name: 'plan' },
        { header: 'No. of Assessments', name: 'noOfAssessment' },
        { header: 'No. of Participants', name: 'noOfParticipants' },
        { header: 'No. of Evaluators', name: 'noOfEvaluators' },
        { header: 'Status', name: 'status' }
    ];

    const data = [
        { id: 1, clientName: 'TkXel', clientNumber: '+1 818-452-1505', status: 'Active', plan: 'Plan 01', contactName: 'Maria Garcia', email: 'maria@evaluskills.com', noOfAssessments: '25', noOfEvaluators: '28', noOfParticipants: '30' },
        { id: 2, clientName: 'TkXel', clientNumber: '+1 828-452-1505', status: 'inActive', plan: 'Plan 01', contactName: 'Maria Garcia', email: 'maria@evaluskills.com', noOfAssessments: '25', noOfEvaluators: '28', noOfParticipants: '30' },
        { id: 3, clientName: 'TkXel', clientNumber: '+1 838-452-1505', status: 'Active', plan: 'Plan 01', contactName: 'Maria Garcia', email: 'maria@evaluskills.com', noOfAssessments: '25', noOfEvaluators: '28', noOfParticipants: '30' },
        { id: 4, clientName: 'TkXel', clientNumber: '+1 848-452-1505', status: 'Active', plan: 'Plan 01', contactName: 'Maria Garcia', email: 'maria@evaluskills.com', noOfAssessments: '25', noOfEvaluators: '28', noOfParticipants: '30' },
        { id: 5, clientName: 'TkXel', clientNumber: '+1 858-452-1505', status: 'inActive', plan: 'Plan 01', contactName: 'Maria Garcia', email: 'maria@evaluskills.com', noOfAssessments: '25', noOfEvaluators: '28', noOfParticipants: '30' },
        { id: 6, clientName: 'TkXel', clientNumber: '+1 868-452-1505', status: 'Active', plan: 'Plan 01', contactName: 'Maria Garcia', email: 'maria@evaluskills.com', noOfAssessments: '25', noOfEvaluators: '28', noOfParticipants: '30' },
    ];

    const client = shallow(<Client />);

    it ('render successfully', () => {
        expect(client).toMatchSnapshot();
    })

    it ('check table is defined or not', () => {
        expect(client.find('.table')).toBeDefined();
    })

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(  <Router><Client /></Router>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('to be defind of form control `.table`', () => {
        const wrapper = shallow(<Client />);
        expect(wrapper.find('.table')).toBeDefined();

    });

    it('1 thead form `.table`', () => {
        const wrapper = mount(<Router><Client /></Router>);
        expect(wrapper.find('thead')).toHaveLength(1);
        expect(wrapper.find('.table')).toBeDefined();
    });

    it('table head Rows form `.table`', () => {
        const wrapper = mount(<Router><Client /></Router>);
        const thead = wrapper.find('thead');
        expect(thead.find('tr')).toHaveLength(1);
        expect(wrapper.find('.table')).toBeDefined();
    });

    it('table head columns form `.table`', () => {
        const wrapper = mount(<Router><Client /></Router>);
        const thead = wrapper.find('thead');
        expect(thead.find('th')).toHaveLength(9);
        expect(wrapper.find('.table')).toBeDefined();
    });

    it('values matching of table head form `.table`', () => {
        const wrapper = mount(<Router><Client /></Router>);
        const headers = wrapper.find('th');
        headers.forEach((th, idx) => {
            expect(th.text()).toEqual(cols[idx].header);
        });
        expect(wrapper.find('.table')).toBeDefined();
    });

    it('1 tbody form `.table`', () => {
        const wrapper = mount(<Router><Client /></Router>);
        expect(wrapper.find('tbody')).toHaveLength(1);
        expect(wrapper.find('.table')).toBeDefined();
    });

    // it('number of tr form `.table`', () => {
    //     const wrapper = shallow(<Router><Client data={data} /></Router>);
    //     const body = wrapper.find('tbody')
    //     expect(body.find('tr')).toHaveLength(5);
    //     expect(wrapper.find('.table')).toBeDefined();
    // });

    // it('values of tbody form `.table`', () => {
    //     const wrapper = mount(<Router><Client /></Router>);
    //     const rows = wrapper.find('tr')
    //     rows.forEach((tr, rowIndex) => {
    //         const cells = tr.find('td');
    //         expect(cells).toHaveLength(cols.length);
    //         expect(cells.at(0).text()).toEqual(data[rowIndex].id);
    //         expect(cells.at(1).text()).toEqual(data[rowIndex].clientName);
    //         expect(cells.at(2).text()).toEqual(data[rowIndex].clientNumber);
    //     });
    //     expect(wrapper.find('.table')).toBeDefined();
    // });

})