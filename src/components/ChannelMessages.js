import React, { Component } from "react";
import channelStore from "../stores/channelStore";
import { observer } from "mobx-react";
import Loading from "./Loading.js";
import ScrollIntoView from "react-scroll-into-view";
import ScrollableAnchor from "react-scrollable-anchor";

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NewMessage: ""
    };
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    channelStore.selectChannel(id);
    setInterval(() => channelStore.selectChannel(id), 1000);
  }

  handleNewMessage(e) {
    this.setState({ NewMessage: e.target.value });
  }

  onHandleChange(e) {
    this.setState({
      NewMessage: e.target.value
    });
  }

  onHandleSubmit(e) {
    e.preventDefault();
    const message = this.state.message;
    this.props.onHandleSubmit(message);
    this.setState({
      NewMessage: " "
    });
  }

  sendMessage() {
    console.log("hello");
  }

  componentDidUpdate(prevProps) {
    const id = this.props.match.params.id;
    if (prevProps.match.params.id !== id) {
      channelStore.selectChannel(id);
    }
  }
  enterPressed(event) {
    var code = event.keyCode || event.which;
    if (code === 13) {
      channelStore.addmessage(
        this.state.NewMessage,
        this.props.match.params.id
      );
      this.refs.textinput.value = ""; ///copy the button click equations here
    }
  }

  //inside the input box write in

  render() {
    const id = this.props.match.params.id;
    if (!channelStore.loading) {
      console.log(channelStore.channels.length);

      let channelname = channelStore.channels.find(name => +name.id === +id);
      let messageobj = channelStore.selectedchannel.map(message => (
        <div>
          <div class="card">
            <h5 class="card-header">{message.username}</h5>
            <div class="card-body">
              <p class="card-text">{message.message}</p>
            </div>
          </div>
          <br />
        </div>
      )); // console.log(channelStore.selectChannel(id));
      let messagebutton = (
        <button
          onClick={() => channelStore.addmessage(this.state.NewMessage, id)}
        >
          Submit
        </button>
      );

      return (
        <div>
          <header className="masthead d-flex">
            <div className="container text-center my-auto z-1">
              <h1 className="mb-1">
                Welcome to the {channelname.name} channel
              </h1>
              {/* <a href="#bottom"> Go to the Submission Area </a> */}
              <h3 className="mb-5">
                <em>{this.state.NewMessage}</em>
              </h3>
              {messageobj}
              <br />
              {/* <ScrollableAnchor id={"bottom"} /> */}
              <div id="#footer" />

              <div class="input-group mb-3 fixed-bottom">
                <div className="col-md-2" />
                <input
                  type="text"
                  class="form-control"
                  ref="textinput"
                  placeholder="Type your message here noob!"
                  onChange={this.handleNewMessage.bind(this)}
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                  onKeyPress={this.enterPressed.bind(this)}
                />

                <div class="input-group-prepend">
                  <button
                    class="btn btn-outline-secondary btn-outline-success"
                    type="button"
                    id="button-addon1"
                    onClick={() => {
                      channelStore.addmessage(this.state.NewMessage, id);
                      this.refs.textinput.value = "";
                    }}
                  >
                    Submit
                  </button>
                </div>
                <div className="col-md-2" />
              </div>
            </div>
            <div className="overlay z-0" />
          </header>
        </div>
      );
    } else {
      return <Loading />;
    }
    // This is the Loading Part - else
  }
}

export default observer(Messages);
