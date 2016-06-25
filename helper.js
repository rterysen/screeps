/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('helper');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    
        creepsByRole: function(role){
          var creeps = _.filter(Game.creeps, (creep) => creep.memory.role == role);
          return creeps.length;
   },
       creepsBySource: function(source){
          var creeps = _.filter(Game.creeps, (creep) => creep.memory.source == source);
          return creeps.length;
   },

};