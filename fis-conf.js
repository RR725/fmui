

fis.match(/.*/, { //所有的文件都打包到fmui下
    release: 'fmui/$&'
}).match('*.less', {
    parser: fis.plugin('less-2.x'),
    rExt: '.css',
    optimizer: fis.plugin('clean-css')
});



//会覆盖掉上面的配置
fis.media('prod').match(/.*/, { //排除掉不需要的文件，除了下面匹配到的文件，其他文件不编译
    release: false
})
fis.media('prod').match('*.{less,jpg,css}', { 
    release: 'lib/$&'
});


fis.match('::package', {
    packager: fis.plugin('map', {
        'fmui.css': [
            '/src/css/reset.less',
            '/src/css/icon.less',
            '/src/components/button/index.less',
            '/src/components/layout/index.less',
            '/src/components/switch/index.less',
            '/src/components/loading/index.less',
            '/src/components/imagebg/index.less',
            '/src/components/checked/index.less',
            '/src/components/list/index.less',
            '/src/components/star/index.less',
            '/src/components/color/index.less'
        ]
    })
})




// fis.match('index.less', {
//     release: 'lib/fmui/fmui.css'
// }); 
// fis.match('::package', {
//     postpackager: fis.plugin('loader')
// });
