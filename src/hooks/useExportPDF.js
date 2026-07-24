import html2canvas from "html2canvas"
import jsPDF from "jspdf"

export default function useExportPDF(el, size = [210, 297]) {
  const loading = ref(false)

  const exportPDF = async (filename) => {
    try {
      loading.value = true
      const canvas = await html2canvas(unref(el).$el, {
        scale: 4,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
      })
      const imgData = canvas.toDataURL("image/jpeg", 1)
      const pdf = new jsPDF("p", "mm", size, true)
      // A4 纸张尺寸：210mm x 297mm
      const pdfWidth = size[0]
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width

      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const contentHeight = (pdfWidth / imgWidth) * imgHeight
      pdf.addImage(
        imgData,
        "JPEG",
        0,
        0,
        pdfWidth,
        contentHeight,
        undefined,
        "FAST"
      )
      pdf.save(`${filename}.pdf`)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    exportPDF,
  }
}
