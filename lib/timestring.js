/**
 * Created by mihaichiorean on 17/09/15.
 */

/**
 *
 * @constructor
 */
function TimeString() {
    this.days = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.hours = 0;
    this.separator = '';
}

/**
 *
 * @type {string}
 */
TimeString.template = '%dddays%hhhrs%mmmin%sssec';

/**
 *
 * @type {{days: string, hours: string, minutes: string, seconds: string}}
 */
TimeString.placeholders = {
    days: '%dd',
    hours: '%hh',
    minutes: '%mm',
    seconds: '%ss'
};

/**
 * reverse placeholders
 * @returns {{}}
 * @private
 */
TimeString._placeholders = function() {
    var reverse = {};
    for(var k in TimeString.placeholders) {
        reverse[TimeString.placeholders[k]] = k;
    }
    return reverse;
};

/**
 *
 * @returns {string}
 */
TimeString.prototype.toString = function() {
    var self = this;
    var retArray = [];
    var varByPlaceholder = TimeString._placeholders();
    var re = '(' + Object.keys(varByPlaceholder).join('[a-zA-Z]*)(') + ')';
    TimeString.template.replace(new RegExp(re, 'g'), function() {
        var args = Array.prototype.slice.call(arguments);
        for (var i = 1; i < args.length - 3; i++) {
            var match = args[i];
            for(var k in varByPlaceholder) {
                if(match.substr(0, k.length) == k && self[varByPlaceholder[k]] > 0) {
                    retArray.push(match.replace(k, self[varByPlaceholder[k]]));
                }
            }
        }
    });
    return retArray.join(self.separator);
};

/**
 *
 * @param minutes
 */
TimeString.prototype.addMinutes = function(minutes) {
    var m = parseInt(minutes);
    var h = Math.floor(m / 60);
    var d = Math.floor(h / 24);
    this.hours += Math.floor(h % 24);
    this.minutes += Math.floor(m % 60);
    this.days += d;
};

module.exports = TimeString;