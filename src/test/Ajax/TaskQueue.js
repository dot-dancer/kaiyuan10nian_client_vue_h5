function TaskQueue(){
    this.giTask = [];
    this.iData = {};
}

(function(){
    TaskQueue.prototype.appendTask = function(fnTask){
        if (!fnTask){
            return;
        }

        this.giTask.push(fnTask);
    }

    TaskQueue.prototype.preAppendTask = function(fnTask){
        if (!fnTask){
            return;
        }

        this.giTask.unshift(fnTask);
    }

    TaskQueue.prototype.goNext = function(){
        if (!this.giTask.length){
            return;
        }

        this.giTask.shift()(this);
    }

    TaskQueue.prototype.setData = function(key, value){
        if (!key){
            return;
        }

        this.iData[key] = value;
    }

    TaskQueue.prototype.getData = function(key){
        return this.iData[key];
    }
})()