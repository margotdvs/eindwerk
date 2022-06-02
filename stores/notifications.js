import { defineStore } from 'pinia';

export const useNotificationsStore = defineStore('notifications', {
  state: () => {
    return {
      latestId: 0,
      closedNotifications: [],
      notifications: [],
    };
  },
  getters: {
    openNotifications() {
      return this.notifications.filter(
        (notification) => !this.closedNotifications.includes(notification.id),
      );
    },
  },
  actions: {
    close(id) {
      this.closedNotifications.push(id);
    },
    addNotification(text, type) {
      this.latestId++;
      const tempId = this.latestId;
      this.notifications.push({ id: this.latestId, text, type });
      setTimeout(() => {
        this.close(tempId);
      }, 4000);
    },
    addError(text) {
      this.addNotification(text, 'error');
    },
    addMessage(text) {
      this.addNotification(text, 'message');
    },
  },
});
