<script setup lang="ts">
/*! @file
********************************************************************************
<PRE>
文件实现功能   : 首页组件
作者           : dotdancer
版本           : 1.0
--------------------------------------------------------------------------------
备注           : -
--------------------------------------------------------------------------------
修改记录 :
日  期       版本    修改人     修改内容
2022/08/10   1.0     dotdancer  创建
</PRE>
*******************************************************************************/
// defineOptions({name: 'Index'})

//==============================================================================
//== 类型定义


//==============================================================================
//== 初始化


//==============================================================================
//== 事件处理
</script>

<template>
    <div class="index-w">
        <div class="title">Index.vue</div>
        
        <keep-alive-router-view/>

        <ul class="g-flex-rsbc">
            <li>
                <router-link :to="{name: 'home'}">{{ lpk('page.index.Title') }}</router-link>
            </li>
            <li>
                <router-link :to="{name: 'blogIndex'}">{{ lpk('Blog') }}</router-link>
            </li>
            <li>
                <router-link :to="{name: 'my'}">{{ lpk('page.my.Title') }}</router-link>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.index-w{
    background: #FF0;

    .title{
        margin: 30px;
    }
}
</style>