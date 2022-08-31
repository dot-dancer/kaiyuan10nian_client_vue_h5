<script setup lang="ts">
/*! @file
********************************************************************************
<PRE>
文件实现功能   : 带KeepAlive的RouterView组件
作者           : dotdancer
版本           : 1.0
--------------------------------------------------------------------------------
备注           : -
--------------------------------------------------------------------------------
修改记录 :
日  期       版本    修改人     修改内容
2022/09/01   1.0     dotdancer  创建
</PRE>
*******************************************************************************/
import { useRoute } from 'vue-router'
import { get } from 'lodash'

//==============================================================================
//== 类型定义
interface IKeepAliveRouterViewState{
    giExcludeNames: string[];
}


//==============================================================================
//== 初始化
const iState = reactive<IKeepAliveRouterViewState>({
    giExcludeNames: [],
})

const { giExcludeNames } = toRefs(iState)


//==============================================================================
//== 事件处理
watch(useRoute(), (newValue, oldValue) => {
    if (false === get(newValue, 'meta.keepAlive', true)){
        // const stCmpName = get(newValue, 'meta.cmpName', '')
        const stCmpName = get(newValue.matched[newValue.matched.length - 1], 'components.default["__name"]', '')
        if (stCmpName && -1 == iState.giExcludeNames.indexOf(stCmpName)){
            iState.giExcludeNames.push(stCmpName)
        }
    }
}, {deep: true})
</script>

<template>
    <router-view v-slot="{ Component }">
        <keep-alive :exclude="giExcludeNames">
            <component :is="Component" />
        </keep-alive>
    </router-view>
</template>

<style lang="scss" scoped>

</style>