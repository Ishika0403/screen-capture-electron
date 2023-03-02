import React, { Component } from "react";

type Props = {
    onToggle: (on: boolean) => void;
    ref: React.ForwardedRef<any>;
} & RenderProps;

type RenderProps =
    | { children: (api: API) => React.ReactNode }
    | { render: (api: API) => React.ReactNode };

type API = ReturnType<Toggle["getApi"]>;

type State = Readonly<typeof initialState>;

const initialState = { on: false };

export default class Toggle extends Component<Props, State> {
    readonly state = initialState;

    private toggle = () => {
        this.setState(
            ({ on }) => ({ on: !on }),
            () => {
                this.props.onToggle(this.state.on);
            },
        );
    };

    private getApi() {
        return {
            on: this.state.on,
            toggle: this.toggle,
        };
    }

    render() {
        if (hasRender(this.props)) {
            return this.props.render(this.getApi());
        }
        if (hasChildren(this.props)) {
            return this.props.children(this.getApi());
        }

        throw new Error(
            "one of children or render is necessary and it needs to be function",
        );
    }
}

type HasRenderProps<T> = T extends { render: (props: any) => React.ReactNode }
    ? T
    : never;

type HasChildrenprop<T> = T extends {
    children: (props: any) => React.ReactNode;
}
    ? T
    : never;

type isFunction<T> = T extends (...args: any[]) => any ? T : never;

const hasRender = <T extends {}>(value: T): value is HasRenderProps<T> =>
    "render" in value && IsFunction((value as HasRenderProps<T>).render);

const hasChildren = <T extends {}>(value: T): value is HasChildrenprop<T> =>
    "children" in value && IsFunction((value as HasChildrenprop<T>).children);

const IsFunction = <T extends {}>(value: T): value is isFunction<T> =>
    typeof value === "function";
