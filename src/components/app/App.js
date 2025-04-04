import { BrowserRouter as Router, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { lazy, Suspense } from "react";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const MainPage = lazy(() => import('../pages/MainPage'))
const ComicsPage = lazy(() => import('../pages/ComicsPage'))
const SingleComic = lazy(() => import('../pages/singleComic/SingleComic'))
const Page404 = lazy(() => import('../pages/404'))
const SingleChar = lazy(() => import('../pages/singleChar/SingleChar'))
const SinglePage = lazy(() => import('../pages/SinglePage'))

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Switch>
                            <Route exact path='/'>
                                <MainPage/>
                            </Route>
                            <Route exact path='/comics'>
                                <ComicsPage/>
                            </Route>
                            <Route exact path='/comics/:id'>
                                <SinglePage Component={SingleComic} type={'comics'}/>
                            </Route>
                            <Route exact path='/character/:id'>
                                <SinglePage Component={SingleChar} type={'character'}/>
                            </Route>
                            <Route path='*'>
                                <Page404/>
                            </Route>
                        </Switch>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;