<template>
  <div>
    <b-row>
      <b-col lg="6" class="my-1">
        <b-button
          style="background-color: #82DE3A"
          v-b-modal.modal-1
          @click="addButton()"
        >Add Product</b-button>
      </b-col>
      <b-col lg="6" class="my-1">
        <b-form-group>
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              placeholder="Type product name to search"
              @click="page = 1"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-table
      id="product-table"
      responsive
      striped
      hover
      :items="productItem"
      :fields="fields"
      :filter="filter"
      :filterIncludedFields="['Name']"
      :per-page="limit"
      :current-page="page"
      style="text-align: center"
    >
      <template #cell(image)="data">
        <b-img :src="url + '/' + data.item.Image" fluid />
      </template>
      <template #cell(actions)="data">
        <img
          src="@/assets/img/edit.png"
          class="m-2 d-inline-block align-top action-img"
          alt="edit"
          v-b-modal.modal-1
          @click="setProduct(data)"
        />
        <img
          src="@/assets/img/delete.png"
          class="m-2 d-inline-block align-top action-img"
          alt="delete"
          v-b-modal.modal-3
          @click="showDelBoxProd(data)"
        />
      </template>
    </b-table>
    <b-pagination
      v-model="page"
      v-show="!filter"
      :total-rows="totalRows"
      :per-page="limit"
      align="center"
      class="my-0"
      aria-controls="product-table"
    ></b-pagination>

    <b-modal id="modal-1" :title="modalTitle" hide-footer>
      <b-form @submit.prevent="onSubmit">
        <b-form-group label-cols-sm="3" label="Name" label-for="nested-name">
          <b-form-input id="nested-name" v-model="form.product_name"></b-form-input>
        </b-form-group>

        <b-form-group label-cols-sm="3" label="Image" label-for="nested-image">
          <input id="nested-image" type="file" @change="upFile" />
          <br />
          <span>(Max 2MB)</span>
        </b-form-group>

        <b-form-group label-cols-sm="3" label="Price" label-for="nested-price">
          <b-form-input id="nested-price" v-model="form.product_price"></b-form-input>
        </b-form-group>

        <b-form-group label-cols-sm="3" label="Category" label-for="nested-category">
          <b-form-select v-model="form.category_id" id="nested-category">
            <option
              v-for="(selectOption, indexOpt) in category"
              :key="indexOpt"
              :value="selectOption.category_id"
            >{{ selectOption.category_name }}</option>
          </b-form-select>
        </b-form-group>

        <b-button type="submit" variant="primary" v-show="!isUpdate">Submit</b-button>
        <b-button type="button" variant="primary" v-show="isUpdate" @click="onUpdate()">Update</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Product',
  data() {
    return {
      form: {},
      modalTitle: '',
      isUpdate: false,
      filter: null,
      page: 1,
      limit: 5,
      fields: [
        { key: 'image', label: 'Image', sortable: false },
        { key: 'Name', sortable: true },
        { key: 'Price', sortable: true },
        { key: 'Category', sortable: true },
        { key: 'Created', sortable: true },
        { key: 'Updated', sortable: true },
        'actions'
      ],
      url: process.env.VUE_APP_BASE_URL
    }
  },
  methods: {
    ...mapActions(['getProductItem', 'getCategory', 'addProduct', 'patchProduct', 'deleteProduct']),
    ...mapMutations(['clearProductItem']),
    addButton() {
      this.form = {
        category_id: '',
        product_name: '',
        product_image: '',
        product_price: '',
        product_status: 1
      }
      this.modalTitle = 'Add Product'
      this.isUpdate = false
    },
    upFile(event) {
      this.form.product_image = event.target.files[0]
    },
    onSubmit() {
      const data = new FormData()
      data.append('product_name', this.form.product_name)
      data.append('category_id', this.form.category_id)
      data.append('product_price', this.form.product_price)
      data.append('product_status', this.form.product_status)
      data.append('product_image', this.form.product_image)
      this.addProduct(data)
        .then((response) => {
          this.getProductItem()
          this.makeToast('success', 'Product Added')
          this.$bvModal.hide('modal-1')
        })
        .catch((error) => {
          alert(error.data.msg)
        })
    },
    makeToast(variant, msg) {
      this.$bvToast.toast(msg, {
        title: 'Success',
        variant: variant,
        solid: true
      })
    },
    setProduct(value) {
      this.form = {
        product_name: value.item.Name,
        category_id: value.item.category_id,
        product_price: value.item.Price.slice(4).split('.').join(''),
        product_status: 1
      }
      this.modalTitle = 'Edit Product'
      this.isUpdate = true
      this.productId = value.item.ID
    },
    onUpdate() {
      const data = new FormData()
      data.append('product_name', this.form.product_name)
      data.append('category_id', this.form.category_id)
      data.append('product_price', this.form.product_price)
      data.append('product_status', this.form.product_status)
      data.append('product_image', this.form.product_image)
      const payload = {
        id: this.productId,
        form: data
      }
      this.patchProduct(payload).then(respsone => {
        this.getProductItem()
        this.makeToast('success', 'Product Updated')
        this.$bvModal.hide('modal-1')
        this.isUpdate = false
      }).catch((error) => {
        alert(error.data.msg)
      })
    },
    showDelBoxProd(data) {
      this.$bvModal.msgBoxConfirm(`Are you sure want to delete ${data.item.Name} ?`, {
        title: 'Delete Product',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      }).then(value => {
        if (value === true) {
          this.deleteProduct(data.item.ID)
          this.getProductItem()
          this.makeToast('success', 'Product Deleted')
        }
      })
        .catch(error => {
          console.log(error)
        })
    }
  },
  computed: {
    ...mapGetters({ productItem: 'getProductItem', category: 'getCategory', totalRows: 'getTotalRows' })
  },
  created() {
    this.clearProductItem()
    this.getProductItem()
    this.getCategory()
  }
}
</script>

<style scoped src="@/assets/css/style.css"></style>
