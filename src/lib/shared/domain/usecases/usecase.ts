export abstract class Usecase<Params, Result> {
  abstract execute(params: Params): Promise<Result>;
}
