cc.Class({
    extends: cc.Component,

    properties: {
        heroSkin:cc.Sprite,
        heroName:cc.Label,
        heroHealth:cc.Node,
        heroSpeed: 64,
        currentHealth: 1000,
        totalHealth: 1000,
        moveDirRot: 90,
    },

    // use this for initialization
    onLoad: function () {
        this.isStop = true;
        
        this.destPoint = null;
 
        this.moveDirVec = cc.pForAngle(this.moveDirRot  * (Math.PI / 180))
        
        this.initHero();
        
        this.onControl();
        
        //this.MapRect = cc.rect(0, 0, 4096, 4096)

        this.MapRect = cc.rect(-2048, -2048, 2048, 2048);
    },
    
    randomLocation: function(){
        
    },
    
    initHero: function(){
        this.heroName.string = "aaaaaaaaabbbbbb";
        this.initHeroHealth();
        
        this.setHeroHealth(300);
    },
    
    initHeroHealth: function(){
        if(!this.heroHealthGraphics){
            this.heroHealthGraphics = this.heroHealth.getComponent(cc.Graphics);
            this.heroHealthGraphics.rect(0,0,32,4);
            this.heroHealthGraphics.stroke();
            this.heroHealthGraphics.fill();
        }
    },
    
    setHeroHealth: function(hits){
        this.currentHealth = this.currentHealth - hits;
        if(this.currentHealth < 0){
            this.currentHealth = 0;
        }
        
        var rh = Math.ceil(32*(this.currentHealth/this.totalHealth));
        
        this.heroHealthGraphics.clear();
        this.heroHealthGraphics.rect(0,0,32,4);
        this.heroHealthGraphics.stroke();
        
        this.heroHealthGraphics.rect(0,0,rh,4);
        this.heroHealthGraphics.stroke();
        this.heroHealthGraphics.fill();
    },

   //玩家的操作行为处理
    onControl: function () {
        //全局保存当前玩家
        cc.director.Hero = this

        var moveVec = cc.pForAngle(this.moveDirRot  * (Math.PI / 180))
        this.moveDirVec = moveVec

        var self = this;
        this.node.rotation = 90 - this.moveDirRot

        cc.director.GlobalEvent.on('moveTo', function (data) {
            //this.destPoint = data.getLocation();
            //var targetPos = this.node.convertToWorldSpaceAR(this.destPoint);
             //console.log(targetPos);
            console.log("moveTo");
            self.curVec = data;
            
            console.log(self.curVec);
            //目标向量
            var selfVec = self.node.parent.convertToWorldSpaceAR(cc.p(self.node.x, self.node.y));
            var moveByAimVec = cc.pNormalize(cc.pSub(self.curVec, selfVec))
            
            self.moveDirVec.x = moveByAimVec.x;
            self.moveDirVec.y = moveByAimVec.y;
            this.isStop = false;

            // console.log("this.destPoint: x="+this.destPoint.x+", y="+this.destPoint.y);
            // console.log("this.node: x="+this.node.x+", y="+this.node.y);
            // var dx = this.destPoint.x - this.node.x;
            // var dy = this.destPoint.y - this.node.y;
            // var targetPos = this.node.convertToNodeSpaceAR(this.node.getPosition());
            // console.log(targetPos);
            // console.log("moveTo:dx="+dx+", dy="+dy);
            // if(Math.abs(dx)<16 && Math.abs(dy)<16){
            //     this.isStop = true;
            // }else{
            //     console.log("moveTo:isStop=false");
            //     this.isStop = false;
            // }
        }, this)
    },
    
    

    update: function (dt) {
        if (this.isStop) {
            return
        }
        var selfVec = this.node.parent.convertToWorldSpaceAR(cc.p(this.node.x, this.node.y));
        var dx = this.curVec.x - selfVec.x;
        var dy = this.curVec.y - selfVec.y;
        if(Math.abs(dx)<16 && Math.abs(dy)<16){
             this.isStop = true;
        }

        this.node.x += this.moveDirVec.x * this.heroSpeed * dt;
        this.node.y += this.moveDirVec.y * this.heroSpeed * dt;
        //console.log("update...................");
        //console.log(this.node.getPosition());

        //console.log(cc.p(this.node.x, this.node.y));
         //if(!cc.rectContainsPoint(this.MapRect, cc.p(this.node.x, this.node.y))){
         //    this.isStop = true
        //}

    }
});
