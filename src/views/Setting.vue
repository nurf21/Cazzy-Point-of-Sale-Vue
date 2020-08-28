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
                      style="border: none; background-color: #82DE3A"
                      v-b-modal.modal-1
                      @click="modalTitle = 'Add Product'"
                    >Create</b-button>
                  </b-col>
                  <b-col lg="6" class="my-1">
                    <b-form-group>
                      <b-input-group size="sm">
                        <b-form-input v-model="filter" type="search" placeholder="Type to Search"></b-form-input>
                        <b-input-group-append>
                          <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                        </b-input-group-append>
                      </b-input-group>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-table
                  id="product-table"
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
                    <b-button class="mr-1" v-b-modal.modal-1 @click="setProduct(data)">Edit</b-button>
                    <b-button class="ml-1" @click="deleteProduct(data)">Delete</b-button>
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
                    <b-form-group>
                      <b-input-group size="sm">
                        <b-form-input v-model="filter" type="search" placeholder="Type to Search"></b-form-input>
                        <b-input-group-append>
                          <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                        </b-input-group-append>
                      </b-input-group>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-table
                  id="product-table"
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
                  <template #cell(actions)>
                    <b-button class="mr-1">Edit</b-button>
                    <b-button class="ml-1">Delete</b-button>
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
  name: 'Home',
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
      fields: [
        {
          key: 'ID',
          sortable: true
        },
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
      filter: null,
      product: [],
      category: [],
      productItem: [],
      productId: null,
      isUpdate: false,
      page: 1,
      totalData: 0,
      limit: 8
    }
  },
  methods: {
    getProduct() {
      axios
        .get(`http://127.0.0.1:3001/product?page=${this.page}&limit=100`)
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
        .get('http://127.0.0.1:3001/category')
        .then((response) => {
          this.category = response.data.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addProduct() {
      axios
        .post('http://127.0.0.1:3001/product', this.form)
        .then((response) => {
          this.get_product()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    setProduct(data) {
      this.isUpdate = true
      this.form = {
        product_name: data.item.Name,
        product_image: data.item.Image,
        product_price: data.item.price,
        category_id: data.item.category_id
      }
      this.product_id = data.item.ID
    },
    patchProduct() {
      axios
        .patch(`http://127.0.0.1:3001/product/${this.product_id}`, this.form)
        .then((response) => {
          this.isUpdate = false
          location.reload()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    deleteProduct(data) {
      this.product_id = data.item.ID
      axios
        .delete(`http://127.0.0.1:3001/product/${this.product_id}`)
        .then((response) => {
          this.isUpdate = false
          location.reload()
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
