declare interface IShoppingListStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'shoppingListStrings' {
  const strings: IShoppingListStrings;
  export = strings;
}
