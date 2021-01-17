import { EventEmitter } from "events";

import Dispatcher from "./dispatcher";
import Constants from "./constants";
import getSidebarNavItems from "../data/sidebar-nav-items";

let _store = {
  menuVisible: false,
  navItems: getSidebarNavItems(),
  alertVisible: false,
  alertText: '',
  alertSeverity: 'success',
};

class Store extends EventEmitter {
  constructor() {
    super();

    this.registerToActions = this.registerToActions.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);

    Dispatcher.register(this.registerToActions.bind(this));
  }

  registerToActions({ actionType, payload }) {
    switch (actionType) {
      case Constants.TOGGLE_SIDEBAR:
        this.toggleSidebar();
        break;
      case Constants.ACTIVATE_ALERT:
          this.activateAlert(true, payload.text, payload.severity);
          break;
      case Constants.CLOSE_ALERT:
        this.activateAlert(false, '', 'success');
        break;
      default:
    }
  }

  toggleSidebar() {
    _store.menuVisible = !_store.menuVisible;
    this.emit(Constants.CHANGE);
  }

  getMenuState() {
    return _store.menuVisible;
  }

  getSidebarItems() {
    return _store.navItems;
  }

  activateAlert(open, text, severity) {
    _store.alertVisible = open;
    _store.alertText = text;
    _store.alertSeverity = severity;
    this.emit(Constants.ALERT);
  }

  getAlertState() {
    return _store.alertVisible;
  }

  getAlertText() {
    return _store.alertText;
  }

  getAlertSeverity() {
    return _store.alertSeverity;
  }

  addChangeListener(callback) {
    this.on(Constants.CHANGE, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(Constants.CHANGE, callback);
  }

  addAlertListener(callback) {
    this.on(Constants.ALERT, callback);
  }

  removeAlertListener(callback) {
    this.removeListener(Constants.ALERT, callback);
  }
}

export default new Store();
