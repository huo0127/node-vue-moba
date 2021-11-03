<template>
    <div class="page-article" v-if="model">
        <div class="d-flex py-3 px-2">
            <div class="iconfont icon-back"></div>
            <strong class="flex-1">{{ model.title }}</strong>
            <div class="text-grey fs-sm">2019-06-19</div>
        </div>
        <div v-html="model.content"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            model: null
        }
    },
    props: {
        id: { required: true }
    },
    created() {
        this.fetch()
    },
    methods: {
        async fetch() {
            const res = await this.$http.get(`articles/${this.id}`)
            this.model = res.data
        }
    }
}
</script>

<style lang="scss" scoped>
</style>