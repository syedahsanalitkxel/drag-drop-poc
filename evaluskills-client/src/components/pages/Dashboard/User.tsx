import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import User from "../../../interfaces/User";
import DashboardTemplate from '../../templates/DashboardTemplate';
import PageBody from '../../atoms/PageBody';
import PageHeader from '../../atoms/PageHeader';
import Pager from '../../molecules/Pager';

const usersData = [
    { id: 1, name: 'Robby Rash', role: 'Admin', email: 'robbyrash@gmail.com' },
    { id: 2, name: 'Jhon Doe', role: 'User', email: 'jhondoe@gmail.com' },
    { id: 3, name: 'Bella William', role: 'Admin', email: 'bellawilliam@gmail.com' },
    { id: 4, name: 'Rock Rash', role: 'User', email: 'rockrash@gmail.com' }
];

const DashboardHome: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const toggleFilterModal = () => {
        setModalVisible(!modalVisible);
    }

    const filterAction = (event: React.MouseEvent) => {
        // alert(`Filter button clicked ${event.timeStamp}`);
        event.preventDefault();
        toggleFilterModal()
    };

    const searchHandler = (searchQuery: string) => {
        alert(searchQuery);
    };

    const addAction = (event: React.MouseEvent) => {
        history.push('/users/add');
        // alert(`add button clicked ${event.timeStamp}`);
    };

    const renderUserData = (userData: User) => {
        return (
            <React.Fragment key = {userData.id}>
                <tr>
                    <td>{userData.id}</td>
                    <td>
                        <strong>{userData.name}</strong>
                    </td>
                    <td>
                        <strong>{userData.role}</strong>
                    </td>
                    <td>{userData.email}</td>
                </tr>
            </React.Fragment>
        )
    };

    return (
        <DashboardTemplate>
            <div className="row">
                <div className="col-lg-12">
                    <PageHeader
                        title="Users"
                        filterAction={filterAction}
                        searchHandler={searchHandler}
                        actionButtonText="Add User"
                        actionHandler={addAction}
                    />
                    <PageBody>
                        <div className="ibox m-b-15">
                            <div className="ibox-content">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Role</th>
                                        <th>Email</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {usersData.map(renderUserData)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <Pager />
                    </PageBody>
                </div>
            </div>


            {/* Filter Modal */}
            <div>
                <Modal isOpen={modalVisible} toggle={toggleFilterModal}>
                    <ModalHeader toggle={toggleFilterModal}>
                        Filters
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label font-bold">Role</label>
                            <div className="col-sm-8">
                                <select className="form-control m-b col-sm-12" name="role" >
                                    <option>Select Role</option>
                                    <option>option 2</option>
                                    <option>option 3</option>
                                    <option>option 4</option>
                                </select>
                            </div>
                        </div>
                        <div className="hr-line-dashed" />
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label font-bold">Clients</label>
                            <div className="col-sm-8">
                                <select className="form-control m-b col-sm-12" name="name" >
                                    <option>Select Clients</option>
                                    <option>option 2</option>
                                    <option>option 3</option>
                                    <option>option 4</option>
                                </select>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggleFilterModal}>Reset</Button>{' '}
                        <Button color="secondary" onClick={toggleFilterModal}>Apply</Button>
                    </ModalFooter>
                </Modal>
            </div>

        </DashboardTemplate>
    );
};

export default withRouter(DashboardHome);