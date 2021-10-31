export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The DateTime scalar type represents date and time as a string in RFC3339 format.
   * For example: "1985-04-12T23:20:50.52Z" represents 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC.
   */
  DateTime: any;
  /**
   * The Int64 scalar type represents a signed 64‐bit numeric non‐fractional value.
   * Int64 can represent values in range [-(2^63),(2^63 - 1)].
   */
  Int64: any;
};

export type AddHabitInput = {
  name: Scalars['String'];
  user: UserRef;
  userId: Scalars['String'];
};

export type AddHabitPayload = {
  __typename?: 'AddHabitPayload';
  habit?: Maybe<Array<Maybe<Habit>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type AddHabitPayloadHabitArgs = {
  filter?: Maybe<HabitFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<HabitOrder>;
};

export type AddUserInput = {
  habits?: Maybe<Array<Maybe<HabitRef>>>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

export type AddUserPayload = {
  __typename?: 'AddUserPayload';
  numUids?: Maybe<Scalars['Int']>;
  user?: Maybe<Array<Maybe<User>>>;
};


export type AddUserPayloadUserArgs = {
  filter?: Maybe<UserFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<UserOrder>;
};

export type AuthRule = {
  and?: Maybe<Array<Maybe<AuthRule>>>;
  not?: Maybe<AuthRule>;
  or?: Maybe<Array<Maybe<AuthRule>>>;
  rule?: Maybe<Scalars['String']>;
};

export type ContainsFilter = {
  point?: Maybe<PointRef>;
  polygon?: Maybe<PolygonRef>;
};

export type CustomHttp = {
  body?: Maybe<Scalars['String']>;
  forwardHeaders?: Maybe<Array<Scalars['String']>>;
  graphql?: Maybe<Scalars['String']>;
  introspectionHeaders?: Maybe<Array<Scalars['String']>>;
  method: HttpMethod;
  mode?: Maybe<Mode>;
  secretHeaders?: Maybe<Array<Scalars['String']>>;
  skipIntrospection?: Maybe<Scalars['Boolean']>;
  url: Scalars['String'];
};

export type DateTimeFilter = {
  between?: Maybe<DateTimeRange>;
  eq?: Maybe<Scalars['DateTime']>;
  ge?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  le?: Maybe<Scalars['DateTime']>;
  lt?: Maybe<Scalars['DateTime']>;
};

export type DateTimeRange = {
  max: Scalars['DateTime'];
  min: Scalars['DateTime'];
};

export type DeleteHabitPayload = {
  __typename?: 'DeleteHabitPayload';
  habit?: Maybe<Array<Maybe<Habit>>>;
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};


export type DeleteHabitPayloadHabitArgs = {
  filter?: Maybe<HabitFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<HabitOrder>;
};

export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
  user?: Maybe<Array<Maybe<User>>>;
};


export type DeleteUserPayloadUserArgs = {
  filter?: Maybe<UserFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<UserOrder>;
};

export enum DgraphIndex {
  Bool = 'bool',
  Day = 'day',
  Exact = 'exact',
  Float = 'float',
  Fulltext = 'fulltext',
  Geo = 'geo',
  Hash = 'hash',
  Hour = 'hour',
  Int = 'int',
  Int64 = 'int64',
  Month = 'month',
  Regexp = 'regexp',
  Term = 'term',
  Trigram = 'trigram',
  Year = 'year'
}

export type FloatFilter = {
  between?: Maybe<FloatRange>;
  eq?: Maybe<Scalars['Float']>;
  ge?: Maybe<Scalars['Float']>;
  gt?: Maybe<Scalars['Float']>;
  in?: Maybe<Array<Maybe<Scalars['Float']>>>;
  le?: Maybe<Scalars['Float']>;
  lt?: Maybe<Scalars['Float']>;
};

export type FloatRange = {
  max: Scalars['Float'];
  min: Scalars['Float'];
};

export type GenerateMutationParams = {
  add?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
  update?: Maybe<Scalars['Boolean']>;
};

export type GenerateQueryParams = {
  aggregate?: Maybe<Scalars['Boolean']>;
  get?: Maybe<Scalars['Boolean']>;
  password?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Scalars['Boolean']>;
};

export enum HttpMethod {
  Delete = 'DELETE',
  Get = 'GET',
  Patch = 'PATCH',
  Post = 'POST',
  Put = 'PUT'
}

export type Habit = {
  __typename?: 'Habit';
  id: Scalars['ID'];
  name: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};


export type HabitUserArgs = {
  filter?: Maybe<UserFilter>;
};

export type HabitAggregateResult = {
  __typename?: 'HabitAggregateResult';
  count?: Maybe<Scalars['Int']>;
  nameMax?: Maybe<Scalars['String']>;
  nameMin?: Maybe<Scalars['String']>;
  userIdMax?: Maybe<Scalars['String']>;
  userIdMin?: Maybe<Scalars['String']>;
};

export type HabitFilter = {
  and?: Maybe<Array<Maybe<HabitFilter>>>;
  has?: Maybe<Array<Maybe<HabitHasFilter>>>;
  id?: Maybe<Array<Scalars['ID']>>;
  name?: Maybe<StringFullTextFilter>;
  not?: Maybe<HabitFilter>;
  or?: Maybe<Array<Maybe<HabitFilter>>>;
  userId?: Maybe<StringHashFilter>;
};

export enum HabitHasFilter {
  Name = 'name',
  User = 'user',
  UserId = 'userId'
}

export type HabitOrder = {
  asc?: Maybe<HabitOrderable>;
  desc?: Maybe<HabitOrderable>;
  then?: Maybe<HabitOrder>;
};

export enum HabitOrderable {
  Name = 'name',
  UserId = 'userId'
}

export type HabitPatch = {
  name?: Maybe<Scalars['String']>;
  user?: Maybe<UserRef>;
  userId?: Maybe<Scalars['String']>;
};

export type HabitRef = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  user?: Maybe<UserRef>;
  userId?: Maybe<Scalars['String']>;
};

