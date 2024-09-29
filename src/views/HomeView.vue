<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useCovidApi } from '@/composables/useCovidApi'
import LoadingComponent from '@/components/LoadingComponent.vue'
import SearchComponent from '@/components/SearchComponent.vue'
import CountryListComponent from '@/components/ListCountryComponent.vue'
import { getCountryInEnglish } from '@/utils/CountryUtils'

const { fetchDataList, fetchDataByCountry, covidData, loading, error } = useCovidApi()
const searchCountry = ref('')
const sortOrder = ref('alphabetical')

const sortedCovidData = computed(() => {
  if (sortOrder.value === 'alphabetical') {
    return [...covidData.value].sort((a, b) => a.region.name.localeCompare(b.region.name))
  } else if (sortOrder.value === 'deaths-asc') {
    return [...covidData.value].sort((a, b) => a.deaths - b.deaths)
  } else if (sortOrder.value === 'deaths-desc') {
    return [...covidData.value].sort((a, b) => b.deaths - a.deaths)
  }
  return covidData.value
})

onMounted(() => {
  fetchDataList(['ZAF', 'AUS', 'BRA', 'USA', 'CHN'])
})

const handleSearch = () => {
  covidData.value = []
  if (searchCountry.value) {
    const countryToSearch = getCountryInEnglish(searchCountry.value)
    fetchDataByCountry(countryToSearch)
  } else {
    fetchDataList(['ZAF', 'AUS', 'BRA', 'USA', 'CHN'])
  }
  searchCountry.value = ''
}

const handleAll = () => {
  covidData.value = []
  searchCountry.value = ''
  fetchDataList(['ZAF', 'AUS', 'BRA', 'USA', 'CHN'])
}
</script>

<template>
  <section class="section section-hero">
    <div class="container">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="title">Conheça o Covidômetro</h1>
          <p class="subtitle">
            Fique atualizado com velocidade e transparência. O Covidômetro é uma ferramenta que
            mostra para você em tempo real o número de casos e óbitos relacionados à pandemia da
            COVID-19 ao redor do mundo.
          </p>
        </div>
        <div class="hero-image">
          <img src="@/assets/images/doctors.png" alt="Imagem de médicos" />
        </div>
      </div>

      <div class="search-box__wrap">
        <SearchComponent v-model="searchCountry" @search="handleSearch" @all="handleAll" />
      </div>

      <div v-if="sortedCovidData.length > 1" class="filters">
        <label for="sort-order">Ordenar:</label>
        <select id="sort-order" v-model="sortOrder">
          <option value="alphabetical">Ordem Alfabética</option>

          <option value="deaths-asc">Menor ⬇️ de mortes</option>
          <option value="deaths-desc">Maior ⬆️ de mortes</option>
        </select>
      </div>

      <div class="loading" v-if="loading">
        <p>Carregando</p>
        <loading-component color="#EF6160" />
      </div>

      <div v-if="error" class="error">{{ error }}</div>

      <CountryListComponent :covidData="covidData" :sortOrder="sortOrder" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.section-hero {
  padding: 50px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .hero-content {
    max-width: 1220px;
    display: flex;
    justify-content: space-evenly;
    padding: 0 20px;

    .hero-text {
      max-width: 550px;
      align-self: flex-start;
      margin-top: 8%;
      h1.title {
        font-size: 3rem;
        font-family: $font-family-spectral;
        font-style: italic;
        font-weight: 700;
        margin-bottom: 20px;
        color: $color-text;
        line-height: 1em;
        @media (max-width: 768px) {
          font-size: 4rem;
        }
        @media (max-width: 376px) {
          font-size: 2.5rem;
        }
      }
      p.subtitle {
        font-size: 1rem;
        font-weight: 400;
        font-family: $font-family-ubuntu;
        color: $color-text;
      }
    }

    .hero-image {
      text-align: right;
      @media (max-width: 768px) {
        display: none;
      }
    }
  }

  .search-box__wrap {
  }

  .filters {
    max-width: 645px;
    margin: auto;
    margin-top: 20px;
    text-align: right;
    font-size: 0.8em;
    label {
      font-size: 0.8rem;
      font-weight: 700;
      font-family: $font-family-spectral;
      color: $color-text;
      margin-right: 10px;
    }
    select {
      padding: 5px;
      border-radius: 3px;
      border: 1px solid $color-border;
    }
  }

  .loading {
    text-align: center;
    margin-top: 40px;
    p {
      margin: 20px;
    }
  }

  .error {
    text-align: center;
    margin-top: 40px;
    color: $color-text-highlight;
  }
}
</style>
