/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('defense');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    defend: function(){
            for(var name in Game.rooms) {
                  var hostiles = Game.rooms[name].find(FIND_HOSTILE_CREEPS);
           if(hostiles.length > 0) {
            var username = hostiles[0].owner.username;
            Game.notify(`User ${username} spotted in room ${name}`);
            var towers = Game.rooms[name].find(
                FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
            towers.forEach(tower => tower.attack(hostiles[0]));
            }
       }
    }
};