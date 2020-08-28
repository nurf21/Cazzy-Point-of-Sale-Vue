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
              <div>
                <b-table
                  id="product-table"
                  striped
                  hover
                  :items="productItem"
                  :fields="fields"
                  :per-page="limit"
                  :current-page="page"
                  style="text-align: center"
                ></b-table>
                <b-pagination
                  v-model="page"
                  :total-rows="totalData"
                  :per-page="limit"
                  align="center"
                  class="my-0"
                  aria-controls="product-table"
                ></b-pagination>
              </div>
            </b-tab>
            <b-tab title="Tab 2">
              <b-card-text>Tab contents 2</b-card-text>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>

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
        {
          key: 'Actions',
          sortable: false
        }
      ],
      product: [],
      productItem: [],
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
              Category: value.category_name,
              Created: value.product_created_at.slice(0, 10),
              Updated: value.product_updated_at.slice(0, 10),
              Actions: 'Edit | Delete'
            }
            this.productItem = [...this.productItem, setProduct]
            this.totalData = response.data.pagination.totalData
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  created() {
    this.getProduct()
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
