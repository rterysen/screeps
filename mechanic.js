var creepMaster = require('creep-master');


var roleMechanic = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
          creepMaster.scanHostiles(creep);
          if(creep.memory.repairing && creep.carry.energy == 0 && !creep.memory.attacking) {
            creep.memory.repairing = false;
	    }
	    if(!creep.memory.repairing && _.sum(creep.carry) == creep.carryCapacity) {
	        creep.memory.repairing = true;
	    }
        
	    if(creep.memory.repairing) {
	        creepMaster.repair(creep);
	    }
	    else {
	     creepMaster.harvest(creep);
	    }
	}
};

module.exports = roleMechanic;