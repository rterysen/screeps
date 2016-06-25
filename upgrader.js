var creepMaster = require('creep-master')

;

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
          creepMaster.scanHostiles(creep);
          if(!creep.memory.attacking)
        creepMaster.upgrade(creep);
	}
};

module.exports = roleUpgrader;

