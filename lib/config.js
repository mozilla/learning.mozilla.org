var IN_STATIC_SITE = (typeof(window) != 'undefined');
var GENERATING_STATIC_SITE = !IN_STATIC_SITE;
var ENABLE_PUSHSTATE = (IN_STATIC_SITE &&
                        window.location.protocol != 'file:' &&
                        window.history.pushState &&
                        window.history.replaceState);

exports.IN_STATIC_SITE = IN_STATIC_SITE;
exports.GENERATING_STATIC_SITE = GENERATING_STATIC_SITE;
exports.ENABLE_PUSHSTATE = ENABLE_PUSHSTATE;
