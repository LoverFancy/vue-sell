<template>
  <div class="tab">
    <cube-tab-bar
      :useTransition=false
      :showSlider=true
      v-model="selectedLabel"
      :data="tabs"
      ref="tabBar"
      class="border-bottom-1px"
    >
    </cube-tab-bar>
    <div class="slide-wrapper">
      <cube-slide
        :loop=false
        :auto-play=false
        :show-dots=false
        :initial-index="index"
        ref="slide"
        :options="slideOptions"
        @scroll="onScroll"
        @change="onChange"
      >
        <cube-slide-item v-for="(tab,index) in tabs" :key="index">
          <!-- 动态组件 -->
          <component ref="component" :is="tab.component" :data="tab.data"></component>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'tab',
    props: {
      tabs: {
        type: Array,
        default() {
          return []
        }
      },
      initialIndex: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        index: this.initialIndex,
        slideOptions: {
          listenScroll: true,
          probeType: 3,
          // 为了支持横向和纵向滚动且防止斜向滚动
          directionLockThreshold: 0
        }
      }
    },
    computed: {
      selectedLabel: {
        get() {
          return this.tabs[this.index].label
        },
        // 尖酸当前的index，以作为切换下方slider
        set(newVal) {
          this.index = this.tabs.findIndex((value) => {
            return value.label === newVal
          })
        }
      }
    },
    mounted() {
      // 初始调用获取数据
      this.onChange(this.index)
    },
    methods: {
      onScroll(pos) {
        // 获取宽度
        const tabBarWidth = this.$refs.tabBar.$el.clientWidth
        const slideWidth = this.$refs.slide.slide.scrollerWidth
        // slider横向滚动距离
        const transform = -pos.x / slideWidth * tabBarWidth
        // 设置滚动
        this.$refs.tabBar.setSliderTransform(transform)
      },
      onChange(current) {
        this.index = current
        // 拿到组件实例
        const instance = this.$refs.component[current]
        if (instance && instance.fetch) {
          // 调用组件fetch方法获取数据
          instance.fetch()
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .tab
    display: flex
    flex-direction: column
    height: 100%
    >>> .cube-tab
      padding: 10px 0
    .slide-wrapper
      flex: 1
      overflow: hidden
</style>
