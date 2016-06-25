var creepMaster = require('creep-master');


var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
          creepMaster.scanHostiles(creep);
          if(!creep.memory.attacking)
        creepMaster.build(creep);
	}
};

module.exports = roleBuilder;