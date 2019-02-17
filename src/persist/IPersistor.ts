export default interface IPersistor {
  save(data: any): Promise<void>
}
