<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12" class="header">
        <Header text="Setting" />
      </b-col>

      <b-col cols="12" class="setting-content">
        <b-card no-body class="tab">
          <b-tabs pills card vertical>
            <b-tab title="Product" active>
              <div style="width: 100%">
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
                          placeholder="Type to Search"
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
                  <template #cell(actions)="data">
                    <b-button
                      class="mr-1"
                      variant="info"
                      v-b-modal.modal-1
                      @click="setProduct(data)"
                    >Edit</b-button>
                    <b-button
                      class="ml-1"
                      v-b-modal.modal-3
                      style="background: #d34d4d"
                      @click="showDelBoxProd(data)"
                    >Delete</b-button>
                  </template>
                </b-table>
                <b-pagination
                  v-model="page"
                  v-show="!filter"
                  :total-rows="totalData"
                  :per-page="limit"
                  align="center"
                  class="my-0"
                  aria-controls="product-table"
                ></b-pagination>
              </div>
            </b-tab>

            <b-tab title="Category">
              <div style="width: 100%">
                <b-row>
                  <b-col lg="6" class="my-1">
                    <b-button
                      class="mb-2"
                      style="border: none; background-color: #82DE3A"
                      v-b-modal.modal-2
                      @click="addCatButton()"
                    >Add Category</b-button>
                  </b-col>
                </b-row>
                <b-table
                  striped
                  responsive
                  hover
                  :items="category"
                  :fields="fieldsCategory"
                  style="text-align: center"
                >
                  <template #cell(actions)="data">
                    <b-button
                      class="mr-1"
                      v-b-modal.modal-2
                      @click="setCategory(data)"
                      variant="info"
                    >Edit</b-button>
                    <b-button
                      class="ml-1"
                      style="background: #d34d4d"
                      @click="showDelBoxCat(data)"
                    >Delete</b-button>
                  </template>
                </b-table>
              </div>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>

    <b-modal id="modal-1" :title="modalTitle" hide-footer>
      <b-form @submit="addProduct">
        <b-form-group label-cols-sm="3" label="Name" label-for="nested-name">
          <b-form-input id="nested-name" v-model="form.product_name"></b-form-input>
        </b-form-group>

        <b-form-group label-cols-sm="3" label="Image" label-for="nested-image">
          <b-form-input id="nested-image" v-model="form.product_image"></b-form-input>
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
        <b-button type="button" variant="primary" v-show="isUpdate" @click="patchProduct()">Update</b-button>
      </b-form>
    </b-modal>

    <b-modal id="modal-2" :title="modalTitle" hide-footer>
      <b-form @submit="addCategory">
        <b-form-group label-cols-sm="3" label="Name" label-for="nested-name">
          <b-form-input id="nested-name" v-model="formCategory.category_name"></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary" v-show="!isUpdate">Submit</b-button>
        <b-button type="button" variant="primary" v-show="isUpdate" @click="patchCategory()">Update</b-button>
      </b-form>
    </b-modal>

    <b-sidebar id="sidebar-backdrop" :title="msg" backdrop-variant="dark" backdrop shadow>
      <Sidebar />
    </b-sidebar>
  </b-container>
</template>

