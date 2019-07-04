/* nu-SCP iframe resizer - Croquembouche
 * 
 * This is a copy of http://scp-wiki.wdfiles.com/common--javascript/html-block-iframe.js
 * That JS file is designed for use with [[html]] blocks.
 * Our new translation module is using [[iframe]], not [[html]], so a slightly different version is needed.
 * 
 * Comments I've added to this file will begin with #.
 * All other comments will be retained.
 * If a comment begins with "// #", it's a comment I've added.
 * If a comment begins with "//#", it's a line of original code that I've commented out.
 */

(function() {
    // running in private context, no namespace pollution :-)

    var delay = 250; // each 250 ms, content height will be checked
    // # The translation module will never resize itself.
    // # However, it'll take a moment for the translations to load, so we'll need to check a few times.
    // # We'll check every quarter-second for 10 seconds. If it takes any longer, assume nothing is coming.
    var checkCount = 0; // # Stop checking when this gets to 40
    var current_height = 0; // assume starting height is 0px

    // other arguments are passed in URL, for example:
    //  http://www.wdfiles.dev/local--html/start/5d5a0384a922dd96ac0db81d715a5bf348d43c57/www.wikidot.dev/?ukey=1b91d581807e1ba924db3d456f2b8f43b51a1ea0
    //  ^ keep the same protocol (http/https)    ^ iframe hash to pass when resizing      ^ original domain     ^ authorization key
    // # Our URL actually has the following structure:
    // # http://scptestwiki.wikidot.com/local--code/component%3Atranslations/1
    // # We still have "hash", except its value will always be 1. 
    
    var url_array = location.toString().split('/');
    // # url_array is: "http:", "", original domain, "local--code", pagename, "1"
    var iframe_hash = url_array[5];
    // # This effectively sets iframe_hash equal to 1.
    var random = Math.random();
    var resize_div_id = 'div_' + iframe_hash + random;
    var resize_iframe_id = 'iframe_' + iframe_hash + random;
    //# var resize_url = url_array[0] + '//' + url_array[6] + '/common--javascript/resize-iframe.html';
    //               ^ http:               ^ www.wikidot.dev (original domain)
    
    // # If we stick with wdfiles, we'll get a crossorigin error.
    url_array[2] = url_array[2].replace('wdfiles','wikidot');    
    
    var resize_url = url_array[0] + '//' + url_array[2] + '/common--javascript/resize-iframe.html';

    var get_height = function() {
        if (document.body.scrollHeight) {
            return document.body.scrollHeight;
        }
        if (document.height) {
            return document.height;
        }
        return document.body.offsetHeight;
    };

    var resize = function() {
        var div = document.getElementById(resize_div_id);

        var old_iframe = document.getElementById(resize_iframe_id);
        if (old_iframe) {
            div.removeChild(old_iframe);
            delete old_iframe;
        }

        var iframe = document.createElement("iframe");
        iframe.id = resize_iframe_id;
        iframe.src = resize_url + "?" + Math.random() + "#" + current_height + "/" + iframe_hash;
        div.appendChild(iframe);
    };

    // every <delay> miliseconds:
    // if height changed from last time, do resize
    var tick = function() {
        var new_height = get_height();
        // # If the height is less than 20px, set it to 0, because it's basically empty
        if(new_height < 20) new_height = 0;
        if (new_height != current_height) {
            current_height = new_height;
            resize(current_height);
        }
        // # The translation module will never resize itself.
        // # However, it'll take a moment for the translations to load, so we'll need to check a few times.
        // # We'll check every quarter-second for 10 seconds. If it takes any longer, assume nothing is coming.
        checkCount++;
        if(checkCount < 40) {
          setTimeout(tick, delay);
        }
    };
    
    var init = function() {
        var div = document.createElement("div");
        div.id = resize_div_id;
        div.setAttribute('style', 'display: none');
        div.style.display = 'none'; // this way it works even in IE
        document.body.appendChild(div);
        tick();
    };
    
    var old_onload = window.onload;
    window.onload = function() {
        if (typeof(old_onload) == "function") {
            old_onload();
        }
        init();
    };
})();
