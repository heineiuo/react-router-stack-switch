# react-router-stack-switch

Demo: [https://heineiuo.github.io/react-router-stack-switch/index.html](https://heineiuo.github.io/react-router-stack-switch/index.html)

## Install

```
yarn add react-router-stack-switch
```

## Usage

```tsx
import { StackSwitch } from "./StackSwitch";

const App: React.FC = () => {
  return (
    <HashRouter>
      <StackSwitch>
        <Route path="/" exact component={App}></Route>
        <Route path="/learn/:chapter" exact component={Learn}></Route>
      </StackSwitch>
    </HashRouter>
  );
};

```

See: [/src/App.tsx](https://github.com/heineiuo/react-router-stack-switch/blob/master/src/App.tsx)

## License
MIT License
