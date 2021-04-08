import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Home, Room } from '@components'

const App = () => (
  <Router>
    <Route path='/' exact component={Home} />
    <Route path='/room/:id' component={Room} />
  </Router>
)

export default App
