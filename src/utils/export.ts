export const exportFile = (fileStream: any, name: string) => {
  try {
    const downloadUrl = window.URL.createObjectURL(new Blob([fileStream]))
    const link = document.createElement('a')
    link.href = downloadUrl
    link.setAttribute('download', name)
    document.body.appendChild(link)
    link.click()
    link.remove()
  } catch (error) {
    throw new Error('exportFile', error as any)
  }
}
