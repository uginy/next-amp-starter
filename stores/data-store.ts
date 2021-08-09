import { RootStore } from "./index";
import { makeAutoObservable } from "mobx";

export class DataStore {
  public rootStore: RootStore;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchData(): Promise<any> {
    return new Promise((res) => {
      const result = {
        first_name: "Name",
        last_name: "Last Name",
        employed: true,
        job: {
          type: "admin",
          salary: 4000,
        },
        contacts: {
          address: "address string",
          city: "Haifa",
          phone: {
            home: "123123123",
            job: "123133333",
          },
        },
      };
      setTimeout(() => {
        res(result);
      }, 2000);
    });
  }
}
