$(document).ready(function() {
    if(!$('#myCanvas').tagcanvas({
        maxSpeed: 0.05,
        minSpeed: 0.002,
        textColour: '#000',
        textHeight: 25,
        outlineColour: 'transparent',
        outlineOffset: 5,
        depth: 0.75,
        wheelZoom: false,
        reverse: true,
        shuffleTags: true,
        initial: [0.05,0.05],
        splitWidth: 180,
        centreImage: 'logo.png',
        height: 100,
        width: 100
    }, 'tags')) {
        // TagCanvas failed to load
        $('#myCanvasContainer').hide();
    }
});
