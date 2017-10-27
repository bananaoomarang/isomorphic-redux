// This middleware hook into an Redux processing chain in case
// the dispatched action contains a promise. When the promise is resolved,
// the middleware will automatically fire a new action, marking the completion
// of the async operation.
// On the other hand, if the original action doen not contain a promisse,
// the processing goes through as usual - the middleware does nothing.
export default function promiseMiddleware() {
  return next => action => {

    const { promise, type, ...rest } = action;

    // check if the action contains a promise
    // ... if it doesn't no extra processing is needed
    if (!promise) return next(action);

    const SUCCESS = type;

    const REQUEST = type + '_REQUEST';
    const FAILURE = type + '_FAILURE';

    // By calling [next] we allow the processing of the action to continue.
    // IMPORTANT: here the original action is replaced by a new one,
    // constructed from original by modifying a few things:
    //  - [promise] is removed, since it's processed here
    //  - action [type] is replaces with a new string,
    //    which is constructed by adding '_REQUEST' to the original one
    //    (i.e. "GET_TODOS" => "GET_TODOS_REQUEST")
    next({ ...rest, type: REQUEST });

    // here we return a promise, which in turn will be returned by the [dispatch] function
    // > this is used in [fetchComponentData]
    return promise
      .then(res => {

        // By caling [next] we push a new action down the Redux processing pipeline
        // In this case we construct a new action, which contains the server response,
        // and rest data. The type if the action is equal to the original one (i.e. "GET_TODOS")
        next({ ...rest, res, type: SUCCESS });

        return true;
      })
      .catch(error => {

        // Here we push a failure action down the Redux processing pipeline.
        // The create created here represents failure of the original action (i.e. "GET_TODOS_FAILURE")
        // The action contains rest data and the error object
        next({ ...rest, error, type: FAILURE });
        console.log(error);

        return false;
      });
  };
}
