const POIDS_CATEGORIES = {
  "Seniors": {
    M: ["-60 kg", "-66 kg", "-73 kg", "-81 kg", "-90 kg", "-100 kg", "+100 kg"],
    F: ["-48 kg", "-52 kg", "-57 kg", "-63 kg", "-70 kg", "-78 kg", "+78 kg"]
  },
  "Juniors": {
    M: ["-55 kg", "-60 kg", "-66 kg", "-73 kg", "-81 kg", "-90 kg", "-100 kg", "+100 kg"],
    F: ["-44 kg", "-48 kg", "-52 kg", "-57 kg", "-63 kg", "-70 kg", "-78 kg", "+78 kg"]
  }
};

const TEMPS_REGLEMENTAIRES = {
  "Seniors": 240,
  "Juniors": 180
};

const TOLERANCE_IJF_KG = 0.2;

module.exports = {
  POIDS_CATEGORIES,
  TEMPS_REGLEMENTAIRES,
  TOLERANCE_IJF_KG
};
