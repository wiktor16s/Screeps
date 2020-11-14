class Construction {
    public room: Room;
    constructor(room: Room){
        this.room = room;        
    }
    
    public createConstructionSite(x: number, y: number ){
        this.room.createConstructionSite(x, y, STRUCTURE_CONTAINER);
    }
}

export default Building;