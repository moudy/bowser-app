import {ADD_PAGE, SELECT_PAGE_GROUP} from 'app/actions';

const graphToPageGroups = ({graph, root}) => {
  const ret = [[{url: root}]];

  const queue = [root];
  const visited = {};

  while(queue.length) {
    const node = queue.pop();
    visited[node] = true;
    const successors = graph.successors(node);
    if (successors.length) ret.push(successors.map(url => ({url})));
    for (let s of successors) {
      if (!visited[s]) queue.push(s);
    }
  }

  return ret;
};

export default (state, action) => {
  const {graph, root} = state;
  let {currentPageGroup, currentUrl} = state;

  switch(action.type) {
  case ADD_PAGE:
    graph.setEdge(action.from, action.to);
    currentPageGroup++;
    currentUrl = action.to;
    break;
  case SELECT_PAGE_GROUP:
    currentPageGroup = action.index;
    break;
  }

  return {
    graph,
    root,
    currentPageGroup,
    currentUrl,
    pageGroups: graphToPageGroups({graph, root}),
  };
};
