cc.Class({
    extends: cc.Component,

    properties: {
        target: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        this.camera = this.getComponent(cc.Camera);
    },

    onEnable: function () {
        //cc.director.getPhysicsManager().attachDebugDrawToCamera(this.camera);
    },
    onDisable: function () {
        //cc.director.getPhysicsManager().detachDebugDrawFromCamera(this.camera);
    },

    // called every frame, uncomment this function to activate update callback
    lateUpdate: function (dt) {
        var targetPos = this.target.convertToWorldSpaceAR(cc.Vec2.ZERO);
        //console.log(targetPos);
        var pos = this.node.parent.convertToNodeSpaceAR(targetPos);
        if((Math.abs(pos.x)+cc.winSize.width/2) > 2048){
            pos.x = (pos.x<0?-1:1)*(2048-cc.winSize.width/2);
        }
        if((Math.abs(pos.y)+cc.winSize.height/2) > 2048){
            pos.y = (pos.y<0?-1:1)*(2048-cc.winSize.height/2);
        }
        //console.log(pos);
        this.node.position = pos;
        
        //let ratio = targetPos.y / cc.winSize.height;
        //.camera.zoomRatio = 1 + (0.5 - ratio) * 0.5;
    },
});