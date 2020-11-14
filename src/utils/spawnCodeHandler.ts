export const handleSpawnCode = (code: ScreepsReturnCode) => {
    switch (code) {
      case OK:
          console.log(`creep was spawned successfully`);
        break;
      case ERR_NOT_OWNER:
          console.log(`You are not owner of this spawn`);
        break;
      case ERR_NAME_EXISTS:
          console.log("Creep name already exists");
        break;
      case ERR_BUSY:
          console.log("Spawn Queue is busy");
        break;
      case ERR_NOT_ENOUGH_ENERGY:
          console.log("You have not enought energy");
        break;
      case ERR_INVALID_ARGS:
          console.log("Invalid body");
        break;
      case ERR_RCL_NOT_ENOUGH:
          console.log("Controller level too low");
        break;
    }
  }