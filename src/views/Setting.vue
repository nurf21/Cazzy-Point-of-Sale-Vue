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
              <Product />
            </b-tab>
            <b-tab title="Category">
              <Category />
            </b-tab>
            <b-tab title="User">
              <User />
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>
    <Sidebar />
  </b-container>
</template>

<script>
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Product from '@/components/Product'
import Category from '@/components/Category'
import User from '@/components/User'

export default {
  name: 'Setting',
  components: {
    Header,
    Sidebar,
    Product,
    Category,
    User
  }
}
</script>

<style scoped src="@/assets/css/style.css"></style>
