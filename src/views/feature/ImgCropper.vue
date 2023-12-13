<script setup lang="ts">
import 'vue-cropper/dist/index.css'
import { VueCropper }  from "vue-cropper";
import ImgCutter from 'vue-img-cutter'

import { ref, reactive } from 'vue'
import { genFileId } from 'element-plus'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import type { UploadInstance, UploadProps, UploadRawFile, UploadFile } from 'element-plus'

const upload = ref<UploadInstance>()
const dialogImageUrl = ref('')
const options = reactive({
		img: 'https://avatars2.githubusercontent.com/u/15681693?s=460&v=4',
		size: 1,
		full: false,
		outputType: 'png',
		autoCrop: true,
		canMove: true,
		canMoveBox: true,
		canScale: true,
		fixedBox: false,
		original: false,
		// 只有自动截图开启 宽度高度才生效
		// autoCropWidth: 300,
		// autoCropHeight: 250,
		centerBox: true,
		high: true,
		maxImgSize: 1920,
		max: 99999,
		bounding: '500px 300px',
})
const dialogVisible = ref(false)
const disabled = ref(false)

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const submitUpload = () => {
  upload.value!.submit()
}

const handleRemove = (file: UploadFile) => {
  console.log(file)
}

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
	options.img = ''
  dialogVisible.value = true
}

const handleDownload = (file: UploadFile) => {
  console.log(file)
	options.img = file.url!
	dialogImageUrl.value = ''
	dialogVisible.value = true

}

const cutDown = (): void => {
}
</script>

<template>
    <section class="img-cropper page-container">
				<div class="upload-container">
					<el-upload
						ref="upload"
						class="upload-demo"
						action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
						:limit="1"
						accept=".jpg,.png,.gif"
						list-type="picture-card"
						:on-exceed="handleExceed"
						:auto-upload="false"
					>
						<el-icon><Plus /></el-icon>
						<template #file="{ file }">
							<div>
								<img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
								<span class="el-upload-list__item-actions">
									<span
										class="el-upload-list__item-preview"
										@click="handlePictureCardPreview(file)"
									>
										<el-icon><zoom-in /></el-icon>
									</span>
									<span
										v-if="!disabled"
										class="el-upload-list__item-delete"
										@click="handleDownload(file)"
									>
										<el-icon><Download /></el-icon>
									</span>
									<span
										v-if="!disabled"
										class="el-upload-list__item-delete"
										@click="handleRemove(file)"
									>
										<el-icon><Delete /></el-icon>
									</span>
								</span>
							</div>
						</template>
						<template #tip>
							<div class="el-upload__tip text-red">
								limit 1 file, new file will cover the old file
							</div>
						</template>
					</el-upload>
				</div>

				<el-dialog v-model="dialogVisible" destroy-on-close>
					<el-image v-if="dialogImageUrl" :src="dialogImageUrl" :fit="'contain'" />
					<div class="cropper-container" v-else>
						<vueCropper v-bind="options"></vueCropper>
						<!-- <ImgCutter v-on:cutDown="cutDown">
								<template #open>
										<button>Choose image</button>
								</template>
						</ImgCutter> -->
					</div>
				</el-dialog>
    </section>
</template>

<style lang="scss" scoped>
.cropper-container {
	position: relative;
	width: 800px;
	height: 500px;
}
</style>
