<template>
    <div>
        <div class="topbar bg-black py-2 px-3 d-flex ai-center">
            <img src="../assets/logo.png" height="30" />
            <div class="px-2 flex-1">
                <div class="text-white">王者榮耀</div>
                <div class="text-grey-1 fs-xxs">團隊成就更多</div>
            </div>
            <button type="submit" class="btn bg-primary">立即下載</button>
        </div>
        <div class="bg-primary pt-3 pb-2">
            <div class="nav nav-inverse pb-1 jc-around">
                <div class="nav-item active">
                    <router-link class="nav-link" tag="div" to="/">首頁</router-link>
                </div>
                <div class="nav-item">
                    <router-link class="nav-link" tag="div" to="/">攻略中心</router-link>
                </div>
                <div class="nav-item">
                    <router-link class="nav-link" tag="div" to="/">賽事中心</router-link>
                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
</style>