import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";

class ChatStore {
  constructor() {
    makeAutoObservable(this);
    if (typeof window !== "undefined") {
      makePersistable(this, {
        name: "ChatStore",
        properties: ["messageList"],
        storage: window.localStorage,
      });
    }
  }
  
  labelsArray = [];

  currentGroupChat = null;
  setCurrentGroupChat = (value) => {
    this.currentGroupChat = value;
  };

  currentGroupChatInfoId = null;
  setCurrentGroupChatId = (id) => {
    this.currentGroupChatInfoId = id;
  };

  currentPoll = null;
  setCurrentPoll = (value) => {
    this.currentPoll = value;
  };

  messageList = [];
  setMessageList = (messages) => {
    this.messageList = messages?.sort((a, b) => {
      return (
        (b?.lastMessage?.timetoken || 0) - (a?.lastMessage?.timetoken || 0)
      );
    });
  };

  chatMessages = [];
  setChatMessages = (message) => {
    this.chatMessages = message;
  };

  setCurrentChatUser = (name, avatar) => {
    this.currentChatUser = {
      name: name,
      avatar: avatar,
    };
  };

  addMessageToChat = (message) => {
    this.chatMessages = [message, ...this.chatMessages];
  };

  sortingTaskNumber = false;
  setSortingTaskNumber(boolean) {
    this.sortingTaskNumber = boolean;
  }

  sortingUpuPoint = false;
  setSortingUpuPoint(boolean) {
    this.sortingUpuPoint = boolean;
  }

  sortingDeadline = false;
  setSortingDeadline(boolean) {
    this.sortingDeadline = boolean;
  }
}

const chatStore = new ChatStore();
export { chatStore };
