(function(){var h=void 0,j=!0,k=null,l=!1,n,o=this;
function q(a){var c=typeof a;if("object"==c)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return c;var b=Object.prototype.toString.call(a);if("[object Window]"==b)return"object";if("[object Array]"==b||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==b||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==c&&"undefined"==typeof a.call)return"object";return c}function r(a){var c=q(a);return"array"==c||"object"==c&&"number"==typeof a.length}function s(a){return"string"==typeof a}function t(a){return a[aa]||(a[aa]=++ba)}var aa="closure_uid_"+Math.floor(2147483648*Math.random()).toString(36),ba=0,ca=Date.now||function(){return+new Date};
function u(a,c){var b=a.split("."),d=o;!(b[0]in d)&&d.execScript&&d.execScript("var "+b[0]);for(var f;b.length&&(f=b.shift());)!b.length&&c!==h?d[f]=c:d=d[f]?d[f]:d[f]={}}function v(a,c){function b(){}b.prototype=c.prototype;a.t=c.prototype;a.prototype=new b};var w,z,A,B;function da(){return o.navigator?o.navigator.userAgent:k}B=A=z=w=l;var C;if(C=da()){var ea=o.navigator;w=0==C.indexOf("Opera");z=!w&&-1!=C.indexOf("MSIE");A=!w&&-1!=C.indexOf("WebKit");B=!w&&!A&&"Gecko"==ea.product}var D=z,fa=B,ga=A,ha=o.navigator,ia=-1!=(ha&&ha.platform||"").indexOf("Mac"),ja;
a:{var E="",F;if(w&&o.opera)var ka=o.opera.version,E="function"==typeof ka?ka():ka;else if(fa?F=/rv\:([^\);]+)(\)|;)/:D?F=/MSIE\s+([^\);]+)(\)|;)/:ga&&(F=/WebKit\/(\S+)/),F)var la=F.exec(da()),E=la?la[1]:"";if(D){var ma,na=o.document;ma=na?na.documentMode:h;if(ma>parseFloat(E)){ja=""+ma;break a}}ja=E}var oa={},pa={};function qa(){return pa[9]||(pa[9]=D&&document.documentMode&&9<=document.documentMode)};function ra(){}var sa=0;n=ra.prototype;n.key=0;n.h=l;n.v=l;n.k=function(a,c,b,d,f,e){if("function"==q(a))this.I=j;else if(a&&a.handleEvent&&"function"==q(a.handleEvent))this.I=l;else throw Error("Invalid listener argument");this.i=a;this.L=c;this.src=b;this.type=d;this.capture=!!f;this.r=e;this.v=l;this.key=++sa;this.h=l};n.handleEvent=function(a){return this.I?this.i.call(this.r||this.src,a):this.i.handleEvent.call(this.i,a)};function ta(a){var c=G,b;for(b in c)a.call(h,c[b],b,c)}var ua="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");function va(a,c){for(var b,d,f=1;f<arguments.length;f++){d=arguments[f];for(b in d)a[b]=d[b];for(var e=0;e<ua.length;e++)b=ua[e],Object.prototype.hasOwnProperty.call(d,b)&&(a[b]=d[b])}};!D||qa();var wa=!D||qa();
if(D&&!oa["8"]){for(var H=0,xa=(""+ja).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),ya="8".replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),za=Math.max(xa.length,ya.length),I=0;0==H&&I<za;I++){var Aa=xa[I]||"",Ba=ya[I]||"",Ca=RegExp("(\\d*)(\\D*)","g"),Da=RegExp("(\\d*)(\\D*)","g");do{var J=Ca.exec(Aa)||["","",""],K=Da.exec(Ba)||["","",""];if(0==J[0].length&&0==K[0].length)break;H=((0==J[1].length?0:parseInt(J[1],10))<(0==K[1].length?0:parseInt(K[1],10))?-1:(0==J[1].length?0:parseInt(J[1],10))>
(0==K[1].length?0:parseInt(K[1],10))?1:0)||((0==J[2].length)<(0==K[2].length)?-1:(0==J[2].length)>(0==K[2].length)?1:0)||(J[2]<K[2]?-1:J[2]>K[2]?1:0)}while(0==H)}oa["8"]=0<=H};var L=Array.prototype,Ea=L.indexOf?function(a,c,b){return L.indexOf.call(a,c,b)}:function(a,c,b){b=b==k?0:0>b?Math.max(0,a.length+b):b;if(s(a))return!s(c)||1!=c.length?-1:a.indexOf(c,b);for(;b<a.length;b++)if(b in a&&a[b]===c)return b;return-1},Fa=L.forEach?function(a,c,b){L.forEach.call(a,c,b)}:function(a,c,b){for(var d=a.length,f=s(a)?a.split(""):a,e=0;e<d;e++)e in f&&c.call(b,f[e],e,a)};function M(){}M.prototype.o=l;M.prototype.S=function(){return this.o};M.prototype.e=function(){if(!this.o)this.o=j,this.d()};M.prototype.d=function(){this.Q&&Ga.apply(k,this.Q)};function Ga(a){for(var c=0,b=arguments.length;c<b;++c){var d=arguments[c];r(d)?Ga.apply(k,d):d&&"function"==typeof d.e&&d.e()}};function N(a,c){this.type=a;this.currentTarget=this.target=c}v(N,M);N.prototype.d=function(){delete this.type;delete this.target;delete this.currentTarget};N.prototype.g=l;N.prototype.m=j;function Ha(a){Ha[" "](a);return a}Ha[" "]=function(){};function O(a,c){a&&this.k(a,c)}v(O,N);n=O.prototype;n.target=k;n.relatedTarget=k;n.offsetX=0;n.offsetY=0;n.clientX=0;n.clientY=0;n.screenX=0;n.screenY=0;n.button=0;n.keyCode=0;n.charCode=0;n.ctrlKey=l;n.altKey=l;n.shiftKey=l;n.metaKey=l;n.V=l;n.F=k;
n.k=function(a,c){var b=this.type=a.type;N.call(this,b);this.target=a.target||a.srcElement;this.currentTarget=c;var d=a.relatedTarget;if(d){if(fa){var f;a:{try{Ha(d.nodeName);f=j;break a}catch(e){}f=l}f||(d=k)}}else if("mouseover"==b)d=a.fromElement;else if("mouseout"==b)d=a.toElement;this.relatedTarget=d;this.offsetX=a.offsetX!==h?a.offsetX:a.layerX;this.offsetY=a.offsetY!==h?a.offsetY:a.layerY;this.clientX=a.clientX!==h?a.clientX:a.pageX;this.clientY=a.clientY!==h?a.clientY:a.pageY;this.screenX=
a.screenX||0;this.screenY=a.screenY||0;this.button=a.button;this.keyCode=a.keyCode||0;this.charCode=a.charCode||("keypress"==b?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.V=ia?a.metaKey:a.ctrlKey;this.state=a.state;this.F=a;delete this.m;delete this.g};n.d=function(){O.t.d.call(this);this.relatedTarget=this.currentTarget=this.target=this.F=k};var P={},Q={},G={},R={};
function Ia(a,c,b,d,f){if(c)if("array"==q(c))for(var e=0;e<c.length;e++)Ia(a,c[e],b,d,f);else{var d=!!d,g=Q;c in g||(g[c]={a:0,c:0});g=g[c];d in g||(g[d]={a:0,c:0},g.a++);var g=g[d],i=t(a),m;g.c++;if(g[i]){m=g[i];for(e=0;e<m.length;e++)if(g=m[e],g.i==b&&g.r==f){if(g.h)break;return}}else m=g[i]=[],g.a++;e=Ja();e.src=a;g=new ra;g.k(b,e,a,c,d,f);b=g.key;e.key=b;m.push(g);P[b]=g;G[i]||(G[i]=[]);G[i].push(g);a.addEventListener?(a==o||!a.A)&&a.addEventListener(c,e,d):a.attachEvent(c in R?R[c]:R[c]="on"+
c,e)}else throw Error("Invalid event type");}function Ja(){var a=Ka,c=wa?function(b){return a.call(c.src,c.key,b)}:function(b){b=a.call(c.src,c.key,b);if(!b)return b};return c}function La(a,c,b,d,f){if("array"==q(c))for(var e=0;e<c.length;e++)La(a,c[e],b,d,f);else{d=!!d;a:{e=Q;if(c in e&&(e=e[c],d in e&&(e=e[d],a=t(a),e[a]))){a=e[a];break a}a=k}if(a)for(e=0;e<a.length;e++)if(a[e].i==b&&a[e].capture==d&&a[e].r==f){S(a[e].key);break}}}
function S(a){if(P[a]){var c=P[a];if(!c.h){var b=c.src,d=c.type,f=c.L,e=c.capture;b.removeEventListener?(b==o||!b.A)&&b.removeEventListener(d,f,e):b.detachEvent&&b.detachEvent(d in R?R[d]:R[d]="on"+d,f);b=t(b);f=Q[d][e][b];if(G[b]){var g=G[b],i=Ea(g,c);0<=i&&L.splice.call(g,i,1);0==g.length&&delete G[b]}c.h=j;f.J=j;Ma(d,e,b,f);delete P[a]}}}
function Ma(a,c,b,d){if(!d.l&&d.J){for(var f=0,e=0;f<d.length;f++)d[f].h?d[f].L.src=k:(f!=e&&(d[e]=d[f]),e++);d.length=e;d.J=l;0==e&&(delete Q[a][c][b],Q[a][c].a--,0==Q[a][c].a&&(delete Q[a][c],Q[a].a--),0==Q[a].a&&delete Q[a])}}
function Na(a,c,b){var d=0,f=c==k,e=b==k,b=!!b;if(a==k)ta(function(a){for(var g=a.length-1;0<=g;g--){var i=a[g];if((f||c==i.type)&&(e||b==i.capture))S(i.key),d++}});else if(a=t(a),G[a])for(var a=G[a],g=a.length-1;0<=g;g--){var i=a[g];if((f||c==i.type)&&(e||b==i.capture))S(i.key),d++}}function T(a,c,b,d,f){var e=1,c=t(c);if(a[c]){a.c--;a=a[c];a.l?a.l++:a.l=1;try{for(var g=a.length,i=0;i<g;i++){var m=a[i];m&&!m.h&&(e&=Oa(m,f)!==l)}}finally{a.l--,Ma(b,d,c,a)}}return Boolean(e)}
function Oa(a,c){var b=a.handleEvent(c);a.v&&S(a.key);return b}
function Ka(a,c){if(!P[a])return j;var b=P[a],d=b.type,f=Q;if(!(d in f))return j;var f=f[d],e,g;if(!wa){var i;if(!(i=c))a:{i="window.event".split(".");for(var m=o;e=i.shift();)if(m[e]!=k)m=m[e];else{i=k;break a}i=m}e=i;i=j in f;m=l in f;if(i){if(0>e.keyCode||e.returnValue!=h)return j;a:{var p=l;if(0==e.keyCode)try{e.keyCode=-1;break a}catch(Za){p=j}if(p||e.returnValue==h)e.returnValue=j}}p=new O;p.k(e,this);e=j;try{if(i){for(var x=[],V=p.currentTarget;V;V=V.parentNode)x.push(V);g=f[j];g.c=g.a;for(var y=
x.length-1;!p.g&&0<=y&&g.c;y--)p.currentTarget=x[y],e&=T(g,x[y],d,j,p);if(m){g=f[l];g.c=g.a;for(y=0;!p.g&&y<x.length&&g.c;y++)p.currentTarget=x[y],e&=T(g,x[y],d,l,p)}}else e=Oa(b,p)}finally{if(x)x.length=0;p.e()}return e}d=new O(c,this);try{e=Oa(b,d)}finally{d.e()}return e};var U="StopIteration"in o?o.StopIteration:Error("StopIteration");function W(){}W.prototype.next=function(){throw U;};W.prototype.n=function(){return this};function Pa(a){if(a instanceof W)return a;if("function"==typeof a.n)return a.n(l);if(r(a)){var c=0,b=new W;b.next=function(){for(;;){if(c>=a.length)throw U;if(c in a)return a[c++];c++}};return b}throw Error("Not implemented");}
function Qa(a,c){if(r(a))try{Fa(a,c,h)}catch(b){if(b!==U)throw b;}else{a=Pa(a);try{for(;;)c.call(h,a.next(),h,a)}catch(d){if(d!==U)throw d;}}};function X(a,c){this.f={};this.b=[];var b=arguments.length;if(1<b){if(b%2)throw Error("Uneven number of arguments");for(var d=0;d<b;d+=2)this.set(arguments[d],arguments[d+1])}else if(a){var f;if(a instanceof X){d=Ra(a);Sa(a);f=[];for(b=0;b<a.b.length;b++)f.push(a.f[a.b[b]])}else{var b=[],e=0;for(d in a)b[e++]=d;d=b;b=[];e=0;for(f in a)b[e++]=a[f];f=b}for(b=0;b<d.length;b++)this.set(d[b],f[b])}}n=X.prototype;n.a=0;n.u=0;function Ra(a){Sa(a);return a.b.concat()}
function Sa(a){if(a.a!=a.b.length){for(var c=0,b=0;c<a.b.length;){var d=a.b[c];Object.prototype.hasOwnProperty.call(a.f,d)&&(a.b[b++]=d);c++}a.b.length=b}if(a.a!=a.b.length){for(var f={},b=c=0;c<a.b.length;)d=a.b[c],Object.prototype.hasOwnProperty.call(f,d)||(a.b[b++]=d,f[d]=1),c++;a.b.length=b}}n.get=function(a,c){return Object.prototype.hasOwnProperty.call(this.f,a)?this.f[a]:c};n.set=function(a,c){Object.prototype.hasOwnProperty.call(this.f,a)||(this.a++,this.b.push(a),this.u++);this.f[a]=c};
n.n=function(a){Sa(this);var c=0,b=this.b,d=this.f,f=this.u,e=this,g=new W;g.next=function(){for(;;){if(f!=e.u)throw Error("The map has changed since the iterator was created");if(c>=b.length)throw U;var g=b[c++];return a?g:d[g]}};return g};function Y(a,c){this.T=c;this.q=[];if(a>this.T)throw Error("[goog.structs.SimplePool] Initial cannot be greater than max");for(var b=0;b<a;b++)this.q.push(this.j())}v(Y,M);n=Y.prototype;n.z=k;n.C=k;n.j=function(){return this.z?this.z():{}};n.B=function(a){if(this.C)this.C(a);else{var c=q(a);if("object"==c||"array"==c||"function"==c)if("function"==q(a.e))a.e();else for(var b in a)delete a[b]}};n.d=function(){Y.t.d.call(this);for(var a=this.q;a.length;)this.B(a.pop());delete this.q};function Ta(){this.G=[];this.K=new X;this.ba=this.ca=this.da=this.X=0;this.M=new X;this.P=this.aa=0;this.U=1;this.R=new Y(0,4E3);this.R.j=function(){return new Ua};this.Y=new Y(0,50);this.Y.j=function(){return new Va};var a=this;this.H=new Y(0,2E3);this.H.j=function(){return""+a.U++};this.H.B=function(){};this.ea=3}function Va(){this.N=this.Z=this.w=0}
Va.prototype.toString=function(){var a=[];a.push(this.type," ",this.w," (",Math.round(10*this.Z)/10," ms)");this.N&&a.push(" [VarAlloc = ",this.N,"]");return a.join("")};function Ua(){}function Wa(a,c,b,d){var f=[];-1==b?f.push("    "):f.push(Xa(a.D-b));f.push(" ",Ya(a.D-c));0==a.p?f.push(" Start        "):1==a.p?(f.push(" Done "),f.push(Xa(a.fa-a.startTime)," ms ")):f.push(" Comment      ");f.push(d,a);0<a.$&&f.push("[VarAlloc ",a.$,"] ");return f.join("")}
Ua.prototype.toString=function(){return this.type==k?this.O:"["+this.type+"] "+this.O};
Ta.prototype.toString=function(){for(var a=[],c=-1,b=[],d=0;d<this.G.length;d++){var f=this.G[d];1==f.p&&b.pop();a.push(" ",Wa(f,this.X,c,b.join("")));c=f.D;a.push("\n");0==f.p&&b.push("|  ")}if(0!=this.K.a){var e=ca();a.push(" Unstopped timers:\n");Qa(this.K,function(b){a.push("  ",b," (",e-b.startTime," ms, started at ",Ya(b.startTime),")\n")})}c=Ra(this.M);for(d=0;d<c.length;d++)b=this.M.get(c[d]),1<b.w&&a.push(" TOTAL ",b,"\n");a.push("Total tracers created ",this.aa,"\n","Total comments created ",
this.P,"\n","Overhead start: ",this.da," ms\n","Overhead end: ",this.ca," ms\n","Overhead comment: ",this.ba," ms\n");return a.join("")};function Xa(a){var a=Math.round(a),c="";1E3>a&&(c=" ");100>a&&(c="  ");10>a&&(c="   ");return c+a}function Ya(a){a=Math.round(a);return(""+(100+a/1E3%60)).substring(1,3)+"."+(""+(1E3+a%1E3)).substring(1,4)}new Ta;function Z(){}v(Z,M);n=Z.prototype;n.A=j;n.s=k;n.addEventListener=function(a,c,b,d){Ia(this,a,c,b,d)};n.removeEventListener=function(a,c,b,d){La(this,a,c,b,d)};
n.dispatchEvent=function(a){var c=a.type||a,b=Q;if(c in b){if(s(a))a=new N(a,this);else if(a instanceof N)a.target=a.target||this;else{var d=a,a=new N(c,this);va(a,d)}var d=1,f,b=b[c],c=j in b,e;if(c){f=[];for(e=this;e;e=e.s)f.push(e);e=b[j];e.c=e.a;for(var g=f.length-1;!a.g&&0<=g&&e.c;g--)a.currentTarget=f[g],d&=T(e,f[g],a.type,j,a)&&a.m!=l}if(l in b)if(e=b[l],e.c=e.a,c)for(g=0;!a.g&&g<f.length&&e.c;g++)a.currentTarget=f[g],d&=T(e,f[g],a.type,l,a)&&a.m!=l;else for(f=this;!a.g&&f&&e.c;f=f.s)a.currentTarget=
f,d&=T(e,f,a.type,l,a)&&a.m!=l;a=Boolean(d)}else a=j;return a};n.d=function(){Z.t.d.call(this);Na(this);this.s=k};function $(){}v($,Z);$.prototype.W=function(a,c){Na(this,a,c)};u("NpfEventDispatcher",$);u("NpfEventDispatcher.prototype.addListener",$.prototype.addEventListener);u("NpfEventDispatcher.prototype.removeListener",$.prototype.removeEventListener);u("NpfEventDispatcher.prototype.removeAll",$.prototype.W);u("NpfEventDispatcher.prototype.dispatch",$.prototype.dispatchEvent);u("NpfEventDispatcher.prototype.dispose",$.prototype.e);u("NpfEventDispatcher.prototype.disposeInternal",$.prototype.d);
u("NpfEventDispatcher.prototype.isDisposed",$.prototype.S);u("NpfEvent",N);u("NpfEvent.prototype.type",N.prototype.type);u("NpfEvent.prototype.taget",N.prototype.target);u("NpfEvent.prototype.currentTarget",N.prototype.currentTarget);})();
