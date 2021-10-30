<template>
    <div>
        <h1>{{id? '編輯' : '新增'}}物品 {{id}}</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="名稱">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="圖標">
                <el-input v-model="model.icon"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            model: {}
        }
    },
    props: {
        id: {}
    },
    created() {
        this.id && this.fetch()
    },
    methods: {
        async save() {
            let res
            if (this.id) {
                res = await this.$http.put(`rest/items/${this.id}`, this.model)
            } else {
                res = await this.$http.post('rest/items', this.model)
            }
            this.$router.push('/items/list')
            this.$message({
                type: 'success',
                message: '保存成功'
            })
        },
        async fetch() {
            const res = await this.$http.get(`rest/items/${this.id}`)
            this.model = res.data
        }
    }
}
</script>

<style scoped>
</style>