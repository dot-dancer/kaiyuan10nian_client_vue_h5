(function(){
    /*
    Ajax.get({
        url: 'data.json',
        msg: '第一次调用',
        fnCb: function(stResText){
            console.log('第一次调用获取到的数据:', stResText);

            Ajax.get({
                url: 'data.json',
                msg: '第二次调用',
                fnCb: function(stResText){
                    console.log('第二次调用获取到的数据:', stResText);

                    Ajax.get({
                        url: 'data.json',
                        msg: '第三次调用',
                        fnCb: function(stResText){
                            console.log('第三次调用获取到的数据:', stResText);
                            console.log('update ui');
                        }
                    });
                }
            });
        }
    });
    */

    var tqTask = new TaskQueue();

    tqTask.appendTask(function(tqArgTask){
        Ajax.getByTQ(tqTask, {
            url: 'data.json',
            msg: '第一次调用'
        });
    });


    tqTask.appendTask(function(tqArgTask){
        var stResText = tqTask.getData('data');
        stResText += Math.random();
        tqTask.setData('first_value', stResText);

        tqTask.goNext();
    });

    tqTask.appendTask(function(tqArgTask){
        console.log('第一次调用获取到的数据:', tqTask.getData('data'));
        console.log('第一次调用处理后的值:', tqTask.getData('first_value'));

        Ajax.getByTQ(tqTask, {
            url: 'data.json',
            msg: '第二次调用'
        });
    });

    tqTask.appendTask(function(tqArgTask){
        console.log('第二次调用获取到的数据:', tqTask.getData('data'));

        Ajax.getByTQ(tqTask, {
            url: 'data.json',
            msg: '第三次调用'
        });
    });

    tqTask.appendTask(function(tqArgTask){
        console.log('第三次调用获取到的数据:', tqTask.getData('data'));
        console.log('update ui');
    });

    tqTask.goNext();
})()