import mitt from "mitt";
import { RouteLocationNormalized } from "vue-router";

export class historyService {
  private static _instance: historyService;
  private history: RouteLocationNormalized[] = [];
  public events = mitt();

  private constructor() {}

  public static getInstance(): historyService {
    if (!historyService._instance) {
      historyService._instance = new historyService();
    }
    return historyService._instance;
  }

  public push(to: RouteLocationNormalized) {
    if (
      this.history.length === 0 ||
      this.history[this.history.length - 1].fullPath !== to.fullPath
    ) {
      this.history.push(to);
      this.events.emit("update", this.history);
    }
  }

  public pop(): RouteLocationNormalized | undefined {
    if (this.history.length > 1) {
      this.history.pop();
      this.events.emit("update", this.history);
      return this.history[this.history.length - 1];
    }
    return undefined;
  }

  public getHistory(): RouteLocationNormalized[] {
    return this.history;
  }
}
