export const fileListToFilesUrl = (fileList: FileList | null): string[] => {
  if (!fileList) return []

  const filesUrl: string[] = []

  for (const file of fileList) {
    filesUrl.push(URL.createObjectURL(file))
  }

  return filesUrl
}

export const removeFile = (
  fileList: FileList | null,
  index: number
): File[] => {
  if (!fileList) return []
  const newFileList = Array.from(fileList)
  newFileList.splice(index, 1)
  return newFileList
}
