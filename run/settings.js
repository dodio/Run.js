// window 的页面配置，仅作为配置一些静态变量，不能批量操作
// 不能重复，不能修改.修改需要传入 force = true 的参数
(function(){
	var cache = {};
	var console = R.logger("R.config");
	R.config =  function(name,value,force){
		if(  (typeof name) !== "string"  ) {
			R.error("页面配置项需要为：String");
		}
		if(value === undefined){
			return cache[name];
		}
		if(!cache.hasOwnProperty(name)){
			return cache[name] = value;
		}else if(!force)
		{
			$.error("已经存在名为：" + name + "的配置项，不能重复设置。重复设置请使用R.config(name,value,true);");
		}
		else{
			// null 值可以删除 配置项，并返回原来值
			var tmp = cache[name];
			if(value === null){
				console.warn("强制删除了配置["+name+"]");
				delete cache[name];
			}else{
				console.warn("强制设置了配置["+name+"]为："+value);
				cache[name] = value;
			}
			return tmp;
		}
	}
	R.config.getAll = function(){
		var tmp = {};
		for(var i in  cache){
			tmp[i] = cache[i];
		}
		return tmp;
	}
})();