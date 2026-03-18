import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    layout("./routes/auth/layout.tsx",[
        route('/login',"./routes/auth/login.tsx")
    ]),
    route('visualize/:id', "./routes/visualizer.$id.tsx")
] satisfies RouteConfig;
