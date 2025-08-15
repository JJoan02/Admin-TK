// src/queries/GetUserQuery.js

import { Query } from '../core/QueryBus.js';

export class GetUserQuery extends Query {
  constructor(userId) {
    super();
    this.userId = userId;
  }
}
