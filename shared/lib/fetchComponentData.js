export default function fetchComponentData(dispatch, components, params) {
  const needs = components.reduce( (prev, current) => {

    return (current.needs || [])
      .concat((current.DecoratedComponent ? current.DecoratedComponent.needs : []) || [])
      .concat(prev);
  }, []);

  const promises = needs.map(need => dispatch(need(params)));

  return Promise.all(promises);
}
