export const getDatosGenerales = async () => [
  { id: 1, devAddr: "A1B2C3", tenant: "EcoCorp", device: "Sensor-X1", time: "2025-10-27 09:00", dr: "SF7BW125", fcnt: 15 },
  { id: 2, devAddr: "D4E5F6", tenant: "GreenTech", device: "Sensor-Y9", time: "2025-10-27 09:10", dr: "SF8BW125", fcnt: 10 },
];

export const getDatosSonido = async () => [
  { id: 1, name: "MicRO-01", laeq: 62.5, lai: 58.3, laiMax: 71.1, battery: 88, status: "Normal" },
  { id: 2, name: "MicRO-02", laeq: 74.2, lai: 70.8, laiMax: 84.9, battery: 65, status: "Alto" },
];

export const getDatosDistancia = async () => [
  { id: 1, name: "EM310", distance: 2.45, position: "Tanque N°1", battery: 85, status: "OK" },
  { id: 2, name: "LLDS12", distance: 1.12, position: "Pozo A", battery: 60, status: "Atención" },
  { id: 3, name: "EM500", distance: 3.77, position: "Reservorio B", battery: 92, status: "OK" },
];
