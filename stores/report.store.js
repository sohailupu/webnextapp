import { makeAutoObservable } from "mobx";

class ReportStore {
  constructor() {
    makeAutoObservable(this);
  }

  isModalOpen = false;
  currentReport = {
    name: "",
    data: [],
  };
  savedReports = [];
  isEdit = false;

  dataTypes = {
    company: [
      {
        label: "UPU Point",
        value: "upuPoint",
      },
      { label: "kVAh", value: "kwh" },
      {
        label: "Kayiplar",
        value: "losses",
      },

      {
        label: "Planned Production Time",
        value: "planned",
      },
      {
        label: "Teorical Production Time",
        value: "teorical",
      },
    ],
    user: [
      {
        label: "UPU Point",
        value: "upuPoint",
      },
      {
        label: "Performance",
        value: "performance",
      },
    ],
    node: [
      { label: "kVAh", value: "kwh" },

      { label: "Losses", value: "losses" },

      { label: "Avability", value: "avaibility" },
      {
        label: "Performance",
        value: "performance",
      },
      {
        label: "Timeline",
        value: "timeline",
      },
      {
        label: "Measurable Production Time",
        value: "measurable",
      },
      {
        label: "Utilization",
        value: "utilization",
      },
    ],
    process: [
      { label: "kVAh", value: "kwh" },

      { label: "Losses", value: "losses" },

      { label: "Avability", value: "avaibility" },
      {
        label: "Performance",
        value: "performance",
      },

      {
        label: "Measurable Production Time",
        value: "measurable",
      },
      {
        label: "Utilization",
        value: "utilization",
      },
    ],
  };

  setCurrentModalData = (data) => {
    this.currentModalData = data;
    this.isModalOpen = true;
  };

  setSavePayload = (data) => {
    this.savePayload = data;
  };

  removeFromReport = (item, index, i2, i3) => {
    if (!i3) {
      this.currentReport.data[index].splice(i2, 1);
      this.currentReport.data = [...this.currentReport.data];
    } else {
      this.currentReport.data[index][i2].splice(i3, 1);
      this.currentReport.data = [...this.currentReport.data];
    }
  };

  setCurrentReport = (name, data) => {
    this.currentReport = {
      name: name,
      data: data,
    };
  };

  triggerModal = () => {
    this.isModalOpen = !this.isModalOpen;
  };

  deleteCurrentReport = () => {
    this.currentReport = {
      name: "",
      data: [],
    };
  };

  setIsEdit = (value) => {
    this.isEdit = value;
  };

  updateCurrentReport = () => {
    this.savedReports = this.savedReports.map((rep) =>
      rep.name === this.currentReport.name
        ? {
            ...rep,
            data: this.currentReport.data,
          }
        : rep
    );
    this.currentReport = {
      name: "",
      data: [],
    };
    this.isEdit = false;
  };

  saveCurrentReport = (name) => {
    this.savedReports.push({
      name: name,
      data: this.currentReport.data,
    });
    this.isEdit = false;
  };

  addCurrentReport = (data) => {
    this.currentReport.data.push(data);
  };
}

const reportStore = new ReportStore();
export { reportStore };
