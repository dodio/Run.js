/**
 * [debug]
 * @return {[type]} [description]
 */
(function(){
	// 使用/run-debug为了与  seajs 的base 隔离
	define("/run-debug",function(require,exports,module){
	    require.async("vendor/seajs-debug",function(){});
	});
})();