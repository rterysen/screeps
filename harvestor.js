var creepMaster = require('creep-master'),
    helper = require('helper'),
    cons = require('constants')
    ;

var roleHarvester = {

    returnResources: function(creep){
        var target = {};
    
          var tower = creep.pos.findClosestByPath(FIND_STRUCTURES , {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
       
            if(tower && helper.creepsByRole(cons.Harvester) > 6 ){
                
                     target = tower;
               
            }else{
                
         
               target = creep.pos.findClosestByPath(FIND_STRUCTURES , {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN ) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            }
             
          
                if(creep.transfer(target, RESOURCE_ENERGY, 0) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }else{
                    creep.transfer(target, RESOURCE_ENERGY, creep.carry.energy);
                    if( creep.carry.energy > 0)
                        creep.memory.hasRemainingEnergy = true;
                        else 
                           creep.memory.hasRemainingEnergy = false;
                  
                }

            
	},
    /** @param {Creep} creep **/
    run: function(creep) {
       creepMaster.scanHostiles(creep);
  
	    if(_.sum(creep.carry) < creep.carryCapacity && !creep.memory.hasRemainingEnergy && !creep.memory.attacking) {
	       
         
                            creepMaster.harvest(creep);
                        
            
	            }
        	    else  {
        
                    this.returnResources(creep);
                                
                    }
                    
	},

};

module.exports = roleHarvester;