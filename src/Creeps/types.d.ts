interface ICreepsAmount {
  harvesters: number;
  transporters: number;
  upgraders: number;
}

interface IConfig {
  min_energy_in_spawn: number,
  harvesters: {
    amount: number
  };
  upgraders:{
    amount: number
  }
}
