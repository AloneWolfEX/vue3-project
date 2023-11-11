import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

async function getCanvas(el) {
  const scale = window.devicePixelRatio * 2 //2 // 放大2倍

  const option = {
    scale,
    useCORS: true
  }

  const canvas = await html2canvas(el, option)
  const url = canvas.toDataURL('image/jpeg', 1.0) // 0-1 清晰度
  return { canvasData: url }
}

async function generatePDF(el, fileName = 'download.pdf') {
  const A4_WIDTH = 595
  const A4_HEIGHT = 842
  const PAGE_MARGIN = 10 // 间距

  const pdf = new jsPDF({
    orientation: 'p',
    unit: 'pt',
    format: 'a4'
  })
  // PDF 页面宽高
  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = pdf.internal.pageSize.getHeight()
  // PDF 内容宽高
  const pdfContentW = pdfWidth - PAGE_MARGIN * 2
  const pdfContentH = pdfHeight - PAGE_MARGIN * 2
  // 分页 Y 坐标
  let startY = PAGE_MARGIN

  // Text 文本处理
  function handleText(text) {
    const splitText = pdf.splitTextToSize(text, pdfContentW)
    splitText.forEach((lineText) => {
      // 每行文本高度
      const lineHeight = pdf.getTextDimensions(lineText).h
      // 当前开始 Y 坐标再加一行文本后的高度大于 PDF 页内容高度则新增页
      if (startY + lineHeight > pdfContentH) {
        pdf.addPage()
        startY = PAGE_MARGIN // 重置
      }
      pdf.text(lineText, PAGE_MARGIN, startY + lineHeight / 2)
      startY += lineHeight
    })
    startY += PAGE_MARGIN
  }

  /**
   * Table 表格处理
   * @param {Array} headers [['name1', 'name2', 'name3']]
   * @param {Array} tableData [item.name1, item.name2, item.name3]
   */
  function handleTable(headers, tableData) {
    pdf.autoTable({
        head: headers,
        body: tableData,
        startY,
        pageBreak: 'auto', // 自动分页
    })
    // 表格渲染结束的 Y 坐标
    const tableY = pdf.lastAutoTable.finalY
    startY = tableY + PAGE_MARGIN
  }

  // 渲染的元素图片 canvas
  const { canvasData } = await getCanvas(el)
  // dom 元素的宽高
  const { clientWidth: elWidth, clientHeight: elHeight } = el
  // 缩放比例
  const widthRatio = pdfContentW / elWidth
  const heightRatio = pdfContentH / elHeight
  // 宽高比例取最大为准
  const ratio = Math.max(widthRatio, heightRatio)
  // 缩放后图片宽高
  const width = elWidth * ratio
  const height = elHeight * ratio
  let leftHeight = height // 剩余 html 高度

  if (leftHeight < pdfContentH) {
    // 不超过一页
    pdf.addImage(canvasData, 'JPEG', PAGE_MARGIN, startY, width, height)
  } else {
    while (leftHeight > 0) {
      pdf.addImage(canvasData, 'JPEG', PAGE_MARGIN, startY, width, height)
      leftHeight -= pdfContentH
      startY = startY - pdfHeight
      // 剩余高度 > 0, 新增 PDF 页
      if (leftHeight > 0) {
        pdf.addPage()
      }
    }
  }

  return pdf.save(fileName)
}

export default generatePDF
