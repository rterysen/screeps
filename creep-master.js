
var helper =require("helper");
var creepMaster = {

    generateSource: function(){
      return  Math.floor(Math.random() * 2);  
    },
    /** @param {Creep} creep **/
	harvest: function(creep){
	 
	 var target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
	
                    if(target) {
                         console.log("dropped target: " + target.pos); 
                       this.getLostResources(creep,target);
                        }else{
         
            var sources = creep.room.find(FIND_SOURCES_ACTIVE), 
        
            target = creep.pos.findClosestByPath(sources);
            ;
                console.log(sources);

            if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
	   
	},
	build: function(creep){
	  
	    
	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
	    }
	    if(!creep.memory.building && creep.carry.energy  == creep.carryCapacity) {
	        creep.memory.building = true;
	    }
	    
	            var ext = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES , {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION );
                    }
            });
   
	    if(creep.memory.building) {

	        if(ext){
	           target = ext; 
	        }else{
	         target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
	        }
            if(target) {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
            }
            }else{
            
                this.harvest(creep);
            }
	   }
	    else{
	       
                this.harvest(creep);
	    }
	},
	
	
	repair: function (creep){
	     	var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });
            
       console.log(target);
       
            
            if(target) {
                if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);    
                }
            }else{
                this.build(creep);
            }
            
	},
	upgrade: function(creep){
	      if(creep.carry.energy == 0) {
            creep.memory.updating = false;
	    }
	     if(!creep.memory.updating && creep.carry.energy  == creep.carryCapacity) {
            creep.memory.updating = true;
	    }
    	    if(creep.memory.updating) {
	        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                 creep.moveTo(creep.room.controller);
             }
	    }
	    else {
	      creepMaster.harvest(creep);
	    }
	},

	getLostResources: function(creep, target){
	    
	    console.log("lost " + creep.name + target.pos);
	    if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
            }
	},
	scanHostiles: function(creep){
	          for(var name in Game.rooms) {
                  var hostiles = Game.rooms[name].find(FIND_HOSTILE_CREEPS);
           if(hostiles.length > 0) {
            var username = hostiles[0].owner.username;
            Game.notify(`User ${username} spotted in room ${name}`) 
             
              for(var name in Game.creeps) {
                var creep = Game.creeps[name].attack(creep,hostiles[0]);
       
            }
              creep.memory.attacking = false;
           }
	          }
	    },
	
	attack: function(creep,hostile){
	    
	     creep.memory.attacking = true;
	    if(creep.attack(hostile) == ERR_NOT_IN_RANGE){  
	        creep.moveTo(hostile)
	    }
	}

	
};

module.exports = creepMaster;