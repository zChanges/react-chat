    var MN = jQuery.noConflict();//避免jQuery版本冲突
    var $ = jQuery.noConflict();//重新定义$

    /**************************** BEGIN ****************************/
    /*!
     * xss
     *
     */
	(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){var FilterCSS=require("cssfilter").FilterCSS;var getDefaultCSSWhiteList=require("cssfilter").getDefaultWhiteList;var _=require("./util");function getDefaultWhiteList(){return{a:["target","href","title"],abbr:["title"],address:[],area:["shape","coords","href","alt"],article:[],aside:[],audio:["autoplay","controls","loop","preload","src"],b:[],bdi:["dir"],bdo:["dir"],big:[],blockquote:["cite"],br:[],caption:[],center:[],cite:[],code:[],col:["align","valign","span","width"],colgroup:["align","valign","span","width"],dd:[],del:["datetime"],details:["open"],div:[],dl:[],dt:[],em:[],font:["color","size","face"],footer:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],header:[],hr:[],i:[],img:["src","alt","title","width","height"],ins:["datetime"],li:[],mark:[],nav:[],ol:[],p:[],pre:[],s:[],section:[],small:[],span:[],sub:[],sup:[],strong:[],table:["width","border","align","valign"],tbody:["align","valign"],td:["width","rowspan","colspan","align","valign"],tfoot:["align","valign"],th:["width","rowspan","colspan","align","valign"],thead:["align","valign"],tr:["rowspan","align","valign"],tt:[],u:[],ul:[],video:["autoplay","controls","loop","preload","src","height","width"]}}var defaultCSSFilter=new FilterCSS;function onTag(tag,html,options){}function onIgnoreTag(tag,html,options){}function onTagAttr(tag,name,value){}function onIgnoreTagAttr(tag,name,value){}function escapeHtml(html){return html.replace(REGEXP_LT,"&lt;").replace(REGEXP_GT,"&gt;")}function safeAttrValue(tag,name,value,cssFilter){value=friendlyAttrValue(value);if(name==="href"||name==="src"){value=_.trim(value);if(value==="#")return"#";if(!(value.substr(0,7)==="http://"||value.substr(0,8)==="https://"||value.substr(0,7)==="mailto:"||value[0]==="#"||value[0]==="/")){return""}}else if(name==="background"){REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex=0;if(REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)){return""}}else if(name==="style"){REGEXP_DEFAULT_ON_TAG_ATTR_7.lastIndex=0;if(REGEXP_DEFAULT_ON_TAG_ATTR_7.test(value)){return""}REGEXP_DEFAULT_ON_TAG_ATTR_8.lastIndex=0;if(REGEXP_DEFAULT_ON_TAG_ATTR_8.test(value)){REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex=0;if(REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)){return""}}if(cssFilter!==false){cssFilter=cssFilter||defaultCSSFilter;value=cssFilter.process(value)}}value=escapeAttrValue(value);return value}var REGEXP_LT=/</g;var REGEXP_GT=/>/g;var REGEXP_QUOTE=/"/g;var REGEXP_QUOTE_2=/&quot;/g;var REGEXP_ATTR_VALUE_1=/&#([a-zA-Z0-9]*);?/gim;var REGEXP_ATTR_VALUE_COLON=/&colon;?/gim;var REGEXP_ATTR_VALUE_NEWLINE=/&newline;?/gim;var REGEXP_DEFAULT_ON_TAG_ATTR_3=/\/\*|\*\//gm;var REGEXP_DEFAULT_ON_TAG_ATTR_4=/((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a)\:/gi;var REGEXP_DEFAULT_ON_TAG_ATTR_5=/^[\s"'`]*(d\s*a\s*t\s*a\s*)\:/gi;var REGEXP_DEFAULT_ON_TAG_ATTR_6=/^[\s"'`]*(d\s*a\s*t\s*a\s*)\:\s*image\//gi;var REGEXP_DEFAULT_ON_TAG_ATTR_7=/e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi;var REGEXP_DEFAULT_ON_TAG_ATTR_8=/u\s*r\s*l\s*\(.*/gi;function escapeQuote(str){return str.replace(REGEXP_QUOTE,"&quot;")}function unescapeQuote(str){return str.replace(REGEXP_QUOTE_2,'"')}function escapeHtmlEntities(str){return str.replace(REGEXP_ATTR_VALUE_1,function replaceUnicode(str,code){return code[0]==="x"||code[0]==="X"?String.fromCharCode(parseInt(code.substr(1),16)):String.fromCharCode(parseInt(code,10))})}function escapeDangerHtml5Entities(str){return str.replace(REGEXP_ATTR_VALUE_COLON,":").replace(REGEXP_ATTR_VALUE_NEWLINE," ")}function clearNonPrintableCharacter(str){var str2="";for(var i=0,len=str.length;i<len;i++){str2+=str.charCodeAt(i)<32?" ":str.charAt(i)}return _.trim(str2)}function friendlyAttrValue(str){str=unescapeQuote(str);str=escapeHtmlEntities(str);str=escapeDangerHtml5Entities(str);str=clearNonPrintableCharacter(str);return str}function escapeAttrValue(str){str=escapeQuote(str);str=escapeHtml(str);return str}function onIgnoreTagStripAll(){return""}function StripTagBody(tags,next){if(typeof next!=="function"){next=function(){}}var isRemoveAllTag=!Array.isArray(tags);function isRemoveTag(tag){if(isRemoveAllTag)return true;return _.indexOf(tags,tag)!==-1}var removeList=[];var posStart=false;return{onIgnoreTag:function(tag,html,options){if(isRemoveTag(tag)){if(options.isClosing){var ret="[/removed]";var end=options.position+ret.length;removeList.push([posStart!==false?posStart:options.position,end]);posStart=false;return ret}else{if(!posStart){posStart=options.position}return"[removed]"}}else{return next(tag,html,options)}},remove:function(html){var rethtml="";var lastPos=0;_.forEach(removeList,function(pos){rethtml+=html.slice(lastPos,pos[0]);lastPos=pos[1]});rethtml+=html.slice(lastPos);return rethtml}}}function stripCommentTag(html){return html.replace(STRIP_COMMENT_TAG_REGEXP,"")}var STRIP_COMMENT_TAG_REGEXP=/<!--[\s\S]*?-->/g;function stripBlankChar(html){var chars=html.split("");chars=chars.filter(function(char){var c=char.charCodeAt(0);if(c===127)return false;if(c<=31){if(c===10||c===13)return true;return false}return true});return chars.join("")}exports.whiteList=getDefaultWhiteList();exports.getDefaultWhiteList=getDefaultWhiteList;exports.onTag=onTag;exports.onIgnoreTag=onIgnoreTag;exports.onTagAttr=onTagAttr;exports.onIgnoreTagAttr=onIgnoreTagAttr;exports.safeAttrValue=safeAttrValue;exports.escapeHtml=escapeHtml;exports.escapeQuote=escapeQuote;exports.unescapeQuote=unescapeQuote;exports.escapeHtmlEntities=escapeHtmlEntities;exports.escapeDangerHtml5Entities=escapeDangerHtml5Entities;exports.clearNonPrintableCharacter=clearNonPrintableCharacter;exports.friendlyAttrValue=friendlyAttrValue;exports.escapeAttrValue=escapeAttrValue;exports.onIgnoreTagStripAll=onIgnoreTagStripAll;exports.StripTagBody=StripTagBody;exports.stripCommentTag=stripCommentTag;exports.stripBlankChar=stripBlankChar;exports.cssFilter=defaultCSSFilter;exports.getDefaultCSSWhiteList=getDefaultCSSWhiteList},{"./util":4,cssfilter:8}],2:[function(require,module,exports){var DEFAULT=require("./default");var parser=require("./parser");var FilterXSS=require("./xss");function filterXSS(html,options){var xss=new FilterXSS(options);return xss.process(html)}exports=module.exports=filterXSS;exports.FilterXSS=FilterXSS;for(var i in DEFAULT)exports[i]=DEFAULT[i];for(var i in parser)exports[i]=parser[i];if(typeof window!=="undefined"){window.filterXSS=module.exports}},{"./default":1,"./parser":3,"./xss":5}],3:[function(require,module,exports){var _=require("./util");function getTagName(html){var i=html.indexOf(" ");if(i===-1){var tagName=html.slice(1,-1)}else{var tagName=html.slice(1,i+1)}tagName=_.trim(tagName).toLowerCase();if(tagName.slice(0,1)==="/")tagName=tagName.slice(1);if(tagName.slice(-1)==="/")tagName=tagName.slice(0,-1);return tagName}function isClosing(html){return html.slice(0,2)==="</"}function parseTag(html,onTag,escapeHtml){"user strict";var rethtml="";var lastPos=0;var tagStart=false;var quoteStart=false;var currentPos=0;var len=html.length;var currentHtml="";var currentTagName="";for(currentPos=0;currentPos<len;currentPos++){var c=html.charAt(currentPos);if(tagStart===false){if(c==="<"){tagStart=currentPos;continue}}else{if(quoteStart===false){if(c==="<"){rethtml+=escapeHtml(html.slice(lastPos,currentPos));tagStart=currentPos;lastPos=currentPos;continue}if(c===">"){rethtml+=escapeHtml(html.slice(lastPos,tagStart));currentHtml=html.slice(tagStart,currentPos+1);currentTagName=getTagName(currentHtml);rethtml+=onTag(tagStart,rethtml.length,currentTagName,currentHtml,isClosing(currentHtml));lastPos=currentPos+1;tagStart=false;continue}if((c==='"'||c==="'")&&html.charAt(currentPos-1)==="="){quoteStart=c;continue}}else{if(c===quoteStart){quoteStart=false;continue}}}}if(lastPos<html.length){rethtml+=escapeHtml(html.substr(lastPos))}return rethtml}var REGEXP_ATTR_NAME=/[^a-zA-Z0-9_:\.\-]/gim;function parseAttr(html,onAttr){"user strict";var lastPos=0;var retAttrs=[];var tmpName=false;var len=html.length;function addAttr(name,value){name=_.trim(name);name=name.replace(REGEXP_ATTR_NAME,"").toLowerCase();if(name.length<1)return;var ret=onAttr(name,value||"");if(ret)retAttrs.push(ret)}for(var i=0;i<len;i++){var c=html.charAt(i);var v,j;if(tmpName===false&&c==="="){tmpName=html.slice(lastPos,i);lastPos=i+1;continue}if(tmpName!==false){if(i===lastPos&&(c==='"'||c==="'")&&html.charAt(i-1)==="="){j=html.indexOf(c,i+1);if(j===-1){break}else{v=_.trim(html.slice(lastPos+1,j));addAttr(tmpName,v);tmpName=false;i=j;lastPos=i+1;continue}}}if(c===" "){if(tmpName===false){j=findNextEqual(html,i);if(j===-1){v=_.trim(html.slice(lastPos,i));addAttr(v);tmpName=false;lastPos=i+1;continue}else{i=j-1;continue}}else{j=findBeforeEqual(html,i-1);if(j===-1){v=_.trim(html.slice(lastPos,i));v=stripQuoteWrap(v);addAttr(tmpName,v);tmpName=false;lastPos=i+1;continue}else{continue}}}}if(lastPos<html.length){if(tmpName===false){addAttr(html.slice(lastPos))}else{addAttr(tmpName,stripQuoteWrap(_.trim(html.slice(lastPos))))}}return _.trim(retAttrs.join(" "))}function findNextEqual(str,i){for(;i<str.length;i++){var c=str[i];if(c===" ")continue;if(c==="=")return i;return-1}}function findBeforeEqual(str,i){for(;i>0;i--){var c=str[i];if(c===" ")continue;if(c==="=")return i;return-1}}function isQuoteWrapString(text){if(text[0]==='"'&&text[text.length-1]==='"'||text[0]==="'"&&text[text.length-1]==="'"){return true}else{return false}}function stripQuoteWrap(text){if(isQuoteWrapString(text)){return text.substr(1,text.length-2)}else{return text}}exports.parseTag=parseTag;exports.parseAttr=parseAttr},{"./util":4}],4:[function(require,module,exports){module.exports={indexOf:function(arr,item){var i,j;if(Array.prototype.indexOf){return arr.indexOf(item)}for(i=0,j=arr.length;i<j;i++){if(arr[i]===item){return i}}return-1},forEach:function(arr,fn,scope){var i,j;if(Array.prototype.forEach){return arr.forEach(fn,scope)}for(i=0,j=arr.length;i<j;i++){fn.call(scope,arr[i],i,arr)}},trim:function(str){if(String.prototype.trim){return str.trim()}return str.replace(/(^\s*)|(\s*$)/g,"")}}},{}],5:[function(require,module,exports){var FilterCSS=require("cssfilter").FilterCSS;var DEFAULT=require("./default");var parser=require("./parser");var parseTag=parser.parseTag;var parseAttr=parser.parseAttr;var _=require("./util");function isNull(obj){return obj===undefined||obj===null}function getAttrs(html){var i=html.indexOf(" ");if(i===-1){return{html:"",closing:html[html.length-2]==="/"}}html=_.trim(html.slice(i+1,-1));var isClosing=html[html.length-1]==="/";if(isClosing)html=_.trim(html.slice(0,-1));return{html:html,closing:isClosing}}function FilterXSS(options){options=options||{};if(options.stripIgnoreTag){if(options.onIgnoreTag){console.error('Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time')}options.onIgnoreTag=DEFAULT.onIgnoreTagStripAll}options.whiteList=options.whiteList||DEFAULT.whiteList;options.onTag=options.onTag||DEFAULT.onTag;options.onTagAttr=options.onTagAttr||DEFAULT.onTagAttr;options.onIgnoreTag=options.onIgnoreTag||DEFAULT.onIgnoreTag;options.onIgnoreTagAttr=options.onIgnoreTagAttr||DEFAULT.onIgnoreTagAttr;options.safeAttrValue=options.safeAttrValue||DEFAULT.safeAttrValue;options.escapeHtml=options.escapeHtml||DEFAULT.escapeHtml;this.options=options;if(options.css===false){this.cssFilter=false}else{options.css=options.css||{};this.cssFilter=new FilterCSS(options.css)}}FilterXSS.prototype.process=function(html){html=html||"";html=html.toString();if(!html)return"";var me=this;var options=me.options;var whiteList=options.whiteList;var onTag=options.onTag;var onIgnoreTag=options.onIgnoreTag;var onTagAttr=options.onTagAttr;var onIgnoreTagAttr=options.onIgnoreTagAttr;var safeAttrValue=options.safeAttrValue;var escapeHtml=options.escapeHtml;var cssFilter=me.cssFilter;if(options.stripBlankChar){html=DEFAULT.stripBlankChar(html)}if(!options.allowCommentTag){html=DEFAULT.stripCommentTag(html)}var stripIgnoreTagBody=false;if(options.stripIgnoreTagBody){var stripIgnoreTagBody=DEFAULT.StripTagBody(options.stripIgnoreTagBody,onIgnoreTag);onIgnoreTag=stripIgnoreTagBody.onIgnoreTag}var retHtml=parseTag(html,function(sourcePosition,position,tag,html,isClosing){var info={sourcePosition:sourcePosition,position:position,isClosing:isClosing,isWhite:tag in whiteList};var ret=onTag(tag,html,info);if(!isNull(ret))return ret;if(info.isWhite){if(info.isClosing){return"</"+tag+">"}var attrs=getAttrs(html);var whiteAttrList=whiteList[tag];var attrsHtml=parseAttr(attrs.html,function(name,value){var isWhiteAttr=_.indexOf(whiteAttrList,name)!==-1;var ret=onTagAttr(tag,name,value,isWhiteAttr);if(!isNull(ret))return ret;if(isWhiteAttr){value=safeAttrValue(tag,name,value,cssFilter);if(value){return name+'="'+value+'"'}else{return name}}else{var ret=onIgnoreTagAttr(tag,name,value,isWhiteAttr);if(!isNull(ret))return ret;return}});var html="<"+tag;if(attrsHtml)html+=" "+attrsHtml;if(attrs.closing)html+=" /";html+=">";return html}else{var ret=onIgnoreTag(tag,html,info);if(!isNull(ret))return ret;return escapeHtml(html)}},escapeHtml);if(stripIgnoreTagBody){retHtml=stripIgnoreTagBody.remove(retHtml)}return retHtml};module.exports=FilterXSS},{"./default":1,"./parser":3,"./util":4,cssfilter:8}],6:[function(require,module,exports){var DEFAULT=require("./default");var parseStyle=require("./parser");var _=require("./util");function isNull(obj){return obj===undefined||obj===null}function FilterCSS(options){options=options||{};options.whiteList=options.whiteList||DEFAULT.whiteList;options.onAttr=options.onAttr||DEFAULT.onAttr;options.onIgnoreAttr=options.onIgnoreAttr||DEFAULT.onIgnoreAttr;this.options=options}FilterCSS.prototype.process=function(css){css=css||"";css=css.toString();if(!css)return"";var me=this;var options=me.options;var whiteList=options.whiteList;var onAttr=options.onAttr;var onIgnoreAttr=options.onIgnoreAttr;var retCSS=parseStyle(css,function(sourcePosition,position,name,value,source){var check=whiteList[name];var isWhite=false;if(check===true)isWhite=check;else if(typeof check==="function")isWhite=check(value);else if(check instanceof RegExp)isWhite=check.test(value);if(isWhite!==true)isWhite=false;var opts={position:position,sourcePosition:sourcePosition,source:source,isWhite:isWhite};if(isWhite){var ret=onAttr(name,value,opts);if(isNull(ret)){return name+":"+value}else{return ret}}else{var ret=onIgnoreAttr(name,value,opts);if(!isNull(ret)){return ret}}});return retCSS};module.exports=FilterCSS},{"./default":7,"./parser":9,"./util":10}],7:[function(require,module,exports){function getDefaultWhiteList(){var whiteList={};whiteList["align-content"]=false;whiteList["align-items"]=false;whiteList["align-self"]=false;whiteList["alignment-adjust"]=false;whiteList["alignment-baseline"]=false;whiteList["all"]=false;whiteList["anchor-point"]=false;whiteList["animation"]=false;whiteList["animation-delay"]=false;whiteList["animation-direction"]=false;whiteList["animation-duration"]=false;whiteList["animation-fill-mode"]=false;whiteList["animation-iteration-count"]=false;whiteList["animation-name"]=false;whiteList["animation-play-state"]=false;whiteList["animation-timing-function"]=false;whiteList["azimuth"]=false;whiteList["backface-visibility"]=false;whiteList["background"]=true;whiteList["background-attachment"]=true;whiteList["background-clip"]=true;whiteList["background-color"]=true;whiteList["background-image"]=true;whiteList["background-origin"]=true;whiteList["background-position"]=true;whiteList["background-repeat"]=true;whiteList["background-size"]=true;whiteList["baseline-shift"]=false;whiteList["binding"]=false;whiteList["bleed"]=false;whiteList["bookmark-label"]=false;whiteList["bookmark-level"]=false;whiteList["bookmark-state"]=false;whiteList["border"]=true;whiteList["border-bottom"]=true;whiteList["border-bottom-color"]=true;whiteList["border-bottom-left-radius"]=true;whiteList["border-bottom-right-radius"]=true;whiteList["border-bottom-style"]=true;whiteList["border-bottom-width"]=true;whiteList["border-collapse"]=true;whiteList["border-color"]=true;whiteList["border-image"]=true;whiteList["border-image-outset"]=true;whiteList["border-image-repeat"]=true;whiteList["border-image-slice"]=true;whiteList["border-image-source"]=true;whiteList["border-image-width"]=true;whiteList["border-left"]=true;whiteList["border-left-color"]=true;whiteList["border-left-style"]=true;whiteList["border-left-width"]=true;whiteList["border-radius"]=true;whiteList["border-right"]=true;whiteList["border-right-color"]=true;whiteList["border-right-style"]=true;whiteList["border-right-width"]=true;whiteList["border-spacing"]=true;whiteList["border-style"]=true;whiteList["border-top"]=true;whiteList["border-top-color"]=true;whiteList["border-top-left-radius"]=true;whiteList["border-top-right-radius"]=true;whiteList["border-top-style"]=true;whiteList["border-top-width"]=true;whiteList["border-width"]=true;whiteList["bottom"]=false;whiteList["box-decoration-break"]=true;whiteList["box-shadow"]=true;whiteList["box-sizing"]=true;whiteList["box-snap"]=true;whiteList["box-suppress"]=true;whiteList["break-after"]=true;whiteList["break-before"]=true;whiteList["break-inside"]=true;whiteList["caption-side"]=false;whiteList["chains"]=false;whiteList["clear"]=true;whiteList["clip"]=false;whiteList["clip-path"]=false;whiteList["clip-rule"]=false;whiteList["color"]=true;whiteList["color-interpolation-filters"]=true;whiteList["column-count"]=false;whiteList["column-fill"]=false;whiteList["column-gap"]=false;whiteList["column-rule"]=false;whiteList["column-rule-color"]=false;whiteList["column-rule-style"]=false;whiteList["column-rule-width"]=false;whiteList["column-span"]=false;whiteList["column-width"]=false;whiteList["columns"]=false;whiteList["contain"]=false;whiteList["content"]=false;whiteList["counter-increment"]=false;whiteList["counter-reset"]=false;whiteList["counter-set"]=false;whiteList["crop"]=false;whiteList["cue"]=false;whiteList["cue-after"]=false;whiteList["cue-before"]=false;whiteList["cursor"]=false;whiteList["direction"]=false;whiteList["display"]=true;whiteList["display-inside"]=true;whiteList["display-list"]=true;whiteList["display-outside"]=true;whiteList["dominant-baseline"]=false;whiteList["elevation"]=false;whiteList["empty-cells"]=false;whiteList["filter"]=false;whiteList["flex"]=false;whiteList["flex-basis"]=false;whiteList["flex-direction"]=false;whiteList["flex-flow"]=false;whiteList["flex-grow"]=false;whiteList["flex-shrink"]=false;whiteList["flex-wrap"]=false;whiteList["float"]=false;whiteList["float-offset"]=false;whiteList["flood-color"]=false;whiteList["flood-opacity"]=false;whiteList["flow-from"]=false;whiteList["flow-into"]=false;whiteList["font"]=true;whiteList["font-family"]=true;whiteList["font-feature-settings"]=true;whiteList["font-kerning"]=true;whiteList["font-language-override"]=true;whiteList["font-size"]=true;whiteList["font-size-adjust"]=true;whiteList["font-stretch"]=true;whiteList["font-style"]=true;whiteList["font-synthesis"]=true;whiteList["font-variant"]=true;whiteList["font-variant-alternates"]=true;whiteList["font-variant-caps"]=true;whiteList["font-variant-east-asian"]=true;whiteList["font-variant-ligatures"]=true;whiteList["font-variant-numeric"]=true;whiteList["font-variant-position"]=true;whiteList["font-weight"]=true;whiteList["grid"]=false;whiteList["grid-area"]=false;whiteList["grid-auto-columns"]=false;whiteList["grid-auto-flow"]=false;whiteList["grid-auto-rows"]=false;whiteList["grid-column"]=false;whiteList["grid-column-end"]=false;whiteList["grid-column-start"]=false;whiteList["grid-row"]=false;whiteList["grid-row-end"]=false;whiteList["grid-row-start"]=false;whiteList["grid-template"]=false;whiteList["grid-template-areas"]=false;whiteList["grid-template-columns"]=false;whiteList["grid-template-rows"]=false;whiteList["hanging-punctuation"]=false;whiteList["height"]=true;whiteList["hyphens"]=false;whiteList["icon"]=false;whiteList["image-orientation"]=false;whiteList["image-resolution"]=false;whiteList["ime-mode"]=false;whiteList["initial-letters"]=false;whiteList["inline-box-align"]=false;whiteList["justify-content"]=false;whiteList["justify-items"]=false;whiteList["justify-self"]=false;whiteList["left"]=false;whiteList["letter-spacing"]=true;whiteList["lighting-color"]=true;whiteList["line-box-contain"]=false;whiteList["line-break"]=false;whiteList["line-grid"]=false;whiteList["line-height"]=false;whiteList["line-snap"]=false;whiteList["line-stacking"]=false;whiteList["line-stacking-ruby"]=false;whiteList["line-stacking-shift"]=false;whiteList["line-stacking-strategy"]=false;whiteList["list-style"]=true;whiteList["list-style-image"]=true;whiteList["list-style-position"]=true;whiteList["list-style-type"]=true;whiteList["margin"]=true;whiteList["margin-bottom"]=true;whiteList["margin-left"]=true;whiteList["margin-right"]=true;whiteList["margin-top"]=true;whiteList["marker-offset"]=false;whiteList["marker-side"]=false;whiteList["marks"]=false;whiteList["mask"]=false;whiteList["mask-box"]=false;whiteList["mask-box-outset"]=false;whiteList["mask-box-repeat"]=false;whiteList["mask-box-slice"]=false;whiteList["mask-box-source"]=false;whiteList["mask-box-width"]=false;whiteList["mask-clip"]=false;whiteList["mask-image"]=false;whiteList["mask-origin"]=false;whiteList["mask-position"]=false;whiteList["mask-repeat"]=false;whiteList["mask-size"]=false;whiteList["mask-source-type"]=false;whiteList["mask-type"]=false;whiteList["max-height"]=true;whiteList["max-lines"]=false;whiteList["max-width"]=true;whiteList["min-height"]=true;whiteList["min-width"]=true;whiteList["move-to"]=false;whiteList["nav-down"]=false;whiteList["nav-index"]=false;whiteList["nav-left"]=false;whiteList["nav-right"]=false;whiteList["nav-up"]=false;whiteList["object-fit"]=false;whiteList["object-position"]=false;whiteList["opacity"]=false;whiteList["order"]=false;whiteList["orphans"]=false;whiteList["outline"]=false;whiteList["outline-color"]=false;whiteList["outline-offset"]=false;whiteList["outline-style"]=false;whiteList["outline-width"]=false;whiteList["overflow"]=false;whiteList["overflow-wrap"]=false;whiteList["overflow-x"]=false;whiteList["overflow-y"]=false;whiteList["padding"]=true;whiteList["padding-bottom"]=true;whiteList["padding-left"]=true;whiteList["padding-right"]=true;whiteList["padding-top"]=true;whiteList["page"]=false;whiteList["page-break-after"]=false;whiteList["page-break-before"]=false;whiteList["page-break-inside"]=false;whiteList["page-policy"]=false;whiteList["pause"]=false;whiteList["pause-after"]=false;whiteList["pause-before"]=false;whiteList["perspective"]=false;whiteList["perspective-origin"]=false;whiteList["pitch"]=false;whiteList["pitch-range"]=false;whiteList["play-during"]=false;whiteList["position"]=false;whiteList["presentation-level"]=false;whiteList["quotes"]=false;whiteList["region-fragment"]=false;whiteList["resize"]=false;whiteList["rest"]=false;whiteList["rest-after"]=false;whiteList["rest-before"]=false;whiteList["richness"]=false;whiteList["right"]=false;whiteList["rotation"]=false;whiteList["rotation-point"]=false;whiteList["ruby-align"]=false;whiteList["ruby-merge"]=false;whiteList["ruby-position"]=false;whiteList["shape-image-threshold"]=false;whiteList["shape-outside"]=false;whiteList["shape-margin"]=false;whiteList["size"]=false;whiteList["speak"]=false;whiteList["speak-as"]=false;whiteList["speak-header"]=false;whiteList["speak-numeral"]=false;whiteList["speak-punctuation"]=false;whiteList["speech-rate"]=false;whiteList["stress"]=false;whiteList["string-set"]=false;whiteList["tab-size"]=false;whiteList["table-layout"]=false;whiteList["text-align"]=true;whiteList["text-align-last"]=true;whiteList["text-combine-upright"]=true;whiteList["text-decoration"]=true;whiteList["text-decoration-color"]=true;whiteList["text-decoration-line"]=true;whiteList["text-decoration-skip"]=true;whiteList["text-decoration-style"]=true;whiteList["text-emphasis"]=true;whiteList["text-emphasis-color"]=true;whiteList["text-emphasis-position"]=true;whiteList["text-emphasis-style"]=true;whiteList["text-height"]=true;whiteList["text-indent"]=true;whiteList["text-justify"]=true;whiteList["text-orientation"]=true;whiteList["text-overflow"]=true;whiteList["text-shadow"]=true;whiteList["text-space-collapse"]=true;whiteList["text-transform"]=true;whiteList["text-underline-position"]=true;whiteList["text-wrap"]=true;whiteList["top"]=false;whiteList["transform"]=false;whiteList["transform-origin"]=false;whiteList["transform-style"]=false;whiteList["transition"]=false;whiteList["transition-delay"]=false;whiteList["transition-duration"]=false;whiteList["transition-property"]=false;whiteList["transition-timing-function"]=false;whiteList["unicode-bidi"]=false;whiteList["vertical-align"]=false;whiteList["visibility"]=false;whiteList["voice-balance"]=false;whiteList["voice-duration"]=false;whiteList["voice-family"]=false;whiteList["voice-pitch"]=false;whiteList["voice-range"]=false;whiteList["voice-rate"]=false;whiteList["voice-stress"]=false;whiteList["voice-volume"]=false;whiteList["volume"]=false;whiteList["white-space"]=false;whiteList["widows"]=false;whiteList["width"]=true;whiteList["will-change"]=false;whiteList["word-break"]=true;whiteList["word-spacing"]=true;whiteList["word-wrap"]=true;whiteList["wrap-flow"]=false;whiteList["wrap-through"]=false;whiteList["writing-mode"]=false;whiteList["z-index"]=false;return whiteList}function onAttr(name,value,options){}function onIgnoreAttr(name,value,options){}exports.whiteList=getDefaultWhiteList();exports.getDefaultWhiteList=getDefaultWhiteList;exports.onAttr=onAttr;exports.onIgnoreAttr=onIgnoreAttr},{}],8:[function(require,module,exports){var DEFAULT=require("./default");var FilterCSS=require("./css");function filterCSS(html,options){var xss=new FilterCSS(options);return xss.process(html)}exports=module.exports=filterCSS;exports.FilterCSS=FilterCSS;for(var i in DEFAULT)exports[i]=DEFAULT[i];if(typeof window!=="undefined"){window.filterCSS=module.exports}},{"./css":6,"./default":7}],9:[function(require,module,exports){var _=require("./util");function parseStyle(css,onAttr){css=_.trimRight(css);if(css[css.length-1]!==";")css+=";";var cssLength=css.length;var isParenthesisOpen=false;var lastPos=0;var i=0;var retCSS="";function addNewAttr(){if(!isParenthesisOpen){var source=_.trim(css.slice(lastPos,i));var j=source.indexOf(":");if(j!==-1){var name=_.trim(source.slice(0,j));var value=_.trim(source.slice(j+1));if(name){var ret=onAttr(lastPos,retCSS.length,name,value,source);if(ret)retCSS+=ret+"; "}}}lastPos=i+1}for(;i<cssLength;i++){var c=css[i];if(c==="/"&&css[i+1]==="*"){var j=css.indexOf("*/",i+2);if(j===-1)break;i=j+1;lastPos=i+1;isParenthesisOpen=false}else if(c==="("){isParenthesisOpen=true}else if(c===")"){isParenthesisOpen=false}else if(c===";"){if(isParenthesisOpen){}else{addNewAttr()}}else if(c==="\n"){addNewAttr()}}return _.trim(retCSS)}module.exports=parseStyle},{"./util":10}],10:[function(require,module,exports){module.exports={indexOf:function(arr,item){var i,j;if(Array.prototype.indexOf){return arr.indexOf(item)}for(i=0,j=arr.length;i<j;i++){if(arr[i]===item){return i}}return-1},forEach:function(arr,fn,scope){var i,j;if(Array.prototype.forEach){return arr.forEach(fn,scope)}for(i=0,j=arr.length;i<j;i++){fn.call(scope,arr[i],i,arr)}},trim:function(str){if(String.prototype.trim){return str.trim()}return str.replace(/(^\s*)|(\s*$)/g,"")},trimRight:function(str){if(String.prototype.trimRight){return str.trimRight()}return str.replace(/(\s*$)/g,"")}}},{}]},{},[2]);
    /**************************** END ****************************/

    /**************************** BEGIN ****************************/
    /*!
     * fastclick
     *
     */
    ;(function(){'use strict';function FastClick(layer,options){var oldOnClick;options=options||{};this.trackingClick=false;this.trackingClickStart=0;this.targetElement=null;this.touchStartX=0;this.touchStartY=0;this.lastTouchIdentifier=0;this.touchBoundary=options.touchBoundary||10;this.layer=layer;this.tapDelay=options.tapDelay||200;this.tapTimeout=options.tapTimeout||700;if(FastClick.notNeeded(layer)){return}function bind(method,context){return function(){return method.apply(context,arguments)}}var methods=['onMouse','onClick','onTouchStart','onTouchMove','onTouchEnd','onTouchCancel'];var context=this;for(var i=0,l=methods.length;i<l;i++){context[methods[i]]=bind(context[methods[i]],context)}if(deviceIsAndroid){layer.addEventListener('mouseover',this.onMouse,true);layer.addEventListener('mousedown',this.onMouse,true);layer.addEventListener('mouseup',this.onMouse,true)}layer.addEventListener('click',this.onClick,true);layer.addEventListener('touchstart',this.onTouchStart,false);layer.addEventListener('touchmove',this.onTouchMove,false);layer.addEventListener('touchend',this.onTouchEnd,false);layer.addEventListener('touchcancel',this.onTouchCancel,false);if(!Event.prototype.stopImmediatePropagation){layer.removeEventListener=function(type,callback,capture){var rmv=Node.prototype.removeEventListener;if(type==='click'){rmv.call(layer,type,callback.hijacked||callback,capture)}else{rmv.call(layer,type,callback,capture)}};layer.addEventListener=function(type,callback,capture){var adv=Node.prototype.addEventListener;if(type==='click'){adv.call(layer,type,callback.hijacked||(callback.hijacked=function(event){if(!event.propagationStopped){callback(event)}}),capture)}else{adv.call(layer,type,callback,capture)}}}if(typeof layer.onclick==='function'){oldOnClick=layer.onclick;layer.addEventListener('click',function(event){oldOnClick(event)},false);layer.onclick=null}}var deviceIsWindowsPhone=navigator.userAgent.indexOf("Windows Phone")>=0;var deviceIsAndroid=navigator.userAgent.indexOf('Android')>0&&!deviceIsWindowsPhone;var deviceIsIOS=/iP(ad|hone|od)/.test(navigator.userAgent)&&!deviceIsWindowsPhone;var deviceIsIOS4=deviceIsIOS&&(/OS 4_\d(_\d)?/).test(navigator.userAgent);var deviceIsIOSWithBadTarget=deviceIsIOS&&(/OS [6-7]_\d/).test(navigator.userAgent);var deviceIsBlackBerry10=navigator.userAgent.indexOf('BB10')>0;FastClick.prototype.needsClick=function(target){switch(target.nodeName.toLowerCase()){case'button':case'select':case'textarea':if(target.disabled){return true}break;case'input':if((deviceIsIOS&&target.type==='file')||target.disabled){return true}break;case'label':case'iframe':case'video':return true}return(/\bneedsclick\b/).test(target.className)};FastClick.prototype.needsFocus=function(target){switch(target.nodeName.toLowerCase()){case'textarea':return true;case'select':return!deviceIsAndroid;case'input':switch(target.type){case'button':case'checkbox':case'file':case'image':case'radio':case'submit':return false}return!target.disabled&&!target.readOnly;default:return(/\bneedsfocus\b/).test(target.className)}};FastClick.prototype.sendClick=function(targetElement,event){var clickEvent,touch;if(document.activeElement&&document.activeElement!==targetElement){document.activeElement.blur()}touch=event.changedTouches[0];clickEvent=document.createEvent('MouseEvents');clickEvent.initMouseEvent(this.determineEventType(targetElement),true,true,window,1,touch.screenX,touch.screenY,touch.clientX,touch.clientY,false,false,false,false,0,null);clickEvent.forwardedTouchEvent=true;targetElement.dispatchEvent(clickEvent)};FastClick.prototype.determineEventType=function(targetElement){if(deviceIsAndroid&&targetElement.tagName.toLowerCase()==='select'){return'mousedown'}return'click'};FastClick.prototype.focus=function(targetElement){var length;if(deviceIsIOS&&targetElement.setSelectionRange&&targetElement.type.indexOf('date')!==0&&targetElement.type!=='time'&&targetElement.type!=='month'){length=targetElement.value.length;targetElement.setSelectionRange(length,length)}else{targetElement.focus()}};FastClick.prototype.updateScrollParent=function(targetElement){var scrollParent,parentElement;scrollParent=targetElement.fastClickScrollParent;if(!scrollParent||!scrollParent.contains(targetElement)){parentElement=targetElement;do{if(parentElement.scrollHeight>parentElement.offsetHeight){scrollParent=parentElement;targetElement.fastClickScrollParent=parentElement;break}parentElement=parentElement.parentElement}while(parentElement)}if(scrollParent){scrollParent.fastClickLastScrollTop=scrollParent.scrollTop}};FastClick.prototype.getTargetElementFromEventTarget=function(eventTarget){if(eventTarget.nodeType===Node.TEXT_NODE){return eventTarget.parentNode}return eventTarget};FastClick.prototype.onTouchStart=function(event){var targetElement,touch,selection;if(event.targetTouches.length>1){return true}targetElement=this.getTargetElementFromEventTarget(event.target);touch=event.targetTouches[0];if(deviceIsIOS){selection=window.getSelection();if(selection.rangeCount&&!selection.isCollapsed){return true}if(!deviceIsIOS4){if(touch.identifier&&touch.identifier===this.lastTouchIdentifier){event.preventDefault();return false}this.lastTouchIdentifier=touch.identifier;this.updateScrollParent(targetElement)}}this.trackingClick=true;this.trackingClickStart=event.timeStamp;this.targetElement=targetElement;this.touchStartX=touch.pageX;this.touchStartY=touch.pageY;if((event.timeStamp-this.lastClickTime)<this.tapDelay){event.preventDefault()}return true};FastClick.prototype.touchHasMoved=function(event){var touch=event.changedTouches[0],boundary=this.touchBoundary;if(Math.abs(touch.pageX-this.touchStartX)>boundary||Math.abs(touch.pageY-this.touchStartY)>boundary){return true}return false};FastClick.prototype.onTouchMove=function(event){if(!this.trackingClick){return true}if(this.targetElement!==this.getTargetElementFromEventTarget(event.target)||this.touchHasMoved(event)){this.trackingClick=false;this.targetElement=null}return true};FastClick.prototype.findControl=function(labelElement){if(labelElement.control!==undefined){return labelElement.control}if(labelElement.htmlFor){return document.getElementById(labelElement.htmlFor)}return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea')};FastClick.prototype.onTouchEnd=function(event){var forElement,trackingClickStart,targetTagName,scrollParent,touch,targetElement=this.targetElement;if(!this.trackingClick){return true}if((event.timeStamp-this.lastClickTime)<this.tapDelay){this.cancelNextClick=true;return true}if((event.timeStamp-this.trackingClickStart)>this.tapTimeout){return true}this.cancelNextClick=false;this.lastClickTime=event.timeStamp;trackingClickStart=this.trackingClickStart;this.trackingClick=false;this.trackingClickStart=0;if(deviceIsIOSWithBadTarget){touch=event.changedTouches[0];targetElement=document.elementFromPoint(touch.pageX-window.pageXOffset,touch.pageY-window.pageYOffset)||targetElement;targetElement.fastClickScrollParent=this.targetElement.fastClickScrollParent}targetTagName=targetElement.tagName.toLowerCase();if(targetTagName==='label'){forElement=this.findControl(targetElement);if(forElement){this.focus(targetElement);if(deviceIsAndroid){return false}targetElement=forElement}}else if(this.needsFocus(targetElement)){if((event.timeStamp-trackingClickStart)>100||(deviceIsIOS&&window.top!==window&&targetTagName==='input')){this.targetElement=null;return false}this.focus(targetElement);this.sendClick(targetElement,event);if(!deviceIsIOS||targetTagName!=='select'){this.targetElement=null;event.preventDefault()}return false}if(deviceIsIOS&&!deviceIsIOS4){scrollParent=targetElement.fastClickScrollParent;if(scrollParent&&scrollParent.fastClickLastScrollTop!==scrollParent.scrollTop){return true}}if(!this.needsClick(targetElement)){event.preventDefault();this.sendClick(targetElement,event)}return false};FastClick.prototype.onTouchCancel=function(){this.trackingClick=false;this.targetElement=null};FastClick.prototype.onMouse=function(event){if(!this.targetElement){return true}if(event.forwardedTouchEvent){return true}if(!event.cancelable){return true}if(!this.needsClick(this.targetElement)||this.cancelNextClick){if(event.stopImmediatePropagation){event.stopImmediatePropagation()}else{event.propagationStopped=true}event.stopPropagation();event.preventDefault();return false}return true};FastClick.prototype.onClick=function(event){var permitted;if(this.trackingClick){this.targetElement=null;this.trackingClick=false;return true}if(event.target.type==='submit'&&event.detail===0){return true}permitted=this.onMouse(event);if(!permitted){this.targetElement=null}return permitted};FastClick.prototype.destroy=function(){var layer=this.layer;if(deviceIsAndroid){layer.removeEventListener('mouseover',this.onMouse,true);layer.removeEventListener('mousedown',this.onMouse,true);layer.removeEventListener('mouseup',this.onMouse,true)}layer.removeEventListener('click',this.onClick,true);layer.removeEventListener('touchstart',this.onTouchStart,false);layer.removeEventListener('touchmove',this.onTouchMove,false);layer.removeEventListener('touchend',this.onTouchEnd,false);layer.removeEventListener('touchcancel',this.onTouchCancel,false)};FastClick.notNeeded=function(layer){var metaViewport;var chromeVersion;var blackberryVersion;var firefoxVersion;if(typeof window.ontouchstart==='undefined'){return true}chromeVersion=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1];if(chromeVersion){if(deviceIsAndroid){metaViewport=document.querySelector('meta[name=viewport]');if(metaViewport){if(metaViewport.content.indexOf('user-scalable=no')!==-1){return true}if(chromeVersion>31&&document.documentElement.scrollWidth<=window.outerWidth){return true}}}else{return true}}if(deviceIsBlackBerry10){blackberryVersion=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);if(blackberryVersion[1]>=10&&blackberryVersion[2]>=3){metaViewport=document.querySelector('meta[name=viewport]');if(metaViewport){if(metaViewport.content.indexOf('user-scalable=no')!==-1){return true}if(document.documentElement.scrollWidth<=window.outerWidth){return true}}}}if(layer.style.msTouchAction==='none'||layer.style.touchAction==='manipulation'){return true}firefoxVersion=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1];if(firefoxVersion>=27){metaViewport=document.querySelector('meta[name=viewport]');if(metaViewport&&(metaViewport.content.indexOf('user-scalable=no')!==-1||document.documentElement.scrollWidth<=window.outerWidth)){return true}}if(layer.style.touchAction==='none'||layer.style.touchAction==='manipulation'){return true}return false};FastClick.attach=function(layer,options){return new FastClick(layer,options)};if(typeof define==='function'&&typeof define.amd==='object'&&define.amd){define(function(){return FastClick})}else if(typeof module!=='undefined'&&module.exports){module.exports=FastClick.attach;module.exports.FastClick=FastClick}else{window.FastClick=FastClick}}());
    /**************************** END ****************************/

    /**************************** BEGIN ****************************/
    /*
     * @fileOverview TouchSwipe - jQuery Plugin
     * @version 1.6.15
     *
     * @author Matt Bryson http://www.github.com/mattbryson
     * @see https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
     * @see http://labs.rampinteractive.co.uk/touchSwipe/
     * @see http://plugins.jquery.com/project/touchSwipe
     *
     * Copyright (c) 2010-2015 Matt Bryson
     * Dual licensed under the MIT or GPL Version 2 licenses.
     *
     */
	(function(a){if(typeof define==="function"&&define.amd&&define.amd.jQuery){define(["jquery"],a)}else{if(typeof module!=="undefined"&&module.exports){a(require("jquery"))}else{a(jQuery)}}}(function(f){var y="1.6.15",p="left",o="right",e="up",x="down",c="in",A="out",m="none",s="auto",l="swipe",t="pinch",B="tap",j="doubletap",b="longtap",z="hold",E="horizontal",u="vertical",i="all",r=10,g="start",k="move",h="end",q="cancel",a="ontouchstart" in window,v=window.navigator.msPointerEnabled&&!window.navigator.pointerEnabled&&!a,d=(window.navigator.pointerEnabled||window.navigator.msPointerEnabled)&&!a,C="TouchSwipe";var n={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,hold:null,triggerOnTouchEnd:true,triggerOnTouchLeave:false,allowPageScroll:"auto",fallbackToMouseEvents:true,excludedElements:"label, button, input, select, textarea, a, .noSwipe",preventDefaultEvents:true};f.fn.swipe=function(H){var G=f(this),F=G.data(C);if(F&&typeof H==="string"){if(F[H]){return F[H].apply(this,Array.prototype.slice.call(arguments,1))}else{f.error("Method "+H+" does not exist on jQuery.swipe")}}else{if(F&&typeof H==="object"){F.option.apply(this,arguments)}else{if(!F&&(typeof H==="object"||!H)){return w.apply(this,arguments)}}}return G};f.fn.swipe.version=y;f.fn.swipe.defaults=n;f.fn.swipe.phases={PHASE_START:g,PHASE_MOVE:k,PHASE_END:h,PHASE_CANCEL:q};f.fn.swipe.directions={LEFT:p,RIGHT:o,UP:e,DOWN:x,IN:c,OUT:A};f.fn.swipe.pageScroll={NONE:m,HORIZONTAL:E,VERTICAL:u,AUTO:s};f.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,FOUR:4,FIVE:5,ALL:i};function w(F){if(F&&(F.allowPageScroll===undefined&&(F.swipe!==undefined||F.swipeStatus!==undefined))){F.allowPageScroll=m}if(F.click!==undefined&&F.tap===undefined){F.tap=F.click}if(!F){F={}}F=f.extend({},f.fn.swipe.defaults,F);return this.each(function(){var H=f(this);var G=H.data(C);if(!G){G=new D(this,F);H.data(C,G)}})}function D(a5,au){var au=f.extend({},au);var az=(a||d||!au.fallbackToMouseEvents),K=az?(d?(v?"MSPointerDown":"pointerdown"):"touchstart"):"mousedown",ax=az?(d?(v?"MSPointerMove":"pointermove"):"touchmove"):"mousemove",V=az?(d?(v?"MSPointerUp":"pointerup"):"touchend"):"mouseup",T=az?(d?"mouseleave":null):"mouseleave",aD=(d?(v?"MSPointerCancel":"pointercancel"):"touchcancel");var ag=0,aP=null,a2=null,ac=0,a1=0,aZ=0,H=1,ap=0,aJ=0,N=null;var aR=f(a5);var aa="start";var X=0;var aQ={};var U=0,a3=0,a6=0,ay=0,O=0;var aW=null,af=null;try{aR.bind(K,aN);aR.bind(aD,ba)}catch(aj){f.error("events not supported "+K+","+aD+" on jQuery.swipe")}this.enable=function(){aR.bind(K,aN);aR.bind(aD,ba);return aR};this.disable=function(){aK();return aR};this.destroy=function(){aK();aR.data(C,null);aR=null};this.option=function(bd,bc){if(typeof bd==="object"){au=f.extend(au,bd)}else{if(au[bd]!==undefined){if(bc===undefined){return au[bd]}else{au[bd]=bc}}else{if(!bd){return au}else{f.error("Option "+bd+" does not exist on jQuery.swipe.options")}}}return null};function aN(be){if(aB()){return}if(f(be.target).closest(au.excludedElements,aR).length>0){return}var bf=be.originalEvent?be.originalEvent:be;var bd,bg=bf.touches,bc=bg?bg[0]:bf;aa=g;if(bg){X=bg.length}else{if(au.preventDefaultEvents!==false){be.preventDefault()}}ag=0;aP=null;a2=null;aJ=null;ac=0;a1=0;aZ=0;H=1;ap=0;N=ab();S();ai(0,bc);if(!bg||(X===au.fingers||au.fingers===i)||aX()){U=ar();if(X==2){ai(1,bg[1]);a1=aZ=at(aQ[0].start,aQ[1].start)}if(au.swipeStatus||au.pinchStatus){bd=P(bf,aa)}}else{bd=false}if(bd===false){aa=q;P(bf,aa);return bd}else{if(au.hold){af=setTimeout(f.proxy(function(){aR.trigger("hold",[bf.target]);if(au.hold){bd=au.hold.call(aR,bf,bf.target)}},this),au.longTapThreshold)}an(true)}return null}function a4(bf){var bi=bf.originalEvent?bf.originalEvent:bf;if(aa===h||aa===q||al()){return}var be,bj=bi.touches,bd=bj?bj[0]:bi;var bg=aH(bd);a3=ar();if(bj){X=bj.length}if(au.hold){clearTimeout(af)}aa=k;if(X==2){if(a1==0){ai(1,bj[1]);a1=aZ=at(aQ[0].start,aQ[1].start)}else{aH(bj[1]);aZ=at(aQ[0].end,aQ[1].end);aJ=aq(aQ[0].end,aQ[1].end)}H=a8(a1,aZ);ap=Math.abs(a1-aZ)}if((X===au.fingers||au.fingers===i)||!bj||aX()){aP=aL(bg.start,bg.end);a2=aL(bg.last,bg.end);ak(bf,a2);ag=aS(bg.start,bg.end);ac=aM();aI(aP,ag);be=P(bi,aa);if(!au.triggerOnTouchEnd||au.triggerOnTouchLeave){var bc=true;if(au.triggerOnTouchLeave){var bh=aY(this);bc=F(bg.end,bh)}if(!au.triggerOnTouchEnd&&bc){aa=aC(k)}else{if(au.triggerOnTouchLeave&&!bc){aa=aC(h)}}if(aa==q||aa==h){P(bi,aa)}}}else{aa=q;P(bi,aa)}if(be===false){aa=q;P(bi,aa)}}function M(bc){var bd=bc.originalEvent?bc.originalEvent:bc,be=bd.touches;if(be){if(be.length&&!al()){G(bd);return true}else{if(be.length&&al()){return true}}}if(al()){X=ay}a3=ar();ac=aM();if(bb()||!am()){aa=q;P(bd,aa)}else{if(au.triggerOnTouchEnd||(au.triggerOnTouchEnd==false&&aa===k)){if(au.preventDefaultEvents!==false){bc.preventDefault()}aa=h;P(bd,aa)}else{if(!au.triggerOnTouchEnd&&a7()){aa=h;aF(bd,aa,B)}else{if(aa===k){aa=q;P(bd,aa)}}}}an(false);return null}function ba(){X=0;a3=0;U=0;a1=0;aZ=0;H=1;S();an(false)}function L(bc){var bd=bc.originalEvent?bc.originalEvent:bc;if(au.triggerOnTouchLeave){aa=aC(h);P(bd,aa)}}function aK(){aR.unbind(K,aN);aR.unbind(aD,ba);aR.unbind(ax,a4);aR.unbind(V,M);if(T){aR.unbind(T,L)}an(false)}function aC(bg){var bf=bg;var be=aA();var bd=am();var bc=bb();if(!be||bc){bf=q}else{if(bd&&bg==k&&(!au.triggerOnTouchEnd||au.triggerOnTouchLeave)){bf=h}else{if(!bd&&bg==h&&au.triggerOnTouchLeave){bf=q}}}return bf}function P(be,bc){var bd,bf=be.touches;if(J()||W()){bd=aF(be,bc,l)}if((Q()||aX())&&bd!==false){bd=aF(be,bc,t)}if(aG()&&bd!==false){bd=aF(be,bc,j)}else{if(ao()&&bd!==false){bd=aF(be,bc,b)}else{if(ah()&&bd!==false){bd=aF(be,bc,B)}}}if(bc===q){if(W()){bd=aF(be,bc,l)}if(aX()){bd=aF(be,bc,t)}ba(be)}if(bc===h){if(bf){if(!bf.length){ba(be)}}else{ba(be)}}return bd}function aF(bf,bc,be){var bd;if(be==l){aR.trigger("swipeStatus",[bc,aP||null,ag||0,ac||0,X,aQ,a2]);if(au.swipeStatus){bd=au.swipeStatus.call(aR,bf,bc,aP||null,ag||0,ac||0,X,aQ,a2);if(bd===false){return false}}if(bc==h&&aV()){clearTimeout(aW);clearTimeout(af);aR.trigger("swipe",[aP,ag,ac,X,aQ,a2]);if(au.swipe){bd=au.swipe.call(aR,bf,aP,ag,ac,X,aQ,a2);if(bd===false){return false}}switch(aP){case p:aR.trigger("swipeLeft",[aP,ag,ac,X,aQ,a2]);if(au.swipeLeft){bd=au.swipeLeft.call(aR,bf,aP,ag,ac,X,aQ,a2)}break;case o:aR.trigger("swipeRight",[aP,ag,ac,X,aQ,a2]);if(au.swipeRight){bd=au.swipeRight.call(aR,bf,aP,ag,ac,X,aQ,a2)}break;case e:aR.trigger("swipeUp",[aP,ag,ac,X,aQ,a2]);if(au.swipeUp){bd=au.swipeUp.call(aR,bf,aP,ag,ac,X,aQ,a2)}break;case x:aR.trigger("swipeDown",[aP,ag,ac,X,aQ,a2]);if(au.swipeDown){bd=au.swipeDown.call(aR,bf,aP,ag,ac,X,aQ,a2)}break}}}if(be==t){aR.trigger("pinchStatus",[bc,aJ||null,ap||0,ac||0,X,H,aQ]);if(au.pinchStatus){bd=au.pinchStatus.call(aR,bf,bc,aJ||null,ap||0,ac||0,X,H,aQ);if(bd===false){return false}}if(bc==h&&a9()){switch(aJ){case c:aR.trigger("pinchIn",[aJ||null,ap||0,ac||0,X,H,aQ]);if(au.pinchIn){bd=au.pinchIn.call(aR,bf,aJ||null,ap||0,ac||0,X,H,aQ)}break;case A:aR.trigger("pinchOut",[aJ||null,ap||0,ac||0,X,H,aQ]);if(au.pinchOut){bd=au.pinchOut.call(aR,bf,aJ||null,ap||0,ac||0,X,H,aQ)}break}}}if(be==B){if(bc===q||bc===h){clearTimeout(aW);clearTimeout(af);if(Z()&&!I()){O=ar();aW=setTimeout(f.proxy(function(){O=null;aR.trigger("tap",[bf.target]);if(au.tap){bd=au.tap.call(aR,bf,bf.target)}},this),au.doubleTapThreshold)}else{O=null;aR.trigger("tap",[bf.target]);if(au.tap){bd=au.tap.call(aR,bf,bf.target)}}}}else{if(be==j){if(bc===q||bc===h){clearTimeout(aW);clearTimeout(af);O=null;aR.trigger("doubletap",[bf.target]);if(au.doubleTap){bd=au.doubleTap.call(aR,bf,bf.target)}}}else{if(be==b){if(bc===q||bc===h){clearTimeout(aW);O=null;aR.trigger("longtap",[bf.target]);if(au.longTap){bd=au.longTap.call(aR,bf,bf.target)}}}}}return bd}function am(){var bc=true;if(au.threshold!==null){bc=ag>=au.threshold}return bc}function bb(){var bc=false;if(au.cancelThreshold!==null&&aP!==null){bc=(aT(aP)-ag)>=au.cancelThreshold}return bc}function ae(){if(au.pinchThreshold!==null){return ap>=au.pinchThreshold}return true}function aA(){var bc;if(au.maxTimeThreshold){if(ac>=au.maxTimeThreshold){bc=false}else{bc=true}}else{bc=true}return bc}function ak(bc,bd){if(au.preventDefaultEvents===false){return}if(au.allowPageScroll===m){bc.preventDefault()}else{var be=au.allowPageScroll===s;switch(bd){case p:if((au.swipeLeft&&be)||(!be&&au.allowPageScroll!=E)){bc.preventDefault()}break;case o:if((au.swipeRight&&be)||(!be&&au.allowPageScroll!=E)){bc.preventDefault()}break;case e:if((au.swipeUp&&be)||(!be&&au.allowPageScroll!=u)){bc.preventDefault()}break;case x:if((au.swipeDown&&be)||(!be&&au.allowPageScroll!=u)){bc.preventDefault()}break}}}function a9(){var bd=aO();var bc=Y();var be=ae();return bd&&bc&&be}function aX(){return !!(au.pinchStatus||au.pinchIn||au.pinchOut)}function Q(){return !!(a9()&&aX())}function aV(){var bf=aA();var bh=am();var be=aO();var bc=Y();var bd=bb();var bg=!bd&&bc&&be&&bh&&bf;return bg}function W(){return !!(au.swipe||au.swipeStatus||au.swipeLeft||au.swipeRight||au.swipeUp||au.swipeDown)}function J(){return !!(aV()&&W())}function aO(){return((X===au.fingers||au.fingers===i)||!a)}function Y(){return aQ[0].end.x!==0}function a7(){return !!(au.tap)}function Z(){return !!(au.doubleTap)}function aU(){return !!(au.longTap)}function R(){if(O==null){return false}var bc=ar();return(Z()&&((bc-O)<=au.doubleTapThreshold))}function I(){return R()}function aw(){return((X===1||!a)&&(isNaN(ag)||ag<au.threshold))}function a0(){return((ac>au.longTapThreshold)&&(ag<r))}function ah(){return !!(aw()&&a7())}function aG(){return !!(R()&&Z())}function ao(){return !!(a0()&&aU())}function G(bc){a6=ar();ay=bc.touches.length+1}function S(){a6=0;ay=0}function al(){var bc=false;if(a6){var bd=ar()-a6;if(bd<=au.fingerReleaseThreshold){bc=true}}return bc}function aB(){return !!(aR.data(C+"_intouch")===true)}function an(bc){if(!aR){return}if(bc===true){aR.bind(ax,a4);aR.bind(V,M);if(T){aR.bind(T,L)}}else{aR.unbind(ax,a4,false);aR.unbind(V,M,false);if(T){aR.unbind(T,L,false)}}aR.data(C+"_intouch",bc===true)}function ai(be,bc){var bd={start:{x:0,y:0},last:{x:0,y:0},end:{x:0,y:0}};bd.start.x=bd.last.x=bd.end.x=bc.pageX||bc.clientX;bd.start.y=bd.last.y=bd.end.y=bc.pageY||bc.clientY;aQ[be]=bd;return bd}function aH(bc){var be=bc.identifier!==undefined?bc.identifier:0;var bd=ad(be);if(bd===null){bd=ai(be,bc)}bd.last.x=bd.end.x;bd.last.y=bd.end.y;bd.end.x=bc.pageX||bc.clientX;bd.end.y=bc.pageY||bc.clientY;return bd}function ad(bc){return aQ[bc]||null}function aI(bc,bd){bd=Math.max(bd,aT(bc));N[bc].distance=bd}function aT(bc){if(N[bc]){return N[bc].distance}return undefined}function ab(){var bc={};bc[p]=av(p);bc[o]=av(o);bc[e]=av(e);bc[x]=av(x);return bc}function av(bc){return{direction:bc,distance:0}}function aM(){return a3-U}function at(bf,be){var bd=Math.abs(bf.x-be.x);var bc=Math.abs(bf.y-be.y);return Math.round(Math.sqrt(bd*bd+bc*bc))}function a8(bc,bd){var be=(bd/bc)*1;return be.toFixed(2)}function aq(){if(H<1){return A}else{return c}}function aS(bd,bc){return Math.round(Math.sqrt(Math.pow(bc.x-bd.x,2)+Math.pow(bc.y-bd.y,2)))}function aE(bf,bd){var bc=bf.x-bd.x;var bh=bd.y-bf.y;var be=Math.atan2(bh,bc);var bg=Math.round(be*180/Math.PI);if(bg<0){bg=360-Math.abs(bg)}return bg}function aL(bd,bc){var be=aE(bd,bc);if((be<=45)&&(be>=0)){return p}else{if((be<=360)&&(be>=315)){return p}else{if((be>=135)&&(be<=225)){return o}else{if((be>45)&&(be<135)){return x}else{return e}}}}}function ar(){var bc=new Date();return bc.getTime()}function aY(bc){bc=f(bc);var be=bc.offset();var bd={left:be.left,right:be.left+bc.outerWidth(),top:be.top,bottom:be.top+bc.outerHeight()};return bd}function F(bc,bd){return(bc.x>bd.left&&bc.x<bd.right&&bc.y>bd.top&&bc.y<bd.bottom)}}}));
    /**************************** END ****************************/

    /**************************** BEGIN ****************************/
    /*!
     * jQuery Mousewheel 3.1.13
     *
     * Copyright 2015 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */
    ;!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});
    /**************************** END ****************************/

    /**************************** BEGIN ****************************/
    /*! layer-v2.1 弹层组件 License LGPL  http://layer.layui.com/ By 贤心 */
	;!function(a,b){"use strict";var c,d,e={getPath:function(){var a=document.scripts,b=a[a.length-1],c=b.src;if(!b.getAttribute("merge"))return c.substring(0,c.lastIndexOf("/")+1)}(),enter:function(a){13===a.keyCode&&a.preventDefault()},config:{},end:{},btn:["&#x786E;&#x5B9A;","&#x53D6;&#x6D88;"],type:["dialog","page","iframe","loading","tips"]},f={v:"2.1",ie6:!!a.ActiveXObject&&!a.XMLHttpRequest,index:0,path:e.getPath,config:function(a,b){var d=0;return a=a||{},f.cache=e.config=c.extend(e.config,a),f.path=e.config.path||f.path,"string"==typeof a.extend&&(a.extend=[a.extend]),f.use("skin/layer.css",a.extend&&a.extend.length>0?function g(){var c=a.extend;f.use(c[c[d]?d:d-1],d<c.length?function(){return++d,g}():b)}():b),this},use:function(a,b,d){var e=c("head")[0],a=a.replace(/\s/g,""),g=/\.css$/.test(a),h=document.createElement(g?"link":"script"),i="layui_layer_"+a.replace(/\.|\//g,"");return f.path?(g&&(h.rel="stylesheet"),h[g?"href":"src"]=/^http:\/\//.test(a)?a:f.path+a,h.id=i,c("#"+i)[0]||e.appendChild(h),function j(){(g?1989===parseInt(c("#"+i).css("width")):f[d||i])?function(){b&&b();try{g||e.removeChild(h)}catch(a){}}():setTimeout(j,100)}(),this):void 0},ready:function(a,b){var d="function"==typeof a;return d&&(b=a),f.config(c.extend(e.config,function(){return d?{}:{path:a}}()),b),this},alert:function(a,b,d){var e="function"==typeof b;return e&&(d=b),f.open(c.extend({content:a,yes:d},e?{}:b))},confirm:function(a,b,d,g){var h="function"==typeof b;return h&&(g=d,d=b),f.open(c.extend({content:a,btn:e.btn,yes:d,cancel:g},h?{}:b))},msg:function(a,d,g){var i="function"==typeof d,j=e.config.skin,k=(j?j+" "+j+"-msg":"")||"layui-layer-msg",l=h.anim.length-1;return i&&(g=d),f.open(c.extend({content:a,time:3e3,shade:!1,skin:k,title:!1,closeBtn:!1,btn:!1,end:g},i&&!e.config.skin?{skin:k+" layui-layer-hui",shift:l}:function(){return d=d||{},(-1===d.icon||d.icon===b&&!e.config.skin)&&(d.skin=k+" "+(d.skin||"layui-layer-hui")),d}()))},load:function(a,b){return f.open(c.extend({type:3,icon:a||0,shade:.01},b))},tips:function(a,b,d){return f.open(c.extend({type:4,content:[a,b],closeBtn:!1,time:3e3,maxWidth:210},d))}},g=function(a){var b=this;b.index=++f.index,b.config=c.extend({},b.config,e.config,a),b.creat()};g.pt=g.prototype;var h=["layui-layer",".layui-layer-title",".layui-layer-main",".layui-layer-dialog","layui-layer-iframe","layui-layer-content","layui-layer-btn","layui-layer-close"];h.anim=["layui-anim","layui-anim-01","layui-anim-02","layui-anim-03","layui-anim-04","layui-anim-05","layui-anim-06"],g.pt.config={type:0,shade:.3,fix:!0,move:h[1],title:"&#x4FE1;&#x606F;",offset:"auto",area:"auto",closeBtn:1,time:0,zIndex:19891014,maxWidth:360,shift:0,icon:-1,scrollbar:!0,tips:2},g.pt.vessel=function(a,b){var c=this,d=c.index,f=c.config,g=f.zIndex+d,i="object"==typeof f.title,j=f.maxmin&&(1===f.type||2===f.type),k=f.title?'<div class="layui-layer-title" style="'+(i?f.title[1]:"")+'">'+(i?f.title[0]:f.title)+"</div>":"";return f.zIndex=g,b([f.shade?'<div class="layui-layer-shade" id="layui-layer-shade'+d+'" times="'+d+'" style="'+("z-index:"+(g-1)+"; background-color:"+(f.shade[1]||"#000")+"; opacity:"+(f.shade[0]||f.shade)+"; filter:alpha(opacity="+(100*f.shade[0]||100*f.shade)+");")+'"></div>':"",'<div class="'+h[0]+" "+(h.anim[f.shift]||"")+(" layui-layer-"+e.type[f.type])+(0!=f.type&&2!=f.type||f.shade?"":" layui-layer-border")+" "+(f.skin||"")+'" id="'+h[0]+d+'" type="'+e.type[f.type]+'" times="'+d+'" showtime="'+f.time+'" conType="'+(a?"object":"string")+'" style="z-index: '+g+"; width:"+f.area[0]+";height:"+f.area[1]+(f.fix?"":";position:absolute;")+'">'+(a&&2!=f.type?"":k)+'<div class="layui-layer-content'+(0==f.type&&-1!==f.icon?" layui-layer-padding":"")+(3==f.type?" layui-layer-loading"+f.icon:"")+'">'+(0==f.type&&-1!==f.icon?'<i class="layui-layer-ico layui-layer-ico'+f.icon+'"></i>':"")+(1==f.type&&a?"":f.content||"")+'</div><span class="layui-layer-setwin">'+function(){var a=j?'<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>':"";return f.closeBtn&&(a+='<a class="layui-layer-ico '+h[7]+" "+h[7]+(f.title?f.closeBtn:4==f.type?"1":"2")+'" href="javascript:;"></a>'),a}()+"</span>"+(f.btn?function(){var a="";"string"==typeof f.btn&&(f.btn=[f.btn]);for(var b=0,c=f.btn.length;c>b;b++)a+='<a class="'+h[6]+b+'">'+f.btn[b]+"</a>";return'<div class="'+h[6]+'">'+a+"</div>"}():"")+"</div>"],k),c},g.pt.creat=function(){var a=this,b=a.config,g=a.index,i=b.content,j="object"==typeof i;switch("string"==typeof b.area&&(b.area="auto"===b.area?["",""]:[b.area,""]),b.type){case 0:b.btn="btn"in b?b.btn:e.btn[0],f.closeAll("dialog");break;case 2:var i=b.content=j?b.content:[b.content||"http://layer.layui.com","auto"];b.content='<iframe scrolling="'+(b.content[1]||"auto")+'" allowtransparency="true" id="'+h[4]+g+'" name="'+h[4]+g+'" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="'+b.content[0]+'"></iframe>';break;case 3:b.title=!1,b.closeBtn=!1,-1===b.icon&&0===b.icon,f.closeAll("loading");break;case 4:j||(b.content=[b.content,"body"]),b.follow=b.content[1],b.content=b.content[0]+'<i class="layui-layer-TipsG"></i>',b.title=!1,b.shade=!1,b.fix=!1,b.tips="object"==typeof b.tips?b.tips:[b.tips,!0],b.tipsMore||f.closeAll("tips")}a.vessel(j,function(d,e){c("body").append(d[0]),j?function(){2==b.type||4==b.type?function(){c("body").append(d[1])}():function(){i.parents("."+h[0])[0]||(i.show().addClass("layui-layer-wrap").wrap(d[1]),c("#"+h[0]+g).find("."+h[5]).before(e))}()}():c("body").append(d[1]),a.layero=c("#"+h[0]+g),b.scrollbar||h.html.css("overflow","hidden").attr("layer-full",g)}).auto(g),2==b.type&&f.ie6&&a.layero.find("iframe").attr("src",i[0]),c(document).off("keydown",e.enter).on("keydown",e.enter),a.layero.on("keydown",function(a){c(document).off("keydown",e.enter)}),4==b.type?a.tips():a.offset(),b.fix&&d.on("resize",function(){a.offset(),(/^\d+%$/.test(b.area[0])||/^\d+%$/.test(b.area[1]))&&a.auto(g),4==b.type&&a.tips()}),b.time<=0||setTimeout(function(){f.close(a.index)},b.time),a.move().callback()},g.pt.auto=function(a){function b(a){a=g.find(a),a.height(i[1]-j-k-2*(0|parseFloat(a.css("padding"))))}var e=this,f=e.config,g=c("#"+h[0]+a);""===f.area[0]&&f.maxWidth>0&&(/MSIE 7/.test(navigator.userAgent)&&f.btn&&g.width(g.innerWidth()),g.outerWidth()>f.maxWidth&&g.width(f.maxWidth));var i=[g.innerWidth(),g.innerHeight()],j=g.find(h[1]).outerHeight()||0,k=g.find("."+h[6]).outerHeight()||0;switch(f.type){case 2:b("iframe");break;default:""===f.area[1]?f.fix&&i[1]>=d.height()&&(i[1]=d.height(),b("."+h[5])):b("."+h[5])}return e},g.pt.offset=function(){var a=this,b=a.config,c=a.layero,e=[c.outerWidth(),c.outerHeight()],f="object"==typeof b.offset;a.offsetTop=(d.height()-e[1])/2,a.offsetLeft=(d.width()-e[0])/2,f?(a.offsetTop=b.offset[0],a.offsetLeft=b.offset[1]||a.offsetLeft):"auto"!==b.offset&&(a.offsetTop=b.offset,"rb"===b.offset&&(a.offsetTop=d.height()-e[1],a.offsetLeft=d.width()-e[0])),b.fix||(a.offsetTop=/%$/.test(a.offsetTop)?d.height()*parseFloat(a.offsetTop)/100:parseFloat(a.offsetTop),a.offsetLeft=/%$/.test(a.offsetLeft)?d.width()*parseFloat(a.offsetLeft)/100:parseFloat(a.offsetLeft),a.offsetTop+=d.scrollTop(),a.offsetLeft+=d.scrollLeft()),c.css({top:a.offsetTop,left:a.offsetLeft})},g.pt.tips=function(){var a=this,b=a.config,e=a.layero,f=[e.outerWidth(),e.outerHeight()],g=c(b.follow);g[0]||(g=c("body"));var i={width:g.outerWidth(),height:g.outerHeight(),top:g.offset().top,left:g.offset().left},j=e.find(".layui-layer-TipsG"),k=b.tips[0];b.tips[1]||j.remove(),i.autoLeft=function(){i.left+f[0]-d.width()>0?(i.tipLeft=i.left+i.width-f[0],j.css({right:12,left:"auto"})):i.tipLeft=i.left},i.where=[function(){i.autoLeft(),i.tipTop=i.top-f[1]-10,j.removeClass("layui-layer-TipsB").addClass("layui-layer-TipsT").css("border-right-color",b.tips[1])},function(){i.tipLeft=i.left+i.width+10,i.tipTop=i.top,j.removeClass("layui-layer-TipsL").addClass("layui-layer-TipsR").css("border-bottom-color",b.tips[1])},function(){i.autoLeft(),i.tipTop=i.top+i.height+10,j.removeClass("layui-layer-TipsT").addClass("layui-layer-TipsB").css("border-right-color",b.tips[1])},function(){i.tipLeft=i.left-f[0]-10,i.tipTop=i.top,j.removeClass("layui-layer-TipsR").addClass("layui-layer-TipsL").css("border-bottom-color",b.tips[1])}],i.where[k-1](),1===k?i.top-(d.scrollTop()+f[1]+16)<0&&i.where[2]():2===k?d.width()-(i.left+i.width+f[0]+16)>0||i.where[3]():3===k?i.top-d.scrollTop()+i.height+f[1]+16-d.height()>0&&i.where[0]():4===k&&f[0]+16-i.left>0&&i.where[1](),e.find("."+h[5]).css({"background-color":b.tips[1],"padding-right":b.closeBtn?"30px":""}),e.css({left:i.tipLeft,top:i.tipTop})},g.pt.move=function(){var a=this,b=a.config,e={setY:0,moveLayer:function(){var a=e.layero,b=parseInt(a.css("margin-left")),c=parseInt(e.move.css("left"));0===b||(c-=b),"fixed"!==a.css("position")&&(c-=a.parent().offset().left,e.setY=0),a.css({left:c,top:parseInt(e.move.css("top"))-e.setY})}},f=a.layero.find(b.move);return b.move&&f.attr("move","ok"),f.css({cursor:b.move?"move":"auto"}),c(b.move).on("mousedown",function(a){if(a.preventDefault(),"ok"===c(this).attr("move")){e.ismove=!0,e.layero=c(this).parents("."+h[0]);var f=e.layero.offset().left,g=e.layero.offset().top,i=e.layero.outerWidth()-6,j=e.layero.outerHeight()-6;c("#layui-layer-moves")[0]||c("body").append('<div id="layui-layer-moves" class="layui-layer-moves" style="left:'+f+"px; top:"+g+"px; width:"+i+"px; height:"+j+'px; z-index:2147483584"></div>'),e.move=c("#layui-layer-moves"),b.moveType&&e.move.css({visibility:"hidden"}),e.moveX=a.pageX-e.move.position().left,e.moveY=a.pageY-e.move.position().top,"fixed"!==e.layero.css("position")||(e.setY=d.scrollTop())}}),c(document).mousemove(function(a){if(e.ismove){var c=a.pageX-e.moveX,f=a.pageY-e.moveY;if(a.preventDefault(),!b.moveOut){e.setY=d.scrollTop();var g=d.width()-e.move.outerWidth(),h=e.setY;0>c&&(c=0),c>g&&(c=g),h>f&&(f=h),f>d.height()-e.move.outerHeight()+e.setY&&(f=d.height()-e.move.outerHeight()+e.setY)}e.move.css({left:c,top:f}),b.moveType&&e.moveLayer(),c=f=g=h=null}}).mouseup(function(){try{e.ismove&&(e.moveLayer(),e.move.remove(),b.moveEnd&&b.moveEnd()),e.ismove=!1}catch(a){e.ismove=!1}}),a},g.pt.callback=function(){function a(){var a=g.cancel&&g.cancel(b.index);a===!1||f.close(b.index)}var b=this,d=b.layero,g=b.config;b.openLayer(),g.success&&(2==g.type?d.find("iframe").on("load",function(){g.success(d,b.index)}):g.success(d,b.index)),f.ie6&&b.IE6(d),d.find("."+h[6]).children("a").on("click",function(){var e=c(this).index();g["btn"+(e+1)]&&g["btn"+(e+1)](b.index,d),0===e?g.yes?g.yes(b.index,d):f.close(b.index):1===e?a():g["btn"+(e+1)]||f.close(b.index)}),d.find("."+h[7]).on("click",a),g.shadeClose&&c("#layui-layer-shade"+b.index).on("click",function(){f.close(b.index)}),d.find(".layui-layer-min").on("click",function(){f.min(b.index,g),g.min&&g.min(d)}),d.find(".layui-layer-max").on("click",function(){c(this).hasClass("layui-layer-maxmin")?(f.restore(b.index),g.restore&&g.restore(d)):(f.full(b.index,g),g.full&&g.full(d))}),g.end&&(e.end[b.index]=g.end)},e.reselect=function(){c.each(c("select"),function(a,b){var d=c(this);d.parents("."+h[0])[0]||1==d.attr("layer")&&c("."+h[0]).length<1&&d.removeAttr("layer").show(),d=null})},g.pt.IE6=function(a){function b(){a.css({top:f+(e.config.fix?d.scrollTop():0)})}var e=this,f=a.offset().top;b(),d.scroll(b),c("select").each(function(a,b){var d=c(this);d.parents("."+h[0])[0]||"none"===d.css("display")||d.attr({layer:"1"}).hide(),d=null})},g.pt.openLayer=function(){var a=this;f.zIndex=a.config.zIndex,f.setTop=function(a){var b=function(){f.zIndex++,a.css("z-index",f.zIndex+1)};return f.zIndex=parseInt(a[0].style.zIndex),a.on("mousedown",b),f.zIndex}},e.record=function(a){var b=[a.outerWidth(),a.outerHeight(),a.position().top,a.position().left+parseFloat(a.css("margin-left"))];a.find(".layui-layer-max").addClass("layui-layer-maxmin"),a.attr({area:b})},e.rescollbar=function(a){h.html.attr("layer-full")==a&&(h.html[0].style.removeProperty?h.html[0].style.removeProperty("overflow"):h.html[0].style.removeAttribute("overflow"),h.html.removeAttr("layer-full"))},a.layer=f,f.getChildFrame=function(a,b){return b=b||c("."+h[4]).attr("times"),c("#"+h[0]+b).find("iframe").contents().find(a)},f.getFrameIndex=function(a){return c("#"+a).parents("."+h[4]).attr("times")},f.iframeAuto=function(a){if(a){var b=f.getChildFrame("html",a).outerHeight(),d=c("#"+h[0]+a),e=d.find(h[1]).outerHeight()||0,g=d.find("."+h[6]).outerHeight()||0;d.css({height:b+e+g}),d.find("iframe").css({height:b})}},f.iframeSrc=function(a,b){c("#"+h[0]+a).find("iframe").attr("src",b)},f.style=function(a,b){var d=c("#"+h[0]+a),f=d.attr("type"),g=d.find(h[1]).outerHeight()||0,i=d.find("."+h[6]).outerHeight()||0;(f===e.type[1]||f===e.type[2])&&(d.css(b),f===e.type[2]&&d.find("iframe").css({height:parseFloat(b.height)-g-i}))},f.min=function(a,b){var d=c("#"+h[0]+a),g=d.find(h[1]).outerHeight()||0;e.record(d),f.style(a,{width:180,height:g,overflow:"hidden"}),d.find(".layui-layer-min").hide(),"page"===d.attr("type")&&d.find(h[4]).hide(),e.rescollbar(a)},f.restore=function(a){var b=c("#"+h[0]+a),d=b.attr("area").split(",");b.attr("type");f.style(a,{width:parseFloat(d[0]),height:parseFloat(d[1]),top:parseFloat(d[2]),left:parseFloat(d[3]),overflow:"visible"}),b.find(".layui-layer-max").removeClass("layui-layer-maxmin"),b.find(".layui-layer-min").show(),"page"===b.attr("type")&&b.find(h[4]).show(),e.rescollbar(a)},f.full=function(a){var b,g=c("#"+h[0]+a);e.record(g),h.html.attr("layer-full")||h.html.css("overflow","hidden").attr("layer-full",a),clearTimeout(b),b=setTimeout(function(){var b="fixed"===g.css("position");f.style(a,{top:b?0:d.scrollTop(),left:b?0:d.scrollLeft(),width:d.width(),height:d.height()}),g.find(".layui-layer-min").hide()},100)},f.title=function(a,b){var d=c("#"+h[0]+(b||f.index)).find(h[1]);d.html(a)},f.close=function(a){var b=c("#"+h[0]+a),d=b.attr("type");if(b[0]){if(d===e.type[1]&&"object"===b.attr("conType")){b.children(":not(."+h[5]+")").remove();for(var g=0;2>g;g++)b.find(".layui-layer-wrap").unwrap().hide()}else{if(d===e.type[2])try{var i=c("#"+h[4]+a)[0];i.contentWindow.document.write(""),i.contentWindow.close(),b.find("."+h[5])[0].removeChild(i)}catch(j){}b[0].innerHTML="",b.remove()}c("#layui-layer-moves, #layui-layer-shade"+a).remove(),f.ie6&&e.reselect(),e.rescollbar(a),c(document).off("keydown",e.enter),"function"==typeof e.end[a]&&e.end[a](),delete e.end[a]}},f.closeAll=function(a){c.each(c("."+h[0]),function(){var b=c(this),d=a?b.attr("type")===a:1;d&&f.close(b.attr("times")),d=null})},e.run=function(){c=jQuery,d=c(a),h.html=c("html"),f.open=function(a){var b=new g(a);return b.index}},"function"==typeof define?define(function(){return e.run(),f}):function(){e.run()}()}(window);
    /**************************** END ****************************/

    /**************************** BEGIN ****************************/
    /*! iCheck v1.0.2 by Damir Sultanov, http://git.io/arlzeA, MIT Licensed */
    (function(f){function A(a,b,d){var c=a[0],g=/er/.test(d)?_indeterminate:/bl/.test(d)?n:k,e=d==_update?{checked:c[k],disabled:c[n],indeterminate:"true"==a.attr(_indeterminate)||"false"==a.attr(_determinate)}:c[g];if(/^(ch|di|in)/.test(d)&&!e)x(a,g);else if(/^(un|en|de)/.test(d)&&e)q(a,g);else if(d==_update)for(var f in e)e[f]?x(a,f,!0):q(a,f,!0);else if(!b||"toggle"==d){if(!b)a[_callback]("ifClicked");e?c[_type]!==r&&q(a,g):x(a,g)}}function x(a,b,d){var c=a[0],g=a.parent(),e=b==k,u=b==_indeterminate,
    v=b==n,s=u?_determinate:e?y:"enabled",F=l(a,s+t(c[_type])),B=l(a,b+t(c[_type]));if(!0!==c[b]){if(!d&&b==k&&c[_type]==r&&c.name){var w=a.closest("form"),p='input[name="'+c.name+'"]',p=w.length?w.find(p):f(p);p.each(function(){this!==c&&f(this).data(m)&&q(f(this),b)})}u?(c[b]=!0,c[k]&&q(a,k,"force")):(d||(c[b]=!0),e&&c[_indeterminate]&&q(a,_indeterminate,!1));D(a,e,b,d)}c[n]&&l(a,_cursor,!0)&&g.find("."+C).css(_cursor,"default");g[_add](B||l(a,b)||"");g.attr("role")&&!u&&g.attr("aria-"+(v?n:k),"true");
    g[_remove](F||l(a,s)||"")}function q(a,b,d){var c=a[0],g=a.parent(),e=b==k,f=b==_indeterminate,m=b==n,s=f?_determinate:e?y:"enabled",q=l(a,s+t(c[_type])),r=l(a,b+t(c[_type]));if(!1!==c[b]){if(f||!d||"force"==d)c[b]=!1;D(a,e,s,d)}!c[n]&&l(a,_cursor,!0)&&g.find("."+C).css(_cursor,"pointer");g[_remove](r||l(a,b)||"");g.attr("role")&&!f&&g.attr("aria-"+(m?n:k),"false");g[_add](q||l(a,s)||"")}function E(a,b){if(a.data(m)){a.parent().html(a.attr("style",a.data(m).s||""));if(b)a[_callback](b);a.off(".i").unwrap();
    f(_label+'[for="'+a[0].id+'"]').add(a.closest(_label)).off(".i")}}function l(a,b,f){if(a.data(m))return a.data(m).o[b+(f?"":"Class")]}function t(a){return a.charAt(0).toUpperCase()+a.slice(1)}function D(a,b,f,c){if(!c){if(b)a[_callback]("ifToggled");a[_callback]("ifChanged")[_callback]("if"+t(f))}}var m="iCheck",C=m+"-helper",r="radio",k="checked",y="un"+k,n="disabled";_determinate="determinate";_indeterminate="in"+_determinate;_update="update";_type="type";_click="click";_touch="touchbegin.i touchend.i";
    _add="addClass";_remove="removeClass";_callback="trigger";_label="label";_cursor="cursor";_mobile=/ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent);f.fn[m]=function(a,b){var d='input[type="checkbox"], input[type="'+r+'"]',c=f(),g=function(a){a.each(function(){var a=f(this);c=a.is(d)?c.add(a):c.add(a.find(d))})};if(/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(a))return a=a.toLowerCase(),g(this),c.each(function(){var c=
    f(this);"destroy"==a?E(c,"ifDestroyed"):A(c,!0,a);f.isFunction(b)&&b()});if("object"!=typeof a&&a)return this;var e=f.extend({checkedClass:k,disabledClass:n,indeterminateClass:_indeterminate,labelHover:!0},a),l=e.handle,v=e.hoverClass||"hover",s=e.focusClass||"focus",t=e.activeClass||"active",B=!!e.labelHover,w=e.labelHoverClass||"hover",p=(""+e.increaseArea).replace("%","")|0;if("checkbox"==l||l==r)d='input[type="'+l+'"]';-50>p&&(p=-50);g(this);return c.each(function(){var a=f(this);E(a);var c=this,
    b=c.id,g=-p+"%",d=100+2*p+"%",d={position:"absolute",top:g,left:g,display:"block",width:d,height:d,margin:0,padding:0,background:"#fff",border:0,opacity:0},g=_mobile?{position:"absolute",visibility:"hidden"}:p?d:{position:"absolute",opacity:0},l="checkbox"==c[_type]?e.checkboxClass||"icheckbox":e.radioClass||"i"+r,z=f(_label+'[for="'+b+'"]').add(a.closest(_label)),u=!!e.aria,y=m+"-"+Math.random().toString(36).substr(2,6),h='<div class="'+l+'" '+(u?'role="'+c[_type]+'" ':"");u&&z.each(function(){h+=
    'aria-labelledby="';this.id?h+=this.id:(this.id=y,h+=y);h+='"'});h=a.wrap(h+"/>")[_callback]("ifCreated").parent().append(e.insert);d=f('<ins class="'+C+'"/>').css(d).appendTo(h);a.data(m,{o:e,s:a.attr("style")}).css(g);e.inheritClass&&h[_add](c.className||"");e.inheritID&&b&&h.attr("id",m+"-"+b);"static"==h.css("position")&&h.css("position","relative");A(a,!0,_update);if(z.length)z.on(_click+".i mouseover.i mouseout.i "+_touch,function(b){var d=b[_type],e=f(this);if(!c[n]){if(d==_click){if(f(b.target).is("a"))return;
    A(a,!1,!0)}else B&&(/ut|nd/.test(d)?(h[_remove](v),e[_remove](w)):(h[_add](v),e[_add](w)));if(_mobile)b.stopPropagation();else return!1}});a.on(_click+".i focus.i blur.i keyup.i keydown.i keypress.i",function(b){var d=b[_type];b=b.keyCode;if(d==_click)return!1;if("keydown"==d&&32==b)return c[_type]==r&&c[k]||(c[k]?q(a,k):x(a,k)),!1;if("keyup"==d&&c[_type]==r)!c[k]&&x(a,k);else if(/us|ur/.test(d))h["blur"==d?_remove:_add](s)});d.on(_click+" mousedown mouseup mouseover mouseout "+_touch,function(b){var d=
    b[_type],e=/wn|up/.test(d)?t:v;if(!c[n]){if(d==_click)A(a,!1,!0);else{if(/wn|er|in/.test(d))h[_add](e);else h[_remove](e+" "+t);if(z.length&&B&&e==v)z[/ut|nd/.test(d)?_remove:_add](w)}if(_mobile)b.stopPropagation();else return!1}})})}})(window.jQuery||window.Zepto);
    /**************************** END ****************************/

    /**************************** BEGIN ****************************/
    /**
    * base.js v-1.2.0
    * 
    * Copyright (c) 2016/3/3 Han Wenbo
    *
    * Here are some common public methods!
    *
    **/

    ;(function($, window, document, undefined) {
        function Base() {
        }

        Base.prototype = {
            init: function() {
            },
            //请求->所有的请求都需要经过(特殊的除外)
            /*Base.request({
                url: '...',
                params: {
                },
                callback: function(data) {
                },
            });*/
            request: function(options) {
                var This = this,
                    params = {//必须参数

                        //
                    },
                    defaults = {
                        prefix: '../../',//接口路径前缀(不能写根路径)
                        $formObj: $(),//被序列化的form表单
                        dataObj: {},
                        callback: function(){}//回调函数
                    };

                options = $.extend({}, defaults, options);
                var formData = $.extend({}, This.formatSeriData(decodeURIComponent((options.$formObj.serialize()))), options.dataObj);//中文乱码,使用decodeURIComponent解码即可
                $.ajax({
                    url: encodeURI(options.prefix + (options.url || '...')),//...为基础地址
                    type: 'get',
                    dataType: options.dataType || 'json',
                    data: $.extend({}, params, options.params, formData),
                    cache: false,//IE下有用
                    success: function(data) {
                        if(data) {
                            options.callback(data);
                        }
                    }
                });
            },
            //格式化被序列化后的数据->http://xxx.com?a=1&b=2化为{a:1, b:2}
            formatSeriData: function(data) {
                if(!data) {
                    return;
                }
                var obj = '',
                    dot = ',',      
                    arr = data.match(/[^?^#^&]+=[^?^#^&]*/g);

                for(var i=0; i<arr.length; i++) {
                    var str = arr[i].match(/([^=]+)=([^=]*)/);
                    if(i==arr.length - 1) {
                        dot = '';
                    }
                    obj += '"'+ str[1] +'"' +":"+ '"'+ str[2] +'"'+ dot;
                }
                return JSON.parse('{'+ obj +'}');
            },
            //判断手机还是pc->true是pc 参数bool为true时，返回具体型号
            /*if(Base.isPC()) {
                return;
            }*/
            isPC: function (bool) {
                var userAgentInfo = navigator.userAgent;
                var Agents = ["android", "iphone",
                            "symbianos", "windows phone",
                            "ipad", "ipod"];
                var flag = true;
                for (var v = 0; v < Agents.length; v++) {
                    if (userAgentInfo.toLowerCase().indexOf(Agents[v]) > 0) {
                        if(bool) {
                            return Agents[v];
                        }
                        flag = false;
                        break;
                    }
                }
                return flag;
            },
            //判断浏览器类型  
            myBrowser: function(){  
                var userAgent = navigator.userAgent,  
                    isOpera = userAgent.indexOf("Opera") > -1;  

                if (isOpera) {  
                    return "Opera";  
                };  
                if (userAgent.indexOf("Firefox") > -1) {  
                    return "FF";  
                }  
                if (userAgent.indexOf("Chrome") > -1){  
                    return "Chrome";  
                }  
                if (userAgent.indexOf("Safari") > -1) {  
                    return "Safari";  
                }  
                if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {  
                    return "IE";  
                };  
            },
            //判断IE的版本(非ie返回undefined)
            ieVersion: function(){  
                var browser = navigator.appName;
                var b_version = navigator.appVersion;
                var version = b_version.split(";");
                var trim_Version = "";
                if(!version[1]) return;
                trim_Version = version[1].replace(/[ ]/g, "");
                if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE6.0") {
                    return 6;
                } else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE7.0") {
                    return 7;
                } else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE8.0") {
                    return 8;
                } else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE9.0") {
                    return 9;
                }
            },
            //获取光标位置
            getCursortPos: function(obj) {
                var CaretPos = 0;   // IE Support
                if(document.selection) {
                obj.focus();
                    var Sel = document.selection.createRange();
                    Sel.moveStart('character', -obj.value.length);
                    CaretPos = Sel.text.length;
                }
                // Firefox support
                else if(obj.selectionStart || obj.selectionStart == '0')
                    CaretPos = obj.selectionStart;
                return CaretPos;
            },
            //设置光标位置
            setCaretPos: function(obj, pos) {
                if(obj.setSelectionRange) {
                    obj.focus();
                    obj.setSelectionRange(pos, pos);
                }else if(obj.createTextRange) {
                    var range = obj.createTextRange();
                    range.collapse(true);
                    range.moveEnd('character', pos);
                    range.moveStart('character', pos);
                    range.select();
                }
            },
            //禁用菜单
            banCtxMenu: function() {
                $(document).on("contextmenu",function(e){
                    return false;
                });
            },
            //获取格式化时间
            getFormatDate: function() {
                var today = new Date(),
                    year = today.getFullYear(),
                    month = this.addZero(today.getMonth() + 1),
                    date = this.addZero(today.getDate()),
                    hour = this.addZero(today.getHours()),
                    minute = this.addZero(today.getMinutes()),
                    second = this.addZero(today.getSeconds());

                return year + "-" + month + "-" + date + ' ' + hour + ":" + minute + ":" + second;
            },
            //格式化秒数->7203秒化为02时00分03秒
            formatSecond: function(num) {
                var second = this.addZero(parseInt(num%60)) +'秒',
                    minute = this.addZero(parseInt(num/60%60)) +'分',
                    hour = this.addZero(parseInt(num/60/60%60)) +'时';

                if(hour == '00时') {
                    hour = '';
                    if(minute == '00分') {
                        minute = '';
                    }
                    
                }
                return hour + minute + second;
            },
            //格式化毫秒数->7203毫秒化为00分07秒20(原203，最后一位省略)毫秒
            /*//设置倒计时
            var t = 900000,//15分钟
                timer = setInterval(function() {
                $('.time').text(Base.formatMillisecond(t));
                if(t <= 0) {
                    Base.layerMsg('中奖用户已揭晓，确认并跳转查看', function() {
                        this.location.href = '';
                    });
                    clearInterval(timer);
                }
                t -= 25;
            }, 25);*/
            formatMillisecond: function(num) {
                var millisecond = num%1000,
                    second = this.addZero(parseInt(num/1000%60)) +':',
                    minute = this.addZero(parseInt(num/1000/60%60)) +':';

                millisecond = millisecond>99 ? (millisecond+'').substring(0, (millisecond+'').length-1) : millisecond;
                millisecond = this.addZero(parseInt(millisecond));

                return minute + second + millisecond;
            },
            //个位数前面加0(num必须为int)
            addZero: function(num) {
                return num<10 ? "0" + num : num;
            },
            //多余字数加省略号
            addDots: function(str, num, type) {
                if(type) {//true 中文算两个字符
                   var result = '',
                       len = 0;

                   for(var i=0; i<str.length; i++) {
                       if(len < num) {
                           if(str[i].match(/[^\x00-\xff]+/)) {//匹配双字节字符(包括汉字)  [\u4e00-\u9fa5]能匹配中文字符
                               len += 1;
                           }else {
                               len += .5;
                           }
                           result += str[i];
                       }else {
                           result += '...';
                           break;
                       }
                   }
                   return result; 
                }else {
                str += '';
                if(str.length > num) {
                    str = str.substr(0, num) +'...';
                }
                return str;
               }
            },
            //不重复获取1-maxRandom的数字，可设置允许出现的最大数
            getRandomNum: function(maxRandom, maxNum) {
                var arrA = [];
                var arrX = [];
                var arr = [];
                for(var m=0; m<maxRandom; m++) {
                    var res = false;
                    var ran = Math.ceil(Math.random()*maxRandom);

                    while(!res) {
                        var x = 1;

                        for(var i=0; i<arrA.length; i++) {
                            if(ran != arrA[i]) {
                                arrX[i] = 1;
                            }else {
                                arrX[i] = 0;
                            }
                        }
                        for(var j=0; j<arrX.length; j++) {
                            x *= arrX[j];
                        }
                        if(x) {
                            res = true;
                            arrA.push(ran);
                        }else {
                            ran = Math.ceil(Math.random()*maxRandom);

                        }

                    }
                }
                for(var i=0; i<arrA.length; i++) {
                    if(maxNum < arrA[i]) {
                        arrA[i] = arrA[i]%maxNum ? arrA[i]%maxNum  : maxNum;
                    }
                }

                return arrA;
            },
            //弹出提示框 (应用layer.js)
            /*Base.layerMsg(data.message);*/
            layerMsg: function(msg, callback) {
                var index = layer.open({
                    title: false,
                    shadeClose: true,
                    content: msg,
                    closeBtn: 0,
                    area: ['270px'],
                    end: function() {
                        if(callback) {
                            callback();
                        }else {
                            layer.close(index);
                        }
                    }
                });
            },
            // 判断类型 array number string date function regexp object boolean null undefined  
            isType: function(obj, type) {
            	return Object.prototype.toString.call(obj).toLowerCase() === '[object ' + type + ']';
            },
            // 获取图片真实宽高
            getNaturalSize: function(img, fn) {  
                /*if (img.naturalWidth) { //这属性很怪异(时而有效)      
                    fn(img.naturalWidth, img.naturalHeight);  
                } else {}*/
                var pic = new Image();  

                pic.onload = function() { //加载完毕后(建议)      
                    fn(pic.width, pic.height);  
                }  
                pic.src = img.src; //这句放在onload后面(兼容ie8)
            }, 
            /*
            * This.imageLoad('<img src="http://a.jpg"><img src="https://b.png"><a href="http://c.gif"></a>')
            */
            // 匹配html中所有图片资源，加载完毕执行
            imageLoad: function(str, callback) {
                var imgArr = str.match(/https?[^>]*?\.(png|jpg|bmp|jpeg|gif)/g),
                imgPromiseArr = [];

                try {// 防止ie8报错
                    for(var i=0; i<imgArr.length; i++) {
                        var imgPromise = new Promise(function(resolve, reject) {
                            var pic = new Image();

                            pic.onload = function() { //加载完毕后(建议)  
                                resolve(pic.src +'加载完毕');
                            }
                            pic.src = imgArr[i]; //这句放在onload后面(兼容ie8) 
                        });
                        imgPromiseArr.push(imgPromise);
                    }

                    Promise.all(imgPromiseArr)
                    .then(function(data) {
                        callback && callback();
                    });
                }catch(e) {}
            },
            // 获取纯文本
            getPlainText: function(str) {
                return (str+'').replace(/<[^>]*>|/g, '');
            }, 
	        //获取链接中某个参数    
	        getParam: function(param, origin, callback) {  
	            var reg = new RegExp(param + '=(\d*[a-zA-Z]*[^?|^#|^&]*)'),  
	                str = (origin||location.href).match(reg);  
	            if (str) {  
	                str = str[1];  
	                callback && callback();  
	                return str;  
	            }  
	        }

        };

        window.MN_Base = new Base();



    })(MN, window, document);

    /**************************** END ****************************/


    /**************************** BEGIN ****************************/
    /**
    * jquery.scrollbar.js
    * 
    * Copyright (c) 2016/5/25 Han Wenbo
    *
    **/

    ;(function($, window, document, undefined) {
    	var plugName = "scrollbar",
    		defaults = {
    			backClass: 'SC_backClass',
    			frontClass: 'SC_frontClass',
    			autoBottom: true,//内容改变，是否自动滚动到底部
    			moveCallback: function(top, direction) {},//运动时事件回调
    			stopCallback: function(top, direction) {}//停止时事件回调
    		};
    	
    	function Scrollbar($el, options) {
    		this.plugName = plugName;
    		this.$el = $el;
    		this.prop = {};
    		this.child = {};
    		this.el = {};
    		this.defaults = defaults;
    		this.options = $.extend({}, defaults, options);
    		this.init();
    	}

    	Scrollbar.prototype = {
    		init: function() {
    			this.variable();//声明变量
    			this.baseEl();//生成滚动条的背景栏和拖动按钮
    			this.event();//绑定事件
    		},
    		//声明变量
    		variable: function() {
    			this.winW = $(window).width();
    			this.winH = $(window).height();

    			this.el.width = this.$el.width();
    			this.el.height = this.$el.height();
    			this.el.outerWidth = this.$el.outerWidth();
    			this.el.outerHeight = this.$el.outerHeight();
    			this.el.pos = this.$el.position();
    			this.el.position = this.$el.position();
    			this.el.borderWidth = parseInt(this.$el.css('borderTopWidth'));

    			this.$child = this.$el.children(':not(script):eq(0)');
    			this.child.width = this.$child.width();
    			this.child.height = this.$child.height();
    			this.child.outerWidth = this.$child.outerWidth();
    			this.child.outerHeight = this.$child.outerHeight();
    			if(this.child.outerHeight<this.el.outerHeight) {//限制最小高度
    				this.child.outerHeight = this.el.outerHeight;
    			}
    			this.child.pos = this.$child.position();
    			this.child.position = this.$child.position();
    			this.child.borderWidth = parseInt(this.$child.css('borderTopWidth'));

    			this.maxScroll = this.child.outerHeight-this.el.height;//div最大滚动距离
    			this.delta = 1;//
    			this.deltaFactor = 40;//滚动一次移动的距离
    			this.curPos = 0;
    		},
    		//生成滚动条的背景栏和拖动块
    		baseEl: function() {
    			var style = 
    				'.SC_outer {'+
    					'overflow: hidden;'+
    				'}'+
    				'.SC_inner {'+
    					'position: absolute;'+
    					'top: 0;'+
    					'left: 0;'+
    				'}'+
    				'.SC_backCtn {'+
    				    'height: 100%;'+
    				    'position: absolute;'+
    				    'top: 0;'+
    				    'right: 2px;'+
    				'}'+
    				'.SC_backClass {/*可配置*/'+
    				    'background: #000;'+
    				    'background: rgba(0, 0, 0, 0.4);'+
    				    'width: 2px;'+
    				    'border-radius: 20px;'+
    				'}'+
    				'.SC_frontCtn {'+
    				    'position: absolute;'+
    				    'top: 0;'+
    				    'cursor: pointer;'+
    				'}'+
    				'.SC_frontClass {/*可配置*/'+
    				    'background: #fff;'+
    				    'background: rgba(255, 255, 255, 0.75);'+
    				    'width: 4px;'+
    				    'height: 30px;'+
    				    'border-radius: 5px;'+
    				'}'+
    				'.SC_frontClass:hover {/*可配置*/'+
    				    'background: rgba(255, 255, 255, 1);';+
    				'}'+
    				'.SC_select_no {'+
    				    '-moz-user-select: none;/*火狐*/'+
    				    '-webkit-user-select: none;/*webkit浏览器*/'+
    				    '-ms-user-select: none;/*IE10*/'+
    				    '-khtml-user-select: none;/*早期浏览器*/'+
    				    'user-select: none;'+
    				'}';
    			$('head').append('<style>'+ style +'</style>');
    			if(this.$el.css('position')=='static') {
    				this.$el.css('position', 'relative');
    			}
    			this.$el.addClass('SC_outer');
    			this.$child.addClass('SC_inner');
    			//背景栏
    			this.$SC_backCtn = $('<div class="SC_backCtn"></div>').addClass(this.options.backClass).hide().appendTo(this.$el);

    			//拖动块
    			this.$SC_frontCtn = $('<div class="SC_frontCtn"></div>').addClass(this.options.frontClass).appendTo(this.$SC_backCtn);

    			this.frontLeft = (parseInt(this.$SC_backCtn.width())-parseInt(this.$SC_frontCtn.width()))/2;

    			this.$SC_frontCtn.css({
    				left: this.frontLeft
    			});
    			this.maxTop = this.el.height-this.$SC_frontCtn.height();//拖动块最大top
    			this.ratio = this.maxScroll/this.maxTop;//比率
    		},
    		//绑定事件
    		event: function() {
    			var This = this,
    				oldX = 0,  
    				oldY = 0,
    				diffX = 0,
    				diffY = 0,
    				touchTimer = null;

    			if(document.addEventListener) {//手机端(防止IE8-报错)
    				This.$el[0].addEventListener('touchstart', function(e) {  
    					var targetTouches = e.targetTouches[0];  
    					oldX = targetTouches.pageX;  
    					oldY = targetTouches.pageY;  
    				});

    				This.$el[0].addEventListener('touchmove', function(e) {
    					clearInterval(touchTimer);
    					This.$SC_backCtn.add(This.$SC_frontCtn).fadeIn();
    					e.preventDefault();//阻止页面滚动  
    							  
    					var targetTouches = e.targetTouches[0];  

    					var newX = targetTouches.pageX,  
    						newY = targetTouches.pageY; 

    					diffX = newX - oldX;
    					diffY = newY - oldY;  

    					var childTop = This.$child.position().top,
    						elH = This.$el.outerHeight(),
    						childH = This.$child.outerHeight();

    					if(childTop<0 && childH>elH-childTop) {
    						This.$child.css({'top': '+='+ diffY});
    						This.$SC_frontCtn.css({'top': -(This.$child.position().top)/This.ratio});
    					}else {
    						This.$child.css({'top': '+='+ diffY/3});
    					}

    					oldX = newX;  
    					oldY = newY;  
    				});

    				This.$el[0].addEventListener('touchend', function(e) { 
    					var targetTouches = e.targetTouches[0];  

    					var childTop = This.$child.position().top,
    						elH = This.$el.outerHeight(),
    						childH = This.$child.outerHeight();

    					if(childTop>=0) {//上出现空白
    						This.$child.stop().animate({'top': '0'}, 300, function() {
    							This.$SC_backCtn.add(This.$SC_frontCtn).fadeOut();
    						});
    						This.options.stopCallback(parseInt(This.$child.css('top')), -1);
    					}else if(childH<=elH-childTop) {
    						if(childH < elH) {//下出现空白
    							This.$child.stop().animate({'top': '0'}, 300, function() {
    								This.$SC_backCtn.add(This.$SC_frontCtn).fadeOut();
    							});
    						}else {
    							This.$child.stop().animate({'top': elH-childH}, 300, function() {
    								This.$SC_backCtn.add(This.$SC_frontCtn).fadeOut();
    							});
    						}
    						This.options.stopCallback(parseInt(This.$child.css('top')), 1);
    					}else {//缓动停止
    						clearInterval(touchTimer);
    						touchTimer = setInterval(function() {
    							childTop = This.$child.position().top;//更新childTop

    							if(childTop>=0) {//上出现空白
    								This.$child.css({'top': '0'});
    								clearInterval(touchTimer);
    								This.options.stopCallback(parseInt(This.$child.css('top')), -1);
    							}else if(childH<=elH-childTop) {//下出现空白
    								This.$child.css({'top': elH-childH});
    								clearInterval(touchTimer);
    								This.options.stopCallback(parseInt(This.$child.css('top')), 1);
    							}else {//运动中
    								if(Math.abs(diffY)>1) {
    									This.$child.css({'top': '+='+ diffY});
    									This.$SC_frontCtn.css({'top': -(This.$child.position().top)/This.ratio});
    									diffY *= .95;
    								}else {
    									This.$SC_backCtn.add(This.$SC_frontCtn).fadeOut();
    									clearInterval(touchTimer);
    								}
    								This.options.moveCallback(parseInt(This.$child.css('top')), -diffY<0?-1:1);
    							}
    						}, 20);
    					}
    					
    				});
    			}

    			//鼠标滚动(手机端无滚轮)
    			This.$el.add(This.$SC_backCtn).add(This.$SC_frontCtn).on('mousewheel.SC', function(event, delta) {
    				This.delta = -delta;//

    				if(This.delta<0) {//向上滚
    					var top = Math.abs(parseInt(This.$child.css('top'))),
    						once = Math.abs(This.delta*This.deltaFactor);

    					if(top<once) {
    						once = top;
    					}
    					This.curPos += once;
    					This.$child.css({
    						top: This.curPos
    					});

    					This.$SC_frontCtn.css({
    						top: -This.curPos/This.ratio
    					});
    				}

    				if(This.delta>0) {//向下滚
    					var top = Math.abs(parseInt(This.$child.css('top'))),
    						bottom = Math.abs(parseInt(This.maxScroll-top)),
    						once = Math.abs(This.delta*This.deltaFactor);

    					if(bottom<once) {
    						once = bottom;
    					}
    					This.curPos += -once;
    					This.$child.css({
    						top: This.curPos
    					});

    					This.$SC_frontCtn.css({
    						top: -This.curPos/This.ratio
    					});
    				}
    				This.options.moveCallback(parseInt(This.$child.css('top')), This.delta);
    				return false;
    			});

    			//鼠标按下拖动
    			This.$SC_frontCtn.on('mousedown.SC', function(e) {
    				$(document).on('selectstart.SC', function() {//禁选文字(兼容ie低版本)
    					return false;
    				});
    				$('body').addClass('SC_select_no');//禁选文字(兼容火狐)

    				var clientY = e.clientY,
    					top = parseInt($(this).css('top'));//开始的top

    				var oldClientY = e.clientY;

    				$(document).on('mousemove.SC', function(e) {
    					var newClientY = e.clientY,
    						endTop = top+newClientY-clientY;//最终的top

    					var diffClientY = newClientY-oldClientY;//判断拖动的方向
    					oldClientY = e.clientY;

    					if(endTop <= 0) {
    						endTop = 0;
    					}
    					if(endTop >= This.maxTop) {//
    						endTop = This.maxTop;
    					}

    					This.$SC_frontCtn.css({//拖动按钮滚动
    						top: endTop
    					});

    					This.$child.css({//div滚动
    						top: -endTop*This.ratio
    					});
    					This.options.moveCallback(parseInt(This.$child.css('top')), diffClientY<0?-1:1);
    				});
    			});

    			//取消拖动
    			$(document).on('mouseup.SC', function() {
    				$(this).off('mousemove.SC');
    				$(document).off('selectstart.SC');
    				$('body').removeClass('SC_select_no');
    			});

    			//监听内容变化(兼容性不好)
    			/*This.$child.on('DOMNodeInserted.SC', function() {
    				This.update();//更新
    			});*/

    			This.text = This.$el.text();

    			This.timer = setInterval(function() {
    				var newtext = This.$el.text();

    				if(This.text != newtext) {
    					This.update();
    					This.text = This.$el.text();
    					if(This.options.autoBottom) {
    						This.scrollTo('bottom');
    					}
    				}
    			}, 100);

    			//浏览器缩放
    			$(window).on('resize.SC', function() {
    				This.update();//更新
    			});

    			//渐隐渐显
    			This.$el.hover(function() {
    				This.$SC_backCtn.stop().fadeIn();
    			}, function() {
    				This.$SC_backCtn.stop().fadeOut();
    			});
    		},
    		//更新
    		update: function() {
    			this.el.height = this.$el.height();
    			this.el.outerHeight = this.$el.outerHeight();
    			this.child.outerHeight = this.$child.outerHeight();

    			if(this.child.outerHeight<this.el.outerHeight) {//限制最小高度
    				this.child.outerHeight = this.el.outerHeight;
    			}

    			this.maxScroll = this.child.outerHeight-this.el.height;//div最大滚动距离

    			this.maxTop = this.el.height-this.$SC_frontCtn.height();//拖动块最大top
    			this.ratio = this.maxScroll/this.maxTop;//比率

    			if(this.maxTop <= -this.curPos/this.ratio) {//继续往下拖防止出现空白
    				this.scrollTo('bottom');
    			}else {
    				this.$SC_frontCtn.css({
    					top: -this.curPos/this.ratio
    				});
    			}
    		},
    		//滚动至 ['top'] ['bottom'] [int]
    		scrollTo: function(pos, bool) {
    			if(pos == 'top') {
    				this.curPos = 0;
    			}
    			if(pos == 'bottom') {
    				this.curPos = -this.maxScroll;
    			}
    			if(/\d+/.test(pos)) {
    				this.curPos = -pos;
    			}

    			if(bool) {// css
    				this.$child.stop().css({
    					top: this.curPos
    				}, 300);

    				this.$SC_frontCtn.stop().css({
    					top: -this.curPos/this.ratio
    				}, 300);
    			}else {// animate
    				this.$child.stop().animate({
    					top: this.curPos
    				}, 300);

    				this.$SC_frontCtn.stop().animate({
    					top: -this.curPos/this.ratio
    				}, 300);
    			}
    		}
    		
    	}

    	$.fn.extend({
    		scrollbar: function(options) {
    			return new Scrollbar($(this), options);
    		}
    	})
    })(jQuery, window, document);
    /**************************** END ****************************/

    /**************************** BEGIN ****************************/
    /**
    * jquery.dragMove.js plugin
    *
    * Copyright (c) 2016/5/27 Han Wenbo
    *
    */
    ;(function($, window, document, undefined) {
        var plugName = "dragMove",
            defaults = {

            };

        function Drag($this, $that) {
            this.name = plugName;
            this.$this = $this;//拖动的
            this.$that = $that;//跟随的
            this.init();
        }

        Drag.prototype = {
            init: function() {
                var This = this,
                    $this = This.$this,
                    $that = This.$that;

                $this.on('mousedown.DR', function(e) {
                    var offX = e.offsetX,//点击的inner的位置
                        offY = e.offsetY,
                        offLeft = $this.position().left,//inner在outer里面的位置
                        offTop = $this.position().top;

                    $(document).on('mousemove.DR', function(e) {
                    	$(document).on('selectstart.DR', function() {//禁选文字(兼容ie低版本)
                    		return false;
                    	});
                    	$('body').addClass('SC_select_no');//禁选文字(兼容火狐)

                        var diffX = e.clientX - offX - offLeft,
                            diffY = e.clientY - offY - offTop,
                            winW = $(window).width(),
                            winH = $(window).height();

                        if(diffX <= 0) {
                            diffX = 0;
                        }
                        if(diffX+320 >= winW) {
                            diffX = winW-320;
                        }
                        if(diffY <= 0) {
                            diffY = 0;
                        }
                        if(diffY+480 >= winH) {
                            diffY = winH-480;
                        }
                        $that.css({
                        	'left': diffX, 
                        	'top': diffY,
                        	'right': 'auto',
                        	'bottom': 'auto'
                        });
                    });


                });

                $(document).on('mouseup.DR', function() {
                    $(document).off('mousemove.DR');
                    $(document).off('selectstart.DR');
                    $('body').removeClass('SC_select_no');//禁选文字(兼容火狐)
                });

            },
            destroy: function() {
            	this.$this.off('mousedown.DR')
            	$(document).off('mousemove.DR');
            	$(document).off('mouseup.DR');
            }

        }

        $.fn.extend({
            dragMove: function($that) {
                return new Drag($(this), $that);
	        }
	    })
    })(MN, window, document);
    /**************************** END ****************************/

    /**************************** BEGIN ****************************/
    /**
    * jquery.autocomplete.js
    * 
    * Copyright (c) 2016/5/20 Han Wenbo
    *
    **/

    ;(function($, window, document, undefined) {
        var plugName = "autocomplete",
            defaults = {
                prefix: '../../',//接口路径前缀(不能写根路径)
            	url: '',//[string]
                jsonp: false,//是否跨域
            	targetEl: null,//参照物(用于appendTo和定位)
            	posAttr: ['0px', '0px'],//外边框的定位[left bottom] 要写单位
            	itemNum: 0,//[int] 默认全部显示
            	keyupDelay: 5,//[int] 默认keyup之后，延时500ms后发送请求
            	callback: function(data) {}//获取文本后的回调函数
            };
        
        function Autocomplete($el, options) {
            this.plugName = plugName;
            this.$el = $el;
            this.prop = {};
            this.obj = {};
            this.$obj = {};
            this.defaults = defaults;
            this.options = $.extend({}, defaults, options);
            this.init();
        }

        Autocomplete.prototype = {
            init: function() {
            	this.baseProp();//$el的基础属性
            	this.baseEl();//生成外边框
            	this.event();//绑定事件
            },
            //基础属性
            baseProp: function() {
            	this.prop.winW = $(window).width();
            	this.prop.winH = $(window).height();

            	this.prop.outerWidth = this.$el.outerWidth();
            	this.prop.outerHeight = this.$el.outerHeight();
            	this.prop.position = this.$el.position();
            	this.prop.offset = this.$el.offset();
            	
            	this.prop.bottom = this.prop.winH - this.prop.offset.top;
            	this.prop.boxSizing = this.$el.css('boxSizing');

            	//是否rem
            	this.prop.baseRem = parseInt($('html').css('fontSize'));
            	if(this.$el.val()==''){
            		return;
            	}
            },
            //生成外边框
            baseEl: function() {
            	//rem
            	if(this.options.posAttr.join(',').indexOf('rem') != -1) {//rem
            		for(var i=0; i<this.options.posAttr.length; i++) {
            			this.options.posAttr[i] = parseFloat(this.options.posAttr[i]) * this.prop.baseRem;
            		}
            	}

            	this.$obj.$AU_outerCtn = $('<div class="AU_outerCtn"></div>').css({
            		left: this.options.posAttr[0],
            		bottom: this.options.posAttr[1],
            		boxSizing: this.prop.boxSizing
            	}).hide().appendTo(this.options.targetEl);
            },
            //绑定事件
            event: function() {
            	var This = this;

            	/*This.eventType = 'click';
            	if(!MN_Base.isPC()) {// hack ios 点击document不失去焦点
            	    This.eventType = 'touchend';
            	}*/

            	This.obj.curIndex = 0;//当前选中的div

            	//文本改变(兼容ie9删除文本)
            	This.$el.on('input.AU, propertychange.AU, keyup.AU', function(e) {
            		if(e.type=='keyup') {
            			if(e.keyCode==8 && MN_Base.ieVersion==9) {//ie9下退格键
            				This.outerCtnEvent();
            			}
            			if(e.keyCode==38) {//上移
            				if(This.obj.curIndex == 0.5) {
            					This.obj.curIndex = This.obj.maxIndex;

            				}else {
            					if(This.obj.curIndex > 0) {
            						This.obj.curIndex--;
            					}else {
            						This.obj.curIndex = This.obj.maxIndex;
            					}
            				}
            				$('.AU_innerCtn').eq(This.obj.curIndex).addClass('AU_innerCtn_focus').siblings().removeClass('AU_innerCtn_focus');
            			}
            			if(e.keyCode==40) {//下移
            				if(This.obj.curIndex == 0.5) {
            					This.obj.curIndex = 0;
            				}else {
            					This.obj.curIndex = parseInt(This.obj.curIndex);
            					if(This.obj.curIndex < This.obj.maxIndex) {
            						This.obj.curIndex++;
            					}else {
            						This.obj.curIndex = 0;
            					}
            				}
            				$('.AU_innerCtn').eq(This.obj.curIndex).addClass('AU_innerCtn_focus').siblings().removeClass('AU_innerCtn_focus');
            			}
            			if(e.keyCode==27) {//取消
            				This.$obj.$AU_outerCtn.empty().hide();
            			}
            			if(e.keyCode==108 || e.keyCode== 13) {//确定
            				$('.AU_txt').eq(This.obj.curIndex).trigger('click');
            				This.$obj.$AU_outerCtn.empty().hide();
            			}
            		}else {
            			This.outerCtnEvent();
            		}
            	});

            	//选定
            	$(document).on('mouseover.AU', '.AU_innerCtn', function(e) {
            		if(e.type == 'mouseover') {
            			$(this).addClass('AU_innerCtn_focus').siblings().removeClass('AU_innerCtn_focus');

            			This.getCurIndex();
            		}
            	});

            	//取消
            	$(document).on('click.AU', function(e) {
            		if(e.target != This.$el[0]) {//输入框
            			var data='';
						if($(e.target).is('.AU_txt')) {//选项
            				data = $(e.target).text().match(/^\d+\. (.+)/)[1];

	            			This.$el.val(data);
	            			This.options.callback(data);
	            		}
						if($(e.target).is('.AU_replaceTip')) {//选项
            				data = $(e.target).text();
	            			This.$el.val(data);
	            			This.options.callback(data);
	            		}
            			This.$obj.$AU_outerCtn.empty().hide();
            		}
            	});

            },
            //外框事件
            outerCtnEvent: function() {
            	var This = this;

        		This.obj.timerIndex = 0;
        		clearInterval(This.obj.timer);
        		This.obj.timer = setInterval(function() {
        			This.obj.timerIndex++;
        			if(This.obj.timerIndex == This.options.keyupDelay) {
        				var pattern = new RegExp(This.$el.val(), 'g');
        				MN_Base.request({
                        	prefix: This.options.prefix,//接口路径前缀(不能写根路径)
        					url: This.options.url,
        					params: {
        						q: This.$el.val()
        					},
            				dataType: This.options.jsonp ? 'jsonp' : 'json',//默认json
        					callback: function(data) {
        						if(data.status) {//1
									layer.msg(data.message, {
										shift: 0,
										area: This.getSuitSize()
									});
        						}else {//0
        							var html = '';
        							if(data.list) {
	        							if(data.list[0]) {
	        								var len = This.options.itemNum ? (This.options.itemNum>data.list.length?data.list.length:This.options.itemNum) : data.list.length;
	        								for(var i=0; i<len; i++) {
	        									html += '<div class="AU_innerCtn"><div class="AU_txt">'+ (i+1) +'. '+ data.list[i].question.replace(pattern, '<span class="AU_replaceTip">'+ This.$el.val() +'</span>') +'</div></div>';

	        								}
											This.obj.curIndex = 0.5;//恢复0
	            							This.obj.maxIndex = len-1;//最大index
	        								This.$obj.$AU_outerCtn.empty().append(html).show();
	            							$('.AU_innerCtn').eq(Math.floor(This.obj.curIndex)).addClass('AU_innerCtn_focus').siblings().removeClass('AU_innerCtn_focus');
	        							}else {
	        								This.$obj.$AU_outerCtn.empty().hide();
	        							}
        							}
        						}
        					}
        				});
        				clearInterval(This.obj.timer);
        			}
        		}, 100);
            },
            //获取当前选中的div
            getCurIndex: function() {
            	var This = this;
            	
            	$('.AU_innerCtn').each(function(key, val) {
            		if($(val).is('.AU_innerCtn_focus')) {
            			This.obj.curIndex = key;
            		}
            	});
            },
            // 获取提示框合适的大小
            getSuitSize: function() {
            	return MN_Base.isPC()?'400px':'0.8rem';
            }
        }

        $.fn.extend({
            autocomplete: function(options) {
                return this.each(function() {
                    new Autocomplete($(this), options);
                })
            }
        })
    })(MN, window, document);
    /**************************** END ****************************/


    /**************************** BEGIN ****************************/
    /**
    * jquery.face.js
    * 
    * Copyright (c) 2016/5/24 Han Wenbo
    *
    **/

    // ;(function($, window, document, undefined) {
    //     var plugName = "face",
    //         defaults = {
    //         	open: true,//默认开启功能
    // 			src: 'src/yun/',//表情路径
    //         	rowNum: 5,//每行最多显示数量，此属性不适用于常用语
    //         	btnAttr: ['0px', '5px', '20px', '20px'],//[left bottom width height] 触发按钮相对targetEl的位置和宽高  要写单位
    //         	ctnAttr: ['0px', '30px', '40px', '40px'],//[left bottom width height] 表情框相对targetEl位置和里面的表情格子宽高  要写单位
    //         	triggerEl: null,//触发按钮(不存在则自己生成，不要由a包裹)
    //         	targetEl: null,//父级参照物(用于appendTo和定位)
    //         	hideAdv: false,//是否隐藏广告
    //         	advClass: 'FA_advCtn',//广告样式
    //         	callback: function(data) {}//获取表情符后的回调函数
    //         };
        
    //     function Face($el, options) {
    //         this.plugName = plugName;
    //         this.$el = $el;
    //         this.prop = {};
    //         this.obj = {};
    //         this.$obj = {};
    //         this.defaults = defaults;
    //         this.options = $.extend({}, defaults, options);
    //         this.init();
    //     }

    //     Face.prototype = {
    //         init: function() {
    //         	this.variable();//声明变量
    //         	if(this.options.open) {
    //         		this.baseProp();//$el的基础属性
    //         		this.baseEl();//生成外边框
    //         		this.event();//绑定事件
    //         	}
    //         },
    //         //声明变量
    //         variable: function() {
    //         	this.obj.face = {//表情包
    //         		'旺旺表情': [
    //         			['[微笑]', '/::)'],
	// 		            ['[撇嘴]', '/::~'],
	// 		            ['[色]', '/::B'],
	// 		            ['[发呆]', '/::|'],
	// 		            ['[得意]', '/:8-)'],
	// 		            ['[流泪]', '/::<'],
	// 		            ['[害羞]', '/::$'],
	// 		            ['[闭嘴]', '/::X'],
	// 		            ['[尴尬]', '/::-|'],
	// 		            ['[发怒]', '/::@'],//10
	// 		            ['[调皮]', '/::P'],
	// 		            ['[呲牙]', '/::D'],
	// 		            ['[惊讶]', '/::O'],
	// 		            ['[难过]', '/::('],
	// 		            ['[酷]', '/::+'],
	// 		            ['[吐]', '/::T'],
	// 		            ['[偷笑]', '/:,@P'],
	// 		            ['[愉快]', '/:,@-D'],
	// 		            ['[困]', '/:|-)'],
	// 		            ['[惊恐]', '/::!'],//10
	// 		            ['[流汗]', '/::L'],
	// 		            ['[憨笑]', '/::>'],
	// 		            ['[奋斗]', '/:,@f'],
	// 		            ['[疑问]', '/:?'],
	// 		            ['[嘘]', '/:,@x'],
	// 		            ['[晕]', '/:,@@'],
	// 		            ['[衰]', '/:,@!'],
	// 		            ['[骷髅]', '/:!!!'],
	// 		            ['[再见]', '/:bye'],
	// 		            ['[糗大了]', '/:&-('],//10
	// 		            ['[坏笑]', '/:B-)'],
	// 		            ['[鄙视]', '/:>-|'],
	// 		            ['[委屈]', '/:P-('],
	// 		            ['[亲亲]', '/::*'],
	// 		            ['[可怜]', '/:8*'],
	// 		            ['[玫瑰]', '/:rose'],
	// 		            ['[凋谢]', '/:fade'],
	// 		            ['[嘴唇]', '/:showlove'],
	// 		            ['[爱心]', '/:heart'],
	// 		            ['[心碎]', '/:break']//10
    //         		],
    //         		'当当表情': [
    //         			['[微笑]', '/::)'],
	// 		            ['[撇嘴]', '/::~'],
	// 		            ['[色]', '/::B'],
	// 		            ['[发呆]', '/::|'],
	// 		            ['[得意]', '/:8-)'],
	// 		            ['[流泪]', '/::<'],
	// 		            ['[害羞]', '/::$'],
	// 		            ['[调皮]', '/::P'],
	// 		            ['[呲牙]', '/::D'],
	// 		            ['[惊讶]', '/::O'],//10
	// 		            ['[难过]', '/::('],
	// 		            ['[酷]', '/::+'],
	// 		            ['[偷笑]', '/:,@P'],
	// 		            ['[流汗]', '/::L'],
	// 		            ['[憨笑]', '/::>'],
	// 		            ['[奋斗]', '/:,@f'],
	// 		            ['[疑问]', '/:?'],
	// 		            ['[嘘]', '/:,@x'],
	// 		            ['[晕]', '/:,@@'],
	// 		            ['[再见]', '/:bye'],//10
	// 		            ['[坏笑]', '/:B-)'],
	// 		            ['[委屈]', '/:P-('],
	// 		            ['[亲亲]', '/::*'],
	// 					['[鼓掌]', '/:handclap'],
	// 					['[冷汗]', '/:wipe'],
	// 					['[大笑]', '/:X-)'],
	// 					['[睡觉]', '/::Z'],
	// 					['[抓狂]', '/::8'],
	// 					['[左哼哼]', '/:@>'],
	// 					['[右哼哼]', '/:<@']//10
    //         		],
    //         		'云问表情': [
    //         			['[微笑]', '/::)'],
	// 		            ['[色]', '/::B'],
	// 		            ['[得意]', '/:8-)'],
	// 		            ['[流泪]', '/::<'],
	// 		            ['[害羞]', '/::$'],
	// 		            ['[闭嘴]', '/::X'],
	// 		            ['[发怒]', '/::@'],
	// 		            ['[呲牙]', '/::D'],
	// 		            ['[惊讶]', '/::O'],
	// 		            ['[难过]', '/::('],
	// 		            ['[酷]', '/::+'],
	// 		            ['[愉快]', '/:,@-D'],
	// 		            ['[流汗]', '/::L'],
	// 		            ['[奋斗]', '/:,@f'],
	// 		            ['[疑问]', '/:?'],
	// 		            ['[晕]', '/:,@@'],
	// 		            ['[委屈]', '/:P-(']
    //         		],
    //         		'微信表情': [
    //         			["[微笑]", "/::)"],
    //         			["[撇嘴]", "/::~"],
    //         			["[色]", "/::B"],
    //         			["[发呆]", "/::|"],
    //         			["[得意]", "/:8-)"],
    //         			["[流泪]", "/::<"],
    //         			["[害羞]", "/::$"],
    //         			["[闭嘴]", "/::X"],
    //         			["[睡]", "/::Z"],
    //         			["[大哭]", "/::'("],//10
    //         			["[尴尬]", "/::-|"],
    //         			["[发怒]", "/::@"],
    //         			["[调皮]", "/::P"],
    //         			["[呲牙]", "/::D"],
    //         			["[惊讶]", "/::O"],
    //         			["[难过]", "/::("],
    //         			["[酷]", "/::+"],
    //         			["[冷汗]", "/:--b"],
    //         			["[抓狂]", "/::Q"],
    //         			["[吐]", "/::T"],//10
    //         			["[偷笑]", "/:,@P"],
    //         			["[愉快]", "/:,@-D"],
    //         			["[白眼]", "/::d"],
    //         			["[傲慢]", "/:,@o"],
    //         			["[饥饿]", "/::g"],
    //         			["[困]", "/:|-)"],
    //         			["[惊恐]", "/::!"],
    //         			["[流汗]", "/::L"],
    //         			["[憨笑]", "/::>"],
    //         			["[悠闲]", "/::,@"],//10
    //         			["[奋斗]", "/:,@f"],
    //         			["[咒骂]", "/::-S"],
    //         			["[疑问]", "/:?"],
    //         			["[嘘]", "/:,@x"],
    //         			["[晕]", "/:,@@"],
    //         			["[疯了]", "/::8"],
    //         			["[哀]", "/:,@!"],
    //         			["[骷髅]", "/:!!!"],
    //         			["[敲打]", "/:xx"],
    //         			["[再见]", "/:bye"],//10
    //         			["[擦汗]", "/:wipe"],
    //         			["[抠鼻]", "/:dig"],
    //         			["[鼓掌]", "/:handclap"],
    //         			["[糗大了]", "/:&-("],
    //         			["[坏笑]", "/:B-)"],
    //         			["[左哼哼]", "/:<@"],
    //         			["[右哼哼]", "/:@>"],
    //         			["[哈欠]", "/::-O"],
    //         			["[鄙视]", "/:>-|"],
    //         			["[委屈]", "/:P-("],//10
    //         			["[快哭了]", "/::'|"],
    //         			["[阴险]", "/:X-)"],
    //         			["[亲亲]", "/::*"],
    //         			["[吓]", "/:@x"],
    //         			["[可怜]", "/:8*"],
    //         			["[菜刀]", "/:pd"],
    //         			["[西瓜]", "/:<W>"],
    //         			["[啤酒]", "/:beer"],
    //         			["[篮球]", "/:basketb"],
    //         			["[乒乓]", "/:oo"],//10
    //         			["[咖啡]", "/:coffee"],
    //         			["[饭]", "/:eat"],
    //         			["[猪头]", "/:pig"],
    //         			["[玫瑰]", "/:rose"],
    //         			["[凋谢]", "/:fade"],
    //         			["[嘴唇]", "/:showlove"],
    //         			["[爱心]", "/:heart"],
    //         			["[心碎]", "/:break"],
    //         			["[蛋糕]", "/:cake"],
    //         			["[闪电]", "/:li"],//10
    //         			["[炸弹]", "/:bome"],
    //         			["[刀]", "/:kn"],
    //         			["[足球]", "/:footb"],
    //         			["[瓢虫]", "/:ladybug"],
    //         			["[便便]", "/:shit"],
    //         			["[月亮]", "/:moon"],
    //         			["[太阳]", "/:sun"],
    //         			["[礼物]", "/:gift"],
    //         			["[拥抱]", "/:hug"],
    //         			["[强]", "/:strong"],//10
    //         			["[弱]", "/:weak"],
    //         			["[握手]", "/:share"],
    //         			["[胜利]", "/:v"],
    //         			["[抱拳]", "/:@)"],
    //         			["[勾引]", "/:jj"],
    //         			["[拳头]", "/:@@"],
    //         			["[差劲]", "/:bad"],
    //         			["[爱你]", "/:lvu"],
    //         			["[NO]", "/:no"],
    //         			["[OK]", "/:ok"],//10
    //         			["[爱情]", "/:love"],
    //         			["[飞吻]", "/:<L>"],
    //         			["[跳跳]", "/:jump"],
    //         			["[发抖]", "/:shake"],
    //         			["[怄火]", "/:<O>"],
    //         			["[转圈]", "/:circle"],
    //         			["[磕头]", "/:kotow"],
    //         			["[回头]", "/:turn"],
    //         			["[跳绳]", "/:skip"],
    //         			["[投降]", "/:oY"],//10
    //         			["[激动]", "/:#-0"],
    //         			["[乱舞]", "/:hiphot"],
    //         			["[献吻]", "/:kiss"],
    //         			["[左太极]", "/:<&"],
    //         			["[右太极]", "/:&>"]
    //         		]
    //         	}
    //         	this.obj.faceType = [];
    //         	if(this.options.src.indexOf('wang')+1) {//旺旺表情
    //         		this.obj.faceType[0] = '旺旺表情';
    //         		this.obj.faceType[1] = 'bmp';
    //         		this.obj.faceType[2] = 'gif';
    //         	}
    //         	if(this.options.src.indexOf('dang')+1) {//当当表情
    //         		this.obj.faceType[0] = '当当表情';
    //         		this.obj.faceType[1] = 'png';
    //         		this.obj.faceType[2] = 'png';
    //         	}
    //         	if(this.options.src.indexOf('yun')+1) {//云问表情
    //         		this.obj.faceType[0] = '云问表情';
    //         		this.obj.faceType[1] = 'png';
    //         		this.obj.faceType[2] = 'png';
    //         	}
    //         	if(this.options.src.indexOf('wx')+1) {//微信表情
    //         		this.obj.faceType[0] = '微信表情';
    //         		this.obj.faceType[1] = 'png';
    //         		this.obj.faceType[2] = 'gif';
    //         	}
    //         	this.obj.maxNum_y = Math.ceil(this.obj.face[this.obj.faceType[0]].length/this.options.rowNum);//云问表情最大行数

    //         	this.obj.showTip = false;//是否显示提示框
    //         	this.obj.lastStrLen = 1;//
    //         },
    //         //基础属性
    //         baseProp: function() {
    //         	this.prop.winW = $(window).width();
    //         	this.prop.winH = $(window).height();

    //         	this.prop.width = this.$el.width();
    //         	this.prop.height = this.$el.height();
    //         	this.prop.outerWidth = this.$el.outerWidth();
    //         	this.prop.outerHeight = this.$el.outerHeight();

    //         	this.prop.zIndex = this.$el.css('zIndex');

    //         	this.prop.paddingLeft = parseInt(this.$el.css('paddingLeft'));
    //         	this.prop.paddingTop = parseInt(this.$el.css('paddingTop'));
    //         	this.prop.borderWidth = parseInt(this.$el.css('borderTopWidth'));

    //         	this.prop.position = this.$el.position();
    //         	this.prop.offset = this.$el.offset();

    //         	this.prop.bottom = this.prop.winH - this.prop.offset.top;

    //         	//是否rem
    //         	this.prop.baseRem = parseInt($('html').css('fontSize'));
    //         },
    //         //生成触发按钮和表情框
    //         baseEl: function() {
    //         	var This = this,
    //         		isRem = false;

    //         	//rem
    //         	if(This.options.ctnAttr.join(',').indexOf('rem') != -1) {//rem
    //         		isRem = true;
            		
    //         		for(var i=0; i<This.options.ctnAttr.length; i++) {
    //         			This.options.ctnAttr[i] = parseInt(parseFloat(This.options.ctnAttr[i]) * This.prop.baseRem);

    //         		}
    //         	}

    //         	//触发按钮(可配置)
    //         	if(this.options.triggerEl) {
    //         		this.$obj.$FA_triBtn = this.options.triggerEl;
    //         	}else {
    //         		this.$obj.$FA_triBtn = $('<div class="FA_triBtn"></div>').css({
    //         			width: this.options.btnAttr[2],
    //         			height: this.options.btnAttr[3]
    //         		}).appendTo(this.options.targetEl);

    //         		//触发按钮定位
    //         		this.$obj.$FA_triBtn.css({
    //         			left: this.options.btnAttr[0],
    //         			bottom: this.options.btnAttr[1]
    //         		});
    //         	}

    //         	//背景框
    //         	this.$obj.$FA_backCtn = $('<div class="FA_backCtn"></div>').hide().css({
    //         	}).appendTo(this.options.targetEl);

    //         	//滚动框
    //         	this.$obj.$FA_ScrollCtn = $('<div class="FA_ScrollCtn"></div>').css({
    //         		width: parseFloat(this.options.ctnAttr[2])*this.options.rowNum,
    //         		height: parseFloat(this.options.ctnAttr[3])*4
    //         	}).appendTo(this.$obj.$FA_backCtn);

    //         	//rem
    //         	if(isRem) {//rem
    //         		//背景框padding
    //         		This.$obj.$FA_backCtn.css({
    //         			padding: (This.prop.baseRem - This.$obj.$FA_ScrollCtn.outerWidth())/2
    //         		});
    //         	}

    //         	//表情框
    //         	this.$obj.$FA_faceCtn = $('<div class="FA_faceCtn"></div>').appendTo(this.$obj.$FA_ScrollCtn);

    //         	//广告框
    //         	this.$obj.$FA_advCtn = $('<div></div>').addClass(this.options.advClass).insertBefore(this.$obj.$FA_ScrollCtn);

    //         	//关闭广告框
    //         	this.$obj.$FA_closeAdvCtn = $('<div class="FA_closeAdvCtn" title="不再显示">×</div>').appendTo(this.$obj.$FA_advCtn);

    //         	if(this.options.hideAdv) {//隐藏广告
    //         		this.$obj.$FA_advCtn.hide();
    //         	}

    //         	this.obj.moodIndex = 0;
    //         	for(var key in this.obj.face) {
    //         		this.obj.moodIndex++;
    //         		if(key == this.obj.faceType[0]) {//选择表情
    //         			var mood = this.obj.face[key],
    //         				html = '';
    //         			for(var i=0; i<this.options.rowNum*this.obj.maxNum_y; i++) {
    //         				var srcHtml = '',
    //         					title = '',
    //         					mark = '';

    //         				if(i < mood.length) {
    //         					srcHtml = '<img FA-src="'+ this.options.src + i +'.'+ this.obj.faceType[1] +'">';
    //         					title = mood[i][0];
    //         					mark = mood[i][1];
    //         				}

    //         				html += '<div class="FA_moodCtn" title="'+ title +'" mark="'+ title +'" group="'+ key +'"><div class="FA_srcCtn" style="width: '+ parseInt(this.options.ctnAttr[2]) +'px; height: '+ parseInt(this.options.ctnAttr[3]) +'px">'+ srcHtml +'</div></div>';
    //         			}
    //         			this.$obj.$FA_faceCtn.append(html);
    //         		}
    //         	}

    //         	//背景框定位
    //         	this.$obj.$FA_backCtn.css({
    //         		left: this.options.ctnAttr[0],
    //         		bottom: this.options.ctnAttr[1]
    //         	});

    //         	//提示表情滚动框
    //         	this.$obj.$FA_tipScrollCtn = $('<div class="FA_tipScrollCtn"></div>').css({
    //         		width: this.options.ctnAttr[2]+50,
    //         		height: this.options.ctnAttr[3]*4
    //         	}).appendTo('body');

    //         	var $allMood = $('.FA_moodCtn[group=云问表情]').clone();

    //         	$allMood.each(function() {
    //         		var mark = $(this).attr('mark');

    //         		$(this).find('.FA_srcCtn').css({
    //         			textIndent: 5,
    //         			textAlign: 'left',
    //         			width: This.options.ctnAttr[2]+50
    //         		}).find('img').after('<span>'+ mark +'</span>');
    //         	});

    //         	//提示表情框
    //         	this.$obj.$FA_tipMoodCtn = $('<div class="FA_tipMoodCtn"></div>').append($allMood).appendTo(this.$obj.$FA_tipScrollCtn);

    //         	//计算文字框
    //         	this.$obj.$FA_countLenCtn = $('<div class="FA_countLenCtn"></div>').css({
    //         		width: this.prop.width,
    //         		height: this.prop.height,
    //         		left: this.prop.offset.left+15,
    //         		bottom: this.prop.bottom-this.prop.outerHeight-30,
    //         		padding: this.prop.paddingTop +'px '+ this.prop.paddingLeft +'px',
    //         		border: this.prop.borderWidth +'px solid blue',
    //         		opacity: 0,
    //         		zIndex: -999
    //         	}).hide().appendTo('body');

    //         	//计算文字标识符
    //         	this.$obj.$FA_markPos = $('<span class="FA_markPos"></span>').css({
    //         	}).appendTo(this.$obj.$FA_countLenCtn);

    //         },
    //         //绑定事件
    //         event: function() {
    //         	var This = this;

	// 			//调用滚动插件(表情框)
    //         	This.obj.scrollbar = This.$obj.$FA_ScrollCtn.scrollbar({
    //         	});
    //         	This.$obj.$FA_tipScrollCtn.hide();//调用滚动插件后才能隐藏

    //         	//选择表情
    //         	This.options.targetEl.on('click.FA', '.FA_moodCtn', function() {
    //         		var val = This.$el.val(),
    //         			cursortPos = MN_Base.getCursortPos(This.$el[0]),
    //         			fromVal = val.substr(0, cursortPos),
    //         			toVal = val.substr(cursortPos, val.length-1),
    //         			mark = $(this).attr('mark');

    //         		This.$el.val(fromVal + mark + toVal);
    //         		MN_Base.setCaretPos(This.$el[0], cursortPos+mark.length);
    //         		This.options.callback(This.$el.val());
    //         		This.$obj.$FA_backCtn.hide();
    //         	});
            	
    //         	//初始化切换按钮状态
    //         	$('.FA_switchBtn').eq(0).addClass('FA_switchBtn_focus').siblings().removeClass('FA_switchBtn_focus');

    //         	//点击切换
    //         	$('body').on('click.FA', '.FA_switchBtn', function() {
    //         		$(this).addClass('FA_switchBtn_focus').siblings().removeClass('FA_switchBtn_focus');
    //         		if($(this).is('.FA_switchBtn_1')) {//云问表情
    //         			This.obj.scrollbar.scrollTo(This.obj.top1);
    //         		}
    //         	});

    //     		//显隐
    //     		$(document).on('click.FA', function(e) {
    //     			if(e.target == This.$obj.$FA_triBtn[0]) {
    //     				$('[FA-src]').each(function() {//避免首次加载表情文件
    //     					$(this).attr('src', $(this).attr('FA-src')).removeAttr('FA-src');
    //     				});

    //     				This.$obj.$FA_backCtn.stop().show();

    //     				// This.obj.scrollbar.update();
    //     				// This.obj.scrollbar.scrollTo('top');

    //     				//显示后才能获取top
    //     				This.obj.top1 = 0;
    //     			}else if($(e.target).is(This.$obj.$FA_backCtn) || $(e.target).parents('.FA_backCtn')[0]) {
    //     				return false;
    //     			}else {
    //     				This.$obj.$FA_backCtn.stop().hide();
    //     			}
    //     		});

    //         	//关闭广告
    //         	This.$obj.$FA_closeAdvCtn.on('click.FA', function() {
    //         		This.$obj.$FA_advCtn.stop().fadeOut();
    //         	});

    //         	This.$el.on('keydown.FA', function(e) {
    //         		if(e.keyCode == 8) {
    //         			This.obj.bindInput = false;
    //         		}else {
    //         			This.obj.bindInput = true;
    //         		}
    //         	});
    //         },
    //         update: function() {
    //         	this.obj.scrollbar.update();
    //         }
    //     }

    //     $.fn.extend({
    //         face: function(options) {
    //             return new Face($(this), options);
    //         }
    //     })
    // })(MN, window, document);
    /**************************** END ****************************/
    
    /**************************** BEGIN ****************************/
    /*  
    * 多图预览上传组件  
    * Copyright (c) 2016/8/5 Han Wenbo  
    *  
    * 调用示例：  
    * H5_upload('../../servlet/AQ?s=uf', $('.file'), '', function(data) {  
    *    console.log(data);  
    * });  
    */  
    //;(function($, window, document, undefined) {
	    //样式  
	    $('head').append('<style>.upFileCtn{width:70%;background:#3d3f40;padding:10px;border-radius:5px;margin:10px auto;position:relative;text-align:center}.upFileItem{display:inline-block;padding:0 5px}.upFileImg{border:0;max-height:50px}.upFileName{color:#fff;font-size:12px;text-align:center;margin-bottom:5px}.upFileAbort{position:absolute;right:0;top:-10px;background:#3d3f40;color:#fff;border-radius:100px;font-size:12px;padding:4px;cursor:pointer}.upFileOuter{height:5px;background:#1a1a1a;position:relative;border-radius:5px;overflow:hidden}.upFileInner{display:inline-block;height:100%;background:#5e90d6;position:absolute;top:0;left:0}</style>');  
	    //无法预览base64  
	    var base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABYCAYAAABiQnDAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkI1Q0NBQjg1NUExNzExRTY5RTEzREZFNTRENzc4RkFGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkI1Q0NBQjg2NUExNzExRTY5RTEzREZFNTRENzc4RkFGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjVDQ0FCODM1QTE3MTFFNjlFMTNERkU1NEQ3NzhGQUYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjVDQ0FCODQ1QTE3MTFFNjlFMTNERkU1NEQ3NzhGQUYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4+S+GgAAAGC0lEQVR42uyc2ys9WxzAZ7vnkvs1xAsKDxIexAOhlGd/zvmdP8eLlFI8SHlAEuUSItcQQrnk7vRZne8+s8dmX2ZfHPv7rdWePbPWrLU+63ub2TPbc3Jy8mEllngiebIkK/Hkr0ieLEU2ysvLfzW109NT2fzz7+ffqoHhy59IaWKiAowYxEQGGBGIiQ7QNUQF6BKiAnQJUQG6hKgAXUJUgC4hKkCXEBWgS4gK0CVEBegSogJ0CVEBuoSoAF1CVIAuISYMwLS0tGhA/EgYgLm5udGA+N9vIr9dUlJSrMLCwoidT35jiZsGPj4+um7/8RH/X2TjApCJ39zcWO/v72G1px3tf4LEBeDr66uBeH9/H1Z72tGe8yQkwKenJ1dmLO3lM6EA2jXv7e0tbA22a2JCAXTj+36iL4wYwLu7u2+1gWPX19c+ZktqEW5KYo/GnDdQ34wvKulRJE3z/PzcysrKsjIyMswkxdHjqzA3p+alp6eH1RftXl5efCAG6jszM/NnA2TwDPT29taUQOLxeEwbN33ZtY7F+apvN33FzISTkpKsvLy8oOtTlzY/va+YBhHMJz8/36z4d5pHHer+X/qK6bUwgy0pKTEmhm/CDzER/BK+C1OKlDbEsq+Y3kxg0Dk5OaZEPY2IYV8/5krkN4kCVIAKUAEqQBUFGC+J+49KJMDPz88mCeb+INe39iJXFPaSnJxskmV+ZYvmVYZqYCJoIBoUby1SDVSAClABqihABagAFaCKAlSAClABqihABagAFaBKMOKZn5//UAyqgXET7y396upqpRGCHB4eqgaqCSvAX+QDYyEPDw/mafqamppPx2ZnZ63S0lKrrq7OZz9P4zvfBUlNTTX7v3pVjGei/T1DfXFxYR0fH1stLS1me3Nz02ptbXX1BH/IALe3t63l5eWg6gKDwYrs7e1Za2tr1sbGhtXW1mYVFxd7j52cnFjZ2dmfzgG86enpT/uLioqsy8tLv/3SpwCU8Q4PD5v3SfjOcUDSZ0FBgVkQkdraWp/vEQfIQ9t2KAgDZEJVVVWf6tqlsbHRPNO8uLhotIfCYx0iV1dXZoLSFsCUgYEBrwajqfRv19SxsTHzH7AdHR1Bz+Pg4MA8R80nY5CXsQEYVQ2USTkBAs9pfl+1HxwcNNsTExM+73WgUaJVnEv62dra8r7gjPlzDBO0a+b+/r4pCNr2nVCPF3BYmNXVVbOvq6srPj4QrQi23tLSktXQ0OAFIyCRkZGRTyYvgmaJKaIt9reUmpqavCaHiQrE74R6LARm3tzcbE1OTlrr6+vGQqIKEJ+BCfkTJufPN4q5ibmiNV+BCsbnMobR0VHjMhBxCZgwZu8EWFlZaXwrGgt4nuZnH9vsE60Oxe+FDZBo5Zz40dGR1+y+84NoXW9vrwHChPwFI/aJD0SGhoYMIDTQHgBoV1ZW9mUQcY6ZgGHvy19QCvcPKUIC6C89AKBERCJaID/IccyZFZfF2NnZMb7Qbo6SrgDA2SfOH7ChCgsiPpWFlXOMj4/HJ5HGBADn1LpAMjMzYzQKmJgT8DAjfBATYz/Fn1mhve3t7T777FE0kDZS0GT6l+9xuRLBh+B70IavQj+O2RlkGDzAxLTRBgRnLjmf3Yz9WUFFRYWByycgiKicD4jsCyboEdXFB8YcIPDm5+cNCLTBn6ZQh6QZ/2MfPEk0k8QnAkz8GucQAPirQG+iA5KrCMwfF7K7u2sK+5yCqZKm0P/c3JxZdMYOfKSnp8eqr68PKoK7TmPoZGVlxaw6zt2+4vZEWC6z7Mk0ORftmCSAMWUEqM6AQl3JzcTk7AshVzVE1e7ubu/5pqamrP7+fq9pUpeCryaDoD7H8XuMUbSQBVtYWAhKi8MGKJ0wiM7OTp+EWqKjPTKKptl9FYFCJsc/CTFg/BpvVkqRqMnEqSuRHj/Jd2CdnZ2ZPuXSi9LX12csg36oR3uAsmiMhQUROPhYZ9RHk0OBh3hv6Qd7QxWIobzs7M+0A+Vc1KFE4jV9ifjh5nmBbqiGbMJu4ElqEkydSE04Wv+VoPcDFaAC/F13pMUpqqgGxlT+EWAAIaBk3UBJfHwAAAAASUVORK5CYII=';  
	    var fileData = [];//fileData 为数组  
	      
	    //上传方法  
		function H5_upload(url, maxNum, $trigger, $ctn, startcall, callback, type, typecall) {//url-上传接口 maxNum-单次最大上传数量 $trigger-触发上传的input $ctn-上传进度的显示框 startcall-开始上传时的回调 callback-上传结束后的回调  type-允许上传的文件格式，如：gif|jpeg|bmp|jpg|png typecall-不符合文件类型时的回调
	        //自动上传    
	        $trigger.on('change', function() {    
	            fileData = [];  
	            try {
	            	var len = maxNum ? (maxNum>$trigger[0].files.length?$trigger[0].files.length:maxNum) : $trigger[0].files.length;
	                for(var i=0; i<len; i++) {//IE9-不支持files    
	                    fileData[i] = $trigger[0].files[i];  
	                }  
	                autoUpload(url, $trigger, $ctn, startcall, callback, type, typecall);
	            }catch(e) {}
	              
	        });    
	    }  
	      
	    //自动上传  
	    function autoUpload(url, $trigger, $ctn, startcall, callback, type, typecall) {   
	        if(!fileData[0]) {    
	            return;    
	        }    

	        uploadFile({    
	            url: url,   
	            data: {    
	                file: fileData//fileData 为数组  
	            },    
	            beforeload: function(formData) {
	                var noSuit = [];// 不符合类型的文件

	                typeReg = new RegExp('\.'+ type, 'i');
	                for(var key in formData) {  
	                    var val = formData[key];  
	                    if(val instanceof Array) {//hack数组对象 

	                        for(var i=0,len=val.length; i<len; i++) { 
	                            if(typeReg.test(val[i].name)) {// 文件类型允许
	                            }else {// 文件类型禁止
	                                noSuit.push(val[i]);
	                                val[i] = [];
	                            }
	                        }  
	                    }
	                }
	                typecall && typecall(noSuit);  
	                return formData;
	            },
	            loadstart: function(e, ran, xhr) {   
	                startcall && startcall(ran);//开始时的回调

	                var $upFileCtn = $('<div class="'+ ran +' upFileCtn"></div>'),  
	                    $upFileAbort = $('<span class="upFileAbort">x</span>'),  
	                    $upFileOuter = $('<div class="upFileOuter"></div>'),  
	                    $upFileInner = $('<em class="upFileInner"></em>');  
	            
	                for(var i=0,len=fileData.length; i<len; i++) { 
	                    if(!(fileData[i] instanceof Array)) {
	                        var $upFileItem = $('<div class="upFileItem" size="'+ fileData[i].size +'"></div>'),  
	                            $upFileName = $('<p class="upFileName" size="'+ fileData[i].size +'" hasRead="0">'+ fileData[i].name +'</p>');  
	            
	                        $upFileName.appendTo($upFileItem);  
	                        $upFileItem.appendTo($upFileCtn);  
	            
	                        try {  
	                            var reader = new FileReader();//IE9-不支持FileReader  
	                            if(fileData[i].type.indexOf('image')+1) {//可预览  
	                                reader.readAsDataURL(fileData[i]);  
	                                reader.onload = function(e) {  
	                                    var $upFileImg = $('<img class="upFileImg" src="'+ e.target.result +'">');  
	                                    var $upFileName = $('.upFileName');  
	                                    for(var j=0,len=$upFileName.length; j<len; j++) {  
	                                        var $cur_upFileName = $upFileName.eq(j);  
	                                        if((e.total==$cur_upFileName.attr('size')) && !parseInt($cur_upFileName.attr('hasRead'))) {  
	                                            $cur_upFileName.attr('hasRead', '1').before($upFileImg);  
	                                            break;  
	                                        }  
	                                    }  
	                                }  
	                            }else {  
	                                var $upFileImg = $('<img class="upFileImg" src="'+ base64 +'">');  
	                                $upFileImg.insertBefore($upFileName);  
	                            }  
	                        }catch(e) {}  
	                    }
	                }  
	                   
	                $upFileCtn.append($upFileAbort);    
	                $upFileCtn.append($upFileOuter);    
	                $upFileOuter.append($upFileInner);    
	                ($ctn || $('body')).append($upFileCtn);  
	            
	                //取消上传    
	                $upFileAbort.on('click', function() {  
	                    xhr.abort();    
	                    $upFileCtn.remove();  
	                    $('.FA_'+ ran).parents('.MN_ask').remove();
	                });  
	                $trigger[0].value = null;//清空文件路径    
	            },    

	            progress: function(e, ran, xhr) { 
	                if (e.lengthComputable) {    
	                    var $upFileInner = $('.'+ ran +' em');    
	      
	                    $upFileInner.width(e.loaded/e.total*100 +'%');  
	                }    
	            },    
	            load: function(e, ran) {    
	                var $upFileCtn = $('.'+ ran).remove();  
	                callback && callback(JSON.parse(e.currentTarget.response), ran);  
	            }    
	        });    
	    }  
	      
	    //上传文件    
	    function uploadFile(options) {    
	        var form = new FormData(),//FormData 对象    
	            ran = ('ran'+ Math.random()).replace(/\./, ''),//唯一标识符   
	            formData = options.data;// 表单数据载体数组
	      
	        formData = options.beforeload(formData);

	        var formLen = false;
	        for(var key in formData) {  
	            var val = formData[key];  
	            if(val instanceof Array) {//hack数组对象  
	                for(var i=0,len=val.length; i<len; i++) {  
	            		if(!(val[i] instanceof Array)) {
	                    	form.append(key, val[i]);//增加表单数据   
	        				formLen = true;
	            		}
	                }  
	            }
	        }
	        if(formLen) {// 符合文件类型
	        	//创建 - 非IE6 - 第一步    
	        	if (window.XMLHttpRequest) {    
	        	    var xhr = new XMLHttpRequest();    
	        	} else { //IE6及其以下版本浏览器    
	        	    var xhr = new ActiveXObject('Microsoft.XMLHTTP');    
	        	}    
	        	
	        	xhr.open("post", options.url, true);    
	        	
	        	//开始传输    
	        	xhr.addEventListener("loadstart", function(e) {  
	        	    options.loadstart(e, ran, xhr);//xhr用于取消上传    
	        	});    
	        	//传输中    
	        	xhr.upload.addEventListener("progress", function(e) {    
	        	    options.progress(e, ran, xhr);    
	        	});    
	        	//传输成功    
	        	xhr.addEventListener("load", function(e) {    
	        	    options.load(e, ran);    
	        	});    
	        	
	        	xhr.send(form);
	        }
	    }
    //})(MN, window, document);
    /**************************** END ****************************/

    /**************************** BEGIN ****************************/
    /**
    * jquery.faqrobot.js plugin 1.2.0
    *
    * Copyright (c) 2016/3/20 Han Wenbo
    *
    *   %aId% <=> aId -> 答案编号
    *   %cluid% <=> cluid -> 上下文编号
    *   %kfPic% <=> this.robot.kfPic -> 客服图片
    *   %khPic% <=> this.robot.khPic -> 客户图片
    *   %robotName% <=> this.robot.robotName -> 机器人姓名
    *   %helloWord% <=> data.webConfig.helloWord -> 欢迎语
    *   %formatDate% <=> this.getFormatDate() -> 格式时间
    *   %ansCon% <=> data.robotAnswer[0].ansCon -> 机器人答案
    *   %gusListHtml% <=> gusListHtml -> 推荐问题结构
    *   %relateListHtml% <=> relateListHtml -> 相关问题结构
    *   %commentHtml% <=> commentHtml -> 问题满意结构 
    *
    **/

    ;(function($, window, document, undefined) {
        
        var plugName = "faqrobot",
            defaults = {
    			isEn:false,//是否是英文版界面，页面提示信息都要换成英文
    			interface:'servlet/AQ',//网页端和H5页面调用的接口不同。分别为AQ和AppChat
				sysNum: 1000000,//客户唯一标识
                jid: 0,//自定义客服客户图标
    			robotName: 'FaqRobot',//机器人名称
    			logoUrl: '',//logo地址
    			logoId: 'logoId',//logo地址
    			webNameId: 'webNameId',//公司名称Id
    			intelTitleChange: false,// 智能聊天是否修改标题
    			intelTitle: '智能机器人',// 智能聊天时的标题
    			artiTitleChange: false,// 人工时是否修改标题
    			artiTitle: '人工客服',// 人工时的标题
        		titleInsteadId: 'title',// 代替标题Id
    			webName: '云问科技',//公司名称
    			webInfoId: 'webInfoId',//公司简介Id
    			webInfo: '唯一的不同是处处不同',//公司简介
                userInfoId: 'userInfoId',//用户信息Id
                robotInfo:'robotInfo',//机器人说明设置
                kfPic: '',  //客服图标
                khPic: '', //客户图标
                kfHtml: [
					// '<div class="chat-item">'+
					// 	'<div class="chI-time"><span>%formatDate%</span></div>'+
					// 	'<div class="chIndex-context">'+
					// 		'<div class="head-logo"><img src="%kfPic%"/></div>'+
					// 		'<div class="">'+
					// 			'<div class="item-name">%robotName%</div>'+
					// 			'<div class="item-context">%helloWord%</div>'+
					// 		'</div>'+
					// 	'</div>'+
					// '</div>',
                    '<div class="MN_answer_welcome MN_answer"><div class="MN_kftime">%formatDate%</div><div class="MN_kfName">%robotName%</div><div class="MN_kfCtn"><img class="MN_kfImg" src="%kfPic%"><i class="MN_kfTriangle1 MN_triangle"></i><i class="MN_kfTriangle2 MN_triangle"></i>%helloWord%</div></div>',//欢迎语组合
                    '<div class="MN_helpful"><span class="MN_reasonSend">提交</span><span class="MN_yes">满意</span><span class="MN_no">不满意</span></div>',//是否满意组合
                    '<div class="MN_answer" aId="%aId%" cluid="%cluid%"><div class="MN_kftime">%formatDate%</div><div class="MN_kfName">%robotName%</div><div class="MN_kfCtn"><img class="MN_kfImg" src="%kfPic%"><i class="MN_kfTriangle1 MN_triangle"></i><i class="MN_kfTriangle2 MN_triangle"></i>%ansCon%%gusListHtml%%relateListHtml%%commentHtml%</div></div>'//回答组合
                ],//客服结构(所有的属性和%xxx%都必须存在)
				khHtml: 
				// '<div class="chat-item chat-My">'+
				// 	'<div class="chI-time"><span>%formatDate%</span></div>'+
				// 	'<div class="My-context">'+
				// 		'<div class="head-logo"><img src="%khPic%"/></div>'+
				// 		'<div>'+
				// 			'<div class="item-name">我</div>'+
				// 			'<div class="item-context">%askWord%</div>'+
				// 		'</div>'+
				// 	'</div>'+
				// '</div>',
				'<div class="MN_ask"><div class="MN_khtime">%formatDate%</div><div class="MN_khName">我</div><div class="MN_khCtn"><img class="MN_khImg" src="%khPic%"><i class="MN_khTriangle1 MN_triangle"></i><i class="MN_khTriangle2 MN_triangle"></i>%askWord%</div></div>',//客户结构
                formatDate: '%hour%:%minute%:%second% %year%-%month%-%date%',//配置时间格式(默认10:42:52 2016-06-24)
                topQueId: 'topQueId',//热门、常见问题Id
                newQueId: 'newQueId',//新增问题Id
                recommendQueId: 'recommendQueId',//推荐问题Id
				thirdUrlId:'recommendUrlId',//推荐链接Id
				thirdUrlCallBack:function(data,index){
				},//推荐链接的回调
                quickServId: 'quickServId',//快捷服务Id
                recommendLinkId: 'recommendLinkId',//推荐咨询Id
                maxQueNum: 100,//最多展示问题条数
                maxQueLen: 100,//最多展示问题字数
    			showMsgId: 'showMsgId',//展示信息Id
    			chatCtnId: 'chatCtnId',//聊天展示Id
    			inputCtnId: 'inputCtnId',//输入框Id
    			sendBtnId: 'sendBtnId',//发送按钮Id
                tipWordId: 'tipWordId',//输入框提示语Id
                tipWord: "你可以尝试输入类似'美信登陆不成功'、'mip显示异常' 等问题。",//输入框提示语
                remainWordId: 'remainWordId',
                remainWordNum: '100',
                commentFormId: 'commentFormId',//评论框formId
                commentInputCtnId: 'commentInputCtnId',//评论输入框Id
                commentSendBtnId: 'commentSendBtnId',//评论发送按钮Id
                commentTipWordId: 'commentTipWordId',//评论输入框提示语Id
                commentTipWord: '留下您的联系方式+反馈建议，以便我们提升服务水平和质量！',//评论输入框提示语
                statisSendBtnId:'statisSendBtnId',//满意度评价提交Id
        		artiSearchId: 'artiSearch',//智能搜索
            	artiSearchCallback: function(data) {},//智能搜索的回调
                leaveMsgFormId: 'leaveMsgFormId',//留言框formId
                leaveMsgInputCtnId: 'leaveMsgInputCtnId',//留言输入框Id
                leaveMsgSendBtnId: 'leaveMsgSendBtnId',//留言发送按钮Id
                leaveMsgTipWordId: 'leaveMsgTipWordId',//留言输入框提示语Id
                leaveMsgTipWord: '输入您的建议，我们会尽快为您处理！',//留言输入框提示语
                cosFontId: 'cosFontId',//选择字体Id(待完善)
                clearBtnId: 'clearBtnId',//清除按钮Id
                closeBtnId: 'closeBtnId',//关闭聊天页面
                poweredCtnId: 'poweredCtnId',//技术支持Id
                thirdUrl: '',//未登录第三方账户，跳转至此链接
    			sourceId: 0,//客户来源
    			ajaxType: 'get',//请求类型
    			jsonp: false,//是否跨域
            	prefix: '../../',//地址前缀(可能是绝对路径)
            	jPlayer: 'false',//是否使用高级媒体播放器
            	entranceWords: ['wd', 'q'],// 各搜索引擎的关键字段 百度-wd，360、360极速、chrome-q
            	leaveQue: {// 未知问题已回复
            		open: false//是否启用功能

            	},
            	autoSkip: {//手机不能访问pc页面
            		open: false,//是否启用功能
            		chatUrl: 'h5chat'// 默认跳转的页面
            	},
            	upFileModule: {//上传文件模块
            		open: false,//是否启用功能
            		maxNum: 1,//最大上传数量，0为不限制
            		triggerId: 'triggerId',//触发上传按钮
            		startcall: function() {},//上传文件前的回调
            		callback: function() {}//上传文件后的回调
            	},
            	faceModule: {//表情模块
    				open: true,//是否启用功能
    				faceObj: {}//表情插件实例
            	},
            	starModule: {//星座模块
    				open: false,//是否启用功能
            		triggerId: 'triggerId'//触发星座按钮
            	},
            	weatherModule: {//天气模块
    				open: false,//是否启用功能
            		triggerId: 'triggerId'//触发天气按钮
            	},
            	helpfulModule: {//答案满意度模块
            	    open: true,//是否启用功能
            	    yesCallback: function($obj, msg) {//满意的回调
                		$obj.text(msg || '感谢您的评价！');
            	    },
            	    noCallback: function($obj, msg) {//不满意的回调
            	    	if(window.uselessReasonItems) {
            	    	    if(window.uselessReasonItems[0]) {
            	    	        $('.MN_reasonSend', $obj).css('display', 'inline-block').siblings().hide();

            	    	        var html = '';
            	    	        for(var i=0; i<window.uselessReasonItems.length; i++) {
            	    	            var checked = '';
            	    	            if(!i) {
            	    	                checked = 'checked';
            	    	            }
            	    	            html += '<div class="MN_reasonItem"><input id="MN_reason'+ i +'" type="radio" value="'+ window.uselessReasonItems[i].tId +'" name="reasonType" '+ checked +'><label for="MN_reason'+ i +'">'+ window.uselessReasonItems[i].reason +'</label></div>';
            	    	        }
            	    	        $obj.before('<form class="MN_reasonForm"><div class="MN_reasonCtn"><p class="MN_reasonTitle">非常抱歉没能解决您的问题，请反馈未解决原因，我们会根据您的反馈进行优化与完善！</p>'+ html +'<div class="MN_reasonContent"><textarea name="content" placeholder="您的意见"></textarea></div></div></form>');
            	    	    }else {
            	    	        $obj.text(msg || '感谢您的评价！');
            	    	    }
            	    	}else {
            	    	    $obj.text(msg || '感谢您的评价！');
            	    	}
            	    }
            	},
            	configModule: {//配置模块
            	    open: false,//是否启用功能
            	    block1: '.block1',//块1-头部
            	    block2: '.block2',//块2-聊天显示框
            	    block3: '.block3',//块3-输入框
            	    block4: '.block4',//块4-功能框
            	    bannerCtn: '.bannerCtn',//导航元素
            	    customCtn: '.customCtn'//自定义元素
            	},
            	historyModule: {//历史记录模块
            	    open: true//是否启用功能
            	},
            	autoOffline: true,//是否会自动下线
            	autoOnline: true,//是否会自动上线
        		noView: ['.MN_kfImg', '.MN_khImg', '.FA_upFileNoImg', '.msg-item-wrapper img', '.wflink img', '.wflin img'],//图片放大预览 all/全不能预览 或者 指定不能预览的class['.MN_kfImg', '.MN_khImg', '.FA_upFileNoImg']
            	initCallback: function(data) {//初始化基本信息的回调
            		window.uselessReasonItems = data.uselessReasonItems;
            	},
            	sendCallback: function(question) {},//点击发送按钮的回调
            	getCallback: function(answer, data) {},//获取到答案后的回调 answer-文本答案 data-全部数据
            	commentCallback: function() {},//评论后的回调
            	leaveMsgCallback: function() {}//留言后的回调
            };

        window.Faqrobot = Faqrobot;
		var timer=null;
        function Faqrobot(options) {
            this.name = plugName;
            this.defaults = defaults;
            this._options = options;
            this.options = $.extend({}, defaults, options);
            this.robot = {};//机器人基本信息
            this.$obj = {};//元素集合
            this.isOffline = false;//当前是否下线
            this.init();
        }

        Faqrobot.prototype = {
            init: function() {
                this.getHrefInfo();//获取网址->网址有jid或sysNum，则相应配置参数失效
                this.initOffline();//关闭、刷新网页前请求下线->s=offline
                if(!this.options.jsonp) {//不跨域
                	this.initBaseInfo();//初始化基本信息->s=p->logo
                }
                this.initInput();//输入框准备->剩余字数/提示语
                this.needPerson();//转人工->s=needperson
                this.askFlwQue();//回答引导问题->s=aq
                this.askGuideQue();//回答引导问题->s=aq
                if(this.options.upFileModule.open) {
                	this.upFile();//上传文件->s=uf
                }
                this.queComment();//问题满意度评价->s=addulc
                this.initComment();//服务满意评价度准备->提示语
                this.initLeaveMsg();//留言准备->提示语
                this.timeRequest();//定时请求->s=kl
                this.scrollbarFn();//调用滚动条插件
                this.clearRecord();//清除聊天记录
                this.closeWeb();//关闭网页
                if(this.options.starModule.open) {
                	this.star();//星座模块
                }
                if(this.options.weatherModule.open) {
                	this.weather();//天气模块
                }
                //this.statisPin();
                //this.muiItem();
                this.preview();
               /* if(!MN_Base.isPC()) {// 手机端可以复制
                	this.longTap();
            	}*/
				//调整功能宽度(防止某些功能隐藏)
				this.kuaijie();
            },
			//计算h5下面的快捷服务
			kuaijie:function(){
				var showNum = 0;
				for(var i=0,len=$('.editCtn_com').length; i<len; i++) {
					if($('.editCtn_com').eq(i).css('display') != 'none') {
						showNum++;
					}
				}
				$('.editCtn_com').width(100/showNum +'%');
			},
            // 配置窗口
            configWin: function(data) {
            	if(data.chatLink) {// 存在jid
            		if(data.chatLink.chatConfig) {// 选择配置窗口
            			if(data.chatLink.chatConfig.id) {// 不使用默认皮肤
            				this.bgColor(data);// 展示背景颜色
            				this.listBanner(data);// 导航链接
            				this.listChannel(data);// 自定义频道
            			}
            		}
            	}
            },
            // 展示城市和天气
            showPlay: function(data) {
            	var html = '';
            	if(!data.chatLink.chatConfig.showCity) {// 0-显示
            		html += '<span class="intro">南京市</span>';
            	}
            	if(!data.chatLink.chatConfig.showWeather) {// 0-显示
            		html += '<span class="intro">今天天气很好！</span>';
            	}
            	return html;
            },
            // 展示背景颜色
            bgColor: function(data) {
            	if(data.chatLink.chatConfig) {
            		if(data.chatLink.chatConfig.bgColor) {
            			var bgColor = JSON.parse(data.chatLink.chatConfig.bgColor);
		            	if(bgColor) {
		            		for(var i=0; i<4; i++) {
			            		if(bgColor[i]) {
			            			for(var j=0; j<JSON.parse(bgColor[i])[1].length; j++) {
			            				$(this.options.configModule['block'+ (i+1)]).css('background', JSON.parse(bgColor[i])[1][j]);
			            			}
			            		}
		            		}
		            	}
            		}
            	}
            },
            // 导航链接
            listBanner: function(data) {
            	var html = '';
            	if(data.chatLink.chatConfig.listBanner) {
            		if(data.chatLink.chatConfig.listBanner[0]) {
            			for(var i=0; i<data.chatLink.chatConfig.listBanner.length; i++) {
            				html += '<a class="MN_bannerCtn" href="'+ data.chatLink.chatConfig.listBanner[i].link +'" target="_blank">'+ (data.chatLink.chatConfig.listBanner[i].pic?'<img class="MN_bannerImg" src="'+ data.chatLink.chatConfig.listBanner[i].pic +'">':'') +'<p class="MN_bannerDesc" '+ (data.chatLink.chatConfig.listBanner[i].pic?'':'style="width: 60px; height: 78px; line-height: 78px;"') +'>'+ data.chatLink.chatConfig.listBanner[i].text +'</p></a>';
            			}
            		}
            	}
            	$(this.options.configModule.bannerCtn).empty().append(html);
            },
            // 自定义频道
            listChannel: function(data) {
            	var html = '';
            	if(data.chatLink.chatConfig.listChannel) {
            		if(data.chatLink.chatConfig.listChannel[0]) {
            			if(data.chatLink.chatConfig.channelShowType) {// 1-纵向
            				var _html = '';
            				for(var i=0; i<data.chatLink.chatConfig.listChannel.length; i++) {
            					_html += '<div class="itemHead1 itemHead"><p>'+ data.chatLink.chatConfig.listChannel[i].channelName +'</p></div>';
            					if(data.chatLink.chatConfig.listChannel[i].contentShowType) {// 1-纵向
            						var __html = '';
            						if(data.chatLink.chatConfig.listChannel[i].values[0]) {
            							for(var j=0; j<data.chatLink.chatConfig.listChannel[i].values.length; j++) {
            								if(data.chatLink.chatConfig.listChannel[i].values[j].valueType==3) {// 富文本
												__html += '<div class="" style="padding: 15px 20px;">'+ data.chatLink.chatConfig.listChannel[i].values[j].text +'</div>';
            								}else {
												__html += '<div class="MN_queList">'+ (data.chatLink.chatConfig.listChannel[i].values[j].pic?'<img class="MN_queListImg" src="'+ data.chatLink.chatConfig.listChannel[i].values[j].pic +'" style="margin-right: 10px;">':'<span class="MN_queListIndex">'+ (j+1) +' </span>') +'<span class="MN_guideQue" sid="0" title="'+ data.chatLink.chatConfig.listChannel[i].values[j].text +'">'+ data.chatLink.chatConfig.listChannel[i].values[j].text +'</span></div>';
											}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              					       		}
            						}
            						_html += '<div class="itemCtx">'+ __html +'</div>';
            					}else {// 0-横向
            						var __html = '';
            						if(data.chatLink.chatConfig.listChannel[i].values[0]) {
            							for(var j=0; j<data.chatLink.chatConfig.listChannel[i].values.length; j++) {
											__html += '<div class="MN_quickLink MN_queList" style="padding: 0;">'+ (data.chatLink.chatConfig.listChannel[i].values[j].pic?'<img class="MN_queListImg" src="'+ data.chatLink.chatConfig.listChannel[i].values[j].pic +'">':'') +'<p class="MN_guideQue" title="'+ data.chatLink.chatConfig.listChannel[i].values[j].text +'">'+ data.chatLink.chatConfig.listChannel[i].values[j].text +'</p></div>';
            							}
            						}
            						_html += '<div class="itemCtx">'+ __html +'</div>';
            					}
            				}
            			}else {// 0-横向
            				var _html = '',
            					html_ = '';
            				for(var i=0; i<data.chatLink.chatConfig.listChannel.length; i++) {
            					_html += '<div class="itemHead1 itemHead" ran="'+ i +'" style="width: '+ 100/data.chatLink.chatConfig.listChannel.length +'%; float: left; cursor: pointer;"><p>'+ data.chatLink.chatConfig.listChannel[i].channelName +'</p></div>';

            					if(data.chatLink.chatConfig.listChannel[i].contentShowType) {// 1-纵向
            						var __html = '';
            						if(data.chatLink.chatConfig.listChannel[i].values[0]) {
            							for(var j=0; j<data.chatLink.chatConfig.listChannel[i].values.length; j++) {
            								if(data.chatLink.chatConfig.listChannel[i].values[j].valueType==3) {// 富文本
												__html += '<div class="" style="padding: 15px 20px;">'+ data.chatLink.chatConfig.listChannel[i].values[j].text +'</div>';
            								}else {
												__html += '<div class="MN_queList">'+ (data.chatLink.chatConfig.listChannel[i].values[j].pic?'<img class="MN_queListImg" src="'+ data.chatLink.chatConfig.listChannel[i].values[j].pic +'" style="margin-right: 10px;">':'<span class="MN_queListIndex">'+ (j+1) +' </span>') +'<span class="MN_guideQue" sid="0" title="'+ data.chatLink.chatConfig.listChannel[i].values[j].text +'">'+ data.chatLink.chatConfig.listChannel[i].values[j].text +'</span></div>';
            								}

            							}
            						}
            						html_ += '<div class="itemCtx" ran="'+ i +'" '+ (i&&'style="display: none;"') +'>'+ __html +'</div>';
            					}else {// 0-横向
            						var __html = '';
            						if(data.chatLink.chatConfig.listChannel[i].values[0]) {
            							for(var j=0; j<data.chatLink.chatConfig.listChannel[i].values.length; j++) {
											__html += '<div class="MN_quickLink MN_queList" style="padding: 0;">'+ (data.chatLink.chatConfig.listChannel[i].values[j].pic?'<img class="MN_queListImg" src="'+ data.chatLink.chatConfig.listChannel[i].values[j].pic +'">':'') +'<p class="MN_guideQue" title="'+ data.chatLink.chatConfig.listChannel[i].values[j].text +'">'+ data.chatLink.chatConfig.listChannel[i].values[j].text +'</p></div>';
            							}
            						}
            						html_ += '<div class="itemCtx" ran="'+ i +'" '+ (i&&'style="display: none;"') +'>'+ __html +'</div>';
            					}
            				}
            				$('body').on('click', '.itemHead', function() {
            					$('.itemCtx[ran='+ $(this).attr('ran') +']').show().siblings('.itemCtx').hide();
            				});
            			}
            		}
            	}
            	$(this.options.configModule.customCtn).empty().append((_html || '') + (html_ || ''));
            },
            //获取网址->网址有jid或sysNum，则相应配置参数失效
            getHrefInfo: function() {
                var This = this,
                	search = window.location.search,
                    sysNum = search.match(/sysNum=(\d*[a-zA-Z]*[^?|^#|^&]*)/),
                    jid = search.match(/jid=(\d+)/),
                    sourceId = search.match(/sourceId=(\d+)/),
                    element_id = search.match(/element_id=(\d+)/);
                    productId = search.match(/productId=(\d+)/);
                if(sysNum) {
                    This.options.sysNum = sysNum[1];
                }
                if(jid) {
                    This.options.jid = jid[1];
                }
                if(sourceId) {
                    This.options.sourceId = sourceId[1];
                }
                if(element_id) {
                    This.options.element_id = element_id[1];
                }
                if(productId) {
                	This.options.productId = productId[1];
                }
            	//手机不能访问pc页面
            	if(This.options.autoSkip.open) {
            		if(!sourceId && !MN_Base.isPC()) {
            			This.showMsg('3s后将跳转至手机聊天页面', function() {
            				location.href = location.href.replace(/\/[^\.\/]+\.html/, '\/'+ This.options.autoSkip.chatUrl +'\.html');
            			})
            		}
            	}
            },
            //初始化基本信息->s=p->logo/欢迎语/快捷服务/热门问题/用户信息
            initBaseInfo: function() {
            	var This = this;
            	$('#'+ This.options.inputCtnId).attr('readonly', 'readonly');
            	This.request({
            		params: {
                        s: 'p',
                        jid: This.options.jid,
            			sourceId: This.options.sourceId,//0->网页 1->微信 3->h5
            			productNo: This.options.productId
            		},
            		callback: function(data) {
            			if(window.location.search.match(/lan=[a-zA-Z]{2}/)=='lan=en'){
            				This.options.isEn=true;
            			}else{
            				This.options.isEn=false;
            			}
                		This.timerGo = true;//控制定时请求
            			This.options.initCallback(data);
            			$('#'+ This.options.inputCtnId).removeAttr('readonly');
            			This.setLogo(data);//设置logo->客服图标/客户图标
            			This.sayHello(data);//欢迎语
                        This.quickService(data);//快捷服务
                        This.recommendLink(data);//推荐资讯
                        This.topQue(data);//热门、常见问题
						This.welcomeQue(data);//欢迎语下面的热点问题
						This.welcomeguideQue(data);
                        This.newQue(data);//新增问题
                        This.userInfo(data);//用户信息
                        This.poweredBy(data);//技术支持
                        This.advInfo(data);//广告信息
                        if(This.options.configModule.open) {
                			This.configWin(data);// 配置窗口
                        }
                        if(This.options.leaveQue.open) {
                			This.leaveQue(data);// 未知问题已回复
                        }
                        if(This.options.historyModule.open) {
                			This.historyRecord();// 历史记录
                			This.recordEvent();// 历史记录
                        }
                        if(data.webConfig.robotNameDetail){
                        	//机器人说明默认会有一个ID 配置
                        	//为了防止开发此功能之前已部署的客户没有这项功能
                        	//此处设置成有配置项优先设置配置项的内容，没有就写固定的
                        	if($('#'+ This.options.robotInfo).length>0){
                        		$('#'+ This.options.robotInfo).html(data.webConfig.robotNameDetail);
                        	}else{
                        		$('.headLeft .intro').html(data.webConfig.robotNameDetail);
                        	}
                        }
            		}
            	});
            },
            // 未知问题已回复
            leaveQue: function(data) {
            	if(data.leaveQue) {
            		if(data.leaveQue[0]) {
            			$('.MN_answer_welcome .MN_kfCtn').append('<div class="MN_leaveQueCtn"><div class="MN_leaveQueTop"><span>这里有您的留言，</span><span class="MN_lookLeaveQue">点击查看</span></div><div class="MN_leaveQueBottom"></div></div>')

            			var html = '';
            			for(var i=0; i<data.leaveQue.length; i++) {
            				html += '<div class="MN_leaveQueItem"><div class="MN_leaveQueItemQue">问题'+ (data.leaveQue.length==1?'':i+1) +'：'+ data.leaveQue[i].question +'</div><div class="MN_leaveQueItemAns">答案：'+ data.leaveQue[i].answer +'</div></div>';
            			}
            			$('.MN_leaveQueBottom').append(html).hide();
            		}
            	}

    	    	var This = this;
    	    	$('#'+ This.options.chatCtnId).on('click.FA', '.MN_lookLeaveQue', function() {
    	    		if($(this).text().indexOf('查看')+1) {
    	    			$('.MN_leaveQueBottom').show();
    	    			$(this).text('点击关闭');
    	    		}else {
    	    			$('.MN_leaveQueBottom').hide();
    	    			$(this).text('点击查看');
    	    		}
    	    	});
            },
            // 历史记录
            historyRecord: function() {
            	var This = this;
            	This.recordIndex = This.recordIndex ? ++This.recordIndex : 1;

        		This.request({
        			params: {
        	            s: 'hl',
        	            index: This.recordIndex
        			},
        			callback: function(data) {
        	    		if(data.status) {
        	    		}else {
        	    			if(data.list) {
        	    				if(data.list[0]) {
        	    					var html = '',
        	    						recordData = '';
        	    					This.scrollbar.options.autoBottom = false;// 防止自动滚动到底部
        	    					$('.MN_record').remove();// 防抖动
        	    					if(This.options.isEn){
        	    						$('#'+ This.options.chatCtnId).prepend('<div class="MN_record">View more</div>');
        	    					}else{
        	    						$('#'+ This.options.chatCtnId).prepend('<div class="MN_record">查看更多消息</div>');
        	    					}
        	    					for(var i=data.list.length-1; i>=0; i--) {
        	    						var _data = JSON.parse('{"robotAnswer":[{"ansCon":"'+ (data.list[i].reply || '').replace(/"/g, '\'').replace(/\n+/g, '').replace(/[\r\n]/g,'') +'", "time": "'+ data.list[i].dateTime +'"}]}');

        	    						recordData += (data.list[i].question?This.customHtml(This.replaceFace(data.list[i].question), data.list[i].dateTime):'') + ((data.list[i].reply || '')?This.robotHtml(_data):'');
        	    					}
        	    					$('.MN_record').data('recordData', recordData.replace(/"/g, '\'').replace(/\n+/g, '').replace(/(href=)(['"])([\S]+)(['""])(\s)/g, '$1'+ '\"' +'$3'+ '\"' +'$5'));// 防止字符串里含有带引号的链接
        	    				}else {
        	    					This.scrollbar.options.autoBottom = false;// 防止自动滚动到底部
        	    					$('.MN_record').remove();// 防抖动
        	    				}
        	    			}else {
        	    				This.scrollbar.options.autoBottom = false;// 防止自动滚动到底部
        	    				$('.MN_record').remove();// 防抖动
        	    			}
        	    		}
        			}
        		});
            },
            // 查看历史记录
            recordEvent: function() {
            	var This = this;
            	$('#'+ This.options.chatCtnId).on('click.FA', '.MN_record', function() {
            		This.historyRecord();
            		var oldH = This.$obj.$chatCtnId.outerHeight();
        	    	This.$obj.$chatCtnId.prepend($(this).data('recordData'));
            		var newH = This.$obj.$chatCtnId.outerHeight();
            		This.scrollbar.scrollTo(newH-oldH, true);// css 方式滚动
            	});
            },
            //设置logo->客服图标/客户图标
            setLogo: function(data) {
            	var $logoId = this.$obj.$logoId = $('#'+ this.options.logoId),
            		$webNameId = this.$obj.$webNameId = $('#'+ this.options.webNameId),
            		$webInfoId = this.$obj.$webInfoId = $('#'+ this.options.webInfoId);

                this.robot.kfPic = data.skinConfig ? data.skinConfig.kfPic : this.options.kfPic,//客服图标
                this.robot.khPic = data.skinConfig ? data.skinConfig.khPic : this.options.khPic;//客户图标
            	$logoId.attr({'src': data.webConfig.logoUrl || this.options.prefix+this.options.logoUrl});
        		$webNameId.text(data.webConfig.webName || this.options.webName);
        		$webInfoId.text(MN_Base.addDots($.trim(MN_Base.getPlainText(data.webConfig.info || this.options.webInfo)), 20));	
        		this.intelTitle = data.webConfig.webName || this.options.webName;// 智能标题
        		this.artiTitle = this.options.artiTitle;// 人工标题

        		if(this.options.intelTitleChange) {// 是否修改标题
        			this.titleChange(this.intelTitle);
        		}
            },
            // 改变标题
            titleChange: function(title) {
            	document.title = title;
            	if(!this.options.jsonp) {// 非跨域
            		if($('#'+ this.options.titleInsteadId)[0]) {
            			$('#'+ this.options.titleInsteadId).text(title);
            		}
            	}
            	if(!MN_Base.isPC()) {
	            	//hack在微信等webview中无法修改document.title的情况
	            	var $iframe = $('<iframe src="'+ (this.options.prefix+this.options.logoUrl) +'"></iframe>').hide();
	            	$iframe.on('load',function() {
	            	    setTimeout(function() {
	            	        $iframe.off('load').remove();
	            	    }, 0);
	            	}).appendTo('body');
            	}
            },
            //欢迎语
            sayHello: function(data) {
                this.$obj.$chatCtnId.empty().append(this.robotHtml(data));
            },
            scrollbarUpdate: function() {
            	this.scrollbar.scrollTo('bottom');
            },
            //机器人结构
            robotHtml: function(data, index, hotQue) {//hotQue代表欢迎语下面的热点问题
            	 index = index || 0;//默认渲染机器人的第一句话
				 var html = '',
                    baseRobotHtml = '',
                    gusListHtml = '',
                    relateListHtml = '',
                    commentHtml = '',
                    aId = data.robotAnswer&&data.robotAnswer[index] ? data.robotAnswer[index].aId : 0,//
                    cluid = data.robotAnswer&&data.robotAnswer[index] ? data.robotAnswer[index].cluid : 0;//查询问题上下文
				if(hotQue){
					var topAskHtml='';
					if(data.guideQuestions && data.guideQuestions.length>0){
						topAskHtml+='<div class="guessYOu">'
						for(var i=0; i< data.guideQuestions.length; i++) {
							if(i==0){
								 if(this.options.isEn){
								 	topAskHtml+='<div>【I guess you want to ask 】</div>';
								 }else{
								 	topAskHtml+='<div>【我猜您想问】</div>';
								 }
							}
							topAskHtml += '<div class="MN_gusList"><span>'+ (i+1) +'. </span><span class="MN_guideQue" sId="'+ data.guideQuestions[i].solutionId +'" title="'+ (data.guideQuestions[i].question || '')+'">'+ (data.guideQuestions[i].question || '')+'</span></div>';
    	                }
						topAskHtml+='</div>';
						html = this.options.kfHtml[2].replace(/%kfPic%/g, this.robot.kfPic).replace(/%robotName%/g, this.robot.robotName).replace(/%ansCon%/g, this.replaceFace(topAskHtml)).replace(/%formatDate%/g, this.getFormatDate()).replace(/%gusListHtml%/g, gusListHtml).replace(/%relateListHtml%/g, relateListHtml).replace(/%commentHtml%/g, commentHtml).replace(/%aId%/g, aId).replace(/%cluid%/g, cluid);;
					}
					return html;
				}
                //机器人整体结构
                if(data.webConfig) {//欢迎语结构
                    this.robot.robotName = data.webConfig.robotName;//机器人名字
                    //%%
                    var helloWord = data.helloWord || data.webConfig.helloWord;
                    if(data.chatLink) {
                    	if(data.chatLink.helloWord) {
                    		helloWord = data.chatLink.helloWord;
                    	}
                    }
                    html = this.options.kfHtml[0].replace(/%aId%/g, aId).replace(/%cluid%/g, cluid).replace(/%kfPic%/g, this.robot.kfPic).replace(/%robotName%/g, this.robot.robotName).replace(/%helloWord%/g, helloWord).replace(/%formatDate%/g, this.getFormatDate());
                }else if(data.robotAnswer && data.robotAnswer.length>0) {//机器人答案
                	
					if(data.robotAnswer[index]) {
                		this.artiSearch(data.robotAnswer[index]);//智能搜索
	                    //智能推荐相关问题结构->.MN_guideQue必须存在，搜索#.MN_guideQue查看原因
	                    var has_ydWords = false;//是否已有上提示
	                    if(data.robotAnswer[index].gusList) {
    	                    if(!data.robotAnswer[index].relateList[0] && data.robotAnswer[index].gusList[0]) {
	                    		this.robot.guide = true;
    	                        var gusList = data.robotAnswer[index].gusList;
    	                        if(gusList.length>0){
    	                        	if(this.options.isEn){
    	                        		gusListHtml= data.robotAnswer[index].gusWords?(data.robotAnswer[index].gusWords.ydWords||'<p>Would you like to ask the following questions? </p>'):'<p>Would you like to ask the following questions? </p>';
    	                        	}else{
										gusListHtml= data.robotAnswer[index].gusWords?(data.robotAnswer[index].gusWords.ydWords||'<p>您是否要咨询以下问题？</p>'):'<p>您是否要咨询以下问题？</p>';
    	                        	}
    								
    	                        	has_ydWords = true;
    							}
    							for(var i=0; i<gusList.length; i++) {
									gusListHtml += '<div class="MN_gusList"><span>'+ (i+1) +'. </span><span class="MN_guideQue" sId="'+ gusList[i].solutionId +'" title="'+ (gusList[i].seedQuestion || gusList[i]).question +'">'+ (gusList[i].seedQuestion || gusList[i]).question +'</span></div>';
    	                        }
    	                    }
	                    }

	                    var gusWords = '';

	                    //智能推荐相关问题的上下提示
	                    if(data.robotAnswer[index].gusWords) {
		                    if(!data.robotAnswer[index].relateList[0] && data.robotAnswer[index].gusWords) {
		                        var ydWords = '';
		                        gusWords = data.robotAnswer[index].gusWords;

		                        if(!has_ydWords) {
		                        	if(this.options.isEn){
		                        		ydWords = '<p>'+ (gusWords.ydWords || 'Would you like to ask the following questions?') +'</p>';
		                        	}else{
		                        		ydWords = '<p>'+ (gusWords.ydWords || '您是否要咨询以下问题？') +'</p>';
		                        	}
		                        	
		                        }
		                        gusListHtml = ydWords +'<p>'+ gusListHtml+'</p>' +'<p>'+ (gusWords.afterWords || '') +'</p>';
		                    }
	                	}

	                    //手动设置相关问题结构->.MN_guideQue必须存在，搜索#.MN_guideQue查看原因
	                    if(data.robotAnswer[index].relateList) {
	                    	if(data.robotAnswer[index].relateList[0]) {
	                    		this.robot.guide = true;
	                    	    var relateList = data.robotAnswer[index].relateList,
	                    	    	ydWords = '',
	                    	    	relateListStartSelectIndex=data.robotAnswer[index].relateListStartSelectIndex;

	                    	    if(!has_ydWords) {
	                    	    	if(this.options.isEn){
	                    	    		ydWords = '<p>'+ (gusWords.ydWords || 'Would you like to ask the following questions?') +'</p>';
	                    	    	}else{
	                    	    		ydWords = '<p>'+ (gusWords.ydWords || '您是否要咨询以下问题？') +'</p>';
	                    	    	}
	                    	    	
	                    	    }
	                    	    for(var i=0; i<relateList.length; i++) {
	                    	    	if(relateListStartSelectIndex){
	                    	    		relateListHtml += '<div class="MN_relateList"><span>'+(relateListStartSelectIndex)+'. </span><span class="MN_guideQue" sId="'+ relateList[i].solutionId +'" title="'+ relateList[i].question +'">'+ relateList[i].question +'</span></div>';
	                    	    	}else{
	                    	    		relateListHtml += '<div class="MN_relateList"><span>'+ (i+1) +'. </span><span class="MN_guideQue" sId="'+ relateList[i].solutionId +'" title="'+ relateList[i].question +'">'+ relateList[i].question +'</span></div>';
	                    	    	}
	                    	    	relateListStartSelectIndex++;
	                    	       
	                    	    }
		                        relateListHtml = ydWords +'<p>'+ relateListHtml +'</p>'+'<p>'+ (gusWords.afterWords || '') +'</p>';
	                    	}
	                    }
	                    //是否满意结构
	                    if(data.robotAnswer[index].aId>1000) {//aId!=0->需要评价
	                        //%%
	                        commentHtml = this.options.kfHtml[1];
	                    }

	                    var ansCon = data.robotAnswer[index].ansCon;



	                    if(data.robotAnswer[index].msgType=='voice'){
	                    	//语音答案
	                    	ansCon='<p>若无法播放，请点击<a href="'+data.robotAnswer[index].ansCon+'" target="_blank">下载</a></p><br/>';
	                    	ansCon+='<audio src="'+data.robotAnswer[index].ansCon+'" controls="controls">您的浏览器不支持 audio 标签。</audio>';
	                    	

	                    }else if(data.robotAnswer[index].msgType=='image'){
	                    	//图片答案
	                    	ansCon='<img src="'+ansCon+'" class="imgBox">';
	                    }else if(data.robotAnswer[index].msgType=='video'){
	                    	//视频答案
	                    	
	                    	ansCon='<p>若无法播放，请点击<a href="'+data.robotAnswer[index].ansCon+'" target="_blank">下载</a></p><br/>'
	                    	ansCon+='<video src="'+data.robotAnswer[index].ansCon+'" controls="controls" style="max-width:100%;">您的浏览器不支持 video 标签。</video>';
	                    }
                    	//%%
                    	html = this.options.kfHtml[2].replace(/%kfPic%/g, this.robot.kfPic).replace(/%robotName%/g, this.robot.robotName).replace(/%ansCon%/g, this.replaceFace(ansCon)).replace(/%formatDate%/g, data.robotAnswer[index].time?this.getFormatDate(data.robotAnswer[index].time):this.getFormatDate()).replace(/%gusListHtml%/g, gusListHtml).replace(/%relateListHtml%/g, relateListHtml).replace(/%commentHtml%/g, commentHtml).replace(/%aId%/g, aId).replace(/%cluid%/g, cluid);
                	}
                }else {//彻底下线
                    if(data.tspan>='2000'){
						this.showMsg(data.message);//请重新刷新访问
					}
                }

                return html;
            },
            //客户结构
            customHtml: function(word, time) {
                var html = '';

                html = this.options.khHtml.replace(/%khPic%/g, this.robot.khPic).replace(/%askWord%/g, word).replace(/%formatDate%/g, time?this.getFormatDate(time):this.getFormatDate());
                return html;
            },
            //快捷服务
            quickService: function(data) {
                if(!this._options.quickServId) {//不配置直接返回
                    return;
                }

                var $quickServId = this.$obj.$quickServId = $('#'+ this.options.quickServId),//快捷服务Id
                    quickLink = data.quickLink,
                    str = '';
                    
                //快捷服务结构
                if(quickLink && quickLink[0]) {
                    for(var i=0; i<quickLink.length; i++) {
                        str += '<a class="MN_quickLink" href="'+ quickLink[i].linkUrl +'" target="_blank"><img src="'+ quickLink[i].imageUrl +'"><p>'+ quickLink[i].name +'</p></a>';
                    }
                    $quickServId.empty().append(str);
                }else{
                	if(!this.options.isEn){
                		$quickServId.empty().append('服务正在建设中~').css({'padding-top':'10px','text-align':'center'});
                	}else{
                		$quickServId.empty().append('The service is under construction ~').css({'padding-top':'10px','text-align':'center'});
                	}
				}
                
            },
            //推荐资讯
            recommendLink: function(data) {
                if(!this._options.recommendLinkId) {//不配置直接返回
                    return;
                }
                var $recommendLinkId = this.$obj.$recommendLinkId = $('#'+ this.options.recommendLinkId),//推荐资讯Id
                    chatFormSugLink = data.chatFormSugLink,
                    str = '';
                    
                //推荐资讯结构
                if(chatFormSugLink[0]) {
                    for(var i=0; i<chatFormSugLink.length; i++) {
                        if(chatFormSugLink[i].type) {//1->图片
                            str += '<a class="MN_imgRecommendLink" href="'+ chatFormSugLink[i].linkurl +'" target="_blank"><img src="'+ chatFormSugLink[i].content +'"></a>';
                        }else {//0->文字
                            str += '<a class="MN_wordRecommendLink" href="'+ chatFormSugLink[i].linkurl +'" target="_blank"><p>'+ chatFormSugLink[i].content +'</p></a>';
                        }
                    }
                    $recommendLinkId.empty().append(str);
                }
            },
            //问题结构->热门、常见/新增/推荐
            queHtml: function(queList,numFlag) {
                var str = '';

                //问题结构->.MN_guideQue必须存在，搜索#.MN_guideQue查看原因
                if(queList[0]) {
                    for(var i=0; i<queList.length; i++) {
                        if(i+1 > this.options.maxQueNum) {//限制条数
                            break;
                        }
                        var question = queList[i].question,
                            maxQueLen = this._options.maxQueLen;

                        if(maxQueLen && maxQueLen<question.length) {//限制字数
                            question = question.substr(0, this.options.maxQueLen) +'...';
                        }
						if(numFlag){
							str += '<div class="MN_queList"><span class="MN_queListIndex">'+ (i+1) +'.</span><span class="MN_guideQue" sId="'+ (queList[i].solutionId+1) +'" title="'+ queList[i].question +'">'+ question +'</span></div>';
						}else{
							str += '<div class="MN_queList"><span class="MN_queListIndex">'+ (i+1) +' </span><span class="MN_guideQue" sId="'+ (queList[i].solutionId+1) +'" title="'+ queList[i].question +'">'+ question +'</span></div>';
						}
                    }
                }else{
					str += '<div style="margin-top:5px; text-align:center;">知识正在建设中，感谢您的光临~</div>';
				}
                return str;
            },
            //删除推送消息开头结尾引号

            //热门、常见问题
            topQue: function(data) {
                if(!this._options.topQueId) {//不配置直接返回
                    return;
                }

                var $topQueId = this.$obj.$topQueId = $('#'+ this.options.topQueId),//热门问题Id
                    topAsk = data.topAsk;

                this.queHtml(topAsk) && $topQueId.empty().append(this.queHtml(topAsk));
            },
            //新增问题
            newQue: function(data) {
                if(!this._options.newQueId) {//不配置直接返回
                    return;
                }
                var $newQueId = this.$obj.$newQueId = $('#'+ this.options.newQueId),//新增问题Id
                    newAdd = data.newAdd;

                this.queHtml(newAdd) && $newQueId.empty().append(this.queHtml(newAdd));
            },
			//欢迎语下面的热点问题
			welcomeQue:function(data){
				if(data.chatlinkGuideQuestions && data.chatlinkGuideQuestions.length>0){
					var welcomeQue=data.chatlinkGuideQuestions;
					this.$obj.$chatCtnId.find('.MN_answer_welcome .MN_kfCtn').append('<strong>您是否想咨询以下问题？</strong>'+this.queHtml(welcomeGuideQue,1));
				}
			},
			//欢迎语下面的引导问题
			welcomeguideQue:function(data){
				if(data.guideQuestions && data.guideQuestions.length>0){
					this.$obj.$chatCtnId.append(this.robotHtml(data,0,true));
				}
			},
            //推荐问题
            recommendQue: function(data, index) {
            	index = index ? index : 0;//默认渲染机器人的第一句话
                if(!this._options.recommendQueId) {//不配置直接返回
                    return;
                }
                var $recommendQueId = this.$obj.$recommendQueId = $('#'+ this.options.recommendQueId),//推荐问题Id
                    relateLessList = data.robotAnswer[index].relateLessList;

                this.queHtml(relateLessList) && $recommendQueId.empty().append(this.queHtml(relateLessList));
            },
			recommendUrl:function(data,index){
				 index = index ? index : 0;
				 if(!this._options.thirdUrlId) {//不配置直接返回
                    return;
                 }
                 this.options.thirdUrlCallBack(data,index);
				 
			},
            //用户信息
            userInfo: function (data) {
                if(!this._options.userInfoId) {//不配置直接返回
                    return;
                }
                var $userInfoId = this.$obj.$userInfoId = $('#'+ this.options.userInfoId),//用户信息Id
                    str = '';
                var info = data.webConfig.info || (data.company?data.company.info:''),//简介
                	webName = data.webConfig.webName || (data.company?data.company.webName:''),//名称
                	serviceQq = data.webConfig.serviceQq || (data.company?data.company.qq:''),//QQ
                	serviceTel = data.webConfig.serviceTel || (data.company?data.company.tel:''),//电话
                	webSite = data.webConfig.webSite || (data.company?data.company.webSite:''),//网址
                	address = (data.company?data.company.address:''),//地址
                	notice = (data.company?data.company.notice:''),//通知
                	openTime = (data.company?data.company.openTime:'');//工作时间
                if(info) {
                    str += '<div class="MN_info MN_userInfo"><span>简介：'+ info +'</span></div>';
                }
                if(webName) {
                    str += '<div class="MN_webName MN_userInfo"><span>名称：'+ webName +'</span></div>';
                }
                if(serviceQq) {
                    str += '<div class="MN_serviceQq MN_userInfo"><span>QQ：'+ serviceQq +'</span></div>';
                }
                if(serviceTel) {
                    str += '<div class="MN_serviceTel MN_userInfo"><span>电话：'+ serviceTel +'</span></div>';
                }
                if(webSite) {
                    str += '<div class="MN_webSite MN_userInfo"><span>网址：'+ webSite +'</span></div>';
                }
                if(address) {
                    str += '<div class="MN_address MN_userInfo"><span>地址：'+ address +'</span></div>';
                }
                if(notice) {
                    str += '<div class="MN_notice MN_userInfo"><span>通知：'+ notice +'</span></div>';
                }
                if(openTime) {
                    str += '<div class="MN_openTime MN_userInfo"><span>工作时间：'+ openTime +'</span></div>';
                }
                $userInfoId.empty().append(str);
            },
            //调用滚动条插件
            scrollbarFn: function() {
            	this.scrollbar = this.$obj.$chatCtnId.parent().scrollbar({
            		// autoBottom: true,//内容改变，是否自动滚动到底部
    				stopCallback: function(top, direction) {//停止时事件回调
    					if(top && direction<0) {
    						$('.MN_record').trigger('click.FA');
    					}
    				}
            	});
			},
			// 获取底部位置
			getBottom: function() {
				var header = 0;
				$('.scrollbar-macosx').scrollbar({
					"onScroll": function(y, x){
						header = y.size;
					}
				});
				return header;
			},
            //发送问题->s=aq
            askQue: function(queParam) {
				var This = this,
                    question =queParam || This.robot._html || This.$obj.$inputCtnId.val().replace(/\n+/g, '');//// 当 This.robot._html不为空时 或者 从Url中传入问题时 ，走模拟问题
                  
				This.scrollbar.options.autoBottom = true;// 恢复自动滚动到底部
                if(question) {//问题不为空
                    This.options.sendCallback(question);//点击发送按钮的回调
                    if(question.indexOf('%我要发文件%')+1) {//发文件
                    	This.$obj.$chatCtnId.append(This.customHtml('<div class="FA_'+ question.match(/ran\d+/) +' FA_upFileCtn">loading...</div>'));//添加我的话
                    }else {//问问题
                    	This.$obj.$chatCtnId.append(This.customHtml(This.replaceFace(This.xssWhiteList(filterXSS(question)))));//添加我的话
                    	var $MN_ask = $('.MN_ask:last'),
                    		$MN_guideQues = $MN_ask.prevAll('.MN_answer').find('.MN_guideQue'),
                    		$lastGuide = $MN_guideQues.eq(-1);
                    	if($lastGuide[0]) {
                    		if(/^\d+$/.test(question)) {// 如果是数字，可能是上下文
                    			var $curGuide = $lastGuide.parents('.MN_answer').find('.MN_guideQue:eq('+ (+question-1) +')');
                    			if(This.robot.guide && $curGuide[0]) {// 处于上下文逻辑中且有这个选项
                    				//question = $curGuide.text();
                    			}
                    		}else {
	                    		This.robot.guide = false;// 退出引导
                    		}
                    	}
                    	if(This.robot.html || queParam) {// 当 This.robot.html 不为空时，走模拟答案
                    		data = JSON.parse('{"robotAnswer":[{"ansCon":"'+ (This.robot.html).replace(/"/g, '\'').replace(/\s/g, '') +'"}]}');
                    		This.$obj.$chatCtnId.append(This.robotHtml(data));//添加机器人的话
                    		This.options.getCallback(This.getCurrectWords(This.robotHtml(data)), data);//获取到答案后的回调
                    		This.recommendQue(data);//推荐问题
                    	}else {
							This.request({
								params: {
									s: 'aq',
									question: This.replaceFace(question, true)
								},
								callback: function(data) {
									if(data.tspan=='2000'){
										This.request({
		        		    				params: {
		        		    		            s: 'p',
		        		    		            jid: This.options.jid,
		        		    					sourceId: This.options.sourceId,//0->网页 1->微信 3->h5
		        		    					productNo: This.options.productId
		        		    				},
				    						callback: function(data) {
												$('.MN_ask:last').remove();
												This.askQue(question);
												This.timeRequest();
												return;
				    						}
		        		    			});
									}else{
										This.askQueBack(data);// 获取发送的回调
									}
									
								}
							});
                    	}
                    }
                    This.robot.html = This.robot._html = '';
					This.$obj.$inputCtnId.val('');//清空输入框
                    $(document).trigger('keyup');
                }
            },
            // 语义表情转字符表情
            wordToFace: function(data) {

            },
            // 获取发送的回调
            askQueBack: function(data) {
                var This = this,
                	hasCtn = false;// 是否有内容
		    	if(data.robotAnswer) {
		    		if(data.robotAnswer && data.robotAnswer.length>0){
						for(var i=0;i<data.robotAnswer.length;i++){
							if(data.robotAnswer[i].ansCon) {
								hasCtn = true;
							}
							if(data.robotAnswer[i].gusList) {
								if(data.robotAnswer[i].gusList[0]) {
									hasCtn = true;
								}
							}
							if(data.robotAnswer[i].relateLessList) {
								if(data.robotAnswer[i].relateLessList[0]) {
									hasCtn = true;
								}
							}
							if(data.robotAnswer[i].relateList) {
								if(data.robotAnswer[i].relateList[0]) {
									hasCtn = true;
								}
							}
							if(hasCtn) {
								This.$obj.$chatCtnId.append(This.robotHtml(data,i));//添加机器人的话
								This.options.getCallback(This.getCurrectWords(This.robotHtml(data,i)), data);//获取到答案后的回调
							}
							This.recommendQue(data);//推荐问题
							This.recommendUrl(data);//推荐链接
							MN_Base.imageLoad(This.robotHtml(data,i), function() {// 匹配html中所有图片资源，加载完毕执行
				    			This.scrollbar.update();
				    			This.scrollbarUpdate();
				    		});
						}
					}
		    	}
            },
            // 获取正确的语音文本
            getCurrectWords: function(html) {
            	var $html = $(html);
            	$html.find('.MN_kfName, .MN_helpful, .MN_kftime').remove();
            	return MN_Base.getPlainText($html[0]?$html[0].outerHTML:'');
            },
            // 智能搜索
            artiSearch: function(data) {// data == data.robotAnswer[index]
            	this.options.artiSearchCallback(data);// 智能搜索的回调
            	if(data.fullTextSearch) {
            		var html = '';
            		// 文档
        			html += '<p class="MN_titleSearch">站内搜索</p>';
            		if(data.document) {
            			if(data.document[0]) {
            				for(var i=0; i<data.document.length; i++) {
            					html += '<a href="'+ data.document[i].url +'" target="_blank" title="'+ data.document[i].title +'"><div class="MN_innerSearchCtn"><span class="MN_innerSearch">'+ MN_Base.addDots(data.document[i].title, 15) +'</span><span class="MN_classifySearch">'+ MN_Base.addDots(data.document[i].classify, 5) +'</span></div></a>';
            				}
            			}else {
            				html += '<p class="MN_noSearch">无结果</p>';
            			}
            		}else {
        				html += '<p class="MN_noSearch">无搜索结果</p>';
        			}
            		// 文章
        			html += '<p class="MN_titleSearch">网络搜索</p>';
            		if(data.crawlers) {
            			if(data.crawlers[0]) {
            				for(var i=0; i<data.crawlers.length; i++) {
            					html += '<a href="'+ data.crawlers[i].url +'" target="_blank"><p class="MN_outerSearchName MN_outerSearch" title="'+ data.crawlers[i].webName +'">'+ MN_Base.addDots(data.crawlers[i].webName, 15) +'</p><p class="MN_authorSearch" title="'+ data.crawlers[i].author +'">'+ MN_Base.addDots(data.crawlers[i].author, 15) +'</p><p class="MN_outerSearchSummary MN_outerSearch" title="'+ data.crawlers[i].summary +'">'+ MN_Base.addDots(data.crawlers[i].summary, 40) +'</p></a>';
            				}
            			}else {
            				html += '<p class="MN_noSearch">无结果</p>';
            			}
            		}else {
        				html += '<p class="MN_noSearch">无搜索结果</p>';
        			}
    		    	$('#'+ this.options.artiSearchId).empty().append(html);
            	}
            },
            //防止<>被xss过滤
            xssWhiteList: function(data) {
            	var whiteArr = [
            		["流泪", "/::<"],
        			["憨笑", "/::>"],
        			["左哼哼", "/:<@"],
        			["右哼哼", "/:@>"],
        			["鄙视", "/:>-|"],
        			["西瓜", "/:<W>"],
        			["飞吻", "/:<L>"],
        			["怄火", "/:<O>"],
        			["左太极", "/:<&"],
        			["右太极", "/:&>"]
        		],
        			_whiteArr = JSON.parse(JSON.stringify(whiteArr).replace(/</g, '&lt;').replace(/>/g, '&gt;'));
        			
        		for(var i in _whiteArr) {
        			while(data.indexOf(_whiteArr[i][1])+1) {
        				data = data.replace(_whiteArr[i][1], whiteArr[i][1]);
        			}
        		}
            	return data;
            },
            //转义表情
            // replaceFace: function(data, bool) {
			// 	if(this.options.faceModule.open) {
			// 		var src = this.options.faceModule.faceObj.options.src,
			// 			faceType = this.options.faceModule.faceObj.obj.faceType,
			// 			face = this.options.faceModule.faceObj.obj.face;

			// 		for(var i in face) {
			// 			if(i == faceType[0]) {
			// 				for(var j=0; j<face[i].length; j++) {//考虑到含有特殊字符，不用正则
			// 					while(data.indexOf(face[i][j][0])+1) {
			// 						var index = data.indexOf(face[i][j][0]),
			// 							len = face[i][j][0].length,
			// 							str1 = data.substr(0, index),
			// 							str2 = data.substr(index+len);
			// 						data = str1 + (bool?face[i][j][1]:('<img src="'+ src + j +'.'+ faceType[2] +'">')) + str2;
			// 					}
			// 					if(!bool) {
			// 						while(data.indexOf(face[i][j][1])+1) {
			// 							var index = data.indexOf(face[i][j][1]),
			// 								len = face[i][j][1].length,
			// 								str1 = data.substr(0, index),
			// 								str2 = data.substr(index+len);
			// 							data = str1 +'<img src="'+ src + j +'.'+ faceType[2] +'">'+ str2;
			// 						}
			// 					}
			// 				}
			// 			}
			// 		}
			// 	}
            // 	return data;
			// },
			replaceFace: function (data, bool) {
                var src = 'src/',
                    faceType = ['云问表情', 'png', 'png'],
                    face = {//表情包
                    '云问表情': [
                        ['[微笑]', '/::)'],
                        ['[色]', '/::B'],
                        ['[得意]', '/:8-)'],
                        ['[流泪]', '/::<'],
                        ['[害羞]', '/::$'],
                        ['[闭嘴]', '/::X'],
                        ['[发怒]', '/::@'],
                        ['[呲牙]', '/::D'],
                        ['[惊讶]', '/::O'],
                        ['[难过]', '/::('],
                        ['[酷]', '/::+'],
                        ['[愉快]', '/:,@-D'],
                        ['[流汗]', '/::L'],
                        ['[奋斗]', '/:,@f'],
                        ['[疑问]', '/:?'],
                        ['[晕]', '/:,@@'],
                        ['[委屈]', '/:P-(']
                    ],
                };
                for(var i in face) {
                    if(i == faceType[0]) {
                        for(var j=0; j<face[i].length; j++) {//考虑到含有特殊字符，不用正则
                            while(data.indexOf(face[i][j][0])+1) {
                                var index = data.indexOf(face[i][j][0]),
                                    len = face[i][j][0].length,
                                    str1 = data.substr(0, index),
                                    str2 = data.substr(index+len);
                                data = str1 + (bool?face[i][j][1]:('<img src="'+ src + 'yun'+j +'.'+ faceType[2] +'">')) + str2;
                            }
                            if(!bool) {
                                while(data.indexOf(face[i][j][1])+1) {
                                    var index = data.indexOf(face[i][j][1]),
                                        len = face[i][j][1].length,
                                        str1 = data.substr(0, index),
                                        str2 = data.substr(index+len);
                                    data = str1 +'<img src="'+ src + 'yun'+j +'.'+ faceType[2] +'">'+ str2;
                                }
                            }
                        }
                    }
                }
                return data;
            },
            //转人工->s=needperson
            needPerson: function() {
                var This = this;

                $('body').on('click.FA', '.faqevent', function() {//.faqevent是后台约定，无法改变
                    var $This = $(this);
                    if(This.options.isEn){
                    	This.$obj.$chatCtnId.append(This.customHtml('artificial service'));//添加我的话
                    }else{
                    	This.$obj.$chatCtnId.append(This.customHtml('转人工'));//添加我的话
                    }
                    This.request({
                        params: {
                            s: 'needperson'
                        },
                        callback: function(data) {
                            This.$obj.$chatCtnId.append(This.robotHtml(data));//添加机器人的话
                        }
                    });
                    return false;
                });
            },
            //回答流程问题->s=getflw
            askFlwQue: function() {
                var This = this;

                $('body').on('click.FA', '.wflink', function() {//.wflink是后台约定，无法改变
                    var $This = $(this);
                    if(!$This.attr('rel'))return;
                    This.$obj.$chatCtnId.append(This.customHtml($This.text()));//添加我的话
                    This.request({
                        params: {
                            s: 'getflw',
                            fid: $This.attr('rel'),
                            question: $This.text()
                        },
                        callback: function(data) {
							This.$obj.$chatCtnId.append(This.robotHtml(data));//添加机器人的话
                            This.recommendUrl(data);
                            This.scrollbar.update();
				    		This.scrollbarUpdate();
                        }
                    });
                });
            },
            //回答引导问题->s=aq
            askGuideQue: function() {
                var This = this;

                $('body').on('click.FA', '.MN_queList, .MN_gusList, .MN_gusList, .MN_relateList', function() {//#.MN_guideQue的父级是必不可少的
                	This.robot.guide = false;// 退出引导
                	This.scrollbar.options.autoBottom = true;// 恢复自动滚动到底部
                    var $This = $(this).find('.MN_guideQue');

                    This.$obj.$chatCtnId.append(This.customHtml($This.html()));//添加我的话
                    This.request({
                        params: {
                            s: 'aq',
                            sId: $This.attr('sId'),
                            question: $This.html()
                        },
                        callback: function(data) {
							This.askQueBack(data);
							
                        }
                    });
                });
            },
            //问题满意度评价->s=addulc
            queComment: function() {
                var This = this;

                This.$obj.$chatCtnId.on('click.FA', '.MN_yes, .MN_no', function() {
                    var $This = $(this),
                        s = 'addufc';//满意

                    if($This.is('.MN_no')) {
                        s = 'addulc';//不满意
                    }

                    This.request({
                        params: {
                            s: s,
                            aId: $This.parents('.MN_answer').attr('aId'),
                            cluid: $This.parents('.MN_answer').attr('cluid')
                        },
                        callback: function(data) {
                        	window[s +'Tip'] = data.message;
                        	if(This.options.helpfulModule.open) {
                        		var $helpful = $This.parents('.MN_helpful');
                        		if(s=='addufc') {
                        			This.options.helpfulModule.yesCallback($helpful, data.message);
                        		}else {
                        			This.options.helpfulModule.noCallback($helpful, data.message);
                        		}
                        	}else {
                            	$This.parents('.MN_helpful').text(data.message || '感谢您的评价！');
                        	}
                        }
                    });
                });

                // 答案不满意原因
                This.$obj.$chatCtnId.on('click.FA', '.MN_reasonSend', function() {
                    var $This = $(this),
                    	$form = $This.parents('.MN_helpful').prev('.MN_reasonForm');
                    This.request({
                        params: {
                        	s: 'ulreason',
                        	aId: $This.parents('.MN_answer').attr('aId'),
                        	cluid: $This.parents('.MN_answer').attr('cluid')
                        },
                        $formObj: $form,
                        callback: function(data) {
                        	if(!data.status) {
                        		$form.remove();
                            	$This.parents('.MN_helpful').text(window.addulcTip || '感谢您的评价！');
                        	}
                        }
                    });
                });
                
            },
            //上传文件->s=uf
            upFile: function() {
            	var This = this;
            	var $file = $('<input type="file" class="FA_file" multiple="multiple">').css({
            		'padding': 100,
            		'opacity': 0
            	}).appendTo($('#'+ this.options.upFileModule.triggerId));

            	H5_upload('../../'+This.options.interface+'?s=uf', this.options.upFileModule.maxNum, $file, this.$obj.$chatCtnId, function(ran) {
    		    	$('#'+ This.options.inputCtnId).val('%我要发文件%'+ ran);
        			$('#'+ This.options.sendBtnId).trigger('click.FA');
        			This.options.upFileModule.startcall && This.options.upFileModule.startcall();
            	}, function(data, ran) {  
            		if(data.status) {
            			This.showMsg(data.message);
            			$('.FA_'+ ran).parents('.MN_ask').remove();
            		}else {
            			var html = '';
            			for(var i=0,len=data.sendUrlMsg.length; i<len; i++) {
            				var tmpUrl=data.sendUrlMsg[i].url;
            				This.request({
		                        params: {
		                            s: 'image',
		                            path: tmpUrl
		                        },
		                        callback: function(data) {
		                            This.askQueBack(data);// 获取发送的回调
		                        }
		                    });
            				switch(data.sendUrlMsg[i].type){
            					case 0://非图片
            						html += '<div class="FA_upFileItem"><a href="'+ tmpUrl +'" target="_blank"><img class="FA_upFileImg FA_upFileNoImg" src="'+ base64 +'"><p class="FA_upFileName">'+ data.sendUrlMsg[i].name +'</p></a></div>';
            						break;
            					case 1://图片，不加a，防止跳转
            						html += '<div class="FA_upFileItem"><img class="FA_upFileImg" src="'+ tmpUrl+'"><p class="FA_upFileName">'+ data.sendUrlMsg[i].name +'</p></div>';
            						break;
            				}
            			}
            			$('.FA_'+ ran).empty().append(html);
            		}
            	}, 'gif|jpeg|bmp|jpg|png', function(noSuit) {
            		if(noSuit[0]) {
	                	This.showMsg(noSuit.length +'个文件不符合图片类型');
            		}
            	});
            },
            //星座模块
            star: function() {
            	var This = this;

            	$('head').append('<link rel="stylesheet" href="images/star.css?t='+ new Date() +'">');
            	$('#'+ This.options.starModule.triggerId).on('click.FA', function() {
            		This.robot.html = '';
	                This.$obj.$inputCtnId.val('星座分析');
	                var starArr = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座' ];

	                for(var i=0; i<12; i++) {
	                	This.robot.html += '<span class="FA_starCtn" title="'+ starArr[i] +'"><i class="FA_icon-star icon-star'+ (i+1) +'"></i><p class="FA_star">'+ starArr[i] +'</p></span>';
	                }
	                This.$obj.$sendBtnId.trigger('click.FA');
            	});

            	This.$obj.$chatCtnId.on('click', '.FA_starCtn', function() {
            		var $This = $(this);
            		This.$obj.$inputCtnId.val($This.attr('title'));
	                This.request({
	                	prefix: 'http://webchat.faqrobot.org/servlet/api/apiservice',
	            		dataType: 'jsonp',
	                    params: {
	                        key: 'jiandanwentichaxun',
	                        state: 'constellation',
	                        consName: $This.attr('title'),
	                        type: 'today'
	                    },
	                    callback: function(data) {
	                    	if(data.result == 200) {//y
    		            		This.robot.html = '<div class="FA_starCtn_float">'+ $This[0].outerHTML +'<span class="FA_starCtn_down">'+ data.response+ '</span></div>';
    			                This.$obj.$sendBtnId.trigger('click.FA');
	                    	}
	                    }
	                });
            	});
            },
            //天气模块
            weather: function() {
            	var This = this;
            	$('#'+ This.options.weatherModule.triggerId).on('click.FA', function() {
            		if(This.robot.ip) {
            			This.getWeather(This.robot.ip);
            		}else {
            			This.request({//获取ip
            				prefix: 'http://chaxun.1616.net/s.php',
            				dataType: 'jsonp',
            			    params: {
            			        type: 'ip',
            			        output: 'json'
            			    },
            			    callback: function(data) {
            			    	This.robot.ip = data.Ip;
            			    	This.getWeather(This.robot.ip);
            			    }
            			});
            		}
	                
            	});

            	$(This.$obj.$chatCtnId, '.FA_star').on('click', function() {
            		
            	});
            },
            getWeather: function(ip) {
            	var This = this;
                This.$obj.$inputCtnId.val('今天天气怎么样？');
                This.request({
                	prefix: 'http://webchat.faqrobot.org/servlet/api/apiservice',
            		dataType: 'jsonp',
                    params: {
                        key: 'jiandanwentichaxun',
                        state: 'weather',
                        ip: This.robot.ip,
                        type: 'json'
                    },
                    callback: function(data) {
	                    if(data.result == 100) {//y
	                    	if(data.list[0]) {
	                    		var picUrl = data.list[0].dayPictureUrl;
	                    		if(This.isNight() == 'night') {//黑夜
	                    			picUrl = data.list[0].nightPictureUrl;
	                    		}
    		            		This.robot.html = '<div class="FA_weather"><img src="'+ picUrl +'"><p>'+ data.city +' '+ data.list[0].weather + data.list[0].temperature +'</p><p>'+ data.sug +'</p></div>';

    			                //点击发送
    			                This.$obj.$sendBtnId.trigger('click.FA');
	                    	}
                    	}
                    }
                });
            },
            //技术支持
            poweredBy: function(data) {
                var $poweredCtnId = this.$obj.$poweredCtnId = $('#'+ this.options.poweredCtnId);//技术支持框

                if(data.webConfig.level >= 3) {
                    $poweredCtnId.remove();
                }
            },
            //广告信息
            advInfo:function(data){
            	if($('#lunbo').length>0){
            		if(data.advList && data.advList.length>0){
	            		$('#lunbo').show();
						var advHtml='';
	            		for(var i=0;i<data.advList.length;i++){
	            			advHtml+='<li>'+data.advList[i].value+'</li>'	
	            		}
	            		$('#lunbo ul').html(advHtml);
	            	}else{
						$('#lunbo').hide();
					}
            	}

            },
            //输入框准备->剩余字数/提示语
            initInput: function() {
                var This = this,
                    $inputCtnId = This.$obj.$inputCtnId = $('#'+ This.options.inputCtnId),//输入框
                    $tipWordId = This.$obj.$tipWordId = $('#'+ This.options.tipWordId),//提示语
                    $remainWordId = This.$obj.$remainWordId = $('#'+ This.options.remainWordId),//剩余字数
                    $sendBtnId = This.$obj.$sendBtnId = $('#'+ This.options.sendBtnId),//发送按钮
                    $chatCtnId = This.$obj.$chatCtnId = $('#'+ This.options.chatCtnId);//聊天显示框

                //预处理
                $tipWordId.text(This.options.tipWord);
                $remainWordId.text(This.options.remainWordNum);

                //判断浏览器类型
                var isIE = false,
                    browser = This.myBrowser();

                if (browser == "IE") {
                    isIE = true;
                    $tipWordId.show();
                }else {
                    isIE = false;
                	$inputCtnId.attr({'placeholder': This.options.tipWord});
                    $tipWordId.hide();
                }

                //键盘事件
                $(document).on('keyup.FA', function(e) {
                    This.remainWord($inputCtnId, $tipWordId, $remainWordId);
                    var isInputCtn = $(document.activeElement).is('#'+ This.options.inputCtnId);

                    if(e.keyCode==13 && isInputCtn) {//Enter键发送
                        This.askQue();
                    }
                });
                
                //文本框改变事件
                $inputCtnId.on('input.FA, propertychange.FA', function(e) {
                    $(document).trigger('keyup');
                    $tipWordId.hide();
                });
				// 快捷发送欢迎语(防止键盘拉起)
				$('body').on('click.FA', '.welcomeWords', function() {
					if($(this).attr('rel')){
						This.robot._html = $(this).attr('rel');
					}else if($(this).attr('question')){
						This.robot._html = $(this).attr('question');
					}else{
						This.robot._html = $(this).text();
					}
					This.askQue();
				});	

                //鼠标事件
                $inputCtnId.on('focus.FA, blur.FA', function(e) {
                    if(isIE) {
                        if(e.type == 'focus') {
                        	if($(this).val()) {
	                            $(document).trigger('keyup');
	                            $tipWordId.hide();
                        	}
                        }else {
                        	if(!$(this).val()) {
                            	$tipWordId.show();
                        	}
                        }
                    }
                });
                //如果当前是英文页面，此处为鼠标离开输入框判断是否中文文字
                $inputCtnId.on('keyup.FA', function(e) {
                    if(This.options.isEn){
                    	if (/[\u4E00-\u9FA5]/i.test($(this).val())) {
							$(this).val($(this).val().replace(/[\u4E00-\u9FA5]/g,''));
							return;
						}
                    }
                });
                $tipWordId.on('click.FA', function(e) {
                    $inputCtnId.trigger('focus');
                });

        		//点击发送
                $sendBtnId.on('click.FA', function() {
                    This.askQue();
                	setTimeout(function(){
                		$inputCtnId.focus();
                	}, 50);
                });
            },
            //服务满意评价度准备->提示语
            initComment: function() {
                var This = this,
                    $commentFormId = This.$obj.$commentFormId = $('#'+ This.options.commentFormId),//评论框
                    $commentInputCtnId = This.$obj.$commentInputCtnId = $('#'+ This.options.commentInputCtnId),//评论输入框
                    $commentTipWordId = This.$obj.$commentTipWordId = $('#'+ This.options.commentTipWordId),//评论输入框提示语
                    $commentSendBtnId = This.$obj.$commentSendBtnId = $('#'+ This.options.commentSendBtnId);//评论发送按钮
					$statisSendBtnId = This.$obj.$statisSendBtnId = $('#'+ This.options.statisSendBtnId);//满意度评价提交按钮
                //预处理
                $commentTipWordId.text(This.options.commentTipWord);

                //判断浏览器类型
                var isIE = false,
                    browser = This.myBrowser();

                if (browser == "IE") {
                    isIE = true;
                    $commentTipWordId.show();
                }else {
                    isIE = false;
                	$commentInputCtnId.attr({'placeholder': This.options.commentTipWord});
                    $commentTipWordId.hide();
                }

                
                $commentInputCtnId.on('input.FA, propertychange.FA', function(e) {
                    $(document).trigger('keyup');
                    $commentTipWordId.hide();
                });

                //鼠标事件
                $commentInputCtnId.on('focus.FA, blur.FA', function(e) {
                    if(isIE) {
                        if(e.type == 'focus') {
                        	if($(this).val()) {
	                            $(document).trigger('keyup');
	                            $commentTipWordId.hide();
                        	}
                        }else {
                        	if(!$(this).val()) {
                            	$commentTipWordId.show();
                        	}
                        }
                    }
                });
                $commentTipWordId.on('click.FA', function(e) {
                    $commentInputCtnId.trigger('focus');
                });

                //点击发送
                $commentSendBtnId.on('click.FA', function() {
                    This.servComment();
                    window.uuid = '';
                });
                $statisSendBtnId.on('click.FA',function(){
					This.statisPin();
					window.uuid = '';
				});
            },
            //服务满意度评价->s=fadeback
            servComment: function() {
                var This = this,
                    sub = '',
                    $inputs = $('input[type=checkbox]', This.$obj.$commentFormId);

                for(var i=0; i<$inputs.length; i++) {
                    var $input = $inputs.eq(i);

                    if($input.prop('checked')) {
                        sub += $input.val() + ',';
                    }
                }

                var options = {
                    callback: function(data) {
                        if(data.status) {
                        	This.showMsg(data.message);
                        }else {
                        	This.options.commentCallback(data);

                        	if(MN_Base.isPC()) {
	                        	//询问框
	                        	if(This.options.isEn){
	                        		var tmpMsg=''
	                        		if(data.message=='感谢您的支持，你已经做过评价了.'){
	                        			tmpMsg='Thank you for your support. You have already made an appraisal.';
	                        		}else if(data.message=='感谢您的评价.'){
	                        			tmpMsg='Thank you for your comments.';
	                        		}else{
	                        			tmpMsg=data.message;
	                        		}
	                        		layer.msg(tmpMsg + 'Do you have any other questions? ', {
										time: 20000, //20s后自动关闭
										btn: ['continue', 'close'],
		    							area: This.getSuitSize(),
										cancel: function() {// 关闭当前页面
											This.closeWebPage();
										}
		                        	});
	                        	}else{
	                        		layer.msg(data.message +'您是否还有其他问题？', {
										time: 20000, //20s后自动关闭
										btn: ['继续问答', '关闭'],
		    							area: This.getSuitSize(),
										cancel: function() {// 关闭当前页面
											This.closeWebPage();
										}
		                        	});
	                        	}
	                        	sessionStorage.setItem('isDefalut','主动评价过！');
            	            }else {
	                        	layer.msg(data.message);
            	            }
                        }
                    }
                }

                if(window.uuid) {// 客服要求客户评价
                	options = $.extend(true, options, {
                		url: 'Comment/CommentSatisfaction',
                		params: {
                			uuid: window.uuid,
                			status: $('[name=level]', This.$obj.$commentFormId).val(),
                			reason: $('[name=content]', This.$obj.$commentFormId).val()
                		}
                	})
                }else {
                	if(sub == '' && $('[name=content]', This.$obj.$commentFormId).val() != ''){
                		sub = '不满意';
                	}
                	options = $.extend(true, options, {
                		params: {
                		    s: 'fadeback',
                		    sub: sub//多个原因集合(必需参数)
                		},
                    	$formObj: $('#'+ This.options.commentFormId)//被序列化的form表单
                	})
                }

                This.request(options);
            },
            //留言准备->提示语
            initLeaveMsg: function() {
                var This = this,
                    $leaveMsgFormId = This.$obj.$leaveMsgFormId = $('#'+ This.options.leaveMsgFormId),//评论框
                    $leaveMsgInputCtnId = This.$obj.$leaveMsgInputCtnId = $('#'+ This.options.leaveMsgInputCtnId),//评论输入框
                    $leaveMsgTipWordId = This.$obj.$leaveMsgTipWordId = $('#'+ This.options.leaveMsgTipWordId),//评论输入框提示语
                    $leaveMsgSendBtnId = This.$obj.$leaveMsgSendBtnId = $('#'+ This.options.leaveMsgSendBtnId);//评论发送按钮

                //预处理
                $leaveMsgTipWordId.text(This.options.leaveMsgTipWord);

                //判断浏览器类型
                var isIE = false,
                    browser = This.myBrowser();

                if (browser == "IE") {
                    isIE = true;
                    $leaveMsgTipWordId.show();
                }else {
                    isIE = false;
                	$leaveMsgInputCtnId.attr({'placeholder': This.options.leaveMsgTipWord});
                    $leaveMsgTipWordId.hide();
                }

                //鼠标事件
                $leaveMsgInputCtnId.on('focus.FA, blur.FA', function(e) {
                    if(isIE) {
                        if(e.type == 'focus') {
                        	if($(this).val()) {
	                            $(document).trigger('keyup');
	                            $leaveMsgTipWordId.hide();
                        	}
                        }else {
                        	if(!$(this).val()) {
                            	$leaveMsgTipWordId.show();
                        	}
                        }
                    }
                });
                $leaveMsgTipWordId.on('click.FA', function(e) {
                    $leaveMsgInputCtnId.trigger('focus');
                });

                //点击发送
                $leaveMsgSendBtnId.on('click.FA', function() {
                    This.servLeaveMsg();
                });
            },
            //留言->s=leavemsg
            servLeaveMsg: function() {
                var This = this;

                This.request({
                    params: {
                        s: 'leavemsg'
                    },
                    $formObj: $('#'+ This.options.leaveMsgFormId),//被序列化的form表单
                    callback: function(data) {
                        This.showMsg(data.message);
                        if(!data.status) {
                        	This.options.leaveMsgCallback();
                        }
                    }
                });
            },
            //是否开始计时
            beginCount: function(bool) {
                this.timerGo = bool;
            	if(bool) {//开始定时请求
        			this.initBaseInfo();//初始化基本信息->s=p->logo
            	}else {
                    this.offline();
            	}
            },
            //定时请求->s=kl
            timeRequest: function() {
                var This = this,
					isArti = _isArti = false,
					//level = 1,
					//isShow = true,
					isOnly = true;
				timer = null;
                This.tspan = 2000;//请求间隔
				This.mouseIsOn = true;
				var oldX = '';
                $(document).on('mousemove.FA touchstart.FA', function(e) {
                	if(!This.mouseIsOn) {
						This.mouseIsOn = true;
						resetTimer();
					}
                });

                resetTimer();
                function resetTimer() {
                	clearInterval(timer);
                    timer = setInterval(function() {
                    	if(This.timerGo) {//阻塞请求
                    		if(This.mouseIsOn) {
                    			$(".closepage1").unbind('click').bind('click',function(){
                    				if($(this).hasClass('closeL')){
                    					This.closeWebPage();
                    				}else{
                    					sessionStorage.setItem('noStatis','不想评价！');
	                    				$("#dialogFeedModal").removeClass('show');
	                    				$("#dialogFeedModal").addClass('fade');
                    				}
                    			});
                    			
                    			$("#dialogStaBtn").unbind('click').bind('click',function(){
                    				var level = 1;
					            	var	unstais = '';
								 	for(var i = 0; i < $("[name=satis]").length; i++) {
								 		if($("[name=satis]").eq(i).prop('checked')){
								 			if($("[name=satis]").eq(i).val() == '不满意') {
						                        level = 0;
						                    }else{
						                    	level = 1;
						                    }
								 		}
					                }
					                for(var i = 0; i < $("[name=ckb]").length; i++) {
					                    if($("[name=ckb]").eq(i).prop('checked')) {
					                        unstais += $("[name=ckb]").eq(i).val() + ',';
					                    }
					                }
					                if(unstais == '' && $("#stapin").val() != ''){
					                	unstais = '不满意';
					                }
					                This.request({
					                	params: {
					    		            s: 'fadeback',
					    		            sourceId:0,
					    		            content:$("#stapin").val(),
					    		            level:level,
					    		            sub:unstais
					    				},
					    				callback: function(data) {
					                        if(data.status) {
					                        	This.showMsg(data.message);
					                        }else {
					                        	This.options.commentCallback(data);
					                        	if(MN_Base.isPC()) {
						                        	//询问框
						                        	if(This.options.isEn){
						                        		var tmpMsg=''
						                        		if(data.message=='感谢您的支持，你已经做过评价了.'){
						                        			tmpMsg='Thank you for your support. You have already made an appraisal.';
						                        		}else if(data.message=='感谢您的评价.'){
						                        			tmpMsg='Thank you for your comments.';
						                        		}else{
						                        			tmpMsg=data.message;
						                        		}
						                        		layer.msg(tmpMsg + 'Do you have any other questions? ', {
															time: 20000, //20s后自动关闭
															btn: ['continue', 'close'],
							    							area: This.getSuitSize(),
															cancel: function() {// 关闭当前页面
																This.closeWebPage();
															}
							                        	});
						                        	}else{
						                        		layer.msg(data.message +'您是否还有其他问题？', {
															time: 20000, //20s后自动关闭
															btn: ['继续问答', '关闭'],
							    							area: This.getSuitSize(),
															cancel: function() {// 关闭当前页面
																This.closeWebPage();
															}
							                        	});
						                        	}
						                        	sessionStorage.setItem('isShow','已评价');
						                        	$("#dialogFeedModal").removeClass('show');
						                        	$("#dialogFeedModal").addClass('fade');
					            	            }else {
						                        	layer.msg(data.message);
					            	            }
					                        }
					                    }
					                })
                    			})
                    			
                    			if(This.tspan == 10 * 1000){
                    				if((!sessionStorage.getItem('isShow'))&&(!sessionStorage.getItem('isDefalut'))&&(!sessionStorage.getItem('noStatis'))){
	                    				$("#dialogFeedModal").removeClass('fade');
	                    				$("#dialogFeedModal").addClass('show');
	                    				$("#stapin").val('');
                    				}
                    			}
                    			if(This.tspan >= 2000*1000) {
                    				if(isOnly) {
		        		    			This.request({
		        		    				params: {
		        		    		            s: 'p',
		        		    		            jid: This.options.jid,
		        		    					sourceId: This.options.sourceId,//0->网页 1->微信 3->h5
		        		    					productNo: This.options.productId
		        		    				},
				    						callback: function(data) {
                    							isOnly = true;
		        								This.tspan = 2000;//请求间隔
		        		            			resetTimer();
				    						}
		        		    			});
                    				}
                    				isOnly = false;
                    			}else {
		                    		This.request({
		                    		    params: {
		                    		        s: 'kl'
		                    		    },
		                    		    callback: function(data) {
		                    		    	if(data.nowState==3 || data.nowState==5) {// 人工聊天
												isArti = true;
                		    					if(This.options.intelTitleChange) {// 是否修改标题
                		    						if(This.options.artiTitleChange) {// 人工时是否修改标题
														if(isArti != _isArti) {
															This.titleChange(This.artiTitle);
															_isArti = isArti;
														}
                		    							
                		    						}
                		    					}
												$('.sendPicCtn').show();
												This.kuaijie();
		                    		    	}else {// 智能聊天
												isArti = false;
	                    		    			if(This.options.intelTitleChange) {// 是否修改标题
													if(isArti != _isArti) {
														This.titleChange(This.intelTitle);
														_isArti = isArti;
													}
	                    		    			}
												This.kuaijie();
		                    		    	}
											
											if(data.robotAnswer) {
		                    		    		if(data.robotAnswer[0]) {
		                    		    			for(var i=0,len=data.robotAnswer.length; i<len; i++) {
		                    		    				This.$obj.$chatCtnId.append(This.robotHtml(data, i));//添加机器人的话
														This.options.getCallback(This.getCurrectWords(This.robotHtml(data, i)), data);//获取到答案后的回调
														This.recommendQue(data, i);//推荐问题
		                    		    			}
		                    		    		}
											}

		                    		        clearInterval(timer);
		                    		        if(data.status == -1) {// 接口返回状态错误时，重新上线

		                    		        }else if(data.tspan < 2000) {
		                    		        	This.tspan = data.tspan*1000;
		                    		            resetTimer();
		                    		            This.timerGo = true;
		                    		            return;
		                    		        }
		                    		        This.mouseIsOn = false;
		                    		        This.tspan = data.tspan*1000;
                    						This.offline();// 先下线才能再次上线
		                    		    }
		                    		});
                    			}
                    		}
                    	}
                    }, This.tspan==2000*1000?100:This.tspan);
                }
            },
            muiItem : function(){
            	$.ajax({
    				type:"post",
    				url:"../../UselessReasonItem/list?orderType=1&type=1",
    				async:true,
    				cache:true,
    				success:function(data){
    					if(data.status == 0){
    						if(data.List==undefined){
								$('#muiList').html('');
								return;
							}
    						var s = []; //暂时存储html代码
							if (data.List.length > 0) {
								for (var i = 0; i < data.List.length; i++) {
									s.push('<div Id="' + data.List[i].Id + '">');
									s.push('<label class="muiSel"><a><input type="checkbox" name="ckb" class="select_row" value="' + data.List[i].Reason + '" /></a>' + (data.List[i].Reason == null ? '&nbsp;': data.List[i].Reason)+'</label>');
									s.push('</div>');
								}
								$('#muiList').html(s.join(''));
							} else {
								$('#muiList').html('');
							}
    					}
    				}
    			});
          	},
            //图片放大预览
            preview: function() {
            	var This = this;
            	$('<div class="FA_previewCtn"><span  class="FA_previewClose">×</span><i  class="FA_previewMask"></i><div class="FA_previewImgCtn"></div></div>').hide().appendTo('body');
            	$('.FA_previewImgCtn, .FA_previewClose').on('click.FA', function(e) {
	            		if(e.target.className != 'FA_previewImg') {
	            			$('.FA_previewCtn').hide().find('img').remove();
	            		}
            		});
            	if(This.options.noView != 'all') {
            		This.$obj.$chatCtnId.on('click.FA', 'img', function(e) {
            			var noViewArr = [];
            			for(var i=0; i<This.options.noView.length; i++) {
            				noViewArr[i] = 1;
            				if($(e.target).is(This.options.noView[i])) {
            					noViewArr[i] = 0;
            				}
            			}
            			if(!(noViewArr.join('').indexOf('0')+1)) {
	            			MN_Base.getNaturalSize(e.target, function(w, h) {
	            				var $img = $('<img class="FA_previewImg" src="'+ e.target.src +'">').css({
	            					width: w,
	            					height: h,
	            					marginTop: -h/2,
	            					marginLeft: -w/2,
	            					maxWidth: 'none'
	            				}).appendTo($('.FA_previewImgCtn'));
	            				$('.FA_previewCtn').show();
	            				if(w > $(window).width()) {
	            					$img.css({
	            						marginLeft: 0,
	            						left: 0
	            					});
	            				}
	            				if(h > $(window).height()) {
	            					$img.css({
	            						marginTop: 0,
	            						top: 0
	            					});
	            				}
	            			})
            			}
            		});
            	}
            },
            // 长按事件
            longTap: function() {
            	$('body').swipe({
            		longTap: function(event, target) {
            			var parent = ($(target).is('.MN_khCtn')?target:$(target).parents('.MN_khCtn')[0]) || ($(target).is('.MN_kfCtn')?target:$(target).parents('.MN_kfCtn')[0]);
            			if(parent) {
            				var html = '';
            				if($(parent).is('.MN_khCtn')) {// 客户
            					html += '<div class="MN_tip MN_khTip"><i class="MN_khTriangle3 MN_triangle"></i><div class="MN_tipCtn"><span class="MN_tipCopy MN_tipBtn">复制</span><span class="MN_tipDel MN_tipBtn">删除</span></div></div>'
            				}else {// 客服
            					html += '<div class="MN_tip MN_kfTip"><i class="MN_kfTriangle4 MN_triangle"></i><div class="MN_tipCtn"><span class="MN_tipCopy MN_tipBtn">复制</span><span class="MN_tipDel MN_tipBtn">删除</span></div></div>'
            				}
            				$(parent).select().append(html);
            				$('.MN_tipBtn:last', parent).addClass('MN_tipLast');
            			}
            		}
            	})

            	// 操作
            	$('body').on('click.FA', function(e) {
            		// 复制
            		if($(e.target).is('.MN_tipCopy')) {

            		}
            		$('.MN_tip').remove();
            	})
            },
            //关闭网页
            closeWeb: function() {
                if(!this._options.closeBtnId) {//不配置直接返回
                    return;
                }

                var This = this,
                    $closeBtnId = this.$obj.$closeBtnId = $('#'+ this.options.closeBtnId);//关闭按钮

                $closeBtnId.on('click.FA', function() {
					if((!sessionStorage.getItem('isShow'))&&(!sessionStorage.getItem('isDefalut'))){
						$("#dialogFeedModal").removeClass('fade');
	                	$("#dialogFeedModal").addClass('show');
	                	$('#dialogFeedModal .closepage1').addClass('closeL');
					}else{
						//This.closeWebPage();
						if(confirm('确定要退出吗？')) {
	                        This.closeWebPage();
	                    }
					}
					/*if(confirm('确定要退出吗？')) {
                        This.closeWebPage();
                    }*/
                });
            },
            //关闭浏览器兼容
            closeWebPage: function() {
                this.offline();
			    if (navigator.userAgent.indexOf("MSIE") > 0) {
                    if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
                        window.opener = null;
                        window.close();
                    } else {
                        window.open('', '_top');
                        window.top.close();
                    }
                } else if (navigator.userAgent.indexOf("Firefox") > 0) {
                    window.location.href = 'about:blank ';
                } else {
                    window.opener = null;
                    window.open('', '_self', '');
                    window.close();
                }
            },
            //关闭、刷新网页前请求下线->s=offline
            initOffline: function() {
                var This = this;

                $(window).on('beforeunload.FA, unload.FA', function() {
                    This.offline();
                });
            },
            //下线请求->s=offline
            offline: function() {
                this.request({
                    params: {
                        s: 'offline'
                    }
                });
            },
            //剩余字数统计
            remainWord: function($input, $tip, $word) {
                var nowNum = 0,
                    maxNum = this.options.remainWordNum,
                    word = $input.val(),
                    len = word.toString().length;

                if(len > maxNum) {
                    word = word.substr(0, maxNum);
                    $input.val(word);
                    len = word.toString().length;
                }
                $word.text(maxNum - len);
            },
            //判断浏览器类型
            myBrowser: function() {
                var userAgent = navigator.userAgent,
                    isOpera = userAgent.indexOf("Opera") > -1;

                if (isOpera) {
                    return "Opera";
                };
                if (userAgent.indexOf("Firefox") > -1) {
                    return "FF";
                }
                if (userAgent.indexOf("Chrome") > -1){
                    return "Chrome";
                }
                if (userAgent.indexOf("Safari") > -1) {
                    return "Safari";
                }
                if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
                    return "IE";
                };
            },
            //清除聊天记录
            clearRecord: function() {
                var This = this,
                    $clearBtnId = this.$obj.$clearBtnId = $('#'+ this.options.clearBtnId);

                $clearBtnId.on('click.FA', function() {
                    This.$obj.$chatCtnId.find('.MN_answer_welcome').siblings().remove();
                });
            },
            //请求->所有的请求都需要经过(特殊的除外)
    		request: function(options) {
    			var This = this;

    			// 收集来源的关键词
    			var entranceWords = '';
    			for(var i=0; i<This.options.entranceWords.length; i++) {
    				entranceWords += (MN_Base.getParam(This.options.entranceWords[i], document.referrer) || '') +',';
    			}

    			var params = {//必须参数
    			    	sysNum: This.options.sysNum,
    			    	sourceId: This.options.sourceId,
    			    	element_id: This.options.element_id,
    			    	entrance: document.referrer,
    			    	entranceWords: entranceWords,
    			    	productNo: This.options.productId
    			    },
    			    defaults = {
    			        $formObj: $(),//被序列化的form表单
    			        dataObj: {},
    			        callback: function(){}//回调函数(callback)
    			    };
    			options = $.extend({}, defaults, options);
    			var formData = $.extend({}, This.formatSeriData(decodeURIComponent(location.href)), This.formatSeriData(decodeURIComponent((options.$formObj.serialize()))), options.dataObj);
    			
    			if(This.options.jsonp) {//jsonp 需要配置绝对地址
    				if(!This.options.prefix.match(/^http/)) {
    					layer.msg('开发者提醒：当前跨域，请配置绝对地址');
    				}
    			}else {

    			}

    			$.ajax({
    			    url: encodeURI(options.prefix || (This.options.prefix + (options.url || This.options.interface))),//...为基础地址
    			    type: This.options.ajaxType,//默认get
    			    dataType: options.dataType || (This.options.jsonp?'jsonp':'json'),//默认json
    			    data: $.extend({}, params, options.params, formData),
    			    cache: false,//IE下有用
    			    success: function(data) {
    			        if(data) {
    			        	if(data.status) {//x
    			        		if(data.status == -1) {//站点不存在/长时间离开
    			        			if(data.tspan == '2000') {
    			        				if(!This.options.autoOnline) {
    			        		    		This.showMsg(data.message);
    			        				}else{
    			        					This.request({
			        		    				params: {
			        		    		            s: 'p',
			        		    		            jid: This.options.jid,
			        		    					sourceId: This.options.sourceId,//0->网页 1->微信 3->h5
			        		    					productNo: This.options.productId
			        		    				},
					    						callback: function(data) {
			        								This.tspan = 2000;//请求间隔
			        		            			This.timeRequest();
					    						}
			        		    			});
    			        				}
    			        			}else {
    			        		    	This.showMsg(data.message);
    			        			}
    			        		    return;
    			        		}else if(data.status == -2) {//未登录第三方账户
    			        			This.showMsg(data.message, function() {
    			        			    window.location.href = This.options.thirdUrl;
    			        			});
    			        			return;
    			        		}else {
    			            		options.callback(data);
    			        		}
    			        	}else {//y
    			            	options.callback(data);
    			        	}
    			            
    			        }
    			    }
    			});
    		},
            //格式化被序列化后的数据->http://xxx.com?a=1&b=2化为{a:1, b:2}
            formatSeriData: function(data) {
                if(!data) {
                    return;
                }
                var obj = '',
                    dot = ',',      
                    arr = data.match(/[^?^#^&]+=[^?^#^&]*/g);

                for(var i=0; i<arr.length; i++) {
                    var str = arr[i].match(/([^=]+)=([^=]*)/);
                    if(i==arr.length - 1) {
                        dot = '';
                    }
                    obj += '"'+ str[1] +'"' +":"+ '"'+ str[2] +'"'+ dot;
                }
                return JSON.parse('{'+ obj +'}');
            },
    		//信息提示
    		showMsg: function(message, callback) {
    			if(message == '缺少参数!'){
    				message = '请您填写完整!';
    			}
    			layer.msg(message, {
    				shift: 0,
    				area: this.getSuitSize()
    			}, function() {
    				if(callback) {
    				    callback();
    				}
    			});
    			$(window).trigger('resize');
    		},
    		// 获取提示框合适的大小
    		getSuitSize: function() {
    			return MN_Base.isPC()?'400px':'0.8rem';
    		},
            //获取格式化时间
            getFormatDate: function(time) {// 2016-11-21 09:36:43
                time = time ? time.match(/(\d+)-(\d+)-(\d+)\s(\d+):(\d+):(\d+)/) : [];
                var today = new Date(),
                    year = time[1] || today.getFullYear(),
                    month = time[2] || this.addZero(today.getMonth() + 1),
                    date = time[3] || this.addZero(today.getDate()),
                    hour = time[4] || this.addZero(today.getHours()),
                    minute = time[5] || this.addZero(today.getMinutes()),
                    second = time[6] || this.addZero(today.getSeconds());

                var result = this.options.formatDate.replace(/%hour%/g, hour).replace(/%minute%/g, minute).replace(/%second%/g, second).replace(/%year%/g, year).replace(/%month%/g, month).replace(/%date%/g, date);

                return result;
            },
            //是否是黑夜 7/8-18/19-day 20/21-6/7-night
            isNight: function() {
            	var today = new Date(),
            	    hour = this.addZero(today.getHours());
            	if(hour>=7 && hour <=19) {
            		return 'day';
            	}else {
            		return 'night';
            	}
            },
            //个位数前面加0
            addZero: function(num) {
                return num<10 ? "0" + num : num;
            }
        }

    })(MN, window, document);
    /**************************** END ****************************/




//})();
