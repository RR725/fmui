$(function () {
    function encode(str) {
        if (typeof str != "string") return "";
        str = str.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\"/g, "&quot;")
            .replace(/\'/g, "&#39;")
            .replace(/ /g, "&nbsp;")
        return str;
    };
    $('#sidebar').on('click', 'li', function () {
        var type = $(this).attr('data-type');
        window.location.hash=type;
        $('#sidebar li').removeClass('current');
        $(this).addClass('current');
        var dom = $("#" + type + "Template");
        var tmpl = dom.tmpl();
        var text = dom.html();
        $("#showDemo").html(tmpl);

        $("#showCode").html(encode(text));
        hljs.configure({tabReplace: '   '});
        $('pre code').each(function (i, block) {
            hljs.highlightBlock(block);
        });
    });

    var li=$('#sidebar li');
    var len=li.length;
    var status=false;
    for(var i=0;i<len;i++){
        if('#'+li.eq(i).attr('data-type')===window.location.hash){
            li.eq(i).click();
            status=true;
        }
    }
    if(!status){
        $('#sidebar li:first').click();
    }
    var reg=/Phone|Moblie|Android/;
    var ua=navigator.userAgent;
    if(ua.match(reg)){
        $('html').removeClass('example_html');
    }
});
