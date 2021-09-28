import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Wchat extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  jid: string;

  @property({
    type: 'number',
    required: true,
  })
  userid: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Wchat>) {
    super(data);
  }
}

export interface WchatRelations {
  // describe navigational properties here
}

export type WchatWithRelations = Wchat & WchatRelations;
