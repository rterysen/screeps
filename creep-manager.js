var roleHarvester = require('harvestor'),
    roleUpgrader = require('upgrader'),
    roleBuilder = require('builder'),
    roleMechanic = require('mechanic'),
    cons = require('constants'),
    creepMaster = require('creep-master')

;





var creepCreator = {
     monitor: function(){
            console.log("******************************************************");
            console.log("Monitor");
            console.log("******************************************************");
            console.log("You have " + this.creepsByRole(cons.Harvester) +" " +cons.Harvester + "s");
            console.log("You have " + this.creepsByRole(cons.Builder) +" " + cons.Builder + "s");
            console.log("You have " + this.creepsByRole(cons.Upgrader) + " " +cons.Upgrader + "s");
            console.log("You have " + this.creepsByRole(cons.Mechanic) + " " +cons.Mechanic + "s");
            console.log("Total: " + this.totalCreeps());
            for(var name in Game.rooms) {
                console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
            }
        //    console.log("Creeps with bad source" + this.fixCreepsWithBadSource());
   
              
    },
    creepsByRole: function(role){
          var creeps = _.filter(Game.creeps, (creep) => creep.memory.role == role);
          return creeps.length;
   },
   fixCreepsWithBadSource: function(){
       var bad  = _.filter(Game.creeps, (creep) => creep.memory.source > 1);
          return bad;
   },
    totalCreeps: function(){
           
           var total = 0;
           
           for(var name in Game.creeps) {
               total++;
           }
          
          return total;
   },

    manage: function(){
            for(var name in Game.creeps) {
                var creep = Game.creeps[name];
                if(creep.memory.role == cons.Harvester) {
                    roleHarvester.run(creep);
                }
                if(creep.memory.role == cons.Upgrader) {
                    roleUpgrader.run(creep);
                }
                if(creep.memory.role == cons.Builder) {
                    roleBuilder.run(creep);
                }
                if(creep.memory.role == cons.Mechanic) {
                    roleMechanic.run(creep);
                }
        }
    },
    create: function(creep) {
    

     var built = false,
        harvesterCount = this.creepsByRole(cons.Harvester),
        upgraderCount = this.creepsByRole(cons.Upgrader),
        builderCount = this.creepsByRole(cons.Builder),
        mechanicCount = this.creepsByRole(cons.Mechanic)

        ;
        
                if(!built && harvesterCount >= 5 )
        built = this.buildCreep(cons.Mechanic,1);
        
            if(!built && harvesterCount >= 5 ){
             built = this.buildCreep(cons.Builder,1);
                
            }
                if(!built && harvesterCount >= 5){
                    built =this.buildCreep(cons.Upgrader,1);
                }
                
                
                         if(!built && harvesterCount >= 10 )
        built = this.buildCreep(cons.Mechanic,2);
        
            if(!built && harvesterCount >= 10 ){
             built = this.buildCreep(cons.Builder,3);
                
            }
                if(!built && harvesterCount >= 10){
                    built =this.buildCreep(cons.Upgrader,3);
                }
       
       if(!built)
        built = this.buildCreep(cons.Harvester,16)
        
        ;
                
      
        
  
         
        if(!built && harvesterCount >= 15 ){
            var random =  Math.floor(Math.random() * 3);
          switch(random) {
                case 0:
                 this.buildCreep(cons.Harvester);
                    break;
                case 1:
                    this.buildCreep(cons.Builder);
                    break;
                 case 2:
                    this.buildCreep(cons.Upgrader);
                    break;
                default:
                  this.buildCreep(cons.Upgrader);
            }
               
        }
     
    

	},
	buildCreep: function(type, min){
	             var body = this.bodyByType(type),
	                total = this.creepsByRole(type),
	                built = false,
	                energyNeeded = this.calcEnergy(body),
	                min = min ? min : 99999
	                
	             ;  
	      
	             if(total < min && this.hasEnergy(energyNeeded)){
	              console.log("buidling");
	                built = true;
                    var newName = Game.spawns.home.createCreep(body, undefined, {role: type, source: creepMaster.generateSource()});
                    console.log('|||||||||||||Spawning new ' + type + ': ' + newName+ "|||||||||||||||");
	             }
	             
	             return built;
              
	},
	bodyByType: function(type){
	      	   body  = [];
	      	switch(type) {
                default:
                body  = [ATTACK, TOUGH,TOUGH,WORK, WORK,WORK, WORK,CARRY, CARRY ,CARRY ,CARRY,CARRY,CARRY,CARRY  , MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE , MOVE,MOVE,];
            }
            
        return body;
	},
	totalEnergy: function(){
	    var total = 0;
	       for(var name in Game.rooms) {
                total += Game.rooms[name].energyAvailable;
            }
            return total;
	},
	hasEnergy: function(energyNeeded){
	    return this.totalEnergy() >= energyNeeded;
	},
	calcEnergy: function(body){
	    var total = 0;
	    for(var i = 0; i < body.length; i++){
	           
	        switch(body[i]) {
                case "work":
                 total += 100;
                    break;
                case "carry":
                 total += 50;
                    break;
                 case "move":
                    total += 50;
                    break;
                      case "attack":
                    total += 80;
                    break;
                      case "ranged_attack":
                    total += 150;
                    break;
                      case "heal":
                    total += 250;
                    break;
                      case "tough":
                    total += 10;
                    break;
                    case "claim":
                  total += 600;
                    break;
                default:
                
            }
            
	    }
	    console.log("Cost of new unit: " + total );
	    return total;
	}
	
	
};


module.exports = creepCreator;