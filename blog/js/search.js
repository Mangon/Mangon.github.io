// build time:Sat Feb 22 2020 11:50:36 GMT+0800 (中国标准时间)
function searchFunc(e,t,n){$.ajax({url:e,dataType:"xml",success:function(e){var r=$("entry",e).map(function(){return{title:$("title",this).text(),content:$("content",this).text(),url:$("url",this).text()}}).get();var s=$("#"+t);if(!(s&&s.length==1)){return}var a=$("#"+n);if(!(a&&a.length==1)){return}var i=s.find("#search-input");var c=s.find(".search-btn");var l=s.find(".reset-search-btn");c.on("click",function(e){s.addClass("search-box-focus");i[0].focus()});l.on("click",function(e){$("#content").css({display:"block"});a.css({display:"none"});i[0].focus()});i.on("blur",function(){$(this).val()===""&&s.removeClass("search-box-focus")});var o=true;i.on("compositionstart",function(){o=false});i.on("compositionend",function(){o=true});i.on("keydown",function(e){var e=e||event;if(e.keyCode===13){e.returnValue=false;e.preventDefault()}});i.on("input",function(){var e=this;setTimeout(function(){if(!o){return}var t='<ul class="search-result-list">';var n=e.value.trim().toLowerCase().split(/\s+/);a[0].innerHTML="";if(e.value.trim().length<=0){$("#content").css({display:"block"});a.css({display:"none"});return}else{$("#content").css({display:"none"});a.css({display:"block"})}var s=0;r.forEach(function(e){var r=true;if(!e.title||e.title.trim()===""){return false}var a=e.title.trim().toLowerCase();var i=e.content.trim().replace(/<[^>]+>/g,"").toLowerCase();var c=e.url;var l=-1;var o=-1;var u=-1;if(i!==""){n.forEach(function(e,t){l=a.indexOf(e);o=i.indexOf(e);if(l<0&&o<0){r=false}else{if(o<0){o=0}if(t===0){u=o}}})}else{r=false}if(r){s++;t+='<li><h3><a target = "_blank" href="'+c+'" class="search-result-title">'+a+"</a></h3>";var f=e.content.trim().replace(/<[^>]+>/g,"");if(u>=0){var v=u-20;var h=u+80;if(v<0){v=0}if(v===0){h=100}if(h>f.length){h=f.length}var p=f.substr(v,h);n.forEach(function(e){var t=new RegExp(e,"gi");p=p.replace(t,function(e){return'<em class="search-keyword">'+e+"</em>"})});t+='<p class="search-result">'+p+"...</p>"}t+="</li>"}});i.attr("results",s);t+="</ul>";var c=s?"<h1>找到<em>"+e.value.trim()+"</em>相关内容"+s+"个</h1>":'<h1 class="empty-title">没有找到<em>'+e.value.trim()+"</em>相关内容</h1>";t=c+t;$("#content").css({display:"none"});a.css({display:"block"});a[0].innerHTML=t},0)})}})}
//rebuild by neat 