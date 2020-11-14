import Harvester from "./Harvester";
import Upgrader from "./Upgrader";
import { roles } from "../constants/creeps";

class Controller {
  public config: IConfig;
  public creepsAmount: ICreepsAmount;
  public spawner: StructureSpawn;

  constructor(spawner: StructureSpawn, config: IConfig) {
    this.config = config;
    this.spawner = spawner;
    this.creepsAmount = {
      harvesters: 0,
      transporters: 0,
      upgraders: 0
    };
  }

  throwError(error: any) {
    console.log(error);
  }

  update(): Controller {
    this.creepsAmount.harvesters = 0;
    this.creepsAmount.transporters = 0;
    this.creepsAmount.upgraders = 0;

    for (let name in Game.creeps) {
      const creep = Game.creeps[name];
      const creepMemory = Memory.creeps[name];

      switch (creepMemory.role) {
        case roles.HARVESTER:
          this.creepsAmount.harvesters += 1;
          break;
        case roles.TRANSPORTER:
          this.creepsAmount.transporters += 1;
          break;
        case roles.UPGRADER:
          this.creepsAmount.upgraders += 1;
          break;
        default:
          this.throwError("NO_ROLE_HANDLER_IN_CONTROLLER_UPDATER");
      }
    }
    return this;
  }

  spawn(): Controller {
    const energy = Game.spawns["Spawn1"].store[RESOURCE_ENERGY];
    if (!Game.spawns["Spawn1"].spawning && energy > 200) {
      if (this.creepsAmount.harvesters < this.config.harvesters.amount) {
        new Harvester(
          [MOVE, WORK, CARRY],
          `harvester_${Game.time}`
        ).setTargetAtClosestResource();
      }

      if (this.creepsAmount.upgraders < this.config.upgraders.amount) {
        new Upgrader([MOVE, WORK, CARRY], `upgrader_${Game.time}`).setTargetAtClosestResource();
      }
    }
    return this;
  }

  work(): Controller {
    for (let name in Game.creeps) {
      const creep = Game.creeps[name];
      switch (creep.memory.role) {
        case roles.HARVESTER:
          this.handleHarvesterWork(creep);
          break;
        case roles.UPGRADER:
          this.handleUpgraderWork(creep);
          break;
        case roles.WIKTOR:
          this.handleWiktorWork(creep);
          break;
        default:
          console.log("NO_WORK_HANDLER_FOR_THIS_ROLE");
      }
    }
    return this;
  }

  private handleHarvesterWork(creep: Creep): void {
    if (creep.memory.working && creep.store.getUsedCapacity() === 0) {
      creep.memory.working = false;
    } else if (!creep.memory.working && creep.store.energy == creep.store.getCapacity()) {
      creep.memory.working = true;
    }

    if (creep.memory.working) {
      if (creep.transfer(Game.spawns["Spawn1"], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.say("I`m Done..", true);
        creep.moveTo(Game.spawns["Spawn1"]);
      } else {
        creep.say("🎶", true);
      }
    } else {
      const sources: Source[] = creep.room.find(FIND_SOURCES);
      const source = sources.find(s => s.id === creep.memory.target);
      if (source) {
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
          creep.say("⛏️", true);
          creep.moveTo(source);
        } else {
          creep.say("🎶", true);
        }
      }
    }
  }
  //10,5  W19S52
  private handleUpgraderWork(creep: Creep): void {
    if (creep.memory.working && creep.store.getUsedCapacity() === 0) {
      creep.memory.working = false;
    } else if (!creep.memory.working && creep.store.energy == creep.store.getCapacity()) {
      creep.memory.working = true;
    }

    if (creep.memory.working) {
      if (creep.room.controller && creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
        creep.say("🔨", true);
        creep.moveTo(creep.room.controller);
      } else {
        creep.say("🎶");
      }
    } else {
      const sources: Source[] = creep.room.find(FIND_SOURCES);
      const source = sources.find(s => s.id === creep.memory.target);
      if (!source) {
        console.log(creep.name + " cannot find resource");
      }
      if (source) {
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
          creep.say("⛏️", true);
          creep.moveTo(source);
        } else {
          creep.say("🎶");
        }
      }
    }
  }

  private handleWiktorWork(creep: Creep) {
    console.log("wiktor");
    creep.say("Hi! Peace✌");
    creep.moveTo(new RoomPosition(10, 5, "W19S52"), {
      visualizePathStyle: {
        fill: "transparent",
        stroke: "#fff",
        lineStyle: "dashed",
        strokeWidth: 0.15,
        opacity: 0.1
      }
    });
  }
}

export default Controller;
