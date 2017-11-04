/**
 * This functon discoveres and dispatches actions,
 * which are prerequisite for some components to be rendered.
 * It returns a promise, which will be resolved when
 * all the async actions have been completed.
 * 
 * In our case the [Home] component can't be rendered until
 * the "getTodos" action has been completed - in other words
 * before data has been retrived from the database
 * 
 * This function is used server-side only (inside `server.jsx`)
 * 
 * @param {*} dispatch = reference to the Redux dispatch function
 * @param {*} components = array of components which need to be analyzed
 * @param {*} params = rendering params
 */

export default function fetchComponentData(dispatch, components, params) {

  // Here we go through the array of components passed to the function
  // and creating a new array of all the actions, which components
  // require to be executed before the can be rendered
  // Components which have such requirenments have a static property
  // called [needs], which contains an array of actions
  const needs = components.reduce( (prev, current) => {
    return current ? (current.needs || []).concat(prev) : prev;
  }, []);

  // Here we go through the list of actions collected in the
  // previous section, dispatch each one of them and collect
  // the promises returned by [dispatch] function.
  // The [dispatch] function doesn't usually return promises,
  // but wil do so in this case, since [promiseMiddleware] returns one
  const promises = needs.map(need => dispatch(need(params)));

  // here we return a new promise, which will be resolved
  // when all the promises in the [promises] are resolved
  return Promise.all(promises);
}
