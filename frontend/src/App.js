import React from 'react';
import {useSelector} from "react-redux";
import {Route, Switch} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "./components/UI/Layout/Layout";
import Photos from "./containers/Photos/Photos";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import PersonalPhotos from "./containers/PersonalPhotos/PersonalPhotos";
import PhotoForm from "./containers/PhotoForm/PhotoForm";
import ModerationPage from "./containers/ModerationPage/ModerationPage";
import ImageLinkPage from "./containers/ImageLinkPage/ImageLinkPage";

const App = () => {
    const user = useSelector(state => state.users.user);

    return (
        <Layout>
            <Switch>
                <Route path='/' exact component={Photos}/>

                <ProtectedRoute
                    isAllowed={!user}
                    redirectTo='/'
                    path='/register'
                    component={Register}
                />

                <ProtectedRoute
                    isAllowed={!user}
                    redirectTo='/'
                    path='/login'
                    component={Login}
                />

                <Route path='/users/:id' component={PersonalPhotos}/>

                <ProtectedRoute
                    isAllowed={user}
                    redirectTo='/'
                    path='/addPhoto'
                    component={PhotoForm}
                />

                <ProtectedRoute
                    isAllowed={user?.role === 'admin'}
                    redirectTo='/'
                    path='/moderation'
                    component={ModerationPage}
                />

                <Route path='/image' component={ImageLinkPage}/>

                <Route render={() => <h1 style={{textAlign: 'center'}}>Not found!</h1>}/>
            </Switch>
        </Layout>
    );
};

export default App;
