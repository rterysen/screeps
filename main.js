var creepManager = require('creep-manager'),
    defense = require('defense')

 
 ;
 

module.exports.loop = function () {

   //ame.creeps.Mila.moveTo(33,44);

    defense.defend();
    creepManager.manage();
    creepManager.create();
    creepManager.monitor();   
}