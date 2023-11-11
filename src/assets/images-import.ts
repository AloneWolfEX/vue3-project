/**
 * 批量导入
 * eager：直接引入不开启懒加载
 * as: 'url'|'raw'
 */
const imagesMap = new Map()
const modules = import.meta.glob('./images/*.*', { as: 'url', eager: true })

for (const key in modules) {
    const name = key.slice(key.lastIndexOf('/') + 1, key.lastIndexOf('.'))
    imagesMap.set(name, modules[key])
}

export default imagesMap