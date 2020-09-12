<template>
  <b-row class="recent">
    <b-col cols="6" style="margin-top: 20px">
      <p style="font-size: 30px;">Recent Order</p>
    </b-col>
    <b-col cols="6" style="text-align: end; margin-top: 20px">
      <b-dropdown id="dropdown-1" :text="recentGroup" class="m-md-2">
        <b-dropdown-item @click="getRecent('today')">Today</b-dropdown-item>
        <b-dropdown-item @click="getRecent('week')">This Week</b-dropdown-item>
        <b-dropdown-item @click="getRecent('month')">This Month</b-dropdown-item>
      </b-dropdown>
    </b-col>
    <div style="width: 100%">
      <b-table
        id="my-table"
        responsive
        striped
        hover
        :items="recentOrder"
        :per-page="perPage"
        :current-page="currentPage"
        style="text-align: center"
      ></b-table>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        align="center"
        aria-controls="my-table"
      ></b-pagination>
    </div>
  </b-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Recent',
  data() {
    return {
      perPage: 5,
      currentPage: 1
    }
  },
  methods: {
    ...mapActions(['getRecent'])
  },
  computed: {
    ...mapGetters({ recentOrder: 'getRecentOrder', recentGroup: 'getRecentGroup', rows: 'getRows' })
  },
  created() {
    this.getRecent('today')
  }
}
</script>

<style scoped src="@/assets/css/style.css"></style>
