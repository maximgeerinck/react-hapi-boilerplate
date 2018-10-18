// manager of the process, receives actions and dispatches the actions and data to callbacks

const Dispatcher = require('flux').Dispatcher;

class AppDispatcher extends Dispatcher {

    handleAddUserAction(action) {
        this.dispatch({
            source: 'ADD_USER',
            action: action
        })
    }

}

export default new AppDispatcher();