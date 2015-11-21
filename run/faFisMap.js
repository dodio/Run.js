(function(R){
 R.faFisMap = function(rs_map){
 	"use strict";
	var base = R.config("STATIC_BASE");
	var domain = R.config("STATIC_DOMAIN");
	var dir = R.config("STATIC_DIR");

 	if(!domain || !domain || !dir){
 		R.error("静态资源根路径未配置！");
 	}
	var console = R.logger("resource_map");
	console.log(rs_map);
	var seamap = [];
	for(var i in rs_map.res){
		if(!/\.(js|css|less)$/.test(i)){
			continue;
		}
		var rs = rs_map.res[i];
		var uri ;
		if(rs.pkg){
			uri =  rs_map.pkg[rs.pkg].uri;
		}else{
			uri =  rs.uri;
		}
		// uri是带静态服务器地址和目录信息，去掉后方便seajs加载
		uri = uri.replace( base ,"");
		console.log(i,uri);
		seamap.push([i,uri]);
	}
	seajs.config({
		base: base,
		map : seamap
	});
 }
})(window.R);