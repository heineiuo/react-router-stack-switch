/**
 * Copyright (c) 2018-present, heineiuo.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { animated, useSpring } from "react-spring";
import { Switch, useHistory, useLocation } from "react-router-dom";
import { Location } from "history";

function reducer(state: any, action: any) {
  const { type, payload } = action;
  let stack = state.stack.slice();
  let count = state.count;
  if (type === "PUSH") {
    if (count === stack.length - 1) {
      stack[stack.length - 1] = payload;
      count++;
    } else {
      stack.push(payload);
      count++;
    }
  } else if (type === "POP") {
    if (stack.length > 1) {
      if (count === stack.length - 1) {
        stack.pop()
      }
      count--
    }
  } else if (type === "REPLACE") {
    if (stack.length > 0) {
      stack[stack.length - 1] = payload;
    }
  } else if (type === "RESET") {
    stack = [];
    count = 0;
  }
  return {
    stack,
    count
  };
}

interface StackSwitchProps {
  children:
    | React.ReactElement
    | JSX.Element
    | React.ReactElement[]
    | JSX.Element[];
}

export function StackSwitch(props: StackSwitchProps) {
  const [rect, setRect] = React.useState<ClientRect>();
  const [state, dispatch] = React.useReducer(reducer, {
    stack: [],
    count: 0
  });
  const history = useHistory();
  const location = useLocation();
  const [firstLocation] = React.useState(location);
  const [lastStyle, setLast] = useSpring(() => ({
    config: { duration: 180 },
    left: 0
  }));
  const divRef = React.useRef<HTMLDivElement | null>(null);

  const renderNextScreen = React.useCallback(
    (location: Location) => {
      return <Switch location={location}>{props.children}</Switch>;
    },
    [props.children]
  );

  React.useEffect(() => {
    dispatch({ type: "RESET" });
    dispatch({ type: "PUSH", payload: renderNextScreen(firstLocation) });
  }, [firstLocation, renderNextScreen, setLast]);

  React.useEffect(() => {
    const unlisten = history.listen((location, action) => {
      if (action === "REPLACE" || action === "PUSH") {
        const payload = renderNextScreen(location);
        dispatch({ type: action, payload });
      } else {
        dispatch({ type: action });
      }
    });

    return () => {
      unlisten();
    };
  }, [renderNextScreen, history, setLast]);

  React.useEffect(() => {
    if (rect) {
      setLast({ left: (state.count - 1) * rect.width });
    }
  }, [state.count, setLast, rect]);

  React.useEffect(() => {
    if (divRef.current) {
      setRect(divRef.current.getBoundingClientRect());
    }
  }, []);

  return (
    <div
      ref={divRef}
      style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
    >
      {!rect
        ? null
        : state.stack.map((item: any, index: number) => {
            const shouldHidden = index < state.count - 2;
            return (
              <animated.div
                key={index + ":" + item.props.path}
                style={{
                  display: shouldHidden ? "none" : "block",
                  position: "absolute",
                  top: 0,
                  width: rect.width,
                  height: rect.height,
                  left: lastStyle.left.interpolate(value => {
                    return typeof value === "number"
                      ? index * rect.width - value
                      : 0;
                  })
                }}
              >
                {item}
              </animated.div>
            );
          })}
    </div>
  );
}
