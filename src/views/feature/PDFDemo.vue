<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Ref } from 'vue'
import { Download } from '@element-plus/icons-vue'
import imagesMap from '@/assets/images-import'
import generatePDF from '@/utils/pdf-export'

interface Image {
  name: string
  src: object
}
const imagesList = computed(() => {
  const images: Image[] = []
  imagesMap.forEach((value, key) => {
    images.push({ name: key, src: value })
  })
  return images
})

const cardList = ref<Ref | null>(null)

function exportPDF() {
  const el = cardList.value.$el
  generatePDF(el)
}

</script>

<template>
  <section class="page-container">
    <div class="pdf-operate-container">
      <el-button color="#626aef" :dark="true" :icon="Download" @click="exportPDF"
        >导出PDF</el-button
      >
    </div>
    <el-row ref="cardList" class="card-list" :gutter="16">
      <el-col v-for="item in imagesList" :key="item.name" :lg="8" :sm="12" :span="24" :offset="0">
        <el-card class="box-card">
          <el-image
            :src="item.src"
            alt="item.name"
            fit="cover"
            :preview-src-list="[item.src]"
            hide-on-click-modal
          />
          <div class="img-desc">
            <span class="img-name">{{ item.name }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>

<style lang="scss" scoped>
.pdf-operate-container {
  margin-bottom: 16px;
  display: grid;
  place-content: center end;
}

.card-list {
  .el-col {
    margin-bottom: 16px;
  }
}
</style>
