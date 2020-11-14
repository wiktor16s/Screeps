import Creeps from "./Creep";
import { creepState } from "../constants/creeps";
import { handleSpawnCode } from "../utils/spawnCodeHandler";

class Constructor extends Creeps {
  public creep: Creep;
  public name: string;
  public spawnCode: ScreepsReturnCode;
  public body: BodyPartConstant[];

  constructor(body: BodyPartConstant[], name: string) {
    super();
    this.body = body;
    this.name = name;
    this.spawnCode = Game.spawns["Spawn1"].spawnCreep(body, name);
    this.creep = Game.creeps[this.name];
    this.onCreate();
  }

  private onCreate(): Constructor {
    handleSpawnCode(this.spawnCode);

    if (this.spawnCode === OK) {
      console.log("spawned");
      this.creep.memory = {
        role: "constructor",
        target: "",
        room: this.creep.pos.roomName,
        working: false
      };
      return this;
    } else {
      console.log(`ERROR_WHILE_SPAWNING_CREEP_${this.spawnCode}`);
      return this;
    }
  }

  setTask(): Constructor {
    if (!this.creep) throw new Error("Spawn this creep first");
    
    return this;
  }
}

export default Constructor;
