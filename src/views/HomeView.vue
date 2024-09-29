<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCovidApi } from '@/composables/useCovidApi'
import LoadingComponent from '@/components/LoadingComponent.vue'

const { fetchDataList, fetchDataByCountry, covidData, loading, error } = useCovidApi()

const searchCountry = ref('')

const countrySearchTranslate: Record<string, string> = {
  'África do Sul': 'South Africa',
  'África do norte': 'North Africa',
  Austrália: 'Australia',
  Brasil: 'Brazil',
  'Estados Unidos': 'US',
  China: 'China',
  Índia: 'India',
  Japão: 'Japan',
  'Nova Zelândia': 'New Zealand',
  Alemanha: 'Germany',
  Itália: 'Italy',
  França: 'France',
  Espanha: 'Spain',
  'Reino Unido': 'United Kingdom',
  Canadá: 'Canada',
  Groenlândia: 'Greenland',
  Rússia: 'Russia',
  'Coreia do Sul': 'South Korea',
  'Coreia do Norte': 'North Korea',
  'Arábia Saudita': 'Saudi Arabia',
  'Emirados Árabes Unidos': 'United Arab Emirates'
}

const normalizeText = (text: string): string => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

const getCountryInEnglish = (input: string): string => {
  const normalizedInput = normalizeText(input)
  const country = Object.keys(countrySearchTranslate).find(
    (country) => normalizeText(country) === normalizedInput
  )
  return country ? countrySearchTranslate[country] : input
}

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
              @blur="handleSearch"
            />
            <span class="icon is-left">
              <i class="icon-search" />
            </span>
          </div>
        </div>
      </div>

      <div class="loading" v-if="loading">
        <p>Carregando</p>
        <loading-component color="#EF6160" />
      </div>

      <div v-if="error" class="error">{{ error }}</div>

      <ul v-if="covidData.length > 0" class="country-list">
        <li v-for="(report, index) in covidData" :key="index" class="box country-card">
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
              <p class="value">{{ report.fatality_rate }}%</p>
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
    .search-box {
      border-radius: 3px;
      position: relative;
      max-width: 645px;
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
      }
    }
  }

  .loading {
    text-align: center;
    margin-top: 40px;
    p {
      margin: 20px;
    }
  }

  .country-list {
    max-width: 645px;
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

        div {
          text-align: center;
          border-left: 1px solid #e7e7e7;
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
