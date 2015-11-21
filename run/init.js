/**
 * Run.js使用
 * 3、其他seajs方法可以用 seajs本身
 * R的API列表
 * R.error() //产生一个error异常
 * R.logger(scope) //logger工具
 * R.config // 全局配置
 * R.timeProfile //性能工具  含默认的一个项目：HEAD_TIME 刚加载head tag 时的时间
 *
 * 可使用的全局配置列表：
 * window.RUN_DEVELOP
 * 
 */

(function(window) {
	var seajsDebug = window.location.search.indexOf("run-debug") !== -1;
	var R = window.R;
	/**
	 * @param  {[type]}抛出错误
	 * @return {[type]}
	 */
	R.error = function(msg){
		throw new Error(msg);
	}
	R.config("DEBUG",seajsDebug);

	if(seajsDebug){
		R.config("logger","all");
	}

	(function() {
	seajs.config({
		paths:{
			"vendor":seajs.data.dir
		},
		alias:{
			"jquery":"vendor/jquery/jquery-1.10.1"
		}
	});

	var delay_for_debug = 1000; //延迟debug 插件的执行时间，保证其完整加载
	var seaUse = seajs.use;
	seajs.use = function(){
		var args = arguments;
		if( seajsDebug ){
			seaUse.call(seajs,"/run-debug",function(){
				setTimeout(function(){
					delay_for_debug = 0; //已经加载完毕debug插件，便不用再给debug留时间了
					seaUse.apply(seajs,args);
				},delay_for_debug);
			});
		}else{
			seajs.use = seaUse;
			seajs.use.apply(seajs,args);
		}
	}

})();


})(window);

