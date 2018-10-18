export abstract class AbstractModel {
  public toModel() {
    const model: any = this;
    model._id = model.id;
    delete model.id;
    return model;
  }

  public toResponse() {
    const response = this;
    delete (response as any).createdOn;
    delete (response as any).updatedOn;
    delete (response as any).__v;
    delete (response as any)._id;
    return response;
  }
}

export default AbstractModel;
