import { makeAutoObservable, autorun, toJS } from "mobx";
import { RootStore } from "./index";
import { i18n } from "next-i18next";

const minutes = Array.from({ length: 60 }, (_, i) => i + 1).map((el, i) => [
  `${i}`,
  null,
  null,
  null,
  null,
]);

const dataChart: any[] = [
  [
    {
      type: "string",
      id: "Date",
    },
    {
      type: "number",
      label: "Open",
    },
    {
      type: "number",
      label: "Low",
    },
    {
      type: "number",
      label: "High",
    },
    {
      type: "number",
      label: "Close",
    },
  ],
  ...minutes,
];

export class UiStore {
  public rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    autorun(() => {
      i18n?.language && this.setLang(i18n?.language);
    });
    makeAutoObservable(this);
  }

  lang = "en";
  components = [];
  _tickers = dataChart;

  setLang(lang: string): void {
    this.lang = lang;
  }
  setTickers(tickers: any[]): void {
    this._tickers = tickers;
  }

  setComponents(items: string[]): void {
    this.components = items;
  }

  get cLang(): string {
    return this.lang;
  }

  get tickers(): any[] {
    return toJS(this._tickers);
  }
}