export type Int64Filter = {
  between?: Maybe<Int64Range>;
  eq?: Maybe<Scalars['Int64']>;
  ge?: Maybe<Scalars['Int64']>;
  gt?: Maybe<Scalars['Int64']>;
  in?: Maybe<Array<Maybe<Scalars['Int64']>>>;
  le?: Maybe<Scalars['Int64']>;
  lt?: Maybe<Scalars['Int64']>;
};

export type Int64Range = {
  max: Scalars['Int64'];
  min: Scalars['Int64'];
};

export type IntFilter = {
  between?: Maybe<IntRange>;
  eq?: Maybe<Scalars['Int']>;
  ge?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  le?: Maybe<Scalars['Int']>;
  lt?: Maybe<Scalars['Int']>;
};

export type IntRange = {
  max: Scalars['Int'];
  min: Scalars['Int'];
};

export type IntersectsFilter = {
  multiPolygon?: Maybe<MultiPolygonRef>;
  polygon?: Maybe<PolygonRef>;
};

export enum Mode {
  Batch = 'BATCH',
  Single = 'SINGLE'
}

export type MultiPolygon = {
  __typename?: 'MultiPolygon';
  polygons: Array<Polygon>;
};

export type MultiPolygonRef = {
  polygons: Array<PolygonRef>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addHabit?: Maybe<AddHabitPayload>;
  addUser?: Maybe<AddUserPayload>;
  deleteHabit?: Maybe<DeleteHabitPayload>;
  deleteUser?: Maybe<DeleteUserPayload>;
  updateHabit?: Maybe<UpdateHabitPayload>;
  updateUser?: Maybe<UpdateUserPayload>;
};


export type MutationAddHabitArgs = {
  input: Array<AddHabitInput>;
};


export type MutationAddUserArgs = {
  input: Array<AddUserInput>;
  upsert?: Maybe<Scalars['Boolean']>;
};


export type MutationDeleteHabitArgs = {
  filter: HabitFilter;
};


export type MutationDeleteUserArgs = {
  filter: UserFilter;
};


