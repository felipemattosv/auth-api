export {};

declare global {
  export interface Array<T> {
    groupBy<TKey extends string | number | symbol>(
      this: Array<T>,
      keySelector: (source: T) => TKey
    ): Record<TKey, T[]>;
  }
}

Array.prototype.groupBy = function <
  TSource,
  TKey extends string | number | symbol
>(
  this: TSource[],
  keySelector: (source: TSource) => TKey
): Record<TKey, TSource[]> {
  // Array#groupBy
  // https://stackoverflow.com/a/40774906/12511877
  return this.reduce<Record<TKey, TSource[]>>((groups, inst) => {
    groups[keySelector(inst)] = groups[keySelector(inst)] || [];
    groups[keySelector(inst)].push(inst);
    return groups;
  }, Object.create({}));

  // Conheça essa e outras maravilhas do LINQ
  // https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/linq/
};
