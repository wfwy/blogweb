<template>
    <div>
      <div v-for="item in user" :key="item.id">
        {{item}}<br/>
      </div>
    </div>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
      user: ''
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    load () {
      this.$axios.get('/admin/menu')
        .then(response => {
          this.user = response.data.data
        }).catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
