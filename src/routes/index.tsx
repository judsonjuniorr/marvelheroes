import { Redirect, Route, Switch } from 'react-router-dom'

import Home from 'pages/Home'
import Character from 'pages/Character'
import Search from 'pages/SearchResults'
import Serie from 'pages/Serie'

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/character/:id" exact component={Character} />
      <Route path="/search" exact component={Search} />
      <Route path="/serie/:id" exact component={Serie} />

      <Route path="*" component={() => <Redirect to="/" />} />
    </Switch>
  )
}

export default Routes
