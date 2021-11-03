<template>
    <div class="page-article" v-if="model">
        <div class="d-flex py-3 px-2 border-bottom">
            <div class="iconfont icon-back text-blue"></div>
            <strong class="flex-1 text-blue pl-2">{{ model.title }}</strong>
            <div class="text-grey fs-sm">2019-06-19</div>
        </div>
        <div v-html="model.content" class="px-3 content fs-lg"></div>
        <div class="px-3 border-top py-3">
            <div class="d-flex ai-center">
                <i class="iconfont icon-Menu"></i>
                <strong class="text-blue fs-lg ml-1">相關資訊</strong>
            </div>
            <div class="pt-1">
                <router-link
                    class="py-2"
                    tag="div"
                    :to="`/articles/${item._id}`"
                    v-for="item in model.related"
                    :key="item.id"
                    >{{ item.title }}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            model: null
        }
    },
    watch: {
        id() {
            this.fetch()
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

<style lang="scss">
.page-article {
    icon-back {
        font-size: 1.6923rem;
    }
    .content {
        img {
            max-width: 100%;
            height: auto;
        }
    }
    iframe {
        width: 100%;
        height: auto;
    }
}
</style>