import { ErrorMapper } from "./utils/ErrorMapper";
import Cleaner from "./utils/Cleaner";
import Controller from "./Creeps/Controller";

const config: IConfig = {
  min_energy_in_spawn: 200,
  harvesters:{
    amount: 1
  },
  upgraders:{
    amount: 5
  }
}

const controller = new Controller(Game.spawns["Spawn_1"], config);
export const loop = ErrorMapper.wrapLoop(() => {
  if(Game.cpu.bucket > 5000){
    Game.cpu.generatePixel();
    console.log("Digged pixel :D");
  }
  Cleaner.clearUnusedCreepMemory();
  controller
    .update()
    .spawn()
    .work();
});
