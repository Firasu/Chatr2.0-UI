import React from "react";
import { Link } from "react-router-dom";
import channelStore from "../../stores/channelStore";
import { observer } from "mobx-react";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";

// Components
import ChannelNavLink from "./ChannelNavLink";
import authStore from "../../stores/authStore";

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: false, newChannel: "" };
  }

  handlenewchannel(e) {
    this.setState({ newChannel: e.target.value });
  }

  render() {
    let channelLinks = channelStore.channels.map(channel => (
      <ChannelNavLink key={channel.name} channel={channel} />
    ));

    if (!authStore.isLoggedIn) {
      channelLinks = <div />;
    }

    let newChannel = (
      <li className="nav-item" data-toggle="tooltip" data-placement="right">
        <input
          type="text"
          placeholder="New Channel"
          onChange={this.handlenewchannel.bind(this)}
        />
        <button onClick={() => channelStore.addchannel(this.state.newChannel)}>
          <FontAwesomeIcon icon={faPlusCircle} className="success" />
        </button>
      </li>
    );

    let createChannel = (
      <li className="nav-item" data-toggle="tooltip" data-placement="right">
        <Link className="nav-link heading" to="/createChannel">
          <span className="nav-link-text mr-2">Channels</span>
          <FontAwesomeIcon icon={faPlusCircle} />
        </Link>
      </li>
    );
    if (!authStore.isLoggedIn) {
      createChannel = <div />;
    }

    return (
      <div>
        <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
          {createChannel}
          {channelLinks}
          {newChannel}
        </ul>
        <ul className="navbar-nav sidenav-toggler">
          <li className="nav-item">
            <a
              className="nav-link text-center"
              id="sidenavToggler"
              onClick={() =>
                this.setState(prevState => ({
                  collapsed: !prevState.collapsed
                }))
              }
            >
              <FontAwesomeIcon
                icon={this.state.collapsed ? faAngleRight : faAngleLeft}
              />
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default observer(SideNav);
