export const statusToStringTR = (data) => {
  if (data == 22) {
    return "Bağlantı Yok";
  } else if (data == 31) {
    return "Makine Kapalı";
  } else if (data == 32) {
    return "Pasif";
  } else if (data == 33) {
    return "Aktif";
  } else if (data == 10) {
    return "Arıza";
  } else if (data == 11) {
    return "Andon Button Act";
  } else if (data == 51) {
    return "Birinici Dijital Sensor Çıktı";
  } else if (data == 52) {
    return "İkinci Dijital Sensor Çıktı";
  } else if (data == 53) {
    return "Birinici Analog Sensor Çıktı";
  } else if (data == 54) {
    return "İkinci Analog Sensor Çıktı";
  } else if (data == 58) {
    return "Birinci Analog Sensor Ölçüm Sınırının Üzerinde";
  } else if (data == 59) {
    return "İkinci Analog Sensor Ölçüm Sınırının Üzerinde";
  } else if (data == 62) {
    return "Daily Trigger";
  } else if (data == 63) {
    return "Günlük Node Snap Limiti Bitmiştir";
  } else if (data == 70) {
    return "Kulenin Elekriği Yok";
  } else if (data == 81) {
    return "Esp Yazılım Güncellemesi";
  } else if (data == 82) {
    return "Stm Yazılım Güncellemesi";
  } else {
    return "Tanımsız Status";
  }
};
