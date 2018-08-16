import React from "react";
import { decorate, observable, computed } from "mobx";
import axios from "axios";

// Utils
import setAuthToken from "../utils/setAuthToken";

const instance = axios.create({
  baseURL: "http://192.168.100.54"
});

class ChannelStore {
  constructor() {
    this.channels = [];
    this.selectedchannel = {};
    this.loading = true;
    this.messages = [];
  }

  fetchchannels() {
    return instance
      .get("/channels/")
      .then(res => res.data)
      .then(channels => (this.channels = channels))
      .catch(err => console.error(err));
  }
  addchannel(newChannel) {
    return instance
      .post("/channels/create/", { name: newChannel })
      .then(response => console.log("Success"))
      .catch(err => console.error(err));
    console.log(newChannel);
  }

  addmessage(NewMessage, channelID) {
    return instance
      .post("/channels/" + channelID + "/send/", { message: NewMessage })
      .then(response => console.log("Success"))
      .catch(err => console.error(err));
  }

  selectChannel(id) {
    return instance
      .get("/channels/" + id + "/")
      .then(res => res.data)
      .then(channels => (this.selectedchannel = channels))
      .then(channels => console.log(channels))
      .then(load => {
        this.loading = false;
      })
      .catch(err => console.error(err));
  }
}

decorate(ChannelStore, {
  channels: observable,
  selectedchannel: observable,
  loading: observable,
  messages: observable
});

const channelStore = new ChannelStore();
channelStore.fetchchannels();
export default channelStore;
