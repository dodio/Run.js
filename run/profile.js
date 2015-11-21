
/**
 * 统计性能的工具
 * 
 * @param  {[type]} root [description]
 * @return {[type]}      [description]
 */
(function(){
	var timeProfile = R.timeProfile = {};
	var timers = {};
	/**
	 *  设置统计项目
	 * @param {[type]} name     [项目名称，推荐使用 user.getinfo 这样的命名空间的形式来作为名称]
	 * @param {[type]} override [是否覆盖之前的项目]
	 * return Profile 成功,false 失败
	 */
	timeProfile.set = function(name,override){
		if(typeof name !== "string" ){
			R.log("计时器名称必须为String","error");
			return false;
		}
		if(timers[name] && !override){
			R.log("计时器已存在，需要覆盖请使用：TimeProfile.set(name,true);","error");
			return false;
		}
		return timers[name] = new Profile(name);
	}
	/**
	 * 获取项目的执行时间
	 * 如果有快照参数，则会生成快照
	 * @param  {[String]} name    [项目名称]
	 * @param  {[String]} capture [快照名称]
	 * @return {[type]}         [description]
	 */
	timeProfile.time = function(name,capture){
		if(!timers[name]){
			R.log("计时器不存在","error");
			return -1;
		}
		return capture ? timers[name].capture(capture) : timers[name].get();
	}
	/**
	 * 移除项目
	 * @param  {[type]} name [description]
	 * @return {[type]}      [description]
	 */
	timeProfile.remove = function(name){
		var tmp = timers[name];
		delete timers[name];
		return tmp;
	}

	timeProfile.log = function(start,end,time){
		return "『"+start+"』" + "至" +"『"+end+"』" + "消耗了:"+time+"ms";
	}

	/**
	 * 时间性能
	 */
	function Profile(name){
		this.node = {};
		this.startTime = new Date().getTime();
		this.name = name || "未命名";
	}
	/**
	 * 生成一个时间快照，若存在则返回已存在的
	 * @param  {[type]} name [description]
	 * @return {[type]}      [description]
	 */
	Profile.prototype.capture = function(name) {
		if(typeof name !== "string"){
			throw new Error("缺少字符串作为快照名称");
		}
		if(this.node[name]){
			return this.node[name];
		}
		var time = new Date().getTime() - this.startTime;

		R.log(timeProfile.log(this.name,name,time));

		return this.node[name] = time;
	};
	/**
	 * 临时获取一个执行时间
	 * @return {[type]} [description]
	 */
	Profile.prototype.get = function() {
		return new Date().getTime() - this.startTime;
	};
})();

(function(){
	var ok_time = new Date().getTime() - 3.6e5;
	var headtime = parseInt(window.HEAD_TIME);
	if( headtime > ok_time ){
		var head = R.timeProfile.set("HEAD_TIME");
		head.startTime = headtime;
		head.name = "head标签";
	}
})();