import React, { useState } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import styled from 'styled-components';

interface Props {
  name?: string;
  designation?: string;
  profilePicture?: string;
}

const StyledName = styled.span`
  color: white;
`;

const ProfileBadge: React.FunctionComponent<Props> = ({ name, designation, profilePicture }) => {
  if (!name && !designation && !profilePicture) {
    return <div>No Profile Data</div>;
  }

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const renderDesignation = () => {
    if (designation) {
      return (
        <span className="text-muted text-xs block">
          {designation} <b className="caret" />
        </span>
      );
    }
  };

  return (
    <React.Fragment>
      <div className="dropdown profile-element">
        {profilePicture && <img alt="image" className="rounded-circle" src={profilePicture} />}
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret={true} tag="a">
            {name && <StyledName className="block m-t-xs font-bold">{name}</StyledName>}
            {renderDesignation()}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>Profile</DropdownItem>
            <DropdownItem>Contacts</DropdownItem>
            <DropdownItem>Mailbox</DropdownItem>
            <DropdownItem divider={true} />
            <DropdownItem>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="logo-element">IN+</div>
    </React.Fragment>
  );
};
export default ProfileBadge;
