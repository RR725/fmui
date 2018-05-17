'use strict';
var fs = require("fs");
var path = require('path');
var cheerio = require('cheerio');
var section = /<(section)>([\s\S]*)(<\/\1>)/;
var title = /<(title)>([\s\S]*)(<\/\1>)/;
var template = /<(div) id="template">([\s\S]*)(<\/\1>)/;
var list = /<(slide) class="sidebar" id="sidebar">([\s\S]*)(<\/\1>)/;
var componentsDir = path.join(__dirname, 'src', 'components');


delDir(path.join(__dirname,  'lib'));



var dirs = fs.readdirSync(componentsDir);
var script = [];
var sidebar = [];
var type = [];
for (var i = 0; i < dirs.length; i++) {
    var file = path.join(componentsDir, dirs[i], 'index.html');
    var fd = fs.readFileSync(file, {
        encoding: 'utf8'
    });
    (function () {
        modify(fd);
    })()

}
function modify(fd) {



    var bd = fd.match(section)[0];
    var tit = fd.match(title)[2];
    bd = bd.replace(section, '$2');
    script.push('\n<script type="text/x-jquery-tmpl" id="' + dirs[i] + 'Template">' + bd + '</script>\n');
    sidebar.push(tit);
    type.push(dirs[i]);
    var li = '';
    for (var o = 0; o < sidebar.length; o++) {
        li += '<li data-type="' + type[o] + '">' + sidebar[o] + '</li>';
    }

    if (i === dirs.length - 1) {//for循环到最后一个
        fs.readFile('template/index.html', 'utf8', function opened(err, fd) {
            // fd=fd.replace(template,);
            // console.log(fd)
            fd = fd.replace(template, '<div id="template">' + script.join('') + '</div>');
            fd = fd.replace(list, '<slide id="sidebar" class="sidebar"><ul>' + li + '</ul></slide>');

            fs.writeFile("index.html", fd, function (err) {
                if (err) throw err;

            });
        })
    }


}

//删除文件
function delFiles(file) {
    fs.unlinkSync(file);
}

function delDir(pa) {
    var files = [];
    if (fs.existsSync(pa)) {
        files = fs.readdirSync(pa);
        files.forEach(function(file/*, index*/) {
            var curPath = path.join(pa,  file);
            if (fs.statSync(curPath).isDirectory()) {
                delDir(curPath);
            } else { // delete file
                delFiles(curPath);
            }
        });
        fs.rmdirSync(pa);
    }
}