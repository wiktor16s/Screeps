class Creeps {
    public creeps: {[creepName: string]: Creep};

    constructor(){
        this.creeps = Game.creeps;
    }
}

export default Creeps;