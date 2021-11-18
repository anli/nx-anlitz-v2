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

export type AddHabitActivityInput = {
  count: Scalars['Int'];
  date: Scalars['DateTime'];
  habit: HabitRef;
};

export type AddHabitActivityPayload = {
  __typename?: 'AddHabitActivityPayload';
  habitActivity?: Maybe<Array<Maybe<HabitActivity>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type AddHabitActivityPayloadHabitActivityArgs = {
  filter?: Maybe<HabitActivityFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<HabitActivityOrder>;
};

export type AddHabitInput = {
  habitActivities?: Maybe<Array<HabitActivityRef>>;
  name: Scalars['String'];
  user: UserRef;
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
  email: Scalars['String'];
  habits?: Maybe<Array<HabitRef>>;
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

export type DeleteHabitActivityPayload = {
  __typename?: 'DeleteHabitActivityPayload';
  habitActivity?: Maybe<Array<Maybe<HabitActivity>>>;
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};


export type DeleteHabitActivityPayloadHabitActivityArgs = {
  filter?: Maybe<HabitActivityFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<HabitActivityOrder>;
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
  habitActivities?: Maybe<Array<HabitActivity>>;
  habitActivitiesAggregate?: Maybe<HabitActivityAggregateResult>;
  id: Scalars['ID'];
  name: Scalars['String'];
  user: User;
};


export type HabitHabitActivitiesArgs = {
  filter?: Maybe<HabitActivityFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<HabitActivityOrder>;
};


export type HabitHabitActivitiesAggregateArgs = {
  filter?: Maybe<HabitActivityFilter>;
};


export type HabitUserArgs = {
  filter?: Maybe<UserFilter>;
};

export type HabitActivity = {
  __typename?: 'HabitActivity';
  count: Scalars['Int'];
  date: Scalars['DateTime'];
  habit: Habit;
  id: Scalars['ID'];
};


export type HabitActivityHabitArgs = {
  filter?: Maybe<HabitFilter>;
};

export type HabitActivityAggregateResult = {
  __typename?: 'HabitActivityAggregateResult';
  count?: Maybe<Scalars['Int']>;
  countAvg?: Maybe<Scalars['Float']>;
  countMax?: Maybe<Scalars['Int']>;
  countMin?: Maybe<Scalars['Int']>;
  countSum?: Maybe<Scalars['Int']>;
  dateMax?: Maybe<Scalars['DateTime']>;
  dateMin?: Maybe<Scalars['DateTime']>;
};

export type HabitActivityFilter = {
  and?: Maybe<Array<Maybe<HabitActivityFilter>>>;
  date?: Maybe<DateTimeFilter>;
  has?: Maybe<Array<Maybe<HabitActivityHasFilter>>>;
  id?: Maybe<Array<Scalars['ID']>>;
  not?: Maybe<HabitActivityFilter>;
  or?: Maybe<Array<Maybe<HabitActivityFilter>>>;
};

export enum HabitActivityHasFilter {
  Count = 'count',
  Date = 'date',
  Habit = 'habit'
}

export type HabitActivityOrder = {
  asc?: Maybe<HabitActivityOrderable>;
  desc?: Maybe<HabitActivityOrderable>;
  then?: Maybe<HabitActivityOrder>;
};

export enum HabitActivityOrderable {
  Count = 'count',
  Date = 'date'
}

export type HabitActivityPatch = {
  count?: Maybe<Scalars['Int']>;
  date?: Maybe<Scalars['DateTime']>;
  habit?: Maybe<HabitRef>;
};

export type HabitActivityRef = {
  count?: Maybe<Scalars['Int']>;
  date?: Maybe<Scalars['DateTime']>;
  habit?: Maybe<HabitRef>;
  id?: Maybe<Scalars['ID']>;
};

export type HabitAggregateResult = {
  __typename?: 'HabitAggregateResult';
  count?: Maybe<Scalars['Int']>;
  nameMax?: Maybe<Scalars['String']>;
  nameMin?: Maybe<Scalars['String']>;
};

export type HabitFilter = {
  and?: Maybe<Array<Maybe<HabitFilter>>>;
  has?: Maybe<Array<Maybe<HabitHasFilter>>>;
  id?: Maybe<Array<Scalars['ID']>>;
  name?: Maybe<StringFullTextFilter>;
  not?: Maybe<HabitFilter>;
  or?: Maybe<Array<Maybe<HabitFilter>>>;
};

export enum HabitHasFilter {
  HabitActivities = 'habitActivities',
  Name = 'name',
  User = 'user'
}

export type HabitOrder = {
  asc?: Maybe<HabitOrderable>;
  desc?: Maybe<HabitOrderable>;
  then?: Maybe<HabitOrder>;
};

export enum HabitOrderable {
  Name = 'name'
}

export type HabitPatch = {
  habitActivities?: Maybe<Array<HabitActivityRef>>;
  name?: Maybe<Scalars['String']>;
  user?: Maybe<UserRef>;
};

export type HabitRef = {
  habitActivities?: Maybe<Array<HabitActivityRef>>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  user?: Maybe<UserRef>;
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
  addHabitActivity?: Maybe<AddHabitActivityPayload>;
  addUser?: Maybe<AddUserPayload>;
  deleteHabit?: Maybe<DeleteHabitPayload>;
  deleteHabitActivity?: Maybe<DeleteHabitActivityPayload>;
  deleteUser?: Maybe<DeleteUserPayload>;
  updateHabit?: Maybe<UpdateHabitPayload>;
  updateHabitActivity?: Maybe<UpdateHabitActivityPayload>;
  updateUser?: Maybe<UpdateUserPayload>;
};


export type MutationAddHabitArgs = {
  input: Array<AddHabitInput>;
};


export type MutationAddHabitActivityArgs = {
  input: Array<AddHabitActivityInput>;
};


export type MutationAddUserArgs = {
  input: Array<AddUserInput>;
  upsert?: Maybe<Scalars['Boolean']>;
};


export type MutationDeleteHabitArgs = {
  filter: HabitFilter;
};


export type MutationDeleteHabitActivityArgs = {
  filter: HabitActivityFilter;
};


export type MutationDeleteUserArgs = {
  filter: UserFilter;
};


export type MutationUpdateHabitArgs = {
  input: UpdateHabitInput;
};


export type MutationUpdateHabitActivityArgs = {
  input: UpdateHabitActivityInput;
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
  aggregateHabitActivity?: Maybe<HabitActivityAggregateResult>;
  aggregateUser?: Maybe<UserAggregateResult>;
  getHabit?: Maybe<Habit>;
  getHabitActivity?: Maybe<HabitActivity>;
  getUser?: Maybe<User>;
  queryHabit?: Maybe<Array<Maybe<Habit>>>;
  queryHabitActivity?: Maybe<Array<Maybe<HabitActivity>>>;
  queryUser?: Maybe<Array<Maybe<User>>>;
};


export type QueryAggregateHabitArgs = {
  filter?: Maybe<HabitFilter>;
};


export type QueryAggregateHabitActivityArgs = {
  filter?: Maybe<HabitActivityFilter>;
};


export type QueryAggregateUserArgs = {
  filter?: Maybe<UserFilter>;
};


export type QueryGetHabitArgs = {
  id: Scalars['ID'];
};


export type QueryGetHabitActivityArgs = {
  id: Scalars['ID'];
};


export type QueryGetUserArgs = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
};


export type QueryQueryHabitArgs = {
  filter?: Maybe<HabitFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<HabitOrder>;
};


export type QueryQueryHabitActivityArgs = {
  filter?: Maybe<HabitActivityFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<HabitActivityOrder>;
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

export type Subscription = {
  __typename?: 'Subscription';
  aggregateHabit?: Maybe<HabitAggregateResult>;
  aggregateHabitActivity?: Maybe<HabitActivityAggregateResult>;
  aggregateUser?: Maybe<UserAggregateResult>;
  getHabit?: Maybe<Habit>;
  getHabitActivity?: Maybe<HabitActivity>;
  getUser?: Maybe<User>;
  queryHabit?: Maybe<Array<Maybe<Habit>>>;
  queryHabitActivity?: Maybe<Array<Maybe<HabitActivity>>>;
  queryUser?: Maybe<Array<Maybe<User>>>;
};


export type SubscriptionAggregateHabitArgs = {
  filter?: Maybe<HabitFilter>;
};


export type SubscriptionAggregateHabitActivityArgs = {
  filter?: Maybe<HabitActivityFilter>;
};


export type SubscriptionAggregateUserArgs = {
  filter?: Maybe<UserFilter>;
};


export type SubscriptionGetHabitArgs = {
  id: Scalars['ID'];
};


export type SubscriptionGetHabitActivityArgs = {
  id: Scalars['ID'];
};


export type SubscriptionGetUserArgs = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
};


export type SubscriptionQueryHabitArgs = {
  filter?: Maybe<HabitFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<HabitOrder>;
};


export type SubscriptionQueryHabitActivityArgs = {
  filter?: Maybe<HabitActivityFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<HabitActivityOrder>;
};


export type SubscriptionQueryUserArgs = {
  filter?: Maybe<UserFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<UserOrder>;
};

export type UpdateHabitActivityInput = {
  filter: HabitActivityFilter;
  remove?: Maybe<HabitActivityPatch>;
  set?: Maybe<HabitActivityPatch>;
};

export type UpdateHabitActivityPayload = {
  __typename?: 'UpdateHabitActivityPayload';
  habitActivity?: Maybe<Array<Maybe<HabitActivity>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type UpdateHabitActivityPayloadHabitActivityArgs = {
  filter?: Maybe<HabitActivityFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<HabitActivityOrder>;
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
  email: Scalars['String'];
  habits?: Maybe<Array<Habit>>;
  habitsAggregate?: Maybe<HabitAggregateResult>;
  id: Scalars['ID'];
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
  emailMax?: Maybe<Scalars['String']>;
  emailMin?: Maybe<Scalars['String']>;
};

export type UserFilter = {
  and?: Maybe<Array<Maybe<UserFilter>>>;
  email?: Maybe<StringHashFilter>;
  has?: Maybe<Array<Maybe<UserHasFilter>>>;
  id?: Maybe<Array<Scalars['ID']>>;
  not?: Maybe<UserFilter>;
  or?: Maybe<Array<Maybe<UserFilter>>>;
};

export enum UserHasFilter {
  Email = 'email',
  Habits = 'habits'
}

export type UserOrder = {
  asc?: Maybe<UserOrderable>;
  desc?: Maybe<UserOrderable>;
  then?: Maybe<UserOrder>;
};

export enum UserOrderable {
  Email = 'email'
}

export type UserPatch = {
  habits?: Maybe<Array<HabitRef>>;
};

export type UserRef = {
  email?: Maybe<Scalars['String']>;
  habits?: Maybe<Array<HabitRef>>;
  id?: Maybe<Scalars['ID']>;
};

export type WithinFilter = {
  polygon: PolygonRef;
};
