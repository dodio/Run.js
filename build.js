var fs = require("fs");
var util = require("util");

function concat(files,to) {
      files = util.isArray(files) ? files : [files];
      fs.writeFileSync(to,"");
      files.forEach(function(file){
            var content = fs.readFileSync(file);
            fs.appendFileSync(to,content);
      });
}

var build = "build/run.js";

console.log("删除%s",build);

try{
  fs.unlinkSync(build);
}catch(e){
  console.log("目测%s是不存在",build);
}

console.log("合并到%s",build);

concat(['run/seajs/sea.js',
      'run/seajs/seajs-css.js',
      'run/seajs/seajs-preload.js',
      'run/seajs/seajs-style.js',
      'run/seajs/seajs-text.js',

      'run/namespace.js',//R命名空间
      // 一些附加功能
      'run/run-debug.js', //?run-debug调试
      'run/profile.js', //性能统计
      'run/console.js', //console打印
      'run/settings.js', //页面配置
      'run/faFisMap.js', //fis3 资源映射

      'run/init.js'  //初始化

      ],build);