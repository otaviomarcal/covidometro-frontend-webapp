<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useCovidApi } from '@/composables/useCovidApi'
import LoadingComponent from '@/components/LoadingComponent.vue'
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
    const countryToSearch = getCountryInEnglish(searchCountry.value.trim())
    fetchDataByCountry(countryToSearch)
  } else {
    fetchDataList(['ZAF', 'AUS', 'BRA', 'USA', 'CHN'])
  }
  searchCountry.value = ''
}

const showBtnAll = computed(() => covidData.value.length <= 1)
const showBtnSearch = computed(() => searchCountry.value.length > 0)

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
        <div class="box search-box">
          <h2 class="title is-4">Filtrar dados sobre um país</h2>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Digite o nome do país"
              v-model="searchCountry"
              @keyup.enter="handleSearch"
            />
            <span class="icon is-left">
              <i class="icon-search" />
            </span>
            <span class="btn-all">
              <button v-if="showBtnAll && !showBtnSearch" @click="handleAll">Todos</button>
              <button v-if="showBtnSearch" @click="handleSearch">Buscar</button>
            </span>
          </div>
        </div>
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

      <ul v-if="sortedCovidData.length > 0" class="country-list">
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
        @media screen and (max-width: 460px) {
          font-size: 0.8rem;
        }
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
    .search-box {
      border-radius: 3px;
      position: relative;
      max-width: 625px;
      z-index: 10;
      margin: auto;
      padding: 40px;
      margin-top: -100px;
      @media screen and (max-width: 970px) {
        margin-top: -50px;
      }
      @media screen and (max-width: 900px) {
        margin-top: -10px;
      }
      @media screen and (max-width: 886px) {
        margin-top: 20px;
      }

      .title {
        text-align: center;
        font-weight: 700;
        font-style: italic;
        font-family: $font-family-spectral;
        font-size: 1.6rem;
        margin-bottom: 30px;
        @media screen and (max-width: 460px) {
          font-size: 1.3rem;
        }
      }

      .control {
        position: relative;

        input[type='text'] {
          width: 100%;
          border-bottom: 1px solid $color-border;
          padding: 5px 5px 5px 30px;
          &::placeholder {
            color: $color-text-placeholder;
          }
        }

        .icon {
          .icon-search {
            display: block;
            width: 17px;
            height: 16px;
            background: url('@/assets/images/icon-search.png') no-repeat;
          }
          &.is-left {
            position: absolute;
            bottom: 10px;
            left: 0;
            color: $color-text-placeholder;
          }
        }

        .btn-all {
          position: absolute;
          right: 10px;
          bottom: 10px;
          button {
            background: none;
            border: none;
            color: $color-text-highlight;
            font-size: 0.8rem;
            cursor: pointer;
          }
        }
      }
    }
  }

  .filters {
    max-width: 625px;
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
}
</style>
