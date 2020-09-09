<template>
  <div>
    <h1>Page Product</h1>
    <form>
      <input type="text" placeholder="Product Name" v-model="form.product_name" />
      <br />
      <input type="text" placeholder="Product Price" v-model="form.product_price" />
      <br />
      <input type="text" placeholder="Category ID" v-model="form.category_id" />
      <br />
      <input type="text" placeholder="Product Status" v-model="form.product_status" />
      <br />
      <input type="file" @change="handleFile" />
      <br />
      <br />
      <button @click.prevent="postProduct">Submit</button>
      <!-- <button>Update</button> -->
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Product',
  data() {
    return {
      form: {
        category_id: '',
        product_name: '',
        product_price: '',
        product_status: '',
        product_image: ''
      }
    }
  },
  methods: {
    ...mapActions(['addProduct']),
    handleFile(event) {
      this.form.product_image = event.target.files[0]
    },
    postProduct() {
      const data = new FormData()
      data.append('product_name', this.form.product_name)
      data.append('category_id', this.form.category_id)
      data.append('product_price', this.form.product_price)
      data.append('product_status', this.form.product_status)
      data.append('product_image', this.form.product_image)
      this.addProduct(data).then((response) => {
        // Success
        console.log(response)
      }).catch(error => {
        // Error
        console.log(error)
      })
    }
  }
}
</script>
