/* global rempl */

rempl.getSubscriber(function(api) {
    function $(id) {
        return document.getElementById(id);
    }
    function prev() {
        api.callRemote('prev');
    }
    function next() {
        api.callRemote('next');
    }
    function switchMode() {
        api.callRemote('switchMode');
    }

    api.subscribe(function(data) {
        $('slideImage').style.backgroundImage = data.slideImage ? 'url(' + data.slideImage + ')' : '';
        $('notes').innerHTML = data.notes || '<span style="color:#AAA">No notes</span>';
        $('overlay').style.display = data.slideMode ? 'none' : 'block';
    });

    document.body.innerHTML =
        '<style>body{margin:0;padding:0;font:16px arial}</style>' +
        '<div style="display:flex;flex-direction:column;height:100vh">' +
            '<div id="btn-switchMode" style="padding:20px;margin:4px;background:#0AD;color:black;text-shadow:1px 1px 1px rgba(255,255,255,.5);text-align:center;cursor:pointer">Exit presentation mode</div>' +
            '<div id="output"></div>' +
            '<div id="slideImage" style="width:100%;flex:1;background:no-repeat center black;background-size:contain"></div>' +
            '<div id="notes" style="flex:1;background:white;padding:10px;margin-top:4px;font-size:5vh;overflow:auto"></div>' +
            '<div style="display:flex;padding:0 2px">' +
                '<div id="btn-prev" style="flex:1;margin:4px 2px;background:#0AD;color:black;text-shadow:1px 1px 1px rgba(255,255,255,.5);padding:20px;text-align:center;cursor:pointer">Prev</div>' +
                '<div id="btn-next" style="flex:1;margin:4px 2px;background:#0AD;color:black;text-shadow:1px 1px 1px rgba(255,255,255,.5);padding:20px;text-align:center;cursor:pointer">Next</div>' +
            '</div>' +
        '</div>' +
        '<div id="overlay" style="background:white;position:fixed;z-index:1000;top:0;left:0;right:0;bottom:0"><div style="display:flex;align-items:center;justify-content:center;height:100%"><span id="btn-enterPresentation" style="background:#0AD;padding:20px;cursor:pointer">Start presentation</span></div></div>';

    $('btn-prev').onclick = prev;
    $('btn-next').onclick = next;
    $('btn-enterPresentation').onclick = switchMode;
    $('btn-switchMode').onclick = switchMode;
});
