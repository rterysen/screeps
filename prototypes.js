/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('prototypes');
 * mod.thing == 'a thing'; // true
 */

module.exports = {

};


RoomObject.prototype.findClosestCreep = function() {
    return this.pos.findClosest(FIND_MY_CREEPS);
}
