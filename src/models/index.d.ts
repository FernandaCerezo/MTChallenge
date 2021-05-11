import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class UserData {
  readonly id: string;
  readonly name: string;
  readonly lastname: string;
  readonly username: string;
  readonly age?: number;
  readonly dogname: string;
  readonly breed: string;
  readonly dogage?: number;
  readonly description?: string;
  constructor(init: ModelInit<UserData>);
  static copyOf(source: UserData, mutator: (draft: MutableModel<UserData>) => MutableModel<UserData> | void): UserData;
}