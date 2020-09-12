<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12" class="header">
        <Header text="Statistic" />
      </b-col>
    </b-row>

    <b-row class="statistic-container">
      <b-col cols="12" class="statistic-content">
        <Card />
        <Revenue />
        <Recent />
      </b-col>
    </b-row>
    <Sidebar />
  </b-container>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import Card from '@/components/Card'
import Revenue from '@/components/Revenue'
import Recent from '@/components/Recent'

export default {
  name: 'Statistic',
  components: {
    Sidebar,
    Header,
    Card,
    Revenue,
    Recent
  }
}
</script>

<style scoped src="@/assets/css/style.css"></style>
