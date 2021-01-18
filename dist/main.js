(()=>{"use strict";var e={86:function(e,t){var r,i=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function i(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(i.prototype=t.prototype,new i)});function n(e,t){var r=e-t;return r==r?r:(e&&(e=e.valueOf()),t&&(t=t.valueOf()),e<t?-1:e>t?1:e==t?0:r)}Object.defineProperty(t,"__esModule",{value:!0}),t.EmptyBTree=t.defaultComparator=void 0,t.defaultComparator=n;var o=function(){function e(e,t,r){this._root=d,this._size=0,this._maxNodeSize=r>=4?Math.min(r,256):32,this._compare=t||n,e&&this.setPairs(e)}return Object.defineProperty(e.prototype,"size",{get:function(){return this._size},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"length",{get:function(){return this._size},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"isEmpty",{get:function(){return 0===this._size},enumerable:!1,configurable:!0}),e.prototype.clear=function(){this._root=d,this._size=0},e.prototype.forEach=function(e,t){var r=this;return void 0!==t&&(e=e.bind(t)),this.forEachPair((function(t,i){return e(i,t,r)}))},e.prototype.forEachPair=function(e,t){var r=this.minKey(),i=this.maxKey();return this.forRange(r,i,!0,e,t)},e.prototype.get=function(e,t){return this._root.get(e,t,this)},e.prototype.set=function(e,t,r){this._root.isShared&&(this._root=this._root.clone());var i=this._root.set(e,t,r,this);return!0===i||!1===i?i:(this._root=new l([this._root,i]),!0)},e.prototype.has=function(e){return 0!==this.forRange(e,e,!0,void 0)},e.prototype.delete=function(e){return 0!==this.editRange(e,e,!0,c)},e.prototype.with=function(e,t,r){var i=this.clone();return i.set(e,t,r)||r?i:this},e.prototype.withPairs=function(e,t){var r=this.clone();return 0!==r.setPairs(e,t)||t?r:this},e.prototype.withKeys=function(e,t){for(var r=this.clone(),i=!1,n=0;n<e.length;n++)i=r.set(e[n],void 0,!1)||i;return t&&!i?this:r},e.prototype.without=function(e,t){return this.withoutRange(e,e,!0,t)},e.prototype.withoutKeys=function(e,t){var r=this.clone();return r.deleteKeys(e)||!t?r:this},e.prototype.withoutRange=function(e,t,r,i){var n=this.clone();return 0===n.deleteRange(e,t,r)&&i?this:n},e.prototype.filter=function(e,t){var r,i=this.greedyClone();return i.editAll((function(t,i,n){if(!e(t,i,n))return r=p})),!r&&t?this:i},e.prototype.mapValues=function(e){var t={},r=this.greedyClone();return r.editAll((function(r,i,n){return t.value=e(i,r,n),t})),r},e.prototype.reduce=function(e,t){for(var r,i=0,n=t,o=this.entries(this.minKey(),g);!(r=o.next()).done;)n=e(n,r.value,i++,this);return n},e.prototype.entries=function(e,t){var r=this.findPath(e);if(void 0===r)return s();var i=r.nodequeue,n=r.nodeindex,o=r.leaf,h=void 0!==t?1:0,a=void 0===e?-1:o.indexOf(e,0,this._compare)-1;return s((function(){e:for(;;)switch(h){case 0:if(++a<o.keys.length)return{done:!1,value:[o.keys[a],o.values[a]]};h=2;continue;case 1:if(++a<o.keys.length)return t[0]=o.keys[a],t[1]=o.values[a],{done:!1,value:t};h=2;case 2:for(var e=-1;;){if(++e>=i.length){h=3;continue e}if(++n[e]<i[e].length)break}for(;e>0;e--)i[e-1]=i[e][n[e]].children,n[e-1]=0;o=i[0][n[0]],a=-1,h=void 0!==t?1:0;continue;case 3:return{done:!0,value:void 0}}}))},e.prototype.entriesReversed=function(e,t,r){if(void 0===e&&(r=void 0,void 0===(e=this.maxKey())))return s();var i=this.findPath(e)||this.findPath(this.maxKey()),n=i.nodequeue,o=i.nodeindex,h=i.leaf;m(!n[0]||h===n[0][o[0]],"wat!");var a=h.indexOf(e,0,this._compare);r||this._compare(h.keys[a],e)>0||a++;var u=void 0!==t?1:0;return s((function(){e:for(;;)switch(u){case 0:if(--a>=0)return{done:!1,value:[h.keys[a],h.values[a]]};u=2;continue;case 1:if(--a>=0)return t[0]=h.keys[a],t[1]=h.values[a],{done:!1,value:t};u=2;case 2:for(var e=-1;;){if(++e>=n.length){u=3;continue e}if(--o[e]>=0)break}for(;e>0;e--)n[e-1]=n[e][o[e]].children,o[e-1]=n[e-1].length-1;h=n[0][o[0]],a=h.keys.length,u=void 0!==t?1:0;continue;case 3:return{done:!0,value:void 0}}}))},e.prototype.findPath=function(e){var t,r,i=this._root;if(i.isLeaf)t=v,r=v;else{t=[],r=[];for(var n=0;!i.isLeaf;n++){if(t[n]=i.children,r[n]=void 0===e?0:i.indexOf(e,0,this._compare),r[n]>=t[n].length)return;i=t[n][r[n]]}t.reverse(),r.reverse()}return{nodequeue:t,nodeindex:r,leaf:i}},e.prototype.keys=function(e){var t=this.entries(e,g);return s((function(){var e=t.next();return e.value&&(e.value=e.value[0]),e}))},e.prototype.values=function(e){var t=this.entries(e,g);return s((function(){var e=t.next();return e.value&&(e.value=e.value[1]),e}))},Object.defineProperty(e.prototype,"maxNodeSize",{get:function(){return this._maxNodeSize},enumerable:!1,configurable:!0}),e.prototype.minKey=function(){return this._root.minKey()},e.prototype.maxKey=function(){return this._root.maxKey()},e.prototype.clone=function(){this._root.isShared=!0;var t=new e(void 0,this._compare,this._maxNodeSize);return t._root=this._root,t._size=this._size,t},e.prototype.greedyClone=function(t){var r=new e(void 0,this._compare,this._maxNodeSize);return r._root=this._root.greedyClone(t),r._size=this._size,r},e.prototype.toArray=function(e){void 0===e&&(e=2147483647);var t=this.minKey(),r=this.maxKey();return void 0!==t?this.getRange(t,r,!0,e):[]},e.prototype.keysArray=function(){var e=[];return this._root.forRange(this.minKey(),this.maxKey(),!0,!1,this,0,(function(t,r){e.push(t)})),e},e.prototype.valuesArray=function(){var e=[];return this._root.forRange(this.minKey(),this.maxKey(),!0,!1,this,0,(function(t,r){e.push(r)})),e},e.prototype.toString=function(){return this.toArray().toString()},e.prototype.setIfNotPresent=function(e,t){return this.set(e,t,!1)},e.prototype.nextHigherPair=function(e){var t=this.entries(e,g),r=t.next();return!r.done&&void 0!==e&&this._compare(r.value[0],e)<=0&&(r=t.next()),r.value},e.prototype.nextHigherKey=function(e){var t=this.nextHigherPair(e);return t?t[0]:t},e.prototype.nextLowerPair=function(e){return this.entriesReversed(e,g,!0).next().value},e.prototype.nextLowerKey=function(e){var t=this.nextLowerPair(e);return t?t[0]:t},e.prototype.changeIfPresent=function(e,t){return 0!==this.editRange(e,e,!0,(function(e,r){return{value:t}}))},e.prototype.getRange=function(e,t,r,i){void 0===i&&(i=67108863);var n=[];return this._root.forRange(e,t,r,!1,this,0,(function(e,t){return n.push([e,t]),n.length>i?y:void 0})),n},e.prototype.setPairs=function(e,t){for(var r=0,i=0;i<e.length;i++)this.set(e[i][0],e[i][1],t)&&r++;return r},e.prototype.forRange=function(e,t,r,i,n){var o=this._root.forRange(e,t,r,!1,this,n||0,i);return"number"==typeof o?o:o.break},e.prototype.editRange=function(e,t,r,i,n){var o=this._root;o.isShared&&(this._root=o=o.clone());try{var s=o.forRange(e,t,r,!0,this,n||0,i);return"number"==typeof s?s:s.break}finally{for(;o.keys.length<=1&&!o.isLeaf;)this._root=o=0===o.keys.length?d:o.children[0]}},e.prototype.editAll=function(e,t){return this.editRange(this.minKey(),this.maxKey(),!0,e,t)},e.prototype.deleteRange=function(e,t,r){return this.editRange(e,t,r,c)},e.prototype.deleteKeys=function(e){for(var t=0,r=0;t<e.length;t++)this.delete(e[t])&&r++;return r},Object.defineProperty(e.prototype,"height",{get:function(){for(var e=this._root,t=-1;null!=e;t++)e=e.children;return t},enumerable:!1,configurable:!0}),e.prototype.freeze=function(){var e=this;e.clear=e.set=e.editRange=function(){throw new Error("Attempted to modify a frozen BTree")}},e.prototype.unfreeze=function(){delete this.clear,delete this.set,delete this.editRange},Object.defineProperty(e.prototype,"isFrozen",{get:function(){return this.hasOwnProperty("editRange")},enumerable:!1,configurable:!0}),e.prototype.checkValid=function(){var e=this._root.checkValid(0,this,0);m(e===this.size,"size mismatch: counted ",e,"but stored",this.size)},e}();function s(e){void 0===e&&(e=function(){return{done:!0,value:void 0}});var t={next:e};return Symbol&&Symbol.iterator&&(t[Symbol.iterator]=function(){return this}),t}t.default=o,Symbol&&Symbol.iterator&&(o.prototype[Symbol.iterator]=o.prototype.entries),o.prototype.where=o.prototype.filter,o.prototype.setRange=o.prototype.setPairs,o.prototype.add=o.prototype.set;var h,a,u=function(){function e(e,t){void 0===e&&(e=[]),this.keys=e,this.values=t||f,this.isShared=void 0}return Object.defineProperty(e.prototype,"isLeaf",{get:function(){return void 0===this.children},enumerable:!1,configurable:!0}),e.prototype.maxKey=function(){return this.keys[this.keys.length-1]},e.prototype.indexOf=function(e,t,r){for(var i=this.keys,n=0,o=i.length,s=o>>1;n<o;){var h=r(i[s],e);if(h<0)n=s+1;else{if(!(h>0)){if(0===h)return s;if(e==e)return i.length;throw new Error("BTree: NaN was used as a key")}o=s}s=n+o>>1}return s^t},e.prototype.minKey=function(){return this.keys[0]},e.prototype.clone=function(){var t=this.values;return new e(this.keys.slice(0),t===f?t:t.slice(0))},e.prototype.greedyClone=function(e){return this.isShared&&!e?this:this.clone()},e.prototype.get=function(e,t,r){var i=this.indexOf(e,-1,r._compare);return i<0?t:this.values[i]},e.prototype.checkValid=function(e,t,r){var i=this.keys.length,n=this.values.length;return m(this.values===f?i<=n:i===n,"keys/values length mismatch: depth",e,"with lengths",i,n,"and baseIndex",r),m(0==e||i>0,"empty leaf at depth",e,"and baseIndex",r),i},e.prototype.set=function(e,t,r,i){var n=this.indexOf(e,-1,i._compare);if(n<0){if(n=~n,i._size++,this.keys.length<i._maxNodeSize)return this.insertInLeaf(n,e,t,i);var o=this.splitOffRightSide(),s=this;return n>this.keys.length&&(n-=this.keys.length,s=o),s.insertInLeaf(n,e,t,i),o}return!1!==r&&(void 0!==t&&this.reifyValues(),this.keys[n]=e,this.values[n]=t),!1},e.prototype.reifyValues=function(){return this.values===f?this.values=this.values.slice(0,this.keys.length):this.values},e.prototype.insertInLeaf=function(e,t,r,i){if(this.keys.splice(e,0,t),this.values===f){for(;f.length<i._maxNodeSize;)f.push(void 0);if(void 0===r)return!0;this.values=f.slice(0,this.keys.length-1)}return this.values.splice(e,0,r),!0},e.prototype.takeFromRight=function(e){var t=this.values;e.values===f?t!==f&&t.push(void 0):(t=this.reifyValues()).push(e.values.shift()),this.keys.push(e.keys.shift())},e.prototype.takeFromLeft=function(e){var t=this.values;e.values===f?t!==f&&t.unshift(void 0):(t=this.reifyValues()).unshift(e.values.pop()),this.keys.unshift(e.keys.pop())},e.prototype.splitOffRightSide=function(){var t=this.keys.length>>1;return new e(this.keys.splice(t),this.values===f?f:this.values.splice(t))},e.prototype.forRange=function(e,t,r,i,n,o,s){var h,a,u=n._compare;if(t===e){if(!r)return o;if(a=(h=this.indexOf(e,-1,u))+1,h<0)return o}else h=this.indexOf(e,0,u),(a=this.indexOf(t,-1,u))<0?a=~a:!0===r&&a++;var l=this.keys,p=this.values;if(void 0!==s)for(var c=h;c<a;c++){var y=l[c],d=s(y,p[c],o++);if(void 0!==d){if(!0===i){if(y!==l[c]||!0===this.isShared)throw new Error("BTree illegally changed or cloned in editRange");d.delete?(this.keys.splice(c,1),this.values!==f&&this.values.splice(c,1),n._size--,c--,a--):d.hasOwnProperty("value")&&(p[c]=d.value)}if(void 0!==d.break)return d}}else o+=a-h;return o},e.prototype.mergeSibling=function(e,t){if(this.keys.push.apply(this.keys,e.keys),this.values===f){if(e.values===f)return;this.values=this.values.slice(0,this.keys.length)}this.values.push.apply(this.values,e.reifyValues())},e}(),l=function(e){function t(t,r){var i=this;if(!r){r=[];for(var n=0;n<t.length;n++)r[n]=t[n].maxKey()}return(i=e.call(this,r)||this).children=t,i}return i(t,e),t.prototype.clone=function(){for(var e=this.children.slice(0),r=0;r<e.length;r++)e[r].isShared=!0;return new t(e,this.keys.slice(0))},t.prototype.greedyClone=function(e){if(this.isShared&&!e)return this;for(var r=new t(this.children.slice(0),this.keys.slice(0)),i=0;i<r.children.length;i++)r.children[i]=r.children[i].greedyClone();return r},t.prototype.minKey=function(){return this.children[0].minKey()},t.prototype.get=function(e,t,r){var i=this.indexOf(e,0,r._compare),n=this.children;return i<n.length?n[i].get(e,t,r):void 0},t.prototype.checkValid=function(e,t,r){var i=this.keys.length,n=this.children.length;m(i===n,"keys/children length mismatch: depth",e,"lengths",i,n,"baseIndex",r),m(i>1||e>0,"internal node has length",i,"at depth",e,"baseIndex",r);for(var o=0,s=this.children,h=this.keys,a=0,u=0;u<n;u++)m((o+=s[u].checkValid(e+1,t,r+o))>=(a+=s[u].keys.length),"wtf",r),m(0===u||s[u-1].constructor===s[u].constructor,"type mismatch, baseIndex:",r),s[u].maxKey()!=h[u]&&m(!1,"keys[",u,"] =",h[u],"is wrong, should be ",s[u].maxKey(),"at depth",e,"baseIndex",r),0===u||t._compare(h[u-1],h[u])<0||m(!1,"sort violation at depth",e,"index",u,"keys",h[u-1],h[u]);var l=0===a;return(l||a>t.maxNodeSize*n)&&m(!1,l?"too few":"too many","children (",a,o,") at depth",e,"maxNodeSize:",t.maxNodeSize,"children.length:",n,"baseIndex:",r),o},t.prototype.set=function(e,t,r,i){var n,o=this.children,s=i._maxNodeSize,h=i._compare,a=Math.min(this.indexOf(e,0,h),o.length-1),u=o[a];u.isShared&&(o[a]=u=u.clone()),u.keys.length>=s&&(a>0&&(n=o[a-1]).keys.length<s&&h(u.keys[0],e)<0?(n.isShared&&(o[a-1]=n=n.clone()),n.takeFromRight(u),this.keys[a-1]=n.maxKey()):void 0!==(n=o[a+1])&&n.keys.length<s&&h(u.maxKey(),e)<0&&(n.isShared&&(o[a+1]=n=n.clone()),n.takeFromLeft(u),this.keys[a]=o[a].maxKey()));var l=u.set(e,t,r,i);if(!1===l)return!1;if(this.keys[a]=u.maxKey(),!0===l)return!0;if(this.keys.length<s)return this.insert(a+1,l),!0;var f=this.splitOffRightSide(),p=this;return h(l.maxKey(),this.maxKey())>0&&(p=f,a-=this.keys.length),p.insert(a+1,l),f},t.prototype.insert=function(e,t){this.children.splice(e,0,t),this.keys.splice(e,0,t.maxKey())},t.prototype.splitOffRightSide=function(){var e=this.children.length>>1;return new t(this.children.splice(e),this.keys.splice(e))},t.prototype.takeFromRight=function(e){this.keys.push(e.keys.shift()),this.children.push(e.children.shift())},t.prototype.takeFromLeft=function(e){this.keys.unshift(e.keys.pop()),this.children.unshift(e.children.pop())},t.prototype.forRange=function(e,t,r,i,n,o,s){var h=n._compare,a=this.keys,u=this.children,l=this.indexOf(e,0,h),f=l,p=Math.min(t===e?l:this.indexOf(t,0,h),a.length-1);if(i){if(f<=p)try{for(;f<=p;f++){if(u[f].isShared&&(u[f]=u[f].clone()),y=u[f].forRange(e,t,r,i,n,o,s),a[f]=u[f].maxKey(),"number"!=typeof y)return y;o=y}}finally{var c=n._maxNodeSize>>1;for(l>0&&l--,f=p;f>=l;f--)u[f].keys.length<=c&&(0!==u[f].keys.length?this.tryMerge(f,n._maxNodeSize):(a.splice(f,1),u.splice(f,1)));0!==u.length&&0===u[0].keys.length&&m(!1,"emptiness bug")}}else for(;f<=p;f++){var y;if("number"!=typeof(y=u[f].forRange(e,t,r,i,n,o,s)))return y;o=y}return o},t.prototype.tryMerge=function(e,t){var r=this.children;return e>=0&&e+1<r.length&&r[e].keys.length+r[e+1].keys.length<=t&&(r[e].isShared&&(r[e]=r[e].clone()),r[e].mergeSibling(r[e+1],t),r.splice(e+1,1),this.keys.splice(e+1,1),this.keys[e]=r[e].maxKey(),!0)},t.prototype.mergeSibling=function(e,t){var r=this.keys.length;this.keys.push.apply(this.keys,e.keys),this.children.push.apply(this.children,e.children),this.tryMerge(r-1,t)},t}(u),f=[],p={delete:!0},c=function(){return p},y={break:!0},d=((h=new u).isShared=!0,h),v=[],g=[];function m(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(!e)throw t.unshift("B+ tree"),new Error(t.join(" "))}t.EmptyBTree=((a=new o).freeze(),a)},138:function(e,t,r){var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=i(r(86));console.log("Btree",n.default)}},t={};!function r(i){if(t[i])return t[i].exports;var n=t[i]={exports:{}};return e[i].call(n.exports,n,n.exports,r),n.exports}(138)})();