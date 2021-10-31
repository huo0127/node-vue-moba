<template>
    <div>
        <h1>{{ id ? '編輯' : '新增' }}文章 {{ id }}</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="所屬分類">
                <el-select v-model="model.cate" multiple>
                    <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="標題">
                <el-input v-model="model.title"></el-input>
            </el-form-item>
            <el-form-item label="詳情">
                <vue-editor v-model="model.content"></vue-editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
    data() {
        return {
            model: {},
            categories: []
        }
    },
    props: {
        id: {}
    },
    components: {
        VueEditor
    },
    created() {
        this.id && this.fetch()
        this.fetchCategories()
    },
    methods: {
        async save() {
            let res
            if (this.id) {
                res = await this.$http.put(`rest/articles/${this.id}`, this.model)
            } else {
                res = await this.$http.post('rest/articles', this.model)
            }
            this.$router.push('/articles/list')
            this.$message({
                type: 'success',
                message: '保存成功'
            })
        },
        async fetch() {
            const res = await this.$http.get(`rest/articles/${this.id}`)
            this.model = res.data
        },
        async fetchCategories() {
            const res = await this.$http.get(`rest/categories`)
            this.categories = res.data
        }
    }
}
</script>

<style scoped>
</style>