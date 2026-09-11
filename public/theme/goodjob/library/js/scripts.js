/*!------------------------------------------------------
 * jQuery nearest v1.0.3
 * http://github.com/jjenzz/jQuery.nearest
 * ------------------------------------------------------
 * Copyright (c) 2012 J. Smith (@jjenzz)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Have you ever tried to find the nearest element down in
 * the DOM that wasn't a child? Then jQuery nearest is for you.
 * And it works traversing both up and down, finding...wait
 * for it...the nearest element. 
 * 
 * Like this: jQuery(this).nearest('.overlay');
 */
(function(a,b){a.fn.nearest=function(c){var d,g,f,e,h,i=b.querySelectorAll;function j(k){g=g?g.add(k):a(k)}this.each(function(){d=this;a.each(c.split(","),function(){e=a.trim(this);if(!e.indexOf("#")){j((i?b.querySelectorAll(e):a(e)))}else{h=d.parentNode;while(h){f=i?h.querySelectorAll(e):a(h).find(e);if(f.length){j(f);break}h=h.parentNode}}})});return g||a()}}(jQuery,document));function updateViewportDimensions(){var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;return{width:x,height:y};}
var viewport=updateViewportDimensions();var waitForFinalEvent=(function(){var timers={};return function(callback,ms,uniqueId){if(!uniqueId){uniqueId="Don't call this twice without a uniqueId";}
if(timers[uniqueId]){clearTimeout(timers[uniqueId]);}
timers[uniqueId]=setTimeout(callback,ms);};})();var timeToWaitForLast=100;function loadGravatars(){viewport=updateViewportDimensions();if(viewport.width>=768){jQuery('.comment img[data-gravatar]').each(function(){jQuery(this).attr('src',jQuery(this).attr('data-gravatar'));});}}
jQuery(document).ready(function($){loadGravatars();viewport=updateViewportDimensions();if(viewport.width>=768){}
$('p > img').unwrap();});class ResponsiveBackgroundImage{constructor(element){this.element=element;this.img=element.querySelector('img.bg-swap');this.src='';this.img.addEventListener('load',()=>{this.update();});if(this.img.complete){this.update();}}
update(){let src=typeof this.img.currentSrc!=='undefined'?this.img.currentSrc:this.img.src;if(this.src!==src){this.src=src;this.element.style.backgroundImage='url("'+this.src+'")';}}}
let elements=document.querySelectorAll('[data-responsive-background-image]');for(let i=0;i<elements.length;i++){new ResponsiveBackgroundImage(elements[i]);}
window.onload=(event)=>{document.querySelector('#bloginfo').classList.remove('preload');document.querySelector('#main').classList.remove('preload');document.querySelector('.article-header').classList.remove('preload');document.querySelector('.article-footer').classList.remove('preload');}