<script>
import axios from 'axios'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default {
  name: 'Setting',
  components: {
    Header,
    Sidebar
  },
  data() {
    return {
      greet: 'Welcome',
      user: 'Cashier #1',
      modalTitle: '',
      form: {
        category_id: '',
        product_name: '',
        product_price: '',
        product_status: 1
      },
      formCategory: {
        category_name: ''
      },
      fields: [
        // {
        //   key: 'ID',
        //   sortable: true
        // },
        {
          key: 'Name',
          sortable: true
        },
        {
          key: 'Image',
          sortable: false
        },
        {
          key: 'Price',
          sortable: true
        },
        {
          key: 'Category',
          sortable: true
        },
        {
          key: 'Created',
          sortable: true
        },
        {
          key: 'Updated',
          sortable: false
        },
        { key: 'actions', label: 'Actions' }
      ],
      fieldsCategory: [
        // { key: 'category_id', label: 'ID' },
        { key: 'category_name', label: 'Name' },
        { key: 'category_created_at', label: 'Created' },
        { key: 'category_updated_at', label: 'Updated' },
        { key: 'actions', label: 'Actions' }
      ],
      filter: null,
      product: [],
      category: [],
      productItem: [],
      categoryItem: [],
      productId: null,
      categoryId: null,
      isUpdate: false,
      page: 1,
      totalData: 0,
      limit: 8
    }
  },
  methods: {
    getProduct() {
      axios
        .get(`${process.env.VUE_APP_BASE_URL}/product?page=${this.page}&limit=100`)
        .then((response) => {
          this.product = response.data.data
          this.product.map(value => {
            const setProduct = {
              ID: value.product_id,
              Name: value.product_name,
              Image: value.product_image,
              Price: `Rp. ${value.product_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`,
              price: value.product_price,
              category_id: value.category_id,
              Category: value.category_name,
              Created: value.product_created_at.slice(0, 10),
              Updated: value.product_updated_at.slice(0, 10)
            }
            this.productItem = [...this.productItem, setProduct]
            this.totalData = response.data.pagination.totalData
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getCategory() {
      axios
        .get(`${process.env.VUE_APP_BASE_URL}/category`)
        .then((response) => {
          this.category = response.data.data
          this.category.map(value => {
            value.category_created_at = value.category_created_at.slice(0, 10)
            value.category_updated_at = value.category_updated_at.slice(0, 10)
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addButton() {
      this.form = {
        category_id: '',
        product_name: '',
        product_price: '',
        product_status: 1
      }
      this.modalTitle = 'Add Product'
      this.isUpdate = false
    },
    addCatButton() {
      this.formCategory = {
        category_name: ''
      }
      this.modalTitle = 'Add Category'
      this.isUpdate = false
    },
    addProduct() {
      axios
        .post(`${process.env.VUE_APP_BASE_URL}/product`, this.form)
        .then((response) => {
          this.getProduct()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    setProduct(data) {
      this.isUpdate = true
      this.modalTitle = 'Edit Product'
      this.form = {
        product_name: data.item.Name,
        product_image: data.item.Image,
        product_price: data.item.price,
        category_id: data.item.category_id
      }
      this.productId = data.item.ID
    },
    setCategory(data) {
      this.isUpdate = true
      this.modalTitle = 'Edit Category'
      this.formCategory = {
        category_name: data.item.category_name
      }
      this.categoryId = data.item.category_id
    },
    patchProduct() {
      axios
        .patch(`${process.env.VUE_APP_BASE_URL}/product/${this.productId}`, this.form)
        .then((response) => {
          this.isUpdate = false
          location.reload()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    patchCategory() {
      axios
        .patch(`${process.env.VUE_APP_BASE_URL}/category/${this.categoryId}`, this.formCategory)
        .then((response) => {
          this.isUpdate = false
          location.reload()
        })
        .catch((error) => {
          console.log(error)
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
      })
        .then(value => {
          if (value === true) {
            this.deleteProduct(data)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    showDelBoxCat(data) {
      this.$bvModal.msgBoxConfirm(`Are you sure want to delete ${data.item.category_name} ?`, {
        title: 'Delete Category',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
        .then(value => {
          if (value === true) {
            this.deleteCategory(data)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteProduct(data) {
      this.productId = data.item.ID
      axios
        .delete(`${process.env.VUE_APP_BASE_URL}/product/${this.productId}`)
        .then((response) => {
          location.reload()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    deleteCategory(data) {
      this.categoryId = data.item.category_id
      axios
        .delete(`${process.env.VUE_APP_BASE_URL}/category/${this.categoryId}`)
        .then((response) => {
          location.reload()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addCategory() {
      axios
        .post(`${process.env.VUE_APP_BASE_URL}/category`, this.formCategory)
        .then((response) => {
          this.getCategory()
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  created() {
    this.getProduct()
    this.getCategory()
  },
  computed: {
    msg: {
      get() {
        return `${this.greet}, ${this.user} !`
      }
    }
  }
}
</script>

<style scoped src="@/assets/css/style.css"></style>
