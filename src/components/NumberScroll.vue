<template>
  <div :class="`w-full overflow-hidden flex ${props?.notNeedCenter ? '' : 'justify-center'}`">
    <div v-for="index in numStr.length" class="overflow-hidden" :key="index">
      <span :class="`numbers-scroll-${numStr[index - 1]}`" class="inline-block">
        <label class="block">0</label>
        <label class="block" v-for="n in 10" :key="n">{{ n % 10 }}</label>
      </span>
    </div>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  num: number
  notNeedCenter: boolean
}
const props = withDefaults(defineProps<Props>(), {
  num: 0,
  notNeedCenter: false
})

let numStr = ref('')

watchEffect(
  // () => props.num,
  () => {
    numStr.value = props.num.toString().replace(/./g, '0')
    setTimeout(() => {
      numStr.value = props.num + ''
    }, 30)
  }
)
</script>
<style lang="less" scoped>
.current {
  border: 1px solid @primary-border-color;
}

.numbers-scroll-0 {
  animation: scrollNumber0 1.2s linear 1 normal;
}

.numbers-scroll-1 {
  margin-top: -2.5rem;
  animation: scrollNumber1 1.2s linear 1 normal;
}

.numbers-scroll-2 {
  margin-top: -5rem;
  animation: scrollNumber2 1.2s linear 1 normal;
}

.numbers-scroll-3 {
  margin-top: -7.5rem;
  animation: scrollNumber3 1.2s linear 1 normal;
}

.numbers-scroll-4 {
  margin-top: -10rem;
  animation: scrollNumber4 1.2s linear 1 normal;
}

.numbers-scroll-5 {
  margin-top: -12.5rem;
  animation: scrollNumber5 1.2s linear 1 normal;
}

.numbers-scroll-6 {
  margin-top: -15rem;
  animation: scrollNumber6 1.2s linear 1 normal;
}

.numbers-scroll-7 {
  margin-top: -17.5rem;
  animation: scrollNumber7 1.2s linear 1 normal;
}

.numbers-scroll-8 {
  margin-top: -20rem;
  animation: scrollNumber8 1.2s linear 1 normal;
}

.numbers-scroll-9 {
  margin-top: -22.5rem;
  animation: scrollNumber9 1.2s linear 1 normal;
}
</style>
<style lang="less">
@keyframes scrollNumber0 {
  0% {
    margin-top: 0;
  }

  to {
    margin-top: 0rem;
  }
}

@keyframes scrollNumber1 {
  0% {
    margin-top: 0;
  }

  to {
    margin-top: -2.5rem;
  }
}

@keyframes scrollNumber2 {
  0% {
    margin-top: 0;
  }

  to {
    margin-top: -5rem;
  }
}

@keyframes scrollNumber3 {
  0% {
    margin-top: 0;
  }

  to {
    margin-top: -7.5rem;
  }
}

@keyframes scrollNumber4 {
  0% {
    margin-top: 0;
  }

  to {
    margin-top: -10rem;
  }
}

@keyframes scrollNumber5 {
  0% {
    margin-top: 0;
  }

  to {
    margin-top: -12.5rem;
  }
}

@keyframes scrollNumber6 {
  0% {
    margin-top: 0;
  }

  to {
    margin-top: -15rem;
  }
}

@keyframes scrollNumber7 {
  0% {
    margin-top: 0;
  }

  to {
    margin-top: -17.5rem;
  }
}

@keyframes scrollNumber8 {
  0% {
    margin-top: 0;
  }

  to {
    margin-top: -20rem;
  }
}

@keyframes scrollNumber9 {
  0% {
    margin-top: 0;
  }

  to {
    margin-top: -22.5rem;
  }
}
</style>
