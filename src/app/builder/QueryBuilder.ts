import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  //   searching
  search(searchFields: string[]) {
    const searchTerm = (this?.query?.search as string) || '';
    this.modelQuery = this.modelQuery.find({
      $or: searchFields.map(
        (field) =>
          ({
            [field]: { $regex: searchTerm, $options: 'i' },
          }) as FilterQuery<T>,
      ),
    });
    return this;
  }

  // Filtering
  filter() {
    const queryObj = { ...this.query }; // copy query
    const excludeFields = ['search', 'sort', 'page', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]); // remove filed

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  // sorting
  sort() {
    if (this?.query?.sort) {
      const sort =
        (this?.query?.sort as string).split(',').join(' ') || 'createdAt';
      this.modelQuery = this.modelQuery.sort(sort);
    }

    return this;
  }

  // paginate
  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 5;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);

    return this;
  }
}

export default QueryBuilder;
