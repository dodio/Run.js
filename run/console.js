// 命令行工具将信息分类显示


(function(window){
	var R = window.R;

	var consoles = {};

	R.logger = function(scope){
    scope = scope.toUpperCase();
		if(consoles[scope]){
			return consoles[scope];
		}
		return consoles[scope] = new Console(scope);
	}
  R.logger.getAll = function(){
    var tmp = {};
    for(var i in consoles){
      tmp[i] = consoles[i];
    }
    return tmp;
  }


  var methods = ["warn","error","trace","info","debug"]
  for (var i = methods.length - 1; i >= 0; i--) {
    Console.prototype[methods[i]] = makeConsoleMethod(methods[i]);
  };
  // log 也都使用trace，方便获取调用栈
  Console.prototype.log = Console.prototype.trace;

  Console.prototype.printAll = function(){
    var console = window.console;
    if(!console){
      return 
    }
    var infos = this._infos;
    for(var i = 0; i < infos.length ; i++){
      var m = infos[i][0];
      console[m].call(console,infos[i][1], infos[i][2].stack);
    }
  }

	function Console(scope){
		this._infos = [];
		this.scope = scope;
	}

	function makeConsoleMethod(method){
    var console = window.console;
		return function() {
			// 非DEBUG模式直接不做任何操作
			if(!R.config("DEBUG")){
				return;
			}
      var args = Array.prototype.slice.call(arguments);
      args.unshift("【"+this.scope+"】\n");
			// debug模式下，将所有输出信息缓存下来，方便调试查看
			var msg ;
			if(JSON){
				msg = JSON.stringify(args);
			}else{
        // 留坑，以后填，在没有json支持的情况下
        msg = Array.prototype.map.apply(args,function(v,i){
          return v.toString();
        }).join("\n");
			}

			this._infos.push([ method , msg , new Error()]);

			// 并如果 设置了 scope ，则输出scope 内相应的消息。否则也是不作输出
			if(!console){
				return;
			}
			// 如果指定了错误的类型，则默认为trace
			if(!console[method]){
				console.warn("CONSOLE：您填写的%s控制台方法不被支持已被调整为：console.trace",method);
				method = "trace";
				return;
			}
			var loggerScope = R.config("logger");
			// 检测 this.scope 是否在 允许显示的 scope 列表中
	  	if(loggerScope && (loggerScope === "all" || loggerScope.indexOf(this.scope) > -1 ) ){
        console[method].apply(console,args);
      }
	  }
	}
})(window);