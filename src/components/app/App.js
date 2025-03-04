import { BrowserRouter as Router, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";

import { MainPage, ComicsPage, SingleComicPage } from "../pages";
import AppHeader from "../appHeader/AppHeader";

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Switch>
                        <Route exact path='/'>
                            <MainPage/>
                        </Route>
                        <Route exact path='/comics'>
                            <ComicsPage/>
                        </Route>
                        <Route exact path='/comics/:comicId'>
                            <SingleComicPage/>
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    )
}

export default App;