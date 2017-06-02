cc.Class({
    extends: cc.Component,

    properties: {
        worldMap:cc.Node,
        locationCursor:cc.Node
    },
    // use this for initialization
    onLoad: function () {

        this.initCursor();
        //添加触摸
        this.addTouchEvent()
    },

    //添加触摸监控
    addTouchEvent: function() {
        var self = this;
        this.node.on(cc.Node.EventType.TOUCH_START, function(event) {
            cc.director.GlobalEvent.emit('moveTo', self.node.convertTouchToNodeSpaceAR(event))
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function(event) {
            self.setCursorLocation(self.node.convertTouchToNodeSpaceAR(event));
            //self.setCursorLocation(event.getLocation());
        }, this);
    },
    
    setCursorLocation: function(location){
        console.log("setCursorLocation");
        console.log(location);
        location = this.node.parent.convertToWorldSpaceAR(location);
        console.log(location);
        var x1 = Math.floor(location.x/32) * 32;
        var y1 = Math.floor(location.y/32) * 32;
        this.locationCursor.x = x1;
        this.locationCursor.y = y1;
    },
    
    initCursor: function(){
        this.cursorGraphics = this.locationCursor.getComponent(cc.Graphics);
        this.cursorGraphics.rect(0,0,30,30);
        this.cursorGraphics.stroke();
    }


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
