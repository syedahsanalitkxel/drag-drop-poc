## Writing a new Module

Follow the naming conventions

#### Step1

Add required interfaces `interface.tsx`

```typescript
export interface Interface {
  name: string;
}
```

#### Step2

Add list component as following `list.tsx`

Naming => `<ModuleName><FunctionName> i.e. ModuleList`

```jsx
import React from 'react';
import { Interface } from './interface.tsx';

interface Props {
  data: Interface[];
  navigate: (path: string) => void;
}

const ModuleNameList: React.FunctionComponent<Props> = ({ data }) => {
  return (
    <React.Fragment>
      {data.map(item => (
        <h1>{item.name}</h1>
      ))}
    </React.Fragment>
  );
};
```

#### Step3

Create AddEdit component `addEdit.tsx`

Naming => `<ModuleName><FunctionName> i.e. ModuleAddEdit`

```jsx
import React, { useContext } from 'react';
import { Interface } from './interface';

// to use lookup
import LookupContext from '../../context/LookupContext'

interface Props {
  defaultValue?: Interface;
}

const ModuleNameAddEdit: React.Component<Props> = ({ defaultValue }) => {
  const lookupContext = useContext(LookupContext);

  if (defaultValue) {
    return <h1>Edit</h1>
  }
  return (
    return <h1>Add</h1>
  )
}

```

#### Step4

Create service for API calls `service.tsx`

Naming Conventions

- get<ModuleName>
- get<ModuleName>ById
- delete<ModuleName>
- update<ModuleName>
- create<ModuleName>

```jsx
import { AxiosError, AxiosResponse } from 'axios';

import API from '../../api';
import { Interface } from './interface';
import { MODULE_EP } from '../../api/endpoints';

const api = new API();

export async function getModuleData(): Promise<Interface[]> {
  return api.get(MODULE_EP).then(
    (res: AxiosResponse) => res.data,
    (error: AxiosError) => throw error;
  )
}

export async function getModuleDataById(id: string): Promise<Interface> {
  return api.get(MODULE_EP, id).then(
    (res: AxiosResponse) => res.data,
    (error: AxiosError) => throw error;
  );
}
```

#### Step5

Create container to manipulate data `container.tsx`

Class Naming => `<ModuleName><FunctionName> e.g. ModuleContainer`

```jsx
import React, { lazy, useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

// Error Handler
import ErrorContext from '../../context/ErrorContext';
import RouteParamsInterface from '../../interfaces/RouteParams';
// to decide what mode we are in
import { isAdd, isEdit, isList } from '../../utils/routerUtils';

import Spinner from '../components/atoms/Spinner';
import ModuleTemplate from '../components/templates/ModuleTemplate';

import { Interface } from './interface.tsx';
import { getModuleData, getModuleDataById } from './service';

const ListComponent = lazy(() => import('./list'));
const AddEditComponent = lazy(() => import('./addEdit'));

interface State {
  data: Interface[];
  item: Interface;
}
const defaultState: State = {
  data: [{}],
  item: {},
};

const ModuleNameContainer: React.FC<RouteComponentProps<RouteParamsInterface>> = props => {
  const { history, match } = props;
  const errorContext = useContext(ErrorContext);
  const [state, setState] = useState < State > defaultState;

  // handle did mount and props update
  useEffect(() => {
    if (isEdit(match.params)) {
      fetchSingle(match.params.id);
    } else if (isList(match.path)) {
      fetchAll();
    }
  }, [match.path]);

  // fetch all call
  async function fetchAll() {
    try {
      const data = await getModuleData();
      setState({ ...state, data });
    } catch (error) {
      // passing true will make error handle show notification
      errorContext.setError(error, true);
    }
  }

  // fetch single call
  async function fetchSingle(id: string) {
    try {
      const data = await getModuleDataById(id);
      setState({ ...state, item: data });
    } catch (error) {
      // passing true will make error handle show notification
      errorContext.setError(error, true);
    }
  }

  // Copy above 2 to create put, patch and delete

  // this will be passed as navigation to move from list to edit, add and vise versa
  function navigate(path: string) {
    history.push(`/module-name${path}`);
  }

  function renderPage() {
    if (isEdit(match.params)) {
      return <AddEditComponent defaultValue={state.item} />;
    } else if (isAdd(match.path)) {
      return <AddEditComponent />;
    }
    return <ListComponent data={state.data} navigate={navigate} />;
  }
  // since AddEditComponent and ListComponent are loaded through react lazy, it will
  // need susspense to be wrapped around in order to work properly.
  return (
    <ModuleTemplate>
      <React.Suspense fallback={<Spinner />}>{renderPage()}</React.Suspense>
    </ModuleTemplate>
  );
};

export default withRouter(Container);
```

#### Step6 - Finally, create index and export everything

naming => `<module-name><functionalityName>`

```jsx
import { lazy } from 'react';
import ModuleNameAddEdit from './addEdit';
import ModuleNameContainer from './container';
import ModuleNameList from './list';

const ModuleNameRoutes = [
  {
    Component: lazy(() => import('./container')),
    path: '/module-name',
  },
  {
    Component: lazy(() => import('./container')),
    path: '/module-name/add',
  },
  {
    Component: lazy(() => import('./container')),
    path: '/module-name/edit/:id',
  },
];

export { ModuleNameAddEdit, ModuleNameContainer, ModuleNameList, ModuleNameRoutes };
```

to hook it to add, go inside router, and import following way;

```jsx
import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router';

import Spinner from './components/atoms/Spinner';
import { ModuleNameRoutes } from './modules/ModuleName';

// this function can be used by any route list
const generateRoutes(item, i) {
  const { Component } = item;
  return (
    <Route exact={true} key={i} path={item.path}>
      <Component />
    </Route>
  )
}

const Routes = () => (
  <Suspense fallback={<Spinner />}>
  // some routes defined
  {ModuleNameRoutes.map(generateRoutes)}
  // more routes defined
  </Suspense>
)

```
