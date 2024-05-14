export interface ModelEntityAdapter<Model, Entity> {
  toEntity(model: Model): Entity;
}
