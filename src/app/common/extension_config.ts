export interface ExtensionConfig {
  basePackageName: string,
  applicationName: string,
  applicationNameCU: string,
  mainLibraryName: string,
  mainLibraryNameCU: string,
  mainLibraryNameUAll: string,
  librarys: LibraryObj[],
  type: any,
  idx: number
}
export interface LibraryObj {
  order: string,
  libraryType: string,
  libraryName: string,
  libraryNameUAll: string,
  libraryNameCU: string
}
export interface ChoiceOption {
  name: string,
  value: string
}
export interface Replace {
  source: string,
  target: string
}