export type MutationUpdateHabitArgs = {
  input: UpdateHabitInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type NearFilter = {
  coordinate: PointRef;
  distance: Scalars['Float'];
};

export type Point = {
  __typename?: 'Point';
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type PointGeoFilter = {
  near?: Maybe<NearFilter>;
  within?: Maybe<WithinFilter>;
};

export type PointList = {
  __typename?: 'PointList';
  points: Array<Point>;
};

export type PointListRef = {
  points: Array<PointRef>;
};

export type PointRef = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type Polygon = {
  __typename?: 'Polygon';
  coordinates: Array<PointList>;
};

export type PolygonGeoFilter = {
  contains?: Maybe<ContainsFilter>;
  intersects?: Maybe<IntersectsFilter>;
  near?: Maybe<NearFilter>;
  within?: Maybe<WithinFilter>;
};

export type PolygonRef = {
  coordinates: Array<PointListRef>;
};

export type Query = {
  __typename?: 'Query';
  aggregateHabit?: Maybe<HabitAggregateResult>;
  aggregateUser?: Maybe<UserAggregateResult>;
  getHabit?: Maybe<Habit>;
  getUser?: Maybe<User>;
  queryHabit?: Maybe<Array<Maybe<Habit>>>;
  queryUser?: Maybe<Array<Maybe<User>>>;
};


export type QueryAggregateHabitArgs = {
  filter?: Maybe<HabitFilter>;
};


export type QueryAggregateUserArgs = {
  filter?: Maybe<UserFilter>;
};


export type QueryGetHabitArgs = {
  id: Scalars['ID'];
};


export type QueryGetUserArgs = {
  id: Scalars['String'];
};


export type QueryQueryHabitArgs = {
  filter?: Maybe<HabitFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<HabitOrder>;
};


export type QueryQueryUserArgs = {
  filter?: Maybe<UserFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<UserOrder>;
};

export type StringExactFilter = {
  between?: Maybe<StringRange>;
  eq?: Maybe<Scalars['String']>;
  ge?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
  le?: Maybe<Scalars['String']>;
  lt?: Maybe<Scalars['String']>;
};

export type StringFullTextFilter = {
  alloftext?: Maybe<Scalars['String']>;
  anyoftext?: Maybe<Scalars['String']>;
};

export type StringHashFilter = {
  eq?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type StringRange = {
  max: Scalars['String'];
  min: Scalars['String'];
};

export type StringRegExpFilter = {
  regexp?: Maybe<Scalars['String']>;
};

export type StringTermFilter = {
  allofterms?: Maybe<Scalars['String']>;
  anyofterms?: Maybe<Scalars['String']>;
};

export type UpdateHabitInput = {
  filter: HabitFilter;
  remove?: Maybe<HabitPatch>;
  set?: Maybe<HabitPatch>;
};

export type UpdateHabitPayload = {
  __typename?: 'UpdateHabitPayload';
  habit?: Maybe<Array<Maybe<Habit>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type UpdateHabitPayloadHabitArgs = {
  filter?: Maybe<HabitFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<HabitOrder>;
};

export type UpdateUserInput = {
  filter: UserFilter;
  remove?: Maybe<UserPatch>;
  set?: Maybe<UserPatch>;
};

export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  numUids?: Maybe<Scalars['Int']>;
  user?: Maybe<Array<Maybe<User>>>;
};


export type UpdateUserPayloadUserArgs = {
  filter?: Maybe<UserFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<UserOrder>;
};

export type User = {
  __typename?: 'User';
  habits?: Maybe<Array<Maybe<Habit>>>;
  habitsAggregate?: Maybe<HabitAggregateResult>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};


export type UserHabitsArgs = {
  filter?: Maybe<HabitFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<HabitOrder>;
};


export type UserHabitsAggregateArgs = {
  filter?: Maybe<HabitFilter>;
};

export type UserAggregateResult = {
  __typename?: 'UserAggregateResult';
  count?: Maybe<Scalars['Int']>;
  idMax?: Maybe<Scalars['String']>;
  idMin?: Maybe<Scalars['String']>;
  nameMax?: Maybe<Scalars['String']>;
  nameMin?: Maybe<Scalars['String']>;
};

export type UserFilter = {
  and?: Maybe<Array<Maybe<UserFilter>>>;
  has?: Maybe<Array<Maybe<UserHasFilter>>>;
  id?: Maybe<StringHashFilter>;
  name?: Maybe<StringExactFilter>;
  not?: Maybe<UserFilter>;
  or?: Maybe<Array<Maybe<UserFilter>>>;
};

export enum UserHasFilter {
  Habits = 'habits',
  Id = 'id',
  Name = 'name'
}

export type UserOrder = {
  asc?: Maybe<UserOrderable>;
  desc?: Maybe<UserOrderable>;
  then?: Maybe<UserOrder>;
};

export enum UserOrderable {
  Id = 'id',
  Name = 'name'
}

export type UserPatch = {
  habits?: Maybe<Array<Maybe<HabitRef>>>;
  name?: Maybe<Scalars['String']>;
};

export type UserRef = {
  habits?: Maybe<Array<Maybe<HabitRef>>>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type WithinFilter = {
  polygon: PolygonRef;
};
