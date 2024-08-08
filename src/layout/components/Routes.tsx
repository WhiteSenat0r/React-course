import {Route, Routes as ReactRoutes} from "react-router-dom";
import Example from "../../shared/components/Example.tsx";
import SignIn from "../../features/auth/components/SignIn.tsx";
import NotFound from "../../shared/components/NotFound.tsx";
import {APP_ROUTES} from "../../shared/variables/appRoutes.ts";

export default function Routes() {
    return(
        <ReactRoutes>
            <Route path={APP_ROUTES.HOME} element={<Example />} />
            <Route path={APP_ROUTES.SIGN_IN} element={<SignIn />} />
            <Route path="*" element={<NotFound />} />
        </ReactRoutes>
    );
}