export interface ExtensionConfig {
  basePackageName: string,
  applicationName: string,
  applicationNameCU: string,
  mainLibraryName: string,
  mainLibraryNameCU: string,
  mainLibraryNameUAll: string,
  librarys: LibraryObj[],
  type: any,
  idx: number,
  // dataModelSourceType: string,
  // dataModelFilePath: string,
  // dataModelBaseClassName: string,
  // dataModelSource: string,
  // dataModelPackageName: string

  presentationForLibrary:string,
  presentationBaseClassName:string,
  presentationBaseClassNameCU:string,
  presentationPackageName:string,
}
export interface LibraryObj {
  // order: number,
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