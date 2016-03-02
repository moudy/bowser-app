import {
  ADD_PAGE,
  SELECT_PAGE_GROUP,
  CLOSE_PAGE
} from 'app/actions';

const nodeName = ({pageGroup, url}) => `${pageGroup}:${url}`;

const graphToPageGroups = ({graph, root}) => {
  const ret = [[{url: root}]];

  const queue = [nodeName({pageGroup: 0,  url: root})];
  const visited = {};

  while(queue.length) {
    const node = queue.pop();
    visited[node] = true;
    const successors = graph.successors(node);
    if (successors.length) ret.push(successors.map(n => graph.node(n)));
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
    const from = nodeName({pageGroup: currentPageGroup, url: action.from});
    currentPageGroup++;
    const to =  nodeName({pageGroup: currentPageGroup, url: action.to});

    graph.setNode(from, {url: action.from});
    graph.setNode(to, {url: action.to});

    graph.setEdge(from, to);
    currentUrl = action.to;
    break;
  case SELECT_PAGE_GROUP:
    currentPageGroup = action.index;
    break;
  case CLOSE_PAGE:
    const node =  nodeName({pageGroup: action.pageGroup, url: action.url});
    graph.removeNode(node);
    break;
  }

  const pageGroups = graphToPageGroups({graph, root});

  return {
    graph,
    root,
    currentUrl,
    currentPageGroup: Math.min(currentPageGroup, (pageGroups.length - 1)),
    pageGroups: graphToPageGroups({graph, root}),
  };
};
