<template>
  <div class="search-box__wrap">
    <div class="box search-box">
      <h2 class="title is-4">Filtrar dados sobre um país</h2>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Digite o nome do país"
          :value="modelValue"
          @input="handleInput"
          @keyup.enter="onSearch"
        />
        <span class="icon is-left">
          <i class="icon-search" />
        </span>
        <span class="btn-all">
          <button v-if="showBtnAll && !showBtnSearch" @click="onAll">Todos</button>
          <button v-if="showBtnSearch" @click="onSearch">Buscar</button>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: String
})

const emit = defineEmits(['update:modelValue', 'search', 'all'])

const onSearch = () => {
  emit('search')
}

const onAll = () => {
  emit('all')
}

const handleInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

const showBtnAll = computed(() => !props.modelValue || props.modelValue.length === 0)
const showBtnSearch = computed(() => props.modelValue && props.modelValue.length > 0)
</script>

<style lang="scss" scoped>
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
</style>
