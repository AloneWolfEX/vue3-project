<script setup lang="ts">
import { RouterView, useRouter, useRoute } from 'vue-router'
import {
  Menu as IconMenu,
  Expand,
  Fold,
  Document,
  Setting,
  House,
  Sunny
} from '@element-plus/icons-vue'
import { ref, onMounted, watch, computed } from 'vue'

const router = useRouter()
const route = useRoute()

const isCollpase = ref<boolean>(false)
const indexActive = ref<string>('')

const menuData = computed(() => {
  return router.options.routes[0].children
})

onMounted(() => {
  indexActive.value = route.name
})

watch(
  () => route.name,
  (val) => {
    indexActive.value = val
  }
)

function menuSelect(index: string) {
  router.push({ name: index })
}
</script>

<template>
  <el-container class="app-content">
    <el-header>
      <h1 class="header-title">
        <el-icon class="is-loading"><Sunny /></el-icon>Vue3 Vite TS Demo
      </h1>
    </el-header>
    <el-container class="body-container">
      <el-aside :class="{ 'is-collapse': isCollpase }" width="200px">
        <div class="collpase-container" @click="isCollpase = !isCollpase">
          <el-icon v-if="isCollpase" size="18">
            <Expand />
          </el-icon>
          <el-icon v-else size="18">
            <Fold />
          </el-icon>
        </div>
        <el-menu
          active-text-color="#ffd04b"
          background-color="#27272a"
          class="el-menu-vertical-demo"
          :default-active="indexActive"
          text-color="#fff"
          :collapse="isCollpase"
          unique-opened
          @select="menuSelect"
        >
          <el-menu-item index="home">
            <el-icon>
              <House />
            </el-icon>
            <span>主页</span>
          </el-menu-item>

          <el-sub-menu v-for="item in menuData" :key="item.name" :index="item.name">
            <template #title>
              <el-icon>
                <IconMenu />
              </el-icon>
              <span>{{ item.meta.title }}</span>
            </template>
            <el-menu-item v-for="val in item.children" :key="val.name" :index="val.name">
              {{ val.meta.title }}
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>

      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.app-content {
  height: 100%;

  .el-header {
    position: absolute;
    display: grid;
    place-content: center start;
    width: 100%;
    color: var(--white-text);
    background-color: var(--bg-dark-theme);
    border-bottom: 1px solid var(--grey-border-box);

    .header-title {
      display: flex;
      place-items: center;
      .el-icon {
        margin-right: 10px;
      }
    }
  }

  .body-container {
    margin-top: 60px;
    height: calc(100% - 60px);

    .el-aside {
      color: var(--white-text);
      background-color: var(--bg-dark-theme);

      &.is-collapse {
        width: auto;
        .collpase-container {
          place-content: center;
        }
      }

      .collpase-container {
        display: flex;
        place-content: center end;
        padding-right: 2px;
        cursor: pointer;
      }

      .el-menu--vertical {
        border-right: 1px solid var(--bg-dark-theme);

        > :deep(li) {
          width: var(--el-aside-width);
        }
      }
    }
  }
}
</style>
