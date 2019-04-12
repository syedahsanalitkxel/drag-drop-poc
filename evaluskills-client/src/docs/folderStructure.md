## Folder Structure

#### Core structure

```bash
src
 |-- components // this will have all shared components
 |   |-- atoms // basic level components
 |   |-- molecules // components made up of atoms
 |   |-- organisms // components made up of molecules
 |   `-- templates // all templates wrapping our app
 |-- modules // this will have page level modules
 |   `-- moduleName
 |       |-- index.tsx // this will have route data export all files with correct names.
 |       |-- container.tsx // this will have all the logic
 |       |-- list.tsx // this will have all list items
 |       |-- addEdit.tsx // this will have <CRUD> CU template
 |       |-- service.tsx // this will have api calls
 |       |-- interface.tsx // this will have all interface
 |       `-- <file.tsx> // test files & any other required ones
 |-- context // this will have all context defined
 |-- api // API structure to create services
 |-- utils // will have all extra utilities
 |-- styles // complete SCSS theme.
 |-- enums.tsx // All application level enums
 |-- App.tsx // this has core app structure
 |-- index.tsx // app entry point. Root binding with react app
 `-- routes.tsx // defining all routes and importing module level routes
```

#### Module Structure

`AddEdit.tsx` Will contain template for add and edit both. If data is passed through template as `<AddEdit defaultState={Object} />` will work as **edit** mode, and if nothing is passed, it will be add mode.

- **create** this will make an api call and move back to list, if error occurs, will show error
- **update** this will make api call to update and move page to list

`interface.tsx` will contain all the required interfaces. Not the prop and state, only data interfaces. try to create a base interface so state/props can be extended through them.

`list.tsx` This will contain list of all available elements. This might have

- **search** updates filters state and make api call
- **filters** show modal, if approve -> update filters state and make api call
- **pagination** implement pagination section to fetch list, this will go along side filters
- **add** navigate to add screen. cancel will bring back to list.
- **edit** navigate to edit screen, by passing the initial values.
- **remove** show remove modal, cancel will hide modal, approve will make api call

`container.tsx` this is going to be core of all functionality and data manipulation. This is going to be central part of all data manipulation
