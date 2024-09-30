<template>
  <ul v-if="covidData.length > 0" class="country-list">
    <li v-for="(report, index) in sortedCovidData" :key="index" class="box country-card">
      <h3>{{ report.region.name }}</h3>
      <div class="stats-data">
        <div>
          <p class="total">Total de casos</p>
          <p class="value">{{ report.confirmed.toLocaleString('pt-BR') }}</p>
        </div>
        <div>
          <p class="total">Mortes</p>
          <p class="value">{{ report.deaths.toLocaleString() }}</p>
        </div>
        <div>
          <p class="total">Fatalidade</p>
          <p class="value">{{ (report.fatality_rate * 100).toFixed(2) }}%</p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { defineProps } from 'vue'
import type { CovidReport } from '@/types/CovidReport'

const props = defineProps<{
  covidData: CovidReport[]
  sortOrder: string
}>()

const sortedCovidData = computed(() => {
  if (props.sortOrder === 'alphabetical') {
    return [...props.covidData].sort((a, b) => a.region.name.localeCompare(b.region.name))
  } else if (props.sortOrder === 'deaths-asc') {
    return [...props.covidData].sort((a, b) => a.deaths - b.deaths)
  } else if (props.sortOrder === 'deaths-desc') {
    return [...props.covidData].sort((a, b) => b.deaths - a.deaths)
  }
  return props.covidData
})
</script>

<style lang="scss" scoped>
.country-list {
  max-width: 625px;
  margin: auto;

  .country-card {
    margin-top: 20px;
    padding: 20px;
    border-radius: 3px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    h3 {
      font-size: 1.6rem;
      font-weight: 700;
      font-style: italic;
      font-family: $font-family-spectral;
      margin-bottom: 30px;
      margin-top: 20px;
      text-align: center;
    }

    .stats-data {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      @media (max-width: 440px) {
        grid-template-columns: 1fr;
      }

      div {
        text-align: center;
        border-left: 1px solid #e7e7e7;
        @media (max-width: 440px) {
          border-left: none;
        }
        &:first-child {
          border-left: none;
        }
        p.total {
          font-size: 1rem;
          font-weight: 400;
          font-family: $font-family-spectral;
          color: $color-text;
          margin-bottom: 10px;
        }

        p.value {
          font-size: 1.2rem;
          font-weight: 700;
          font-style: italic;
          font-family: $font-family-spectral;
          color: $color-text-highlight;
        }
      }
    }
  }
}
</style>
