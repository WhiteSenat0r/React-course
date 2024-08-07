import {Route, Routes as ReactRoutes} from "react-router-dom";
import Example from "../Example.tsx";
import SignIn from "../SignIn.tsx";
import NotFound from "../NotFound.tsx";
import {ROUTES} from "../../constants/common/Routes.ts";

export default function Routes() {
    return(
        <ReactRoutes>
            <Route path={ROUTES.HOME} element={<Example />} />
            <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
            <Route path="*" element={<NotFound />} />
        </ReactRoutes>
    );